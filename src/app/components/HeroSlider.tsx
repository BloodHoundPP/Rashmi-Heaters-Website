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
  },
  {
    tag: "Precision Engineering",
    title: "D-Type Heaters",
    description:
      "Specially designed for die heating in automotive foundry core shooter machines for high temperature and faster cycle times.",
    image: slide2Img,
    link: "/products/d-type-heaters",
  },
  {
    tag: "Smart Automation",
    title: "Control Panels",
    description:
      "Designed for precise control of heating systems, automation and high-performance industrial process management.",
    image: slide3Img,
    link: "/products/control-panel",
  },
  {
    tag: "High Density",
    title: "Cartridge Heaters",
    description:
      "High-density tubular elements delivering concentrated, efficient heat transfer in the most demanding applications.",
    image: slide4Img,
    link: "/products/cartridge-heaters",
  },
  {
    tag: "Fast & Uniform",
    title: "Open Wire Heaters",
    description:
      "Rapid, uniform heating via resistance wire and ceramic insulators — low power consumption, high thermal output.",
    image: slide5Img,
    link: "/products/open-wire",
  },
];

const DURATION = 10000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (animating || next === current || slides.length <= 1) return;
      if (timer.current) clearTimeout(timer.current);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(next);
        setAnimating(false);
        setProgressKey((k) => k + 1);
      }, 450);
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

  useEffect(() => {
    if (slides.length <= 1) return;
    timer.current = setTimeout(goNext, DURATION);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [goNext, progressKey]);

  const s = slides[current];

  return (
    <section className="mt-35 relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 560 }}>

      {/* ── Background image ── */}
      <div
        key={current}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: animating ? 0 : 1,
          transition: "opacity 0.45s ease",
        }}
      >
        <img
          src={s.image}
          alt={s.title}
          className="w-full h-full object-cover object-center"
          style={{ background: "#0a0a0a" }}
        />
        {/* Subtle left overlay so text stays readable without killing the image */}
        <div
          className="absolute inset-0"
         
        />
      </div>

      {/* ── Left content ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1320px] w-full mx-auto px-5 md:px-12">
          <div
            className="max-w-xl"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(18px)" : "translateY(0)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
            }}
          >
            {/* Tag pill */}
            <span
              className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-5"
              style={{ background: "#C62828", color: "#fff" }}
            >
              {s.tag}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[1.05] mb-4 md:mb-5">
              {s.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-black/75 leading-relaxed mb-8 max-w-md">
              {s.description}
            </p>

            {/* CTA */}
            <Link
              to={s.link}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:brightness-110 hover:gap-4"
              style={{
                background: "#C62828",
                color: "#fff",
                boxShadow: "0 4px 24px rgba(198,40,40,0.45)",
              }}
            >
              Explore Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows (hidden when only 1 slide) ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </>
      )}

      {/* ── Dot indicators (hidden when only 1 slide) ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                background: i === current ? "#C62828" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Bottom progress bar ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
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
