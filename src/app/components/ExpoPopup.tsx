import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { X, MapPin, Calendar, ArrowRight, Package } from "lucide-react";

export function ExpoPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Small delay so the page renders first
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{
        animation: closing
          ? "popupOut 0.35s cubic-bezier(.4,0,.2,1) forwards"
          : "popupIn 0.4s cubic-bezier(.22,.68,0,1.1) forwards",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #e8f4fd 0%, #ddeefa 60%, #cce8f8 100%)",
          border: "1px solid rgba(147, 210, 255, 0.5)",
          boxShadow: "0 8px 64px rgba(198, 40, 40, 0.10), 0 32px 64px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Light blue top accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, #C62828, #ef5350, #C62828)" }}
        />

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(198,40,40,0.10)", border: "1px solid rgba(198,40,40,0.25)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(198,40,40,0.20)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(198,40,40,0.10)")}
        >
          <X size={15} className="text-red-700" />
        </button>

        {/* Header */}
        <div className="px-5 sm:px-8 pt-5 sm:pt-7 pb-5">
          {/* Expo badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.3em] uppercase px-3 py-1 rounded-full"
              style={{ background: "linear-gradient(135deg, #C62828, #ef5350)", color: "#fff" }}
            >
              🏭 We're Exhibiting!
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-tight mb-1 text-slate-700">
            Meet Rashmi Heaters at
          </h2>
          <h2
            className="text-2xl sm:text-3xl font-black leading-tight mb-5"
            style={{
              background: "linear-gradient(90deg, #C62828, #ef5350, #C62828)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Boiler India 2026
          </h2>

          {/* Expo logo */}
          <div
            className="rounded-2xl p-4 mb-5 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(147,210,255,0.3)" }}
          >
            <img
              src="https://india.boilerworldexpo.com/wp-content/uploads/2025/06/BI26-tentative-logo.png"
              alt="Boiler India 2026"
              className="max-h-16 sm:max-h-20 object-contain"
            />
          </div>

          {/* Date & Venue */}
          <div className="space-y-2.5 mb-5">
            <div className="flex items-start gap-2.5">
              <Calendar size={14} className="mt-0.5 shrink-0 text-red-700" />
              <span className="text-sm font-semibold text-slate-700">
                8 – 10 October 2026
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-0.5 shrink-0 text-red-700" />
              <span className="text-sm text-slate-500">
                CIDCO Exhibition & Convention Centre,{" "}
                <span className="font-semibold text-slate-700">Navi Mumbai</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 text-slate-500">
            Discover our latest industrial heating solutions, custom-engineered heating elements,
            and innovative temperature control technologies.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5 sm:mb-6">
            {[
              "Live Product Demonstrations",
              "Meet Our Technical Experts",
              "Custom Heating Solutions",
              "Dealer Enquiries Welcome",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-red-700 text-sm mt-0.5 shrink-0">✅</span>
                <span className="text-xs leading-snug text-slate-600">{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <a
              href="https://india.boilerworldexpo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "linear-gradient(135deg, #C62828, #ef5350)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(198,40,40,0.35)",
              }}
            >
              Visit Us at the Expo
              <ArrowRight size={14} />
            </a>
            <a
              href="/products"
              onClick={close}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(198,40,40,0.3)",
                color: "#C62828",
              }}
            >
              <Package size={14} />
              Explore Products
            </a>
          </div>
        </div>

        {/* Bottom shimmer strip */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(198,40,40,0.3), transparent)" }}
        />
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(0.92) translateY(16px); }
        }
      `}</style>
    </div>
  );
}
