import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import slide1Img from "../../imports/slide_-_1.png";
import slide2Img from "../../imports/slide - 2.png";
import slide3Img from "../../imports/SLIDE_-3.png";
import slide4Img from "../../imports/SLIDE_-4.png";
import slide5Img from "../../imports/SLIDE_-5.png";

const slides = [
  {
    tag: "Tailored Solutions",
    title: "Customized Heaters",
    description:
      "Engineered to suit the most complex heating requirements with optimum performance and precision.",
    image: slide1Img,
    link: "/products/customized-heaters",
    badge: "Custom Engineering",
    mobileFocus: "68% center",
  },
  {
    tag: "Precision Engineering",
    title: "D-Type Heaters",
    description:
      "Specially designed for die heating in automotive foundry core shooter machines for high temperature and faster cycle times.",
    image: slide2Img,
    link: "/products/d-type-heaters",
    badge: "Die Heating Precision",
    mobileFocus: "72% center",
  },
  {
    tag: "Smart Automation",
    title: "Control Panels",
    description:
      "Designed for precise control of heating systems, automation and high-performance industrial process management.",
    image: slide3Img,
    link: "/products/control-panel",
    badge: "Smart Automation",
    mobileFocus: "72% center",
  },
  {
    tag: "High Density",
    title: "Cartridge Heaters",
    description:
      "High-density tubular elements delivering concentrated, efficient heat transfer in the most demanding applications.",
    image: slide4Img,
    link: "/products/cartridge-heaters",
    badge: "High Watt Density",
    mobileFocus: "72% center",
  },
  {
    tag: "Fast & Uniform",
    title: "Open Wire Heaters",
    description:
      "Rapid, uniform heating via resistance wire and ceramic insulators — low power consumption, high thermal output.",
    image: slide5Img,
    link: "/products/open-wire",
    badge: "Rapid Uniform Heat",
    mobileFocus: "72% center",
  },
];

const DURATION = 10000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (animating || next === current || slides.length <= 1) return;
      if (timer.current) clearTimeout(timer.current);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(next);
        setAnimating(false);
        setProgressKey((k) => k + 1);
      }, 400);
    },
    [animating, current],
  );

  const goNext = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );
  const goPrev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      goNext();
    } else if (distance < -45) {
      goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    timer.current = setTimeout(goNext, DURATION);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [goNext, progressKey]);

  const s = slides[current];

  return (
    <section
      className="mt-35 relative w-full overflow-hidden select-none md:h-[100svh]"
      style={{ minHeight: 560 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ══════════════════════════════════════════════════════
          DESKTOP VIEW (md: and up): Original Full Banner Look
         ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        {/* Background image */}
        <div
          key={`desktop-bg-${current}`}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
            style={{ background: "#f5a623" }}
          />
        </div>

        {/* Desktop Left Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1320px] w-full mx-auto px-6 md:px-12">
            <div
              className="max-w-xl"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(16px)" : "translateY(0)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {/* Tag pill */}
              <span
                className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full mb-5 shadow-sm"
                style={{ background: "#C62828", color: "#fff" }}
              >
                {s.tag}
              </span>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[1.05] mb-4 md:mb-5 tracking-tight">
                {s.title}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-black/80 leading-relaxed mb-8 max-w-md font-normal">
                {s.description}
              </p>

              {/* CTA */}
              <Link
                to={s.link}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:brightness-110 hover:gap-4 active:scale-95"
                style={{
                  background: "#C62828",
                  color: "#fff",
                  boxShadow: "0 6px 24px rgba(198,40,40,0.4)",
                }}
              >
                Explore Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Prev / Next Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/30 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronLeft size={22} className="text-gray-900" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/30 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronRight size={22} className="text-gray-900" />
            </button>
          </>
        )}

        {/* Desktop Dot Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === current ? 32 : 8,
                  height: 8,
                  background: i === current ? "#C62828" : "rgba(0,0,0,0.3)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE VIEW (< md): Modern Industrial Stacked Layout
          (Approach 1: Clean top copy + bottom framed showcase)
         ══════════════════════════════════════════════════════ */}
      <div
        className="md:hidden relative w-full flex flex-col justify-between px-5 pt-6 pb-6"
        style={{
          background: "linear-gradient(165deg, #FEE685 0%, #FAB82C 48%, #F07E13 100%)",
          minHeight: "calc(100svh - 140px)",
        }}
      >
        {/* Subtle industrial glowing ambient background elements */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-10 -left-10 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          }}
        />

        {/* ── Top Stack: Typography & Call To Action ── */}
        <div
          key={`mobile-content-${current}`}
          className="relative z-10 flex flex-col items-start"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Badge Pill with pulsing light */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C62828] text-white shadow-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase">
              {s.tag}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[2rem] sm:text-4xl font-black text-gray-950 leading-[1.08] tracking-tight mb-2">
            {s.title}
          </h1>

          {/* Clean 2-3 line description */}
          <p className="text-[13.5px] sm:text-sm text-gray-900/85 font-normal leading-relaxed line-clamp-3 mb-4 max-w-sm">
            {s.description}
          </p>

          {/* CTA Button */}
          <Link
            to={s.link}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all"
            style={{
              background: "#C62828",
              boxShadow: "0 4px 18px rgba(198,40,40,0.38)",
            }}
          >
            Explore Products
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── Middle/Bottom: Dedicated Illuminated Product Showcase ── */}
        <div
          key={`mobile-showcase-${current}`}
          className="relative z-10 my-4"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "scale(0.97)" : "scale(1)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <Link
            to={s.link}
            className="relative block w-full rounded-2xl overflow-hidden border border-white/60 shadow-[0_10px_28px_rgba(180,83,9,0.18)] bg-white/20 backdrop-blur-md group"
            style={{ height: "230px" }}
          >
            {/* Focused product artwork cutout with right-side focal point */}
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: s.mobileFocus || "72% center" }}
            />

            {/* Subtle top glare reflection */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20 pointer-events-none" />

            {/* Floating Top Badge */}
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              {s.badge}
            </div>

            {/* Floating Bottom View Specs Pill */}
            <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-[11px] font-bold text-gray-900 flex items-center gap-1.5 shadow-sm group-hover:bg-white">
              <span>View Product</span>
              <ArrowRight size={12} className="text-[#C62828]" />
            </div>
          </Link>
        </div>

        {/* ── Mobile Controls Bar: Counter + Arrows + Dots (clearing chatbot) ── */}
        {slides.length > 1 && (
          <div className="relative z-10 flex items-center justify-between pt-2 pb-1 pr-14">
            {/* Slide Counter + Compact Nav Arrows */}
            <div className="flex items-center gap-2">
              <div className="text-[11px] font-bold text-gray-900/75 tracking-wider uppercase font-mono">
                <span className="text-gray-950 font-black">0{current + 1}</span>
                <span className="text-gray-500 mx-1">/</span>
                <span>0{slides.length}</span>
              </div>
              <div className="flex items-center gap-1 ml-1">
                <button
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-white/60 hover:bg-white border border-white/80 text-gray-900 active:scale-90 transition-all shadow-xs cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next slide"
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-white/60 hover:bg-white border border-white/80 text-gray-900 active:scale-90 transition-all shadow-xs cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Touch Pill Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === current ? 22 : 6,
                    height: 6,
                    background: i === current ? "#C62828" : "rgba(0,0,0,0.22)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Progress Bar (Universal) ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-black/10">
          <div
            key={progressKey}
            className="h-full"
            style={{
              background: "#C62828",
              animation: `heroProgress ${DURATION}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}

