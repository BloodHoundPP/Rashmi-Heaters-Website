import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useSubcategoryProducts } from "../lib/useCategories";

const categoryNames: Record<string, string> = {
  "air-heaters":               "Air Heaters",
  "aluminium-casted-heaters":  "Aluminium Casted Heaters",
  "aluminium-extrusion-press": "Aluminium Extrusion Press",
  "automotive-foundry":        "Automotive Foundry",
  "belt-dryer":                "Belt Dryer",
  "biogas-generation":         "Bio Gas Generation",
  "cip-chemical-heating":      "CIP Chemical Heating",
  "copper-annealing":          "Copper Annealing & Enamelling",
  "esp-heaters":               "ESP Heaters",
  "hnx-nitrogen-heaters":      "HNX Heaters & Nitrogen",
  "load-bank":                 "Load Bank for Battery & UPS Testing",
  "lpg-propane-evaporators":   "LPG & Propane Gas Evaporators",
  "oil-heaters":               "Oil Heaters",
  "packaging-machine-tunnel":  "Packaging Machine Tunnel Packing",
  "panel-heaters":             "Panel Heaters",
  "reactor-heater":            "Reactor Heater",
  "space-heaters":             "Space Heater",
  "steam-heaters":             "Steam Heater",
  "syngas-heaters":            "Syngas Heater",
  "water-heaters":             "Water Heater",
};

const parentNames: Record<string, { name: string; path: string }> = {
  "d-type-heaters":    { name: "D Type Heaters",    path: "/products/d-type-heaters" },
  "control-panel":     { name: "Control Panels",     path: "/products/control-panel" },
  "std-heaters":       { name: "Standard Heaters",   path: "/products/std-heaters" },
  "cartridge-heaters": { name: "Cartridge Heaters",  path: "/products/cartridge-heaters" },
  "open-wire":         { name: "Open Wire Heaters",  path: "/products/open-wire" },
};

export function HeaterCategory() {
  const { category, subCategory, productId } = useParams();

  const activeKey = subCategory ?? category ?? "";
  const parentSlug = productId ?? "customized-heaters";
  const { products, loading } = useSubcategoryProducts(parentSlug, activeKey);
  const categoryName = activeKey ? categoryNames[activeKey] || activeKey.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "";

  const parent = productId ? parentNames[productId] : null;

  if (!activeKey) {
    const backPath = parent ? parent.path : "/products/customized-heaters";
    const backLabel = parent ? `Back to ${parent.name}` : "Back to Customized Heaters";
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The heater category you're looking for doesn't exist or has no products yet.</p>
          <Link to={backPath}>
            <Button>
              <ArrowLeft size={18} className="mr-2" />
              {backLabel}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading products…</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    const backPath = parent ? parent.path : "/products/customized-heaters";
    const backLabel = parent ? `Back to ${parent.name}` : "Back to Customized Heaters";
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">No Products Found</h1>
          <p className="text-muted-foreground mb-8">This subcategory does not have any products yet.</p>
          <Link to={backPath}>
            <Button>
              <ArrowLeft size={18} className="mr-2" />
              {backLabel}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28">
      {/* Breadcrumb */}
      <section className="bg-card/50 py-6 border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            {parent ? (
              <Link to={parent.path} className="hover:text-primary transition-colors">{parent.name}</Link>
            ) : (
              <Link to="/products/customized-heaters" className="hover:text-primary transition-colors">Customized Heaters</Link>
            )}
            <span>/</span>
            <span className="text-foreground">{categoryName}</span>
          </div>
          <Link
            to={parent ? parent.path : "/products/customized-heaters"}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            {parent ? `Back to ${parent.name}` : "Back to Customized Heaters"}
          </Link>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-16 bg-gradient-to-br from-background via-secondary/20 to-background border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-primary font-semibold">Custom Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {categoryName}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Explore our comprehensive range of {categoryName.toLowerCase()} solutions designed for specific industrial applications.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary bg-primary/10 px-4 py-2 rounded-full font-semibold">
                {products.length} Product{products.length > 1 ? 's' : ''} Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="aspect-[1/1] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-secondary dark:to-blue-950/20 flex items-center justify-center p-[0px]">
                  <ImageWithFallback
                    src={product.image || product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-4 mb-6">
                    {product.description}
                  </p>
                  <div className="flex gap-3">
                    <Link to="/contact" className="flex-1">
                      <Button variant="default" className="w-full" size="sm">
                        Request Quote
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50 border-t border-border">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our engineering team can design and manufacture customized heating solutions tailored to your specific requirements.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Contact Our Engineers
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
