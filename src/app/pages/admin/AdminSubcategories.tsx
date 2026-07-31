import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Upload } from "lucide-react";

type Subcategory = {
  id?: string;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  category_id?: string;
};

export function AdminSubcategories() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [editing, setEditing] = useState<Subcategory | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    if (!categoryId) return;
    supabase
      .from("subcategories")
      .select("*")
      .eq("category_id", categoryId)
      .order("sort_order")
      .then(({ data }) => setSubcategories((data ?? []) as Subcategory[]));
  };

  useEffect(() => {
    load();
  }, [categoryId]);

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

  async function handleSave() {
    if (!editing || !categoryId) return;

    const payload = {
      category_id: categoryId,
      name: editing.name.trim(),
      slug: (editing.slug || editing.name).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      image_url: editing.image_url || null,
      description: editing.description.trim(),
    };

    if (editing.id) {
      await supabase.from("subcategories").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("subcategories").insert(payload);
    }

    setEditing(null);
    load();
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
          <p className="text-sm text-muted-foreground">Manage subcategories for this category and open the product editor.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Link to="/admin/categories" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto">← Back to Categories</Button>
          </Link>
          <Button className="flex-1 sm:flex-none" onClick={() => setEditing({ name: "", slug: "", image_url: "", description: "" })}>+ Add Subcategory</Button>
        </div>
      </div>

      <div className="overflow-x-auto w-full border rounded-md">
        <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategories.map((subcategory) => (
            <TableRow key={subcategory.id}>
              <TableCell>
                {subcategory.image_url ? (
                  <ImageWithFallback src={subcategory.image_url} alt={subcategory.name} className="w-12 h-12 object-cover rounded" />
                ) : (
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">No img</div>
                )}
              </TableCell>
              <TableCell>{subcategory.name}</TableCell>
              <TableCell>{subcategory.slug}</TableCell>
              <TableCell className="max-w-xs truncate">{subcategory.description}</TableCell>
              <TableCell className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(subcategory)}>Edit</Button>
                <Link to={`/admin/categories/${categoryId}/subcategories/${subcategory.id}/products`}>
                  <Button size="sm" variant="secondary">Products</Button>
                </Link>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(subcategory.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

      {editing && (
        <div className="border rounded-lg p-4 max-w-full md:max-w-xl space-y-4">
          <h3 className="font-medium">{editing.id ? "Edit" : "New"} Subcategory</h3>
          <Input placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          <Input placeholder="Slug" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          <Textarea placeholder="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Image</label>
            {editing.image_url ? (
              <ImageWithFallback src={editing.image_url} alt={editing.name || "Subcategory preview"} className="w-24 h-24 object-cover rounded border" />
            ) : (
              <div className="w-24 h-24 rounded bg-muted flex items-center justify-center text-sm text-muted-foreground border">No image</div>
            )}
            <div>
              <input type="file" id="sub-image-upload" className="hidden" accept="image/*" disabled={uploading} onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
              <label htmlFor="sub-image-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-2">
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Choose Image"}
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1 sm:flex-none">Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)} className="flex-1 sm:flex-none">Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
