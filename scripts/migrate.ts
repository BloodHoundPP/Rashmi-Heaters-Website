// scripts/migrate.ts  (run once with: npx tsx scripts/migrate.ts)

import dotenv from "dotenv";
dotenv.config({ path: ".env.migration" });

import { createClient } from "@supabase/supabase-js";
import { productsData } from "../src/app/data/products";
import { categoryProducts } from "../src/app/data/categoryProducts";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service_role, NOT anon — local script only, never shipped
);

// Explicit parent → subcategory-key mapping, taken directly from the
// section comments in categoryProducts.ts
const subcategoryToParent: Record<string, string> = {
  "air-heaters": "customized-heaters",
  "aluminium-casted-heaters": "customized-heaters",
  "aluminium-extrusion-press": "customized-heaters",
  "automotive-foundry": "customized-heaters",
  "belt-dryer": "customized-heaters",
  "biogas-generation": "customized-heaters",
  "cip-chemical-heating": "customized-heaters",
  "copper-annealing": "customized-heaters",
  "esp-heaters": "customized-heaters",
  "hnx-nitrogen-heaters": "customized-heaters",
  "load-bank": "customized-heaters",
  "lpg-propane-evaporators": "customized-heaters",
  "oil-heaters": "customized-heaters",
  "packaging-machine-tunnel": "customized-heaters",
  "panel-heaters": "customized-heaters",
  "reactor-heater": "customized-heaters",
  "space-heaters": "customized-heaters",
  "steam-heaters": "customized-heaters",
  "syngas-heaters": "customized-heaters",
  "water-heaters": "customized-heaters",
  "d-type-standard": "d-type-heaters",
  "control-panel-on-off": "control-panel",
  "control-panel-thyristorised": "control-panel",
  "std-u-shaped-air": "std-heaters",
  "std-industrial-water": "std-heaters",
  "std-oil-heating": "std-heaters",
  "std-solar": "std-heaters",
  "std-alkaline": "std-heaters",
  "std-chemical": "std-heaters",
  "std-fin": "std-heaters",
  "cartridge-threaded": "cartridge-heaters",
  "cartridge-flameproof": "cartridge-heaters",
  "cartridge-high-density": "cartridge-heaters",
  "cartridge-low-density": "cartridge-heaters",
  "open-wire-furnace": "open-wire",
  "open-wire-bundle-rod": "open-wire",
  "open-wire-stripe": "open-wire",
  "open-wire-bionet": "open-wire",
};

// Human-readable names for subcategories (matches categoryNames in HeaterCategory.tsx)
const subcategoryNames: Record<string, string> = {
  "air-heaters": "Air Heaters",
  "aluminium-casted-heaters": "Aluminium Casted Heaters",
  "aluminium-extrusion-press": "Aluminium Extrusion Press",
  "automotive-foundry": "Automotive Foundry",
  "belt-dryer": "Belt Dryer",
  "biogas-generation": "Bio Gas Generation",
  "cip-chemical-heating": "CIP Chemical Heating",
  "copper-annealing": "Copper Annealing & Enamelling",
  "esp-heaters": "ESP Heaters",
  "hnx-nitrogen-heaters": "HNX Heaters & Nitrogen",
  "load-bank": "Load Bank for Battery & UPS Testing",
  "lpg-propane-evaporators": "LPG & Propane Gas Evaporators",
  "oil-heaters": "Oil Heaters",
  "packaging-machine-tunnel": "Packaging Machine Tunnel Packing",
  "panel-heaters": "Panel Heaters",
  "reactor-heater": "Reactor Heater",
  "space-heaters": "Space Heater",
  "steam-heaters": "Steam Heater",
  "syngas-heaters": "Syngas Heater",
  "water-heaters": "Water Heater",
  "d-type-standard": "D-Type Standard",
  "control-panel-on-off": "On/Off Control Panel",
  "control-panel-thyristorised": "Thyristorised Control Panel",
  "std-u-shaped-air": "U-Shaped Air Heater",
  "std-industrial-water": "Industrial Water Heater",
  "std-oil-heating": "Oil Heating",
  "std-solar": "Solar",
  "std-alkaline": "Alkaline",
  "std-chemical": "Chemical",
  "std-fin": "Fin Heater",
  "cartridge-threaded": "Threaded Cartridge",
  "cartridge-flameproof": "Flameproof Cartridge",
  "cartridge-high-density": "High Density Cartridge",
  "cartridge-low-density": "Low Density Cartridge",
  "open-wire-furnace": "Furnace Open Wire",
  "open-wire-bundle-rod": "Bundle Rod Open Wire",
  "open-wire-stripe": "Stripe Open Wire",
  "open-wire-bionet": "Bionet Open Wire",
};

async function run() {
  // STEP 1 + 2: top-level categories + their specs/features/applications
  const categoryIdBySlug: Record<string, string> = {};

  for (const p of productsData) {
    const { data: cat, error } = await supabase.from("categories").insert({
      slug: p.id,
      name: p.name,
      category_label: p.category,
      type: p.type,
      application: p.application,
      wattage: p.wattage,
      image_url: p.image, // replace with your uploaded Supabase Storage URL, see note below
      description: p.description,
      short_description: p.shortDescription,
      has_subcategories: !!categoryProducts[p.id] || Object.values(subcategoryToParent).includes(p.id),
    }).select().single();

    if (error || !cat) { console.error("Category insert failed:", p.id, error); continue; }
    categoryIdBySlug[p.id] = cat.id;

    if (p.specs?.length) await supabase.from("category_specs").insert(
      p.specs.map((v: string, i: number) => ({ category_id: cat.id, value: v, sort_order: i }))
    );
    if (p.specifications?.length) await supabase.from("category_specifications").insert(
      p.specifications.map((s: any, i: number) => ({ category_id: cat.id, label: s.label, value: s.value, sort_order: i }))
    );
    if (p.features?.length) await supabase.from("category_features").insert(
      p.features.map((v: string, i: number) => ({ category_id: cat.id, value: v, sort_order: i }))
    );
    if (p.applications?.length) await supabase.from("category_applications").insert(
      p.applications.map((v: string, i: number) => ({ category_id: cat.id, value: v, sort_order: i }))
    );

    console.log(`✔ Category migrated: ${p.id}`);
  }

  // STEP 3 + 4: subcategories + their product items
  for (const [subSlug, items] of Object.entries(categoryProducts)) {
    const parentSlug = subcategoryToParent[subSlug];
    if (!parentSlug) {
      // e.g. "customized-heaters": [] itself — it's the parent landing page, not a real subcategory, skip it
      continue;
    }
    const parentCategoryId = categoryIdBySlug[parentSlug];
    if (!parentCategoryId) { console.warn(`No parent category found for ${subSlug}, skipping`); continue; }

    const firstItem = items[0] as any | undefined;
    const { data: sub, error } = await supabase.from("subcategories").insert({
      category_id: parentCategoryId,
      slug: subSlug,
      name: subcategoryNames[subSlug] ?? subSlug,
      image_url: firstItem?.image ?? null,
      description: firstItem?.description ?? null,
    }).select().single();

    if (error || !sub) { console.error("Subcategory insert failed:", subSlug, error); continue; }

    if (items.length) {
      await supabase.from("products").insert(
        items.map((item: any, i: number) => ({
          subcategory_id: sub.id,
          name: item.name,
          image_url: item.image,
          description: item.description,
          category_label: item.category,
          sort_order: i,
        }))
      );
    }

    console.log(`✔ Subcategory migrated: ${subSlug} (${items.length} products)`);
  }

  console.log("Migration complete.");
}

run();