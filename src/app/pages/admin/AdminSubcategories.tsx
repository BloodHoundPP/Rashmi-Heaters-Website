import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Upload, X, Plus, Images, Star, AlertCircle } from "lucide-react";
import { autoTrimImageFile } from "../../lib/imageTrim";

type Subcategory = {
  id?: string;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  category_id?: string;
  gallery_images?: string[];
  productCount?: number;
};

export function AdminSubcategories() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [editing, setEditing] = useState<Subcategory | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [migrationWarning, setMigrationWarning] = useState<string | null>(null);

  const load = () => {
    if (!categoryId) return;
    supabase
      .from("subcategories")
      .select("*, products(count)")
      .eq("category_id", categoryId)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error loading subcategories:", error);
          return;
        }
        setSubcategories((data ?? []).map((s: any) => ({
          ...s,
          name: s.name || "",
          slug: s.slug || "",
          description: s.description || "",
          image_url: s.image_url || "",
          gallery_images: Array.isArray(s.gallery_images)
            ? s.gallery_images
            : (typeof s.gallery_images === "string" ? JSON.parse(s.gallery_images || "[]") : []),
          productCount: s.products?.[0]?.count ?? 0,
        })) as Subcategory[]);
      });
  };

  useEffect(() => {
    load();
  }, [categoryId]);

  async function handleImageUpload(file: File) {
    setUploading(true);
    const path = `sub-main-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (!error && editing) {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setEditing({ ...editing, image_url: data.publicUrl });
    } else if (error) {
      alert("Image upload failed: " + error.message);
    }
    setUploading(false);
  }

  async function handleGalleryUpload(files: FileList) {
    if (!editing) return;
    setUploading(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = `sub-gallery-${Date.now()}-${i}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      } else {
        console.error("Failed uploading gallery image:", file.name, error);
      }
    }

    if (newUrls.length > 0) {
      const currentGallery = editing.gallery_images || [];
      const updatedGallery = [...currentGallery, ...newUrls];
      // If primary image_url is empty, set the first uploaded gallery image as primary
      const updatedImageUrl = editing.image_url || newUrls[0];
      setEditing({
        ...editing,
        image_url: updatedImageUrl,
        gallery_images: updatedGallery,
      });
    }
    setUploading(false);
  }

  function handleAddGalleryUrl() {
    if (!newGalleryUrl.trim() || !editing) return;
    const currentGallery = editing.gallery_images || [];
    const url = newGalleryUrl.trim();
    setEditing({
      ...editing,
      image_url: editing.image_url || url,
      gallery_images: [...currentGallery, url],
    });
    setNewGalleryUrl("");
  }

  function handleRemoveGalleryImage(index: number) {
    if (!editing) return;
    const currentGallery = editing.gallery_images || [];
    const filtered = currentGallery.filter((_, i) => i !== index);
    setEditing({
      ...editing,
      gallery_images: filtered,
    });
  }

  function handleSetAsPrimary(url: string) {
    if (!editing) return;
    setEditing({
      ...editing,
      image_url: url,
    });
  }

  async function handleSave() {
    if (!editing || !categoryId) return;
    setSaving(true);

    try {
      const name = (editing.name || "").trim();
      if (!name) {
        alert("Subcategory name is required.");
        setSaving(false);
        return;
      }

      const rawSlug = (editing.slug || name).trim().toLowerCase();
      const slug = rawSlug.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const payload: any = {
        category_id: categoryId,
        name: name,
        slug: slug || "subcategory",
        image_url: (editing.image_url || "").trim() || null,
        description: (editing.description || "").trim(),
        gallery_images: Array.isArray(editing.gallery_images) ? editing.gallery_images : [],
      };

      let error: any = null;
      let data: any = null;

      if (editing.id) {
        const res = await supabase.from("subcategories").update(payload).eq("id", editing.id).select();
        error = res.error;
        data = res.data;
      } else {
        const res = await supabase.from("subcategories").insert(payload).select();
        error = res.error;
        data = res.data;
      }

      if (error) {
        // If gallery_images column is missing in Supabase
        if (error.message?.includes("gallery_images") || error.details?.includes("gallery_images")) {
          setMigrationWarning("Note: Supabase table 'subcategories' is missing the 'gallery_images' column. Run the SQL script in your Supabase SQL editor: ALTER TABLE subcategories ADD COLUMN IF NOT EXISTS gallery_images jsonb DEFAULT '[]'::jsonb;");
          // Fallback: save without gallery_images so user doesn't lose other fields
          delete payload.gallery_images;
          if (editing.id) {
            await supabase.from("subcategories").update(payload).eq("id", editing.id).select();
          } else {
            await supabase.from("subcategories").insert(payload).select();
          }
        } else {
          alert("Failed to save subcategory: " + error.message);
          setSaving(false);
          return;
        }
      } else if (!data || data.length === 0) {
        alert("Warning: No changes were saved. Your login session may have expired or permission was denied. Please refresh and log in again.");
        setSaving(false);
        return;
      }

      setEditing(null);
      load();
    } catch (err: any) {
      console.error("Error saving subcategory:", err);
      alert("Error saving subcategory: " + (err.message || String(err)));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id || !confirm("Delete this subcategory and all its products?")) return;
    await supabase.from("subcategories").delete().eq("id", id);
    load();
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Subcategories</h1>
          <p className="text-sm text-muted-foreground">
            Manage subcategory details, multiple showcase images, and nested product items.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Link to="/admin/categories" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto">← Back to Categories</Button>
          </Link>
          <Button
            className="flex-1 sm:flex-none"
            onClick={() => {
              setEditing({
                name: "",
                slug: "",
                image_url: "",
                description: "",
                gallery_images: [],
              });
            }}
          >
            + Add Subcategory
          </Button>
        </div>
      </div>

      {migrationWarning && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3 text-amber-700 dark:text-amber-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Supabase Column Setup Needed</p>
            <p>{migrationWarning}</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto w-full border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="w-16">Image</TableCell>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Showcase Images</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.map((subcategory) => (
              <TableRow key={subcategory.id}>
                <TableCell>
                  {subcategory.image_url ? (
                    <ImageWithFallback
                      src={subcategory.image_url}
                      alt={subcategory.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      No img
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{subcategory.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm font-mono">{subcategory.slug}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Images className="w-3.5 h-3.5" />
                    {subcategory.gallery_images?.length || (subcategory.image_url ? 1 : 0)} images
                  </span>
                </TableCell>
                <TableCell>
                  {subcategory.productCount && subcategory.productCount > 0 ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {subcategory.productCount} products
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      Showcase Only
                    </span>
                  )}
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                  {subcategory.description || "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setEditing({
                          ...subcategory,
                          name: subcategory.name || "",
                          slug: subcategory.slug || "",
                          description: subcategory.description || "",
                          image_url: subcategory.image_url || "",
                          gallery_images: Array.isArray(subcategory.gallery_images)
                            ? subcategory.gallery_images
                            : [],
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Link to={`/admin/categories/${categoryId}/subcategories/${subcategory.id}/products`}>
                      <Button size="sm" variant="secondary">
                        Products ({subcategory.productCount ?? 0})
                      </Button>
                    </Link>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(subcategory.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {subcategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No subcategories found. Click "+ Add Subcategory" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editing && (
        <div className="border rounded-xl p-6 max-w-full md:max-w-2xl bg-card shadow-lg space-y-5">
          <div className="border-b pb-3">
            <h3 className="text-lg font-semibold">{editing.id ? "Edit" : "New"} Subcategory</h3>
            <p className="text-xs text-muted-foreground">
              Add subcategory info and upload multiple images to showcase when there are no individual products.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Subcategory Name *</label>
              <Input
                placeholder="e.g. Belt Dryer, Space Heater"
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">URL Slug</label>
              <Input
                placeholder="e.g. belt-dryer"
                value={editing.slug || ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Description & Technical Overview</label>
              <Textarea
                rows={4}
                placeholder="Detailed description of this subcategory, heating application, features, and custom specifications..."
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              />
            </div>

            {/* Primary Image */}
            <div className="space-y-2 border-t pt-4">
              <label className="text-sm font-medium block">Primary Featured Image</label>
              <div className="flex items-center gap-4">
                {editing.image_url ? (
                  <div className="relative group">
                    <ImageWithFallback
                      src={editing.image_url}
                      alt={editing.name || "Preview"}
                      className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                    />
                    <div className="absolute top-1 right-1 bg-black/60 rounded px-1.5 py-0.5 text-[10px] text-white font-medium">
                      Primary
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground border">
                    No image
                  </div>
                )}

                <div className="space-y-2 flex-1">
                  <Input
                    placeholder="Or paste primary image URL"
                    value={editing.image_url || ""}
                    onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  />
                  <div>
                    <input
                      type="file"
                      id="sub-primary-upload"
                      className="hidden"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    />
                    <label
                      htmlFor="sub-primary-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? "Uploading..." : "Upload Primary Image"}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase / Multiple Gallery Images */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Images className="w-4 h-4 text-primary" />
                    Subcategory Showcase Images ({editing.gallery_images?.length || 0})
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Upload multiple images of this subcategory. These will be showcased on the subcategory page!
                  </p>
                </div>
              </div>

              {/* Gallery Grid */}
              {editing.gallery_images && editing.gallery_images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-muted/30 p-3 rounded-lg border">
                  {editing.gallery_images.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border bg-background shadow-sm">
                      <div className="aspect-square">
                        <ImageWithFallback
                          src={imgUrl}
                          alt={`Showcase ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                        <button
                          type="button"
                          onClick={() => handleSetAsPrimary(imgUrl)}
                          className="px-2 py-1 bg-primary text-primary-foreground text-[10px] font-semibold rounded flex items-center gap-1 hover:brightness-110"
                          title="Set as featured main image"
                        >
                          <Star className="w-3 h-3" />
                          Set Primary
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {editing.image_url === imgUrl && (
                        <div className="absolute top-1 left-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 border border-dashed rounded-lg text-center text-xs text-muted-foreground bg-muted/20">
                  No showcase images uploaded yet. Upload images below to show them on this subcategory's page.
                </div>
              )}

              {/* Upload Multiple Images */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="file"
                    id="sub-gallery-upload"
                    multiple
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => e.target.files && e.target.files.length > 0 && handleGalleryUpload(e.target.files)}
                    className="hidden"
                  />
                  <label
                    htmlFor="sub-gallery-upload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-semibold border-2 border-primary/40 border-dashed bg-primary/5 hover:bg-primary/10 text-primary h-10 px-4 py-2 transition-colors flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? "Uploading Multiple Images..." : "+ Upload Multiple Showcase Images"}
                  </label>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Or paste an image URL to add to showcase..."
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddGalleryUrl();
                      }
                    }}
                  />
                  <Button type="button" variant="secondary" onClick={handleAddGalleryUrl}>
                    <Plus className="w-4 h-4 mr-1" /> Add URL
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button
              onClick={handleSave}
              disabled={saving || uploading}
              className="flex-1 sm:flex-none font-semibold"
            >
              {saving ? "Saving Subcategory..." : "Save Subcategory"}
            </Button>
            <Button
              variant="outline"
              disabled={saving}
              onClick={() => setEditing(null)}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
