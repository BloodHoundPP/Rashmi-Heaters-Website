import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Upload } from "lucide-react";

type SpecRow = { label?: string; value: string };

export function AdminCategoryForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [specs, setSpecs] = useState<SpecRow[]>([{ value: "" }]);
  const [specifications, setSpecifications] = useState<SpecRow[]>([{ label: "", value: "" }]);
  const [features, setFeatures] = useState<SpecRow[]>([{ value: "" }]);
  const [applications, setApplications] = useState<SpecRow[]>([{ value: "" }]);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data: cat } = await supabase.from("categories").select("*").eq("id", id).single();
      if (!cat) return;
      setName(cat.name); setSlug(cat.slug); setCategoryLabel(cat.category_label ?? "");
      setDescription(cat.description ?? ""); setShortDescription(cat.short_description ?? "");
      setImageUrl(cat.image_url ?? "");

      const [{ data: s }, { data: sp }, { data: f }, { data: a }] = await Promise.all([
        supabase.from("category_specs").select("*").eq("category_id", id).order("sort_order"),
        supabase.from("category_specifications").select("*").eq("category_id", id).order("sort_order"),
        supabase.from("category_features").select("*").eq("category_id", id).order("sort_order"),
        supabase.from("category_applications").select("*").eq("category_id", id).order("sort_order"),
      ]);
      if (s?.length) setSpecs(s.map((x) => ({ value: x.value })));
      if (sp?.length) setSpecifications(sp.map((x) => ({ label: x.label, value: x.value })));
      if (f?.length) setFeatures(f.map((x) => ({ value: x.value })));
      if (a?.length) setApplications(a.map((x) => ({ value: x.value })));
    })();
  }, [id]);

  async function handleImageUpload(file: File) {
    setUploading(true);
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
    }
    setUploading(false);
  }

  async function handleSave() {
    const payload = {
      name, slug, category_label: categoryLabel,
      description, short_description: shortDescription, image_url: imageUrl,
    };

    let categoryId = id;
    if (isEdit) {
      await supabase.from("categories").update(payload).eq("id", id);
    } else {
      const { data } = await supabase.from("categories").insert(payload).select().single();
      categoryId = data?.id;
    }
    if (!categoryId) return;

    // wipe and re-insert child rows (simplest correct approach for a small admin panel)
    await Promise.all([
      supabase.from("category_specs").delete().eq("category_id", categoryId),
      supabase.from("category_specifications").delete().eq("category_id", categoryId),
      supabase.from("category_features").delete().eq("category_id", categoryId),
      supabase.from("category_applications").delete().eq("category_id", categoryId),
    ]);

    await Promise.all([
      supabase.from("category_specs").insert(
        specs.filter(s => s.value).map((s, i) => ({ category_id: categoryId, value: s.value, sort_order: i }))
      ),
      supabase.from("category_specifications").insert(
        specifications.filter(s => s.value).map((s, i) => ({ category_id: categoryId, label: s.label, value: s.value, sort_order: i }))
      ),
      supabase.from("category_features").insert(
        features.filter(s => s.value).map((s, i) => ({ category_id: categoryId, value: s.value, sort_order: i }))
      ),
      supabase.from("category_applications").insert(
        applications.filter(s => s.value).map((s, i) => ({ category_id: categoryId, value: s.value, sort_order: i }))
      ),
    ]);

    navigate("/admin/categories");
  }

  // Small reusable dynamic-list editor for specs/features/applications
  function DynamicList({ rows, setRows, withLabel }: { rows: SpecRow[]; setRows: (r: SpecRow[]) => void; withLabel?: boolean }) {
    return (
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2">
            {withLabel && (
              <Input placeholder="Label" value={row.label ?? ""}
                onChange={(e) => setRows(rows.map((r, j) => j === i ? { ...r, label: e.target.value } : r))} />
            )}
            <Input placeholder="Value" value={row.value}
              onChange={(e) => setRows(rows.map((r, j) => j === i ? { ...r, value: e.target.value } : r))} />
            <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setRows(rows.filter((_, j) => j !== i))}>✕</Button>
          </div>
        ))}
        <Button type="button" size="sm" variant="secondary"
          onClick={() => setRows([...rows, withLabel ? { label: "", value: "" } : { value: "" }])}>
          + Add
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-full md:max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">{isEdit ? "Edit" : "New"} Category</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><label className="text-sm font-medium">Slug (URL)</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} /></div>
        <div><label className="text-sm font-medium">Category Label</label>
          <Input value={categoryLabel} onChange={(e) => setCategoryLabel(e.target.value)} /></div>
      </div>

      <div><label className="text-sm font-medium">Short Description</label>
        <Textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} /></div>
      <div><label className="text-sm font-medium">Full Description</label>
        <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} /></div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Image</label>
        {imageUrl ? (
          <img src={imageUrl} className="w-32 h-32 object-cover rounded border" />
        ) : (
          <div className="w-32 h-32 rounded bg-muted flex items-center justify-center text-sm text-muted-foreground border">No image</div>
        )}
        <div>
          <input type="file" id="cat-image-upload" className="hidden" accept="image/*" disabled={uploading}
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
          <label htmlFor="cat-image-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-2">
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Choose Image"}
          </label>
        </div>
      </div>

      <div><h3 className="font-medium mb-2">Quick Specs (card chips)</h3>
        <DynamicList rows={specs} setRows={setSpecs} /></div>
      <div><h3 className="font-medium mb-2">Detailed Specifications (label + value)</h3>
        <DynamicList rows={specifications} setRows={setSpecifications} withLabel /></div>
      <div><h3 className="font-medium mb-2">Features</h3>
        <DynamicList rows={features} setRows={setFeatures} /></div>
      <div><h3 className="font-medium mb-2">Applications</h3>
        <DynamicList rows={applications} setRows={setApplications} /></div>

      <Button onClick={handleSave}>{isEdit ? "Save Changes" : "Create Category"}</Button>
    </div>
  );
}