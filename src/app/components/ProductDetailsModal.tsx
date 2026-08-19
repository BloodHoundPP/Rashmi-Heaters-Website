import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Mail, CheckCircle2, FileText, Sparkles, Layers } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";

export interface ProductDetails {
  id?: string;
  name: string;
  image?: string;
  image_url?: string;
  description?: string;
  category_label?: string;
  category?: string;
  gallery_images?: string[];
  specs?: Record<string, string> | Array<{ label: string; value: string }> | string[];
  features?: string[];
  applications?: string[];
}

interface ProductDetailsModalProps {
  product: ProductDetails | null;
  categoryName?: string;
  onClose: () => void;
}

export function ProductDetailsModal({ product, categoryName, onClose }: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Reset active index when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
  }, [product]);

  // Handle ESC key to close modal or lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (product) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, product, onClose]);

  if (!product) return null;

  const mainImg = product.image || product.image_url || "";
  const rawGallery = Array.isArray(product.gallery_images) && product.gallery_images.length > 0
    ? product.gallery_images
    : [];

  // Combine main image with gallery images if gallery exists, ensuring no duplicate main image if already in gallery
  const galleryList = rawGallery.length > 0
    ? [mainImg, ...rawGallery.filter(img => img !== mainImg)]
    : [];

  const currentDisplayedImage = galleryList.length > 0
    ? galleryList[activeImageIndex] || mainImg
    : mainImg;

  const hasGallery = galleryList.length > 1;

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (galleryList.length === 0) return;
    setActiveImageIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (galleryList.length === 0) return;
    setActiveImageIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  };

  const catLabel = product.category_label || product.category || categoryName || "Product Details";
  const quoteUrl = `/contact?product=${encodeURIComponent(product.name)}`;

  return (
    <>
      {/* Main Modal Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div 
          className="relative w-full max-w-5xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-card via-secondary/30 to-card sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Sparkles size={18} />
              </div>
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-primary">
                  {catLabel}
                </span>
                <h2 className="text-xl font-bold text-foreground line-clamp-1">
                  {product.name}
                </h2>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-8 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Image & Product Gallery */}
              <div className="lg:col-span-6 space-y-4">
                {/* Main Image Display Box */}
                <div className="relative group rounded-2xl border border-border/60 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 dark:from-blue-950/20 dark:via-secondary/50 dark:to-blue-950/20 aspect-[4/3] flex items-center justify-center p-4 overflow-hidden shadow-inner">
                  
                  <ImageWithFallback
                    src={currentDisplayedImage}
                    alt={product.name}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                  />

                  {/* Lightbox / Zoom Button */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-background/80 hover:bg-background text-foreground shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                    title="View Fullscreen"
                  >
                    <Maximize2 size={18} />
                  </button>

                  {/* Navigation Arrows for Gallery */}
                  {hasGallery && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-110 opacity-90 hover:opacity-100"
                        title="Previous Image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-110 opacity-90 hover:opacity-100"
                        title="Next Image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter Badge */}
                  {hasGallery && (
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                      {activeImageIndex + 1} / {galleryList.length}
                    </div>
                  )}
                </div>

                {/* Product Gallery Section (Only shown if gallery exists!) */}
                {hasGallery && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Layers size={14} className="text-primary" />
                      Product Gallery ({galleryList.length} Photos)
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {galleryList.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 bg-secondary/40 p-1 ${
                            idx === activeImageIndex
                              ? "border-primary ring-2 ring-primary/30 shadow-md scale-105"
                              : "border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <ImageWithFallback
                            src={imgUrl}
                            alt={`${product.name} view ${idx + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Product Info & Specifications */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
                      <Sparkles size={12} />
                      {catLabel}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {product.name}
                    </h1>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {product.description || "High-performance industrial heating solution designed and engineered for precision, durability, and maximum thermal efficiency."}
                  </p>

                  {/* Key Features if available */}
                  {Array.isArray(product.features) && product.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-primary" />
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.map((feat, index) => (
                          <li key={index} className="text-xs text-muted-foreground flex items-center gap-2 bg-secondary/30 p-2 rounded-lg border border-border/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Specifications if available */}
                  {product.specs && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <FileText size={15} className="text-primary" />
                        Specifications
                      </h4>
                      <Card className="border-border/60 bg-secondary/20">
                        <CardContent className="p-3 space-y-1.5">
                          {Array.isArray(product.specs) ? (
                            product.specs.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between text-xs py-1 border-b border-border/30 last:border-0">
                                <span className="text-muted-foreground font-medium">
                                  {typeof item === "object" ? item.label : `Spec ${idx + 1}`}
                                </span>
                                <span className="text-foreground font-semibold">
                                  {typeof item === "object" ? item.value : item}
                                </span>
                              </div>
                            ))
                          ) : (
                            Object.entries(product.specs).map(([key, val], idx) => (
                              <div key={idx} className="flex justify-between text-xs py-1 border-b border-border/30 last:border-0">
                                <span className="text-muted-foreground capitalize font-medium">{key.replace(/_/g, ' ')}</span>
                                <span className="text-foreground font-semibold">{String(val)}</span>
                              </div>
                            ))
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Call to Action Footer */}
                <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                  <Link to={quoteUrl} className="flex-1" onClick={onClose}>
                    <Button variant="default" size="lg" className="w-full font-semibold shadow-lg shadow-primary/20">
                      <Mail size={18} className="mr-2" />
                      Request Quote for this Product
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={onClose} className="sm:w-auto">
                    Close
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox View */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            title="Close Lightbox"
          >
            <X size={24} />
          </button>

          {hasGallery && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors"
                title="Previous Image"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors"
                title="Next Image"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          <div 
            className="max-w-4xl max-h-[85vh] p-4 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={currentDisplayedImage}
              alt={product.name}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center text-white/90">
              <h3 className="font-bold text-lg">{product.name}</h3>
              {hasGallery && (
                <p className="text-xs text-white/60 mt-1">
                  Image {activeImageIndex + 1} of {galleryList.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
