import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Upload, X, Plus, Images } from "lucide-react";

type Product = {
  id?: string;
  name: string;
  image_url: string;
  description: string;
  subcategory_id?: string;
  sort_order?: number;
  category_label?: string;
  gallery_images?: string[];
};

export function AdminSubcategoryProducts() {
  const { categoryId, subId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const load = () => {
    if (!subId) return;
    supabase.from("products").select("*").eq("subcategory_id", subId).order("sort_order")
      .then(({ data }) => setProducts((data ?? []).map((p: any) => ({
        ...p,
        gallery_images: Array.isArray(p.gallery_images)
          ? p.gallery_images
          : (typeof p.gallery_images === "string" ? JSON.parse(p.gallery_images || "[]") : []),
      })) as Product[]));
  };

  useEffect(() => { load(); }, [subId]);

  async function handleImageUpload(file: File) {
    setUploading(true);
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (!error && editing) {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setEditing({ ...editing, image_url: data.publicUrl });
    }
    setUploading(false);
  }

  async function handleGalleryUpload(files: FileList) {
    if (!editing) return;
    setUploading(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = `gallery-${Date.now()}-${i}-${file.name}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }
    }

    if (newUrls.length > 0) {
      const currentGallery = editing.gallery_images || [];
      setEditing({ ...editing, gallery_images: [...currentGallery, ...newUrls] });
    }
    setUploading(false);
  }

  function handleAddGalleryUrl() {
    if (!newGalleryUrl.trim() || !editing) return;
    const currentGallery = editing.gallery_images || [];
    setEditing({ ...editing, gallery_images: [...currentGallery, newGalleryUrl.trim()] });
    setNewGalleryUrl("");
  }

  function handleRemoveGalleryImage(index: number) {
    if (!editing) return;
    const currentGallery = editing.gallery_images || [];
    setEditing({
      ...editing,
      gallery_images: currentGallery.filter((_, i) => i !== index),
    });
  }

  async function handleSave() {
    if (!editing || !subId) return;

    const payload = {
      subcategory_id: subId,
      name: editing.name.trim(),
      image_url: editing.image_url || null,
      description: editing.description.trim(),
      category_label: editing.category_label ?? null,
      sort_order: editing.sort_order ?? 0,
      gallery_images: editing.gallery_images ?? [],
    };

    if (editing.id) {
      await supabase.from("products").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("products").insert(payload);
    }
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    load();
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products in this Subcategory</h1>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Link to={`/admin/categories/${categoryId}/subcategories`} className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto">← Back to Subcategories</Button>
          </Link>
          <Button className="flex-1 sm:flex-none" onClick={() => setEditing({ name: "", image_url: "", description: "", gallery_images: [] })}>+ Add Product</Button>
        </div>
      </div>

      <div className="overflow-x-auto w-full border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Gallery Photos</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {p.image_url ? (
                    <ImageWithFallback src={p.image_url} alt={p.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">No img</div>
                  )}
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell className="max-w-xs truncate">{p.description}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    <Images size={14} />
                    {p.gallery_images?.length || 0} images
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id!)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editing && (
        <div className="border rounded-lg p-6 max-w-full md:max-w-2xl space-y-6 bg-card">
          <h3 className="font-semibold text-lg">{editing.id ? "Edit" : "New"} Product</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Name</label>
            <Input placeholder="Product Name" value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Description" value={editing.description} rows={3}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Main Featured Image</label>
            <div className="flex items-center gap-4">
              {editing.image_url ? (
                <ImageWithFallback src={editing.image_url} alt={editing.name || "Product preview"} className="w-24 h-24 object-contain rounded border p-1 bg-secondary/30" />
              ) : (
                <div className="w-24 h-24 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground border">No image</div>
              )}
              <div className="space-y-2 flex-1">
                <input type="file" id="prod-image-upload" className="hidden" accept="image/*" disabled={uploading}
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                <label htmlFor="prod-image-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload Main Image"}
                </label>
                <Input placeholder="Or paste image URL" value={editing.image_url || ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Product Gallery Section */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Images size={16} className="text-primary" />
                Product Gallery Images ({editing.gallery_images?.length || 0})
              </label>
              <span className="text-xs text-muted-foreground">Multiple photos shown on Product Details page</span>
            </div>

            {/* Gallery Thumbnails List */}
            {editing.gallery_images && editing.gallery_images.length > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
                {editing.gallery_images.map((imgUrl, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-md overflow-hidden border bg-background p-1">
                    <ImageWithFallback src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic bg-secondary/10 p-3 rounded border text-center">
                No gallery images added yet. Click upload or add image URLs below.
              </p>
            )}

            {/* Add Gallery Photos Controls */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="file"
                id="gallery-multi-upload"
                className="hidden"
                accept="image/*"
                multiple
                disabled={uploading}
                onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
              />
              <label
                htmlFor="gallery-multi-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary/40 bg-primary/10 text-primary shadow-sm hover:bg-primary/20 h-9 px-4 py-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Gallery Photos"}
              </label>

              <div className="flex gap-2 flex-1">
                <Input
                  placeholder="Paste Image URL"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddGalleryUrl())}
                />
                <Button type="button" variant="secondary" size="sm" onClick={handleAddGalleryUrl}>
                  <Plus size={16} className="mr-1" /> Add URL
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            <Button onClick={handleSave} className="flex-1 sm:flex-none">Save Product</Button>
            <Button variant="outline" onClick={() => setEditing(null)} className="flex-1 sm:flex-none">Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}