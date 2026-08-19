import { Calendar, MapPin, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export function Blogs() {
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
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-6">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-semibold">Upcoming Events</span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Boiler India 2026 card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Gold top accent */}
            <div
              className="h-1"
              style={{ background: "linear-gradient(90deg, #C41E3A, #C9A961, #C41E3A)" }}
            />

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left — content */}
              <div className="p-10 lg:p-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 text-[11px] font-black tracking-widest uppercase"
                  style={{ background: "#C41E3A", color: "#FFF" }}>
                  🏭 We're Exhibiting!
                </div>

                <h2
                  className="text-3xl lg:text-4xl font-black leading-tight mb-2"
                  style={{ color: "#000" }}
                >
                  Meet Us at
                </h2>
                <h2
                  className="text-4xl lg:text-5xl font-black leading-tight mb-8"
                  style={{
                    background: "linear-gradient(90deg, #8A6D3B, #C9A961, #8A6D3B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Boiler India 2026
                </h2>

                {/* Date & Venue */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(201,169,97,0.1)" }}
                    >
                      <Calendar size={15} style={{ color: "#8A6D3B" }} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>Date</p>
                      <p className="text-sm font-bold" style={{ color: "#000" }}>8 – 10 October 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(201,169,97,0.1)" }}
                    >
                      <MapPin size={15} style={{ color: "#8A6D3B" }} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>Venue</p>
                      <p className="text-sm font-bold leading-snug" style={{ color: "#000" }}>
                        CIDCO Exhibition & Convention Centre,<br />
                        <span className="font-normal" style={{ color: "rgba(0,0,0,0.7)" }}>Navi Mumbai, India</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(201,169,97,0.1)" }}
                    >
                      <Clock size={15} style={{ color: "#8A6D3B" }} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>Timing</p>
                      <p className="text-sm font-bold" style={{ color: "#000" }}>10:00 AM – 6:00 PM Daily</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(0,0,0,0.7)" }}>
                  Discover our latest industrial heating solutions, custom-engineered heating
                  elements, and innovative temperature control technologies at India's premier
                  boiler and thermal energy exhibition.
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2.5 mb-8">
                  {[
                    "Live Product Demonstrations",
                    "Meet Our Technical Experts",
                    "Custom Heating Solutions",
                    "Business & Dealer Enquiries",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: "#8A6D3B" }} />
                      <span className="text-xs leading-snug" style={{ color: "rgba(0,0,0,0.8)" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://india.boilerworldexpo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #8A6D3B, #C9A961)",
                      color: "#FFF",
                    }}
                  >
                    Visit Expo Website
                    <ArrowRight size={14} />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-black/5"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(0,0,0,0.15)",
                      color: "#000",
                    }}
                  >
                    Book a Meeting
                  </a>
                </div>
              </div>

              {/* Right — expo logo + decorative */}
              <div
                className="relative flex flex-col items-center justify-center p-10 lg:p-12"
                style={{ borderLeft: "1px solid rgba(0,0,0,0.05)" }}
              >
                {/* Glowing ring */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ zIndex: 0 }}
                >
                  <div
                    className="w-80 h-80 rounded-full"
                    style={{
                      background: "radial-gradient(ellipse, rgba(0,0,0,0.02) 0%, transparent 70%)",
                    }}
                  />
                </div>

                {/* Logo card */}
                <div
                  className="relative z-10 rounded-2xl p-8 flex items-center justify-center mb-8 w-full max-w-xs"
                  style={{
                    background: "rgba(0,0,0,0.02)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src="https://india.boilerworldexpo.com/wp-content/uploads/2025/06/BI26-tentative-logo.png"
                    alt="Boiler India 2026"
                    className="w-full object-contain max-h-36"
                  />
                </div>

                {/* Stat chips */}
                <div className="relative z-10 grid grid-cols-2 gap-3 w-full max-w-xs">
                  {[
                    { value: "3", label: "Days" },
                    { value: "500+", label: "Exhibitors" },
                    { value: "10K+", label: "Visitors Expected" },
                    { value: "Oct '26", label: "Next Edition" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl px-4 py-3 text-center"
                      style={{
                        background: "rgba(0,0,0,0.02)",
                        border: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <p
                        className="text-xl font-black mb-0.5"
                        style={{ color: "#000" }}
                      >
                        {s.value}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.5)" }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom shimmer */}
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,97,0.3), transparent)" }}
            />
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
            {[
              { img: "/images/exhibitions/e10.jpg", title: "Industrial Expo Ankleshwar 2022" },
              { img: "/images/exhibitions/e9.jpg", title: "Dahej Industrial Expo 2021" },
              { img: "/images/exhibitions/e1.webp", title: "IFEX 2020 : Tamil Nadu" },
              { img: "/images/exhibitions/e3.webp", title: "IFEX 2020 : Tamil Nadu" },
              { img: "/images/exhibitions/e4.jpg", title: "IFEX 2020 : Tamil Nadu" },
              { img: "/images/exhibitions/e5.jpg", title: "IFEX 2019 : NOIDA" },
              { img: "/images/exhibitions/e7.jpg", title: "IFEX 2017 : GANDHINAGAR" },
              { img: "/images/exhibitions/e8.jpg", title: "ELECRAMA 2016 : BANGLORE" },
            ].map((expo, idx) => (
              <div 
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col"
              >
                <div className="aspect-[16/11] w-full overflow-hidden bg-secondary/50 p-2 flex items-center justify-center">
                  <img 
                    src={expo.img} 
                    alt={expo.title} 
                    className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 text-center border-t border-border/50 bg-card/40 flex-1 flex items-center justify-center">
                  <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors">{expo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
