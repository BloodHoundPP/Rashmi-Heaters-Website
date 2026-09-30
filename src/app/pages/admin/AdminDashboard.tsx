import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { 
  Upload, 
  Images, 
  ExternalLink, 
  Check, 
  Star, 
  X, 
  Plus, 
  Search, 
  Sparkles,
  Layers,
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";
import { autoTrimImageFile } from "../../lib/imageTrim";

type SubcategoryItem = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  category_id: string;
  gallery_images: string[];
  categories?: {
    name: string;
    slug: string;
  };
  productCount?: number;
};

export function AdminDashboard() {
  const [counts, setCounts] = useState({ categories: 0, subcategories: 0, products: 0, totalShowcaseImages: 0 });
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<SubcategoryItem | null>(null);
  
  // Gallery state for selected subcategory
  const [currentGallery, setCurrentGallery] = useState<string[]>([]);
  const [currentPrimary, setCurrentPrimary] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const uploaderRef = useRef<HTMLDivElement>(null);

  // Load counts and all subcategories with relationships
  const loadData = async () => {
    setLoading(true);
    try {
      const [{ count: catCount }, { count: prodCount }, { data: subsData }] = await Promise.all([
        supabase.from("categories").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase
          .from("subcategories")
          .select("*, categories(name, slug), products(count)")
          .order("name"),
      ]);

      const parsedSubs: SubcategoryItem[] = (subsData ?? []).map((s: any) => {
        let gallery: string[] = [];
        if (Array.isArray(s.gallery_images)) {
          gallery = s.gallery_images;
        } else if (typeof s.gallery_images === "string") {
          try {
            const parsed = JSON.parse(s.gallery_images);
            if (Array.isArray(parsed)) gallery = parsed;
          } catch {
            // ignore
          }
        }
        return {
          ...s,
          gallery_images: gallery,
          productCount: s.products?.[0]?.count ?? 0,
        };
      });

      const totalImages = parsedSubs.reduce((acc, s) => acc + (s.gallery_images?.length || 0), 0);

      setCounts({
        categories: catCount ?? 0,
        subcategories: parsedSubs.length,
        products: prodCount ?? 0,
        totalShowcaseImages: totalImages,
      });

      setSubcategories(parsedSubs);

      // Default select the first subcategory if none selected
      if (!selectedSub && parsedSubs.length > 0) {
        selectSubcategory(parsedSubs[0]);
      } else if (selectedSub) {
        const updated = parsedSubs.find((s) => s.id === selectedSub.id);
        if (updated) selectSubcategory(updated);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectSubcategory = (sub: SubcategoryItem) => {
    setSelectedSub(sub);
    setCurrentGallery(sub.gallery_images ? [...sub.gallery_images] : []);
    setCurrentPrimary(sub.image_url || (sub.gallery_images?.[0] ?? ""));
    setSuccessMessage(null);
  };

  // Get live public URL for subcategory
  const getPublicUrl = (sub: SubcategoryItem | null) => {
    if (!sub) return "/products";
    const parentSlug = sub.categories?.slug || "customized-heaters";
    if (parentSlug === "customized-heaters") {
      return `/products/customized-heaters/${sub.slug}`;
    }
    return `/products/${parentSlug}/${sub.slug}`;
  };

  // Upload multiple images to Supabase storage
  const handleMultipleUpload = async (files: FileList) => {
    if (!selectedSub) return;
    setUploading(true);
    setUploadProgress(`Optimizing & uploading ${files.length} image${files.length > 1 ? "s" : ""}...`);
    const newUploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      setUploadProgress(`Trimming empty margins ${i + 1} of ${files.length}: ${file.name}...`);
      try {
        file = await autoTrimImageFile(file);
      } catch (err) {
        console.warn("Auto-trim skipped:", err);
      }

      setUploadProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}...`);
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const path = `sub-${selectedSub.slug}-${Date.now()}-${i}-${sanitizedName}`;

      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        newUploadedUrls.push(data.publicUrl);
      } else {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }

    if (newUploadedUrls.length > 0) {
      const updatedGallery = [...currentGallery, ...newUploadedUrls];
      setCurrentGallery(updatedGallery);
      if (!currentPrimary) {
        setCurrentPrimary(newUploadedUrls[0]);
      }
      setSuccessMessage(`✔ Uploaded ${newUploadedUrls.length} image(s)! Remember to click "Save & Publish" below.`);
    }

    setUploading(false);
    setUploadProgress("");
  };

  // Add image by URL
  const handleAddUrl = () => {
    if (!newImageUrl.trim()) return;
    const url = newImageUrl.trim();
    const updated = [...currentGallery, url];
    setCurrentGallery(updated);
    if (!currentPrimary) setCurrentPrimary(url);
    setNewImageUrl("");
    setSuccessMessage(`✔ Added image URL! Remember to click "Save & Publish" below.`);
  };

  // Remove image from gallery
  const handleRemoveImage = (indexToRemove: number) => {
    const removedUrl = currentGallery[indexToRemove];
    const filtered = currentGallery.filter((_, idx) => idx !== indexToRemove);
    setCurrentGallery(filtered);
    if (currentPrimary === removedUrl) {
      setCurrentPrimary(filtered[0] || "");
    }
  };

  // Set image as primary
  const handleSetPrimary = (url: string) => {
    setCurrentPrimary(url);
  };

  // Save changes to Supabase
  const handleSaveShowcase = async () => {
    if (!selectedSub) return;
    setSaving(true);
    setSuccessMessage(null);

    const payload = {
      gallery_images: currentGallery,
      image_url: currentPrimary || (currentGallery[0] ?? null),
    };

    try {
      const { data, error } = await supabase
        .from("subcategories")
        .update(payload)
        .eq("id", selectedSub.id)
        .select();

      if (error) {
        alert("Failed to save images: " + error.message);
      } else if (!data || data.length === 0) {
        alert("Warning: No changes were saved in Supabase. Your login session may have expired or permission was denied. Please refresh the page and log in again.");
      } else {
        // Immediately update state
        setSubcategories((prev) =>
          prev.map((s) =>
            s.id === selectedSub.id
              ? { ...s, gallery_images: currentGallery, image_url: payload.image_url }
              : s
          )
        );
        setSelectedSub((prev) =>
          prev ? { ...prev, gallery_images: currentGallery, image_url: payload.image_url } : null
        );
        setSuccessMessage("✔ Changes saved successfully to Supabase! You can now view them on the live page.");
        // Refresh full counts and state
        await loadData();
      }
    } catch (err: any) {
      console.error("Save showcase error:", err);
      alert("Error saving showcase: " + (err.message || String(err)));
    } finally {
      setSaving(false);
    }
  };

  // Filter subcategories for the table
  const filteredSubcategories = subcategories.filter((s) => {
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q) || (s.categories?.name ?? "").toLowerCase().includes(q);
  });

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Upload and showcase multiple images for subcategories and view them directly on the main website.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              Categories
              <FolderKanban className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.categories}</div>
            <Link to="/admin/categories" className="text-xs text-primary hover:underline mt-1 inline-block">
              Manage Categories →
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              Subcategories
              <Layers className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.subcategories}</div>
            <p className="text-xs text-muted-foreground mt-1">Industrial product lines</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              Showcase Images
              <Images className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {counts.totalShowcaseImages}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Uploaded across subcategories</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              Total Products
              <Sparkles className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.products}</div>
            <p className="text-xs text-muted-foreground mt-1">Individual catalog items</p>
          </CardContent>
        </Card>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          MAIN FEATURE: Subcategory Showcase Multi-Image Uploader
      ────────────────────────────────────────────────────────────────────────── */}
      <div ref={uploaderRef}>
        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden bg-card">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/20 to-background border-b border-border py-5 px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Images className="w-6 h-6 text-primary" />
                  Subcategory Showcase & Multi-Image Uploader
                </CardTitle>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Upload multiple photos for any subcategory. Visitors will see these high-res showcase photos on the live website.
                </p>
              </div>

              {selectedSub && (
                <a
                  href={getPublicUrl(selectedSub)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 shadow-md transition-all shrink-0"
                >
                  <Eye className="w-4 h-4" />
                  View on Main Page ↗
                </a>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Step 1: Select Subcategory */}
            <div>
              <label className="text-sm font-bold block mb-2 text-foreground">
                Step 1: Choose Subcategory to Upload Images For
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  className="flex-1 h-11 px-3.5 rounded-lg border border-input bg-background text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                  value={selectedSub?.id ?? ""}
                  onChange={(e) => {
                    const match = subcategories.find((s) => s.id === e.target.value);
                    if (match) selectSubcategory(match);
                  }}
                >
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.categories?.name || "Category"}) — {sub.gallery_images?.length || 0} images
                    </option>
                  ))}
                </select>

                {selectedSub && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold px-3 py-2 rounded-lg bg-secondary text-foreground border">
                      Parent: {selectedSub.categories?.name || "Customized Heaters"}
                    </span>
                    <span className="text-xs font-bold px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                      {currentGallery.length} Image{currentGallery.length !== 1 ? "s" : ""} in Showcase
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Upload Area */}
            {selectedSub && (
              <div className="border rounded-2xl p-5 bg-secondary/10 space-y-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" />
                      Step 2: Upload Multiple Images for "{selectedSub.name}"
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Select one or more image files from your computer (PNG, JPG, WEBP).
                    </p>
                  </div>
                </div>

                {/* Upload Buttons & Inputs */}
                <div className="grid sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7">
                    <input
                      type="file"
                      id="admin-dashboard-multiple-upload"
                      multiple
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => e.target.files && e.target.files.length > 0 && handleMultipleUpload(e.target.files)}
                      className="hidden"
                    />
                    <label
                      htmlFor="admin-dashboard-multiple-upload"
                      className={`cursor-pointer w-full h-14 border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 rounded-xl flex items-center justify-center gap-2.5 text-primary font-bold text-sm transition-all shadow-sm ${
                        uploading ? "opacity-60 pointer-events-none" : ""
                      }`}
                    >
                      <Upload className="w-5 h-5 animate-bounce" />
                      {uploading ? uploadProgress : "+ Click to Select & Upload Multiple Images"}
                    </label>
                  </div>

                  {/* Add Image by Direct URL */}
                  <div className="sm:col-span-5 flex gap-2">
                    <Input
                      placeholder="Or paste image URL..."
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddUrl();
                        }
                      }}
                      className="h-14 bg-background"
                    />
                    <Button type="button" variant="secondary" onClick={handleAddUrl} className="h-14 px-4 shrink-0">
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>

                {/* Step 3: Current Showcase Gallery Preview Grid */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Showcase Images for "{selectedSub.name}" ({currentGallery.length})
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Hover image to set as Primary or Remove
                    </span>
                  </div>

                  {currentGallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-4 bg-background rounded-xl border border-border">
                      {currentGallery.map((url, idx) => {
                        const isPrimary = currentPrimary === url;
                        return (
                          <div
                            key={idx}
                            className={`relative group rounded-xl overflow-hidden border-2 transition-all bg-card shadow-sm ${
                              isPrimary ? "border-primary ring-2 ring-primary/30" : "border-border/60 hover:border-primary/50"
                            }`}
                          >
                            <div className="aspect-square">
                              <ImageWithFallback
                                src={url}
                                alt={`Showcase photo ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Overlay Controls on Hover */}
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1.5">
                              {!isPrimary && (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimary(url)}
                                  className="w-full py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded flex items-center justify-center gap-1 hover:brightness-110 shadow"
                                  title="Make this the primary featured thumbnail"
                                >
                                  <Star className="w-3 h-3" /> Set Primary
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="w-full py-1 bg-red-600 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 hover:bg-red-700 shadow"
                                title="Remove this photo from showcase"
                              >
                                <X className="w-3.5 h-3.5" /> Remove
                              </button>
                            </div>

                            {/* Primary Badge */}
                            {isPrimary && (
                              <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                PRIMARY
                              </div>
                            )}

                            {/* Index Badge */}
                            <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                              #{idx + 1}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 border-2 border-dashed rounded-xl text-center text-sm text-muted-foreground bg-background">
                      <Images className="w-10 h-10 mx-auto text-muted-foreground/40 mb-2" />
                      No showcase images uploaded yet for <strong>{selectedSub.name}</strong>.
                      <p className="text-xs text-muted-foreground mt-1">
                        Use the upload box above to upload multiple images to showcase on the main page.
                      </p>
                    </div>
                  )}
                </div>

                {/* Feedback / Success Notice */}
                {successMessage && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between gap-3 text-emerald-700 dark:text-emerald-300 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                    <a
                      href={getPublicUrl(selectedSub)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold text-xs shrink-0 flex items-center gap-1 hover:opacity-80"
                    >
                      Open Live Page ↗
                    </a>
                  </div>
                )}

                {/* Save & Publish Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    After uploading or removing images, click <strong>Save & Publish</strong> to update Supabase.
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      onClick={handleSaveShowcase}
                      disabled={saving || uploading}
                      className="flex-1 sm:flex-none font-bold px-6 shadow-md"
                      size="lg"
                    >
                      {saving ? "Saving to Supabase..." : "Save & Publish Showcase"}
                    </Button>
                    <a
                      href={getPublicUrl(selectedSub)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-secondary font-semibold text-sm transition-colors shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          ALL SUBCATEGORIES TABLE & QUICK LAUNCHER
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">All Subcategories Showcase Directory</h2>
            <p className="text-xs text-muted-foreground">
              Click "Upload Images" on any subcategory to load it into the uploader above.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search subcategory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-16">Preview</TableHead>
                <TableHead>Subcategory Name</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead>Showcase Images</TableHead>
                <TableHead>Catalog Products</TableHead>
                <TableHead className="text-right">Quick Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubcategories.map((sub) => {
                const isSelected = selectedSub?.id === sub.id;
                const imgCount = sub.gallery_images?.length || 0;
                return (
                  <TableRow key={sub.id} className={isSelected ? "bg-primary/5 font-medium" : ""}>
                    <TableCell>
                      {sub.image_url ? (
                        <ImageWithFallback
                          src={sub.image_url}
                          alt={sub.name}
                          className="w-12 h-12 object-cover rounded-lg border shadow-xs"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-[10px] text-muted-foreground border">
                          No img
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {sub.name}
                      <span className="block text-xs font-mono text-muted-foreground font-normal">
                        {sub.slug}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-foreground">
                        {sub.categories?.name || "Customized"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          imgCount > 0
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        <Images className="w-3.5 h-3.5" />
                        {imgCount} image{imgCount !== 1 ? "s" : ""}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {sub.productCount && sub.productCount > 0
                          ? `${sub.productCount} models`
                          : "Showcase Page Only"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => {
                            selectSubcategory(sub);
                            uploaderRef.current?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <Upload className="w-3.5 h-3.5 mr-1" />
                          {isSelected ? "Editing Above" : "Upload Images"}
                        </Button>

                        <a
                          href={getPublicUrl(sub)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                          title="View on main website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredSubcategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No matching subcategories found for "{searchQuery}".
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}