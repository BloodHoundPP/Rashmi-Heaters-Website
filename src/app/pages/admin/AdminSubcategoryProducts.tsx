import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

type Product = { id?: string; name: string; image_url: string; description: string; subcategory_id?: string; sort_order?: number; category_label?: string };

export function AdminSubcategoryProducts() {
  const { categoryId, subId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    if (!subId) return;
    supabase.from("products").select("*").eq("subcategory_id", subId).order("sort_order")
      .then(({ data }) => setProducts((data ?? []) as Product[]));
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

  async function handleSave() {
    if (!editing || !subId) return;

    const payload = {
      subcategory_id: subId,
      name: editing.name.trim(),
      image_url: editing.image_url || null,
      description: editing.description.trim(),
      category_label: editing.category_label ?? null,
      sort_order: editing.sort_order ?? 0,
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products in this Subcategory</h1>
        <Button onClick={() => setEditing({ name: "", image_url: "", description: "" })}>+ Add Product</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
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
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id!)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editing && (
        <div className="border rounded-lg p-4 max-w-md space-y-3">
          <h3 className="font-medium">{editing.id ? "Edit" : "New"} Product</h3>
          <Input placeholder="Name" value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          <Textarea placeholder="Description" value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          {editing.image_url ? (
            <ImageWithFallback src={editing.image_url} alt={editing.name || "Product preview"} className="w-24 h-24 object-cover rounded" />
          ) : (
            <div className="w-24 h-24 rounded bg-muted flex items-center justify-center text-sm text-muted-foreground">No image</div>
          )}
          <input type="file" accept="image/*" disabled={uploading}
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}