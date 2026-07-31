import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import { categoryProducts } from "../data/categoryProducts";

// add to src/app/lib/useCategories.ts
export function useSubcategoryProductCounts(subSlugs: string[]) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subSlugs.length) { setLoading(false); return; }
    (async () => {
      const { data } = await supabase
        .from("subcategories")
        .select("slug, products(count)")
        .in("slug", subSlugs);

      const map: Record<string, number> = {};
      (data ?? []).forEach((row: any) => {
        map[row.slug] = row.products?.[0]?.count ?? 0;
      });
      setCounts(map);
      setLoading(false);
    })();
  }, [subSlugs.join(",")]);

  return { counts, loading };
}

export function useSubcategoriesWithCounts(parentSlug?: string) {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!parentSlug) return;
    (async () => {
      const { data: parent } = await supabase.from("categories").select("id").eq("slug", parentSlug).single();
      if (!parent) { setLoading(false); return; }
      const { data } = await supabase
        .from("subcategories")
        .select("id, slug, name, image_url, description, products(count)")
        .eq("category_id", parent.id)
        .order("sort_order");
      setSubcategories((data ?? []).map((s: any) => {
        const fallbackImage = categoryProducts[s.slug]?.[0]?.image || null;
        return {
          ...s,
          image_url: getValidImageUrl(s.image_url, fallbackImage),
          productCount: s.products?.[0]?.count ?? 0,
        };
      }));
      setLoading(false);
    })();
  }, [parentSlug]);

  return { subcategories, loading };
}

import {
  customizedHeater,
  controlPanel,
  dTypeHeater,
  openWire,
  standardHeater,
  cartridgeHeater,
} from "../data/categoryProducts";

function getCategoryFallbackImage(slug: string) {
  if (!slug) return null;
  const s = slug.toLowerCase();
  if (s.includes('customized')) return customizedHeater;
  if (s.includes('control')) return controlPanel;
  if (s.includes('d-type')) return dTypeHeater;
  if (s.includes('open-wire') || s.includes('open wire')) return openWire;
  if (s.includes('std') || s.includes('standard')) return standardHeater;
  if (s.includes('cartridge')) return cartridgeHeater;
  return null;
}

function getValidImageUrl(dbUrl: string | null | undefined, fallback: string | null) {
  if (!dbUrl) return fallback;
  // If the database URL is a raw local path inserted by mistake during migration
  if (dbUrl.includes("imports/") || dbUrl.startsWith(".") || dbUrl.startsWith("/src/")) {
    return fallback;
  }
  return dbUrl;
}

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*, category_specs(value, sort_order)")
      .order("sort_order")
      .then(({ data, error }) => {
        if (!error && data) {
          setCategories(data.map((c: any) => ({
            ...c,
            id: c.slug, // keep the slug as `.id` so existing routing/equality checks still work
            image: getValidImageUrl(c.image_url, getCategoryFallbackImage(c.slug)),
            category: c.category_label,
            shortDescription: c.short_description,
            specs: (c.category_specs ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((s: any) => s.value),
          })));
        }
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

export function useCategoryBySlug(slug?: string) {
  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data: cat } = await supabase.from("categories").select("*").eq("slug", slug).single();
      if (!cat) { setLoading(false); return; }

      const [{ data: specs }, { data: specifications }, { data: features }, { data: applications }] =
        await Promise.all([
          supabase.from("category_specs").select("*").eq("category_id", cat.id).order("sort_order"),
          supabase.from("category_specifications").select("*").eq("category_id", cat.id).order("sort_order"),
          supabase.from("category_features").select("*").eq("category_id", cat.id).order("sort_order"),
          supabase.from("category_applications").select("*").eq("category_id", cat.id).order("sort_order"),
        ]);

      setCategory({
        ...cat,
        id: cat.slug, // same reasoning as above
        image: getValidImageUrl(cat.image_url, getCategoryFallbackImage(cat.slug)),
        category: cat.category_label,
        specs: (specs ?? []).map((s: any) => s.value),
        specifications: specifications ?? [], // already {label, value} — no JSX change needed
        features: (features ?? []).map((f: any) => f.value),
        applications: (applications ?? []).map((a: any) => a.value),
      });
      setLoading(false);
    })();
  }, [slug]);

  return { category, loading };
}

export function useSubcategoryProducts(categorySlug?: string, subSlug?: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug || !subSlug) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    (async () => {
      const { data: cat } = await supabase.from("categories").select("id").eq("slug", categorySlug).single();
      if (!cat) {
        if (isMounted) {
          setProducts([]);
          setLoading(false);
        }
        return;
      }

      const { data: sub } = await supabase
        .from("subcategories")
        .select("id")
        .eq("category_id", cat.id)
        .eq("slug", subSlug)
        .single();

      if (!sub) {
        if (isMounted) {
          setProducts([]);
          setLoading(false);
        }
        return;
      }

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("subcategory_id", sub.id)
        .order("sort_order");

      if (isMounted) {
        setProducts((data ?? []).map((product: any, index: number) => {
          const localProducts = categoryProducts[subSlug] || [];
          // Try to match by name first, otherwise fallback to index, then null
          const localMatch = localProducts.find(p => p.name.trim().toLowerCase() === product.name.trim().toLowerCase()) 
                          || localProducts[index];
          const fallbackImage = localMatch ? localMatch.image : null;

          return {
            ...product,
            image: getValidImageUrl(product.image_url, fallbackImage),
          };
        }));
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [categorySlug, subSlug]);

  return { products, loading };
}