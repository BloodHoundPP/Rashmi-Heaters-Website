import { useEffect } from "react";
import { useLocation } from "react-router";
import { Award, Users, Factory, TrendingUp, Shield, Target, Globe, Zap, MapPin, CheckCircle2, Cpu, Wrench, ClipboardList, Gauge, FileCheck, Star, ThumbsUp, BarChart3, Handshake, FlaskConical, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import engineeringImg from "../../imports/Untitled_design__28_.png";
import ourStoryImg from "../../imports/bag filter.png";
import PesocSvg from "../../imports/P___E_S_O_C.svg";
import CeSvg from "../../imports/CE.svg";
import NsicSvg from "../../imports/NSIC.svg";
import IsiMarkSvg from "../../imports/Isi_mark.svg";
import IsoSvg from "../../imports/ISO_9001-2015.svg";

const pillars = [
  { label: "Service",      Icon: Handshake,   color: "#2563eb", angle: 270 },
  { label: "Improvement",  Icon: BarChart3,    color: "#7c3aed", angle: 330 },
  { label: "Satisfaction", Icon: ThumbsUp,     color: "#059669", angle: 30  },
  { label: "Business",     Icon: Star,         color: "#d97706", angle: 90  },
  { label: "Customer",     Icon: Users,        color: "#dc2626", angle: 150 },
  { label: "Standard",     Icon: BadgeCheck,   color: "#0891b2", angle: 210 },
];

function QualityWheel() {
  const R = 148; // orbit radius (px) — fits in 340px canvas
  return (
    <div className="flex items-center justify-center w-full py-6">
      <div className="relative" style={{ width: 340, height: 340 }}>

        {/* ── Decorative glow blobs ── */}
        <div className="absolute inset-0 rounded-full bg-primary/8 blur-3xl scale-110 pointer-events-none" />

        {/* ── Outer dashed orbit ring ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 340 340"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="spokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Outer orbit */}
          <circle cx="170" cy="170" r={R} fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="6 5" />
          {/* Inner subtle ring */}
          <circle cx="170" cy="170" r="88" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.12" />

          {/* Spokes */}
          {pillars.map(({ angle, color }) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={170 + 82 * Math.cos(rad)}
                y1={170 + 82 * Math.sin(rad)}
                x2={170 + (R - 28) * Math.cos(rad)}
                y2={170 + (R - 28) * Math.sin(rad)}
                stroke={color}
                strokeWidth="1.5"
                strokeOpacity="0.35"
                strokeDasharray="3 3"
              />
            );
          })}
        </svg>

        {/* ── Centre badge ── */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center rounded-full shadow-2xl"
          style={{
            width: 140,
            height: 140,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, #7c3aed) 100%)",
            boxShadow: "0 0 0 6px color-mix(in srgb, var(--color-primary) 15%, transparent), 0 20px 50px -10px color-mix(in srgb, var(--color-primary) 50%, transparent)",
          }}
        >
          <Shield className="text-white mb-1" size={28} strokeWidth={1.8} />
          <span className="text-white text-[10px] font-black tracking-widest text-center leading-snug px-3 uppercase">
            Quality<br />Assurance
          </span>
        </div>

        {/* ── Orbital nodes ── */}
        {pillars.map(({ label, Icon, color, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 170 + R * Math.cos(rad);
          const y = 170 + R * Math.sin(rad);
          return (
            <div
              key={label}
              className="absolute z-10 flex flex-col items-center gap-1 group"
              style={{
                width: 72,
                height: 72,
                top: y - 36,
                left: x - 36,
              }}
            >
              {/* Node disc */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${color}18 0%, ${color}30 100%)`,
                  border: `2px solid ${color}40`,
                  boxShadow: `0 4px 20px -4px ${color}50`,
                }}
              >
                <Icon size={20} style={{ color }} strokeWidth={2} />
              </div>
              {/* Label */}
              <span
                className="text-[9px] font-bold tracking-wider uppercase text-center leading-tight"
                style={{ color }}
              >
                {label}
              </span>
            </div>
          );
        })}

        {/* ── Corner accent dots ── */}
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 170 + 88 * Math.cos(rad);
          const y = 170 + 88 * Math.sin(rad);
          return (
            <div
              key={a}
              className="absolute rounded-full bg-primary/30"
              style={{ width: 5, height: 5, top: y - 2.5, left: x - 2.5 }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [hash]);

  const milestones = [
    { year: "1991", event: "Founded in Pune", description: "Rashmi Heaters Pvt. Ltd. established in Pune, India — beginning a legacy of precision industrial heating." },
    { year: "1995", event: "Step to manufacture", description: "Installed the machines imported from USA, total modernization of manufacturing process." },
    { year: "1998", event: "NSIC Certification", description: "Received NSIC certification, enabling Government Purchase Enlistment and expanding our institutional client base." },
    { year: "2005", event: "ISO 9001 Certified", description: "Achieved ISO 9001 Quality Management System certification, reinforcing our commitment to international quality standards." },
    { year: "2010", event: "Expanded Manufacturing", description: "Doubled production capacity with world-class machinery to meet growing demand across industries." },
    { year: "2015", event: "250+ Cities Served", description: "Reached the milestone of serving clients across 250+ cities pan-India, becoming a national leader in heating solutions." },
    { year: "2020", event: "Further Expansion", description: "Established active export operations to Nepal,Saudi Arebia, African Contries, Fiji, Gulf Contries, UAE, Indonesia." },
    { year: "2026", event: "Industry Leader", description: "Recognised as one of India's largest manufacturers of industrial electric heaters and heating solutions." },
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "ISO 9001:2015 certified processes with 100% inspection at every production stage — uncompromising standards from raw material to final dispatch.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Deep understanding of customer needs is at the heart of every design. Quality and customer satisfaction have always been, and will remain, our top priority.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Continuous R&D investment drives our ability to solve critical and challenging process heating requirements across evolving industries.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for perfection in every product, every interaction, and every after-sales engagement — from order processing to product literature.",
    },
  ];

  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management System", logo: IsoSvg },
    { name: "CE Certified", description: "Compliant for European Economic Area", logo: CeSvg },
    { name: "NSIC Certified", description: "Government Purchase Enlistment Certificate", logo: NsicSvg },
    { name: "ISI Mark", description: "Indian Standards Institution", logo: IsiMarkSvg },
    { name: "PESO", description: "Petroleum and Explosive Safety organization", logo: PesocSvg },
  ];

  const globalPresence = [
    { country: "India", detail: "250+ cities served pan-India", flag: "🇮🇳" },
    { country: "Nepal", detail: "Exports to leading European manufacturers", flag: "NP" },
    { country: "UAE", detail: "Oil & Gas and petrochemical clients", flag: "🇦🇪" },
    { country: "Saudi Arebia", detail: "Industrial and marine sector clients", flag: "SA" },
    { country: "Bhutan", detail: "Precision manufacturing industry", flag: "BT" },
    { country: "Fiji", detail: "European industrial heating applications", flag: "FJ" },
  ];

  const applications = [
    { icon: Zap, label: "Oil & Gas Industry" },
    { icon: Factory, label: "Refineries & Petrochemicals" },
    { icon: Cpu, label: "Power Generation" },
    { icon: Wrench, label: "Chemical Processing" },
    { icon: Globe, label: "Marine Applications" },
    { icon: Shield, label: "Research & Development" },
    { icon: Target, label: "Plastic & Rubber" },
    { icon: Award, label: "Pharmaceutical & Food" },
  ];

  return (
    <div className="min-h-screen pt-20">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-background via-card/40 to-background py-24 border-b border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1320px] mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <Factory className="text-primary" size={16} />
              <span className="text-sm text-primary font-semibold">Established 1991 · Pune, India</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              About Rashmi Heaters<br />
              <span className="text-primary">Pvt. Ltd.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Rashmi Heaters Pvt. Ltd. (RHPL), established in 1991 in Pune, India, is one of the largest manufacturers of industrial electric heaters and heating solutions — serving 250+ cities across India and exporting to Germany, UAE, African Contries,Nepal, Fiji,Gulf contries.
            </p>
            {/* Key trust signals */}
            <div className="flex flex-wrap gap-3">
              {["ISO 9001:2015 Certified", "NSIC Certified", "CE Marked","PESO Certified","ZED SILVER Certified", "30+ Years Experience", "CIMR Certified","250+ Cities"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 text-sm bg-card border border-border text-foreground px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={13} className="text-primary" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY OVERVIEW ── */}
      <section id="our-story" className="py-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                <TrendingUp className="text-primary" size={16} />
                <span className="text-sm text-primary font-semibold">Our Story</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Engineering Heating Solutions Since 1991
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <strong className="text-foreground">Rashmi Heaters (P) Ltd.</strong> was established in <strong className="text-foreground">1991 in Pune, India</strong> with a unique vision to manufacture <strong className="text-foreground">mineral filled metal tubular electric heaters</strong> that meet the most demanding heavy process requirements. Over three decades, that vision has made <strong className="text-foreground">RHPL</strong> one of the most trusted names in the Indian heating industry.
                </p>
                <p>
                  Equipped with <strong className="text-foreground">modern equipment, machines</strong>, <strong className="text-foreground">testing equipment</strong>, <strong className="text-foreground">innovative technology</strong> and a <strong className="text-foreground">dedicated team of qualified engineers</strong> — we design, develop, and manufacture <strong className="text-foreground">customized electric heaters</strong>, systems, regulation & <strong className="text-foreground">complete heating systems & solutions</strong>.
                </p>
                <p>
                  We continuously work to <strong className="text-foreground">improve and innovate</strong> the product, manufacturing process, and communication system to achieve <strong className="text-foreground">total customer satisfaction</strong> — which is our top priority, always.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {[
                  { value: "30+", label: "Years in Business" },
                  { value: "250+", label: "Cities Served" },
                  { value: "A+", label: "Excellent Quality" },
                  { value: "1000+", label: "Installations" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center bg-card border border-border rounded-2xl p-4">
                    <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Extraordinary product showcase ── */}
            <div className="relative min-h-[520px] flex items-center justify-center overflow-hidden rounded-3xl" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a1628 100%)" }}>

              {/* Grid texture overlay */}
              <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

              {/* Radial spotlight */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(var(--color-primary-rgb, 59,130,246), 0.18) 0%, transparent 70%)" }} />

              {/* Top-left corner bracket */}
              <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
              {/* Top-right corner bracket */}
              <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
              {/* Bottom-left corner bracket */}
              <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
              {/* Bottom-right corner bracket */}
              <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />

              {/* Animated outer pulse ring */}
              <div className="absolute inset-12 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
              {/* Static inner ring */}
              <div className="absolute inset-16 rounded-full border border-primary/8" />

              {/* Horizontal scan line */}
              <div className="absolute left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent top-1/3" />
              <div className="absolute left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent bottom-1/3" />

              {/* Floating stat chips */}
              <div className="absolute top-10 left-10 z-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
                <p className="text-white/50 text-[9px] uppercase tracking-widest">Est.</p>
                <p className="text-white font-bold text-sm">1991</p>
              </div>
              <div className="absolute top-10 right-10 z-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 text-right">
                <p className="text-white/50 text-[9px] uppercase tracking-widest">Standard</p>
                <p className="text-primary font-bold text-sm">ISO 9001</p>
              </div>
              <div className="absolute bottom-10 left-10 z-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
                <p className="text-white/50 text-[9px] uppercase tracking-widest">Experience</p>
                <p className="text-white font-bold text-sm">30+ Yrs</p>
              </div>
              <div className="absolute bottom-10 right-10 z-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 text-right">
                <p className="text-white/50 text-[9px] uppercase tracking-widest">Served</p>
                <p className="text-white font-bold text-sm">250+ Cities</p>
              </div>

              {/* Glow pool beneath product */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full blur-2xl" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.35) 0%, transparent 70%)" }} />

              {/* Product image — floating with deep shadow */}
              <img
                src={ourStoryImg}
                alt="Rashmi Heaters Industrial Heating Elements"
                className="relative z-10 w-[78%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                style={{ filter: "drop-shadow(0 0 40px rgba(59,130,246,0.15))" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE MANUFACTURE ── */}
      <section id="what-we-manufacture" className="py-20 bg-card/30">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <Wrench className="text-primary" size={16} />
              <span className="text-sm text-primary font-semibold">Products & Solutions</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What We Design, Develop & Manufacture
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From standard electric heating elements to fully customised industrial heating systems — RHPL delivers energy-efficient, reliable, and application-specific solutions for critical process requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Zap,
                title: "Customised Electric Heaters",
                desc: "Heaters and heating systems specially designed and engineered to meet your heating requirements with specification and application requirements."
              },
              {
                icon: Factory,
                title: "Standard Industrial Heaters",
                desc: "A comprehensive range of cartridge heaters, tubular heaters, immersion heaters, High Density, and more — manufactured to international quality standards for consistent performance."
              },
              {
                icon: Cpu,
                title: "Complete Heating Systems",
                desc: "End-to-end electric heating system design and supply for Oil & Gas, refineries, power plants, petrochemicals, chemicals, marine, and R&D applications — with full engineering support."
              },
            ].map((item) => (
              <Card key={item.title} className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application tags */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest">Key Application Industries</p>
            <div className="flex flex-wrap justify-center gap-3">
              {applications.map(({ icon: Icon, label }) => (
                <div key={label} className="inline-flex items-center gap-2 bg-card border border-border text-sm text-foreground px-4 py-2 rounded-full hover:border-primary/50 hover:text-primary transition-all">
                  <Icon size={14} className="text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ── */}
      <section id="global-presence" className="py-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                <Globe className="text-primary" size={16} />
                <span className="text-sm text-primary font-semibold">Global Reach</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Serving Industries Across India & the World
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Headquartered in Pune, India, Rashmi Heaters serves clients across <strong className="text-foreground">250+ cities in India</strong> and exports precision heaters to 6+ countries. Our world-class manufacturing facilities in Pune ensure international-grade quality for every shipment.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {globalPresence.map((item) => (
                  <div key={item.country} className="flex items-start gap-3 bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-colors">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.country}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-2xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578776349090-de61da00ff1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Rashmi Heaters Global Export Manufacturing"
                className="relative rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm font-semibold">Manufacturing HQ: Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section id="core-values" className="py-20 bg-card/30">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <Target className="text-primary" size={16} />
              <span className="text-sm text-primary font-semibold">Our Values</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that have guided Rashmi Heaters since 1991
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="journey" className="py-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="text-primary" size={16} />
              <span className="text-sm text-primary font-semibold">Our Journey</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Over Three Decades of Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones in Rashmi Heaters' journey from a Pune startup to an international manufacturer
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-border to-primary/20"></div>
            <div className="space-y-10">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card className="inline-block max-w-sm hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="text-3xl font-black text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{milestone.event}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                      <TrendingUp className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── R&D & TECHNICAL SUPPORT ── */}
      <section id="engineering" className="py-20 bg-gradient-to-br from-primary/5 via-card/30 to-accent/5">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden rounded-3xl"
              style={{ background: "linear-gradient(160deg, #0c1a0e 0%, #0f2012 40%, #091a10 100%)" }}>

              {/* Dot-grid texture */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              {/* Deep green radial glow behind product */}
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 65% 55% at 52% 60%, rgba(34,197,94,0.14) 0%, transparent 70%)" }} />

              {/* Corner brackets */}
              <div className="absolute top-5 left-5 w-9 h-9 border-t-2 border-l-2 border-green-400/40 rounded-tl-lg" />
              <div className="absolute top-5 right-5 w-9 h-9 border-t-2 border-r-2 border-green-400/40 rounded-tr-lg" />
              <div className="absolute bottom-5 left-5 w-9 h-9 border-b-2 border-l-2 border-green-400/40 rounded-bl-lg" />
              <div className="absolute bottom-5 right-5 w-9 h-9 border-b-2 border-r-2 border-green-400/40 rounded-br-lg" />

              {/* Horizontal accent lines */}
              <div className="absolute left-8 right-8 h-px top-1/4"
                style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.2), transparent)" }} />
              <div className="absolute left-8 right-8 h-px bottom-1/4"
                style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.12), transparent)" }} />

              {/* Vertical accent line left */}
              <div className="absolute top-8 bottom-8 left-1/4 w-px"
                style={{ background: "linear-gradient(180deg, transparent, rgba(74,222,128,0.12), transparent)" }} />

              {/* Floating stat chips */}
              <div className="absolute top-8 left-8 z-20 bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-xl px-3 py-2">
                <p className="text-green-400/60 text-[9px] uppercase tracking-widest">Material</p>
                <p className="text-white font-bold text-xs">Stainless Steel</p>
              </div>
              <div className="absolute top-8 right-8 z-20 bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-xl px-3 py-2 text-right">
                <p className="text-green-400/60 text-[9px] uppercase tracking-widest">Precision</p>
                <p className="text-green-400 font-bold text-xs">IS – 659</p>
              </div>
              <div className="absolute bottom-8 left-8 z-20 bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-xl px-3 py-2">
                <p className="text-green-400/60 text-[9px] uppercase tracking-widest">Certified</p>
                <p className="text-white font-bold text-xs">ISO 9001</p>
              </div>
              <div className="absolute bottom-8 right-8 z-20 bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-xl px-3 py-2 text-right">
                <p className="text-green-400/60 text-[9px] uppercase tracking-widest">Experience</p>
                <p className="text-white font-bold text-xs">30+ Years</p>
              </div>

              {/* Glow pool beneath product */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-56 h-12 rounded-full blur-2xl"
                style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.3) 0%, transparent 70%)" }} />

              {/* Product image */}
              <img
                src={engineeringImg}
                alt="Rashmi Heaters Precision Heating Elements"
                className="relative z-10 w-[72%] object-contain"
                style={{ filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 30px rgba(34,197,94,0.12))" }}
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                <Cpu className="text-primary" size={16} />
                <span className="text-sm text-primary font-semibold">Engineering Excellence</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Dedicated Team. Deep Technical Expertise.
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Rashmi Heaters Pvt. Ltd. is equipped with a <strong className="text-foreground">dedicated team of qualified engineers</strong> who work closely with clients from requirement analysis through to post-installation support.
                </p>
                <p>
                  Our experienced technical team provides extensive support to valued customers for electric heaters used in <strong className="text-foreground">research and development</strong> — including custom prototypes, application-specific testing, and documentation.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Custom heater prototyping",
                  "Application engineering support",
                  "Installation & commissioning",
                  "R&D project collaboration",
                  "Post-delivery technical helpline",
                  "Product documentation & traceability",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY ASSURANCE ── */}
      <section id="quality" className="py-20 bg-card/30">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <Shield className="text-primary" size={16} />
              <span className="text-sm text-primary font-semibold">Quality Assurance</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Quality Commitment</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are Manufacturer, Supplier, Exporter of Industrial Heaters, Standard Heating Elements, U-Shaped Air Heating Elements from Pune, Maharashtra, India.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — quality points */}
            <div className="space-y-6">
              {[
                {
                  icon: ClipboardList,
                  title: "Necessary Equipment & Gadgets",
                  desc: "We have all the Necessary Equipments & Gadgets for Inspection & Testing of Heaters as per IS – 4159.",
                },
                {
                  icon: Gauge,
                  title: "Calibrated Instruments",
                  desc: "The equipments & Gadgets are Calibrated as per relevant standards Time to Time to ensure measurement accuracy.",
                },
                {
                  icon: FileCheck,
                  title: "Proper Documentation",
                  desc: "We provide proper documents, MTC, Inspection reports, Videos of Inspections & Third Party Inspection reports.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-5 bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-md group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — Quality Assurance orbital diagram */}
            <QualityWheel />
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="py-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <Award className="text-primary" size={16} />
              <span className="text-sm text-primary font-semibold">Accreditations</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Certifications & Quality Standards</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              RHPL is an ISO 9001:2015 and NSIC certified company — committed to international quality, safety, and compliance in every product we manufacture
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center space-y-4">
                  <div className="w-full h-28 flex items-center justify-center bg-white/60 rounded-xl p-4 group-hover:bg-white transition-colors">
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-bold text-foreground text-sm">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground">{cert.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
