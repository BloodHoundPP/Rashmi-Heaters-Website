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
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Link to="/admin/categories/new"><Button>+ New Category</Button></Link>
      </div>
      <div className="overflow-x-auto w-full border rounded-md">
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
                <TableCell>
                  {c.image_url ? <img src={c.image_url} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs">No img</div>}
                </TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.slug}</TableCell>
                <TableCell>{c.has_subcategories ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/admin/categories/${c.id}/edit`}><Button size="sm" variant="outline">Edit</Button></Link>
                    <Link to={`/admin/categories/${c.id}/subcategories`}><Button size="sm" variant="secondary">Subcategories</Button></Link>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}