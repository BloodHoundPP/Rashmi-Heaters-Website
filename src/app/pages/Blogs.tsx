import { useState, useEffect } from "react";
import { Calendar, X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";

const boilerImages = [
  { img: "/images/exhibitions/boiler-india-3.jpg", title: "Boiler India 2026 : Navi Mumbai" },
  { img: "/images/exhibitions/boiler-india-1.jpg", title: "Boiler India 2026 : Navi Mumbai" },
  { img: "/images/exhibitions/boiler-india-2.jpg", title: "Boiler India 2026 : Navi Mumbai" },
  { img: "/images/exhibitions/boiler-india-2026.png", title: "Boiler India 2026 : Navi Mumbai" },
];

const pastExhibitions = [
  { img: "/images/exhibitions/e10.jpg", title: "Industrial Expo Ankleshwar 2022" },
  { img: "/images/exhibitions/e9.jpg", title: "Dahej Industrial Expo 2021" },
  { img: "/images/exhibitions/e1.webp", title: "IFEX 2020 : Tamil Nadu" },
  { img: "/images/exhibitions/e3.webp", title: "IFEX 2020 : Tamil Nadu" },
  { img: "/images/exhibitions/e4.jpg", title: "IFEX 2020 : Tamil Nadu" },
  { img: "/images/exhibitions/e5.jpg", title: "IFEX 2019 : NOIDA" },
  { img: "/images/exhibitions/e7.jpg", title: "IFEX 2017 : GANDHINAGAR" },
  { img: "/images/exhibitions/e8.jpg", title: "ELECRAMA 2016 : BANGLORE" },
];

// All images for global lightbox navigation
const allGalleryItems = [...boilerImages, ...pastExhibitions];

export function Blogs() {
  const [boilerSlide, setBoilerSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Auto-play boiler expo carousel when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setBoilerSlide((prev) => (prev + 1) % boilerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") setLightboxIdx((prev) => (prev! > 0 ? prev! - 1 : allGalleryItems.length - 1));
      if (e.key === "ArrowRight") setLightboxIdx((prev) => (prev! < allGalleryItems.length - 1 ? prev! + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIdx]);

  return (
    <div className="min-h-screen pt-36">
      {/* Header */}
      <section className="bg-gradient-to-br from-background via-secondary/20 to-background py-20 border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Blogs & Events
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest insights and industry events from Rashmi Heaters.
            </p>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-primary font-semibold">Upcoming Events</span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="rounded-3xl border border-dashed border-border bg-card/40 p-10 md:p-14 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Upcoming Events Right Now</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We regularly showcase our heating solutions at premier industry expos and trade fairs across India and worldwide. Stay tuned for our future event announcements!
            </p>
          </div>
        </div>
      </section>

      {/* ── Exhibitions Till Now ── */}
      <section className="pb-24">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex-1 h-px bg-border" />
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-primary font-semibold">Exhibitions Till Now</span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ── Single Boiler India 2026 Card with Carousel ── */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => setLightboxIdx(boilerSlide)}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10 flex flex-col cursor-pointer"
            >
              <div className="aspect-[16/11] w-full overflow-hidden bg-white p-3 flex items-center justify-center relative select-none">
                <img 
                  src={boilerImages[boilerSlide].img} 
                  alt="Boiler India 2026 : Navi Mumbai" 
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Photo Count Badge */}
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
                  <Images size={12} className="text-primary" />
                  <span>{boilerSlide + 1} / {boilerImages.length}</span>
                </div>

                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBoilerSlide((prev) => (prev > 0 ? prev - 1 : boilerImages.length - 1));
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-md"
                  title="Previous photo"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBoilerSlide((prev) => (prev < boilerImages.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-md"
                  title="Next photo"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                  {boilerImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBoilerSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        boilerSlide === idx ? "w-4 bg-primary" : "w-1.5 bg-white/60 hover:bg-white"
                      }`}
                      title={`Photo ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-black/70 text-white rounded-full p-2.5 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn size={18} />
                  </span>
                </div>
              </div>

              <div className="p-5 text-center border-t border-border/50 bg-card/40 flex-1 flex flex-col items-center justify-center gap-1">
                <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
                  Boiler India 2026 : Navi Mumbai
                </h3>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span>📸 4 photos · Click to view full size</span>
                </p>
              </div>
            </div>

            {/* ── Other Past Exhibitions ── */}
            {pastExhibitions.map((expo, idx) => {
              const globalIdx = boilerImages.length + idx;
              return (
                <div 
                  key={expo.title + idx}
                  onClick={() => setLightboxIdx(globalIdx)}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10 flex flex-col cursor-pointer"
                >
                  <div className="aspect-[16/11] w-full overflow-hidden bg-white p-3 flex items-center justify-center relative">
                    <img 
                      src={expo.img} 
                      alt={expo.title} 
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-black/70 text-white rounded-full p-2.5 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn size={18} />
                      </span>
                    </div>
                  </div>
                  <div className="p-5 text-center border-t border-border/50 bg-card/40 flex-1 flex items-center justify-center">
                    <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors">{expo.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      {lightboxIdx !== null && (
        <div 
          className="fixed inset-0 z-[600] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIdx(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxIdx(null)}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-lg"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>

          {/* Previous button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((prev) => (prev! > 0 ? prev! - 1 : allGalleryItems.length - 1));
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors shadow-lg"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((prev) => (prev! < allGalleryItems.length - 1 ? prev! + 1 : 0));
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors shadow-lg"
            title="Next (Right Arrow)"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Content */}
          <div 
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40 p-2">
              <img 
                src={allGalleryItems[lightboxIdx].img} 
                alt={allGalleryItems[lightboxIdx].title} 
                className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-semibold tracking-wide">
                {allGalleryItems[lightboxIdx].title}
              </p>
              <p className="text-white/60 text-xs mt-1">
                {lightboxIdx + 1} of {allGalleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
