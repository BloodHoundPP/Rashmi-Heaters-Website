import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function AdminDashboard() {
  const [counts, setCounts] = useState({ categories: 0, subcategories: 0, products: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: c }, { count: s }, { count: p }] = await Promise.all([
        supabase.from("categories").select("*", { count: "exact", head: true }),
        supabase.from("subcategories").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
      ]);
      setCounts({ categories: c ?? 0, subcategories: s ?? 0, products: p ?? 0 });
    })();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        <Card><CardHeader><CardTitle className="text-sm text-muted-foreground">Categories</CardTitle></CardHeader>
          <CardContent className="text-3xl font-semibold">{counts.categories}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm text-muted-foreground">Subcategories</CardTitle></CardHeader>
          <CardContent className="text-3xl font-semibold">{counts.subcategories}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm text-muted-foreground">Products</CardTitle></CardHeader>
          <CardContent className="text-3xl font-semibold">{counts.products}</CardContent></Card>
      </div>
      <Link to="/admin/categories" className="text-sm underline text-primary">Manage Categories →</Link>
    </div>
  );
}