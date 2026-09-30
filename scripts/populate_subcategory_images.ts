// scripts/populate_subcategory_images.ts
// Run with: node --env-file=.env.migration scripts/populate_subcategory_images.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAndVerify() {
  console.log("Checking subcategories table...");
  const { data, error } = await supabase.from("subcategories").select("*").limit(1);
  if (error) {
    console.error("Error fetching subcategories:", error);
    return;
  }
  console.log("Subcategories columns:", Object.keys(data?.[0] || {}));
  if (data?.[0] && "gallery_images" in data[0]) {
    console.log("✔ gallery_images column is active on subcategories!");
  } else {
    console.log("ℹ gallery_images column not detected yet. Please run scripts/add_subcategory_gallery_images.sql in Supabase SQL Editor.");
  }
}

checkAndVerify();
