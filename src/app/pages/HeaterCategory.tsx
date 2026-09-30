import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ZoomIn,
  ZoomOut,
  X, 
  Mail, 
  CheckCircle2, 
  Images, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useSubcategoryProducts } from "../lib/useCategories";
import { subcategoryFallbackImages, categoryProducts } from "../data/categoryProducts";
import { ProductDetailsModal } from "../components/ProductDetailsModal";

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
  "d-type-standard":           "D-Type Standard",
  "control-panel-on-off":      "On/Off Control Panel",
  "control-panel-thyristorised": "Thyristorised Control Panel",
  "std-u-shaped-air":          "U-Shaped Air Heater",
  "std-industrial-water":      "Industrial Water Heater",
  "std-oil-heating":           "Oil Heating",
  "std-solar":                 "Solar",
  "std-alkaline":              "Alkaline",
  "std-chemical":              "Chemical",
  "std-fin":                   "Fin Heater",
  "cartridge-threaded":        "Threaded Cartridge",
  "cartridge-flameproof":      "Flameproof Cartridge",
  "cartridge-high-density":    "High Density Cartridge",
  "cartridge-low-density":     "Low Density Cartridge",
  "open-wire-furnace":         "Furnace Open Wire",
  "open-wire-bundle-rod":      "Bundle Rod Open Wire",
  "open-wire-stripe":          "Stripe Open Wire",
  "open-wire-bionet":          "Bionet Open Wire",
};

const parentNames: Record<string, { name: string; path: string }> = {
  "customized-heaters": { name: "Customized Heaters", path: "/products/customized-heaters" },
  "d-type-heaters":    { name: "D Type Heaters",    path: "/products/d-type-heaters" },
  "control-panel":     { name: "Control Panels",     path: "/products/control-panel" },
  "std-heaters":       { name: "Standard Heaters",   path: "/products/std-heaters" },
  "cartridge-heaters": { name: "Cartridge Heaters",  path: "/products/cartridge-heaters" },
  "open-wire":         { name: "Open Wire Heaters",  path: "/products/open-wire" },
};

export function HeaterCategory() {
  const { category, subCategory, productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.12);

  const activeKey = subCategory ?? category ?? "";
  const parentSlug = productId ?? "customized-heaters";
  const { products, subcategory, loading } = useSubcategoryProducts(parentSlug, activeKey);

  const categoryName = subcategory?.name || (activeKey ? categoryNames[activeKey] || activeKey.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "");
  const parent = parentSlug ? parentNames[parentSlug] : null;

  // Build combined showcase gallery images from subcategory data and fallbacks
  const showcaseImages: string[] = [];
  if (Array.isArray(subcategory?.gallery_images) && subcategory.gallery_images.length > 0) {
    showcaseImages.push(...subcategory.gallery_images);
  }
  if (subcategory?.image_url && !showcaseImages.includes(subcategory.image_url)) {
    showcaseImages.unshift(subcategory.image_url);
  }
  const fallbackImg = subcategoryFallbackImages[activeKey] || categoryProducts[activeKey]?.[0]?.image;
  if (showcaseImages.length === 0 && fallbackImg) {
    showcaseImages.push(fallbackImg);
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : showcaseImages.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev < showcaseImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, showcaseImages.length]);

  if (!activeKey) {
    const backPath = parent ? parent.path : "/products/customized-heaters";
    const backLabel = parent ? `Back to ${parent.name}` : "Back to Customized Heaters";
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Specified</h1>
          <p className="text-muted-foreground mb-8">Please choose a valid heater category to view product solutions.</p>
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
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading heating solutions…</p>
        </div>
      </div>
    );
  }

  const backPath = parent ? parent.path : "/products/customized-heaters";
  const backLabel = parent ? `Back to ${parent.name}` : "Back to Customized Heaters";

  // ──────────────────────────────────────────────────────────────────────────
  // VIEW A: Subcategory has NO individual product models
  // SHOWCASE VIEW: Showcase images, subcategory technical overview, specs, CTA
  // ──────────────────────────────────────────────────────────────────────────
  if (products.length === 0) {
    const activeImage = showcaseImages[activeImageIndex] || fallbackImg;
    const subDescription = subcategory?.description || `Our engineered ${categoryName} solutions are developed to meet demanding industrial thermal applications. Custom designed in high-grade sheath alloys with precision temperature profiling for long operating lifespan.`;

    return (
      <div className="min-h-screen pt-28">
        {/* Breadcrumb Navigation */}
        <section className="bg-card/50 py-5 border-b border-border">
          <div className="max-w-[1320px] mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
              <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
              <span>/</span>
              {parent ? (
                <Link to={parent.path} className="hover:text-primary transition-colors">{parent.name}</Link>
              ) : (
                <Link to="/products/customized-heaters" className="hover:text-primary transition-colors">Customized Heaters</Link>
              )}
              <span>/</span>
              <span className="text-foreground font-medium">{categoryName}</span>
            </div>
            <Link
              to={backPath}
              className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              {backLabel}
            </Link>
          </div>
        </section>

        {/* Hero Header */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-background via-secondary/25 to-background border-b border-border">
          <div className="max-w-[1320px] mx-auto px-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm text-primary font-bold tracking-wide uppercase">
                  Custom Engineered Heating Solution
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-4">
                {categoryName}
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6">
                {subDescription}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  ✔ Custom Engineered to Client Specs
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  ✔ 100% Quality & Megger Tested
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  ✔ ISO 9001:2015 Certified
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategory Showcase & Gallery Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1320px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Image Showcase Gallery */}
              <div className="lg:col-span-7 space-y-4">
                <Card className="overflow-hidden border-border bg-card/80 shadow-xl rounded-2xl relative">
                  {/* Main Active Image View */}
                  <div className="relative aspect-[16/11] min-h-[440px] md:min-h-[500px] bg-gradient-to-br from-slate-50 via-white to-slate-100/90 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden group">
                    {activeImage ? (
                      <div
                        className="w-full h-full flex items-center justify-center cursor-zoom-in overflow-hidden transition-all duration-300"
                        onClick={() => setIsLightboxOpen(true)}
                        title="Click to view full-screen high-res"
                      >
                        <ImageWithFallback
                          src={activeImage}
                          alt={`${categoryName} showcase image ${activeImageIndex + 1}`}
                          className="w-full h-full object-contain transition-transform duration-300 drop-shadow-md"
                          style={{ transform: `scale(${zoomLevel})` }}
                        />
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-16">
                        <Images className="w-12 h-12 mx-auto mb-2 opacity-40" />
                        <p className="text-sm font-medium">Showcase image available upon technical request</p>
                      </div>
                    )}

                    {/* Image Counter Badge */}
                    {showcaseImages.length > 0 && (
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md z-10">
                        <Images size={13} />
                        Image {activeImageIndex + 1} of {showcaseImages.length}
                      </div>
                    )}

                    {/* Top Right Controls: Zoom & Fullscreen */}
                    {activeImage && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                        <div className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setZoomLevel((prev) => Math.max(1, +(prev - 0.15).toFixed(2)));
                            }}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            title="Zoom Out"
                          >
                            <ZoomOut size={13} />
                          </button>
                          <span className="px-1 text-[11px] font-mono">{Math.round(zoomLevel * 100)}%</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setZoomLevel((prev) => Math.min(2.0, +(prev + 0.15).toFixed(2)));
                            }}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            title="Zoom In"
                          >
                            <ZoomIn size={13} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsLightboxOpen(true)}
                          className="p-2 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white rounded-full transition-all shadow-md hover:scale-105"
                          title="View Fullscreen"
                        >
                          <Maximize2 size={15} />
                        </button>
                      </div>
                    )}

                    {/* Navigation Arrows for Main Viewer */}
                    {showcaseImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : showcaseImages.length - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/60 shadow-lg text-foreground hover:bg-white dark:hover:bg-black transition-all hover:scale-110"
                          title="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev < showcaseImages.length - 1 ? prev + 1 : 0))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/60 shadow-lg text-foreground hover:bg-white dark:hover:bg-black transition-all hover:scale-110"
                          title="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {showcaseImages.length > 1 && (
                    <div className="p-4 bg-secondary/30 border-t border-border">
                      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                        {showcaseImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white dark:bg-slate-900 ${
                              activeImageIndex === idx
                                ? "border-primary ring-2 ring-primary/30 scale-105"
                                : "border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <ImageWithFallback
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-contain"
                            />
                            {activeImageIndex === idx && (
                              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Right Column: Technical Details, Capabilities & Quick Inquiries */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border-border shadow-lg p-6 rounded-2xl bg-card">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3 uppercase tracking-wider">
                    <ShieldCheck className="w-5 h-5" />
                    Engineering Specifications
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Custom Built for Demanding Operations
                  </h3>
                  
                  <div className="space-y-3.5 mb-6 text-sm text-foreground">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                      <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-foreground font-semibold">Custom Electrical Ratings</strong>
                        <span className="text-muted-foreground text-xs">Voltage from 24V up to 690V (1-phase / 3-phase). Wattage manufactured to client load calculations.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                      <Layers className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-foreground font-semibold">High-Grade Sheath Materials</strong>
                        <span className="text-muted-foreground text-xs">Incoloy 800/825/840, SS304, SS316L, Titanium, Inconel, and Copper according to chemical & thermal environment.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                      <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-foreground font-semibold">Temperature Uniformity & Longevity</strong>
                        <span className="text-muted-foreground text-xs">High-purity compacted MgO insulation with computer-wound Nichrome wire (80/20) for maximum thermal conductivity.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-foreground font-semibold">Custom Geometry & Mounting</strong>
                        <span className="text-muted-foreground text-xs">Flanged, threaded, duct-mounted, or tubular formations customized to fit existing machine housings.</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact / Inquiry Action Box */}
                  <div className="space-y-3 pt-2">
                    <Link
                      to={`/contact?product=${encodeURIComponent(categoryName)}`}
                      className="w-full block"
                    >
                      <Button className="w-full font-bold shadow-md hover:shadow-lg transition-all" size="lg">
                        <Mail className="mr-2" size={18} />
                        Request Custom Quotation
                      </Button>
                    </Link>

                    <a
                      href={`https://wa.me/917414940988?text=${encodeURIComponent(`Hello Rashmi Heaters, I am interested in custom technical specifications and quotation for ${categoryName}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button variant="outline" className="w-full font-semibold border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10" size="lg">
                        <FaWhatsapp className="mr-2 text-lg text-emerald-500" />
                        Chat on WhatsApp
                      </Button>
                    </a>

                    <div className="text-center pt-2">
                      <a
                        href="tel:+917414940988"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                      >
                        <PhoneCall size={13} />
                        Call Our Engineering Desk: +91 7414940988
                      </a>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* Manufacturing & Capabilities Banner */}
        <section className="py-14 bg-card/60 border-t border-border">
          <div className="max-w-[1320px] mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Need Specific Dimensions, Wattage or Drawings for {categoryName}?
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our Pune engineering facility designs custom heating configurations with short lead times, full testing documentation, and global shipping capabilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="font-semibold shadow-md">
                  Consult With Technical Experts
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to={backPath}>
                <Button size="lg" variant="outline">
                  {backLabel}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Fullscreen Lightbox Modal */}
        {isLightboxOpen && activeImage && (
          <div className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
              title="Close (Esc)"
            >
              <X size={24} />
            </button>

            {showcaseImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : showcaseImages.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-10"
                  title="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < showcaseImages.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-10"
                  title="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="max-w-6xl w-full max-h-[92vh] flex flex-col items-center">
              <div className="relative w-full max-h-[82vh] flex items-center justify-center p-2">
                <img
                  src={activeImage}
                  alt={`${categoryName} high resolution preview`}
                  className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl drop-shadow-2xl"
                />
              </div>
              <div className="text-white text-xs md:text-sm mt-3 font-semibold bg-white/15 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-3">
                <span>{categoryName} — Image {activeImageIndex + 1} of {showcaseImages.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // VIEW B: Subcategory HAS product items
  // PRODUCTS GRID VIEW: Shows header + product cards with inquiry & modal
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-28">
      {/* Breadcrumb Navigation */}
      <section className="bg-card/50 py-6 border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            {parent ? (
              <Link to={parent.path} className="hover:text-primary transition-colors">{parent.name}</Link>
            ) : (
              <Link to="/products/customized-heaters" className="hover:text-primary transition-colors">Customized Heaters</Link>
            )}
            <span>/</span>
            <span className="text-foreground font-medium">{categoryName}</span>
          </div>
          <Link
            to={backPath}
            className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            {backLabel}
          </Link>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-14 md:py-16 bg-gradient-to-br from-background via-secondary/20 to-background border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs md:text-sm text-primary font-bold tracking-wide uppercase">Industrial Range</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
              {categoryName}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              {subcategory?.description || `Explore our comprehensive range of ${categoryName.toLowerCase()} solutions designed for specific industrial heating applications.`}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs md:text-sm text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full font-bold">
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
                className="group overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-[1/1] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-secondary dark:to-blue-950/20 flex items-center justify-center p-[0px]">
                  <ImageWithFallback
                    src={product.image || product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-4 mb-6">
                    {product.description}
                  </p>
                  <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                    <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="flex-1">
                      <Button variant="default" className="w-full" size="sm">
                        Request Quote
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProduct(product)}
                      className="hover:border-primary hover:text-primary transition-colors"
                    >
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
            Need a Custom Engineered Solution?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our engineering team can design and manufacture customized heating solutions tailored to your specific process parameters.
          </p>
          <Link to="/contact">
            <Button size="lg" className="font-semibold shadow-md">
              Contact Our Engineers
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        categoryName={categoryName}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
