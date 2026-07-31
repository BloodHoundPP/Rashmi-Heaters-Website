import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  const load = () =>
    supabase.from("categories").select("*").order("sort_order").then(({ data }) => setCategories(data ?? []));

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this category and all its products/subcategories?")) return;
    await supabase.from("categories").delete().eq("id", id);
    load();
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Link to="/admin/categories/new"><Button>+ New Category</Button></Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Has Subcategories</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((c) => (
            <TableRow key={c.id}>
              <TableCell><img src={c.image_url} className="w-12 h-12 object-cover rounded" /></TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.slug}</TableCell>
              <TableCell>{c.has_subcategories ? "Yes" : "No"}</TableCell>
              <TableCell className="flex flex-wrap gap-2">
                <Link to={`/admin/categories/${c.id}/edit`}><Button size="sm" variant="outline">Edit</Button></Link>
                <Link to={`/admin/categories/${c.id}/subcategories`}><Button size="sm" variant="secondary">Subcategories</Button></Link>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}