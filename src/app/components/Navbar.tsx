import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Download,
  BookOpen,
} from "lucide-react";
import customizedCatalogPdf from "../../imports/customized_heaters.pdf";
import { FaWhatsapp } from "react-icons/fa";
import standardCatalogPdf from "../../imports/std-heater.pdf";
import { Button } from "./ui/button";
import logoImage from "../../imports/image-2.png";
import rashmiLogoImg from "../../imports/rashmiLogo.png";

/* ─── Sub-item path helper ─── */
const subPath = (
  cat: { path: string; name: string },
  sub: { label: string; slug?: string } | string,
) => {
  const slug = typeof sub === "object" ? sub.slug : undefined;
  if (cat.name === "Customized Heaters" && slug)
    return `/products/customized-heaters/${slug}`;
  return cat.path;
};

/* ─── Mega menu data ─── */
const megaMenu = {
  Products: {
    featured: {
      label: "Explore All Products",
      path: "/products",
      desc: "View our complete industrial heating catalogue",
    },
    categories: [
      {
        name: "Customized Heaters",
        path: "/products/customized-heaters",
        icon: "⚙️",
        desc: "Engineered to your exact specifications",
        sub: [
          { label: "Air Heaters",                    slug: "air-heaters" },
          { label: "Aluminium Casted Heaters",        slug: "aluminium-casted-heaters" },
          { label: "Aluminium Extrusion Press",       slug: "aluminium-extrusion-press" },
          { label: "Automotive Foundry",              slug: "automotive-foundry" },
          { label: "Belt Dryer",                      slug: "belt-dryer" },
          { label: "Biogas Generation",               slug: "biogas-generation" },
          { label: "CIP Chemical Heating",            slug: "cip-chemical-heating" },
          { label: "Copper Annealing",                slug: "copper-annealing" },
          { label: "ESP Heaters",                     slug: "esp-heaters" },
          { label: "HNX & Nitrogen Heaters",          slug: "hnx-nitrogen-heaters" },
          { label: "Load Bank",                       slug: "load-bank" },
          { label: "LPG & Propane Evaporators",       slug: "lpg-propane-evaporators" },
          { label: "Oil Heaters",                     slug: "oil-heaters" },
          { label: "Packaging Machine Tunnel",        slug: "packaging-machine-tunnel" },
          { label: "Panel Heaters",                   slug: "panel-heaters" },
          { label: "Reactor Heater",                  slug: "reactor-heater" },
          { label: "Space Heaters",                   slug: "space-heaters" },
          { label: "Steam Heaters",                   slug: "steam-heaters" },
          { label: "Syngas Heaters",                  slug: "syngas-heaters" },
          { label: "Water Heaters",                   slug: "water-heaters" },
        ],
      },
      {
        name: "D-Type Heaters",
        path: "/products/d-type-heaters",
        icon: "🔧",
        desc: "Compact elements for restricted spaces",
        sub: ["D-type Heaters"],
      },
      {
        name: "Control Panels",
        path: "/products/control-panel",
        icon: "🖥️",
        desc: "Precision temperature control systems",
        sub: [
          "Control Panel On/Off type",
          "Tyristorised Control Panel",
        ],
      },
      {
        name: "Standard Heaters",
        path: "/products/std-heaters",
        icon: "🏭",
        desc: "Reliable industrial heating elements",
        sub: [
          "U-Shaped Air Heating Elements",
          "Industrial Water heaters",
          "Oil heating elements",
          "Solar heaters",
          "Alkaline heaters",
          "Chemical heaters",
          "Fin heaters",
        ],
      },

      {
        name: "Cartridge Heaters",
        path: "/products/cartridge-heaters",
        icon: "⚡",
        desc: "High-density tubular heating elements",
        sub: [
          "Threaded Cartridge Heaters",
          "Flameproof Heaters",
          "High Watt Density Heaters",
          "Low high Density Heaters"
        ],
      },

      {
        name: "Open Wire Heaters",
        path: "/products/open-wire",
        icon: "🌀",
        desc: "Fast, uniform resistance wire heating",
        sub: ["Furnace Heaters","Bundle Rod Heaters","Stripe heaters","Bionet Heater"],
      },
    ],
  },
  "About Us": {
    featured: {
      label: "About Rashmi Heaters",
      path: "/about",
      desc: "Est. 1991 · Pune · ISO 9001:2015 certified industrial heater manufacturer",
    },
    categories: [
      {
        name: "Our Story",
        path: "/about#our-story",
        icon: "📖",
        desc: "Founded 1991 · Pune, India",
        sub: [
          "Established 1991",
          "30+ Years Experience",
          "World-class Manufacturing",
          "Qualified Engineering Team",
        ],
      },
      {
        name: "What We Manufacture",
        path: "/about#what-we-manufacture",
        icon: "⚙️",
        desc: "Electric heaters & heating systems",
        sub: [
          "Customised Electric Heaters",
          "Standard Industrial Heaters",
          "Complete Heating Systems",
          "Oil & Gas Applications",
        ],
      },
      {
        name: "Global Presence",
        path: "/about#global-presence",
        icon: "🌍",
        desc: "250+ cities · 6 export countries",
        sub: [
          "Pan-India – 250+ Cities",
          "Germany & Poland",
          "UAE & Indonesia",
          "South Korea",
        ],
      },
      {
        name: "Core Values",
        path: "/about#core-values",
        icon: "⭐",
        desc: "Quality, innovation & customer focus",
        sub: [
          "Quality First",
          "Customer Focus",
          "Innovation",
          "Excellence",
        ],
      },
      {
        name: "Our Journey",
        path: "/about#journey",
        icon: "🏁",
        desc: "Key milestones since 1991",
        sub: [
          "1991 – Founded",
          "2005 – ISO Certified",
          "2015 – 250+ Cities",
          "2020 – Global Exports",
        ],
      },
      {
        name: "Engineering Excellence",
        path: "/about#engineering",
        icon: "🔬",
        desc: "R&D & technical support team",
        sub: [
          "Custom Prototyping",
          "Application Engineering",
          "R&D Collaboration",
          "Post-delivery Support",
        ],
      },
      {
        name: "Quality Assurance",
        path: "/about#quality",
        icon: "✅",
        desc: "IS-659 testing · Calibrated instruments · MTC docs",
        sub: [
          "IS-659 Testing Equipment",
          "Calibrated Instruments",
          "MTC & Inspection Reports",
          "Third Party Inspection",
        ],
      },
      {
        name: "Certifications",
        path: "/about#certifications",
        icon: "🏆",
        desc: "ISO 9001:2015 · NSIC · CE · ISI",
        sub: [
          "ISO 9001:2015",
          "NSIC Certified",
          "CE Mark",
          "PESOC & ISI Mark",
        ],
      },
    ],
  },
};

type MegaKey = keyof typeof megaMenu;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaKey | null>(
    null,
  );
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileExpanded, setMobileExp] = useState<
    string | null
  >(null);
  const [hoveredCat, setHoveredCat] = useState<number>(0);
  const catalogTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const closeTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const location = useLocation();

  const handleClick = () =>
    window.open(
      "https://wa.me/919822946344?text=Hi, I'd like to know more about your heating solutions",
      "_blank",
    );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const openMenu = (key: MegaKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
    setHoveredCat(0);
  };
  const schedClose = () => {
    closeTimer.current = setTimeout(
      () => setActiveMenu(null),
      150,
    );
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const simpleLinks = [
    { name: "Contact", path: "/contact" },
    { name: "Blogs & Events", path: "/blogs" },
  ];

  const megaKeys = Object.keys(megaMenu) as MegaKey[];

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-primary ${
          isScrolled ? "top-15 shadow-lg" : "top-15 shadow-md"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center  shrink-0"
            >
              <img
                src={rashmiLogoImg}
                alt="Rashmi Heaters Logo"
                className="h-18 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span
                  className="text-white font-bold tracking-wide"
                  style={{
                    fontSize: "1.5rem",
                    letterSpacing: "0.07em",
                  }}
                >
                  RASHMI HEATERS PVT. LTD.
                </span>
                <span
                  className="text-black font-medium"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  SINCE 1991
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {/* Home */}
              <Link
                to="/"
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors hover:bg-white/20 ${location.pathname === "/" ? "bg-white/30 text-white" : "text-white"}`}
              >
                Home
              </Link>

              {/* Mega menu triggers */}
              {megaKeys.map((key) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => openMenu(key)}
                  onMouseLeave={schedClose}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md transition-colors hover:bg-white/20 ${activeMenu === key ? "bg-white/30 text-white" : "text-white"}`}
                  >
                    {key}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeMenu === key ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              ))}

              {/* Catalogs dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (catalogTimer.current)
                    clearTimeout(catalogTimer.current);
                  setCatalogOpen(true);
                  setActiveMenu(null);
                }}
                onMouseLeave={() => {
                  catalogTimer.current = setTimeout(
                    () => setCatalogOpen(false),
                    150,
                  );
                }}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md transition-colors hover:bg-white/20 ${catalogOpen ? "bg-white/30 text-white" : "text-white"}`}
                >
                  Catalogue
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${catalogOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {catalogOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-2 space-y-1">
                      <a
                        href={customizedCatalogPdf}
                        download="Customized_Heaters_Catalog.pdf"
                        onClick={() => setCatalogOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 group transition-colors"
                      >
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Download
                            size={16}
                            className="text-primary"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
                            Customized Heater Catalogue
                          </p>
                          <p className="text-xs text-gray-400">
                            PDF · Download
                          </p>
                        </div>
                      </a>
                      <a
                        href={standardCatalogPdf}
                        download="Standard_Heaters_Catalog.pdf"
                        onClick={() => setCatalogOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 group transition-colors"
                      >
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Download
                            size={16}
                            className="text-primary"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
                            Standard Heater Catalogue
                          </p>
                          <p className="text-xs text-gray-400">
                            PDF · Download
                          </p>
                        </div>
                      </a>
                    </div>
                    <div className="h-[3px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                  </div>
                )}
              </div>

              {/* Simple links */}
              {simpleLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors hover:bg-white/20 ${location.pathname === l.path ? "bg-white/30 text-white" : "text-white"}`}
                >
                  {l.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex">
              <Button
                onClick={handleClick}
                className="bg-white text-primary hover:bg-white/90"
              >
                <FaWhatsapp /> Talk to expert
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mega dropdown panel (outside nav so it overlaps freely) ── */}
      {activeMenu && megaMenu[activeMenu] && (
        <div
          className={`fixed left-0 right-0 z-40 bg-white shadow-2xl border-t-2 transition-all duration-200 ${isScrolled ? "top-20" : "top-[120px]"}`}
          onMouseEnter={cancelClose}
          onMouseLeave={schedClose}
        >
          <div className="max-w-[1320px] mx-auto px-6 py-8">
            <div className="flex gap-8">
              {/* Category list */}
              <div className="w-[280px] shrink-0 space-y-1">
                <p className="text-[1px] tracking-[0.2em] uppercase text-black font-semibold mb-3 px-2">
                  {activeMenu === "Products"
                    ? "Product Categories"
                    : "Quick Links"}
                </p>
                {megaMenu[activeMenu].categories.map(
                  (cat, i) => (
                    <button
                      key={cat.name}
                      onMouseEnter={() => setHoveredCat(i)}
                      onClick={() => setActiveMenu(null)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors group ${hoveredCat === i ? "bg-primary/5" : "hover:bg-gray-50"}`}
                    >
                      <span className="text-xl w-8 shrink-0">
                        {cat.icon}
                      </span>
                      <div className="min-w-0">
                        <Link
                          to={cat.path}
                          className={`text-sm font-semibold block ${hoveredCat === i ? "text-primary" : "text-gray-800"}`}
                        >
                          {cat.name}
                        </Link>
                        {/* <span className="text-xs text-gray-400 truncate block">{cat.desc}</span> */}
                      </div>
                      <ArrowRight
                        size={14}
                        className={`ml-auto shrink-0 transition-all ${hoveredCat === i ? "text-primary translate-x-0.5" : "text-gray-300"}`}
                      />
                    </button>
                  ),
                )}
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-gray-100 shrink-0" />

              {/* Sub-items panel */}
              <div className="flex-1">
                {(() => {
                  const cat =
                    megaMenu[activeMenu].categories[hoveredCat];
                  return (
                    <div key={hoveredCat}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">
                          {cat.icon}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">
                            {cat.name}
                          </h3>
                          {/* <p className="text-xs text-gray-400">{cat.desc}</p> */}
                        </div>
                      </div>
                      <div className="grid grid-cols-3">
                        {cat.sub.map((s) => {
                          const label = typeof s === "object" ? s.label : s;
                          return (
                            <Link
                              key={label}
                              to={subPath(cat, s)}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-primary/5 group transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                {label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-gray-100 shrink-0" />

              {/* Featured CTA */}
              <div className="w-[200px] shrink-0">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                      <ArrowRight
                        size={18}
                        className="text-white"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">
                      {megaMenu[activeMenu].featured.label}
                    </h4>
                    {/* <p className="text-xs text-gray-500 leading-relaxed">{megaMenu[activeMenu].featured.desc}</p> */}
                  </div>
                  <Link
                    to={megaMenu[activeMenu].featured.path}
                    onClick={() => setActiveMenu(null)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    Browse All <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="h-[3px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
      )}

      {/* ── Mobile menu ── */}
      {isMobileOpen && (
        <div
          className={`fixed left-0 right-0 z-40 bg-primary border-t border-black/10 overflow-y-auto max-h-[80vh] ${isScrolled ? "top-20" : "top-[120px]"}`}
        >
          <div className="px-6 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-white border-b border-black/10"
            >
              Home
            </Link>

            {megaKeys.map((key) => (
              <div key={key}>
                <button
                  onClick={() =>
                    setMobileExp(
                      mobileExpanded === key ? null : key,
                    )
                  }
                  className="w-full flex items-center justify-between py-3 text-sm font-medium text-white border-b border-black/10"
                >
                  {key}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileExpanded === key ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileExpanded === key && (
                  <div className="pl-4 pb-2 space-y-1">
                    {megaMenu[key].categories.map((cat) => (
                      <div key={cat.name}>
                        <Link
                          to={cat.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 py-2 text-sm font-semibold text-white/80"
                        >
                          <span>{cat.icon}</span> {cat.name}
                        </Link>
                        <div className="pl-7 space-y-1 mb-1">
                          {cat.sub.map((s) => {
                            const label = typeof s === "object" ? s.label : s;
                            return (
                              <Link
                                key={label}
                                to={subPath(cat, s)}
                                onClick={() => setMobileOpen(false)}
                                className="block text-xs text-white/60 py-1"
                              >
                                · {label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Catalogs */}
            <div>
              <button
                onClick={() =>
                  setMobileExp(
                    mobileExpanded === "Catalogs"
                      ? null
                      : "Catalogs",
                  )
                }
                className="w-full flex items-center justify-between py-3 text-sm font-medium text-white border-b border-black/10"
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={15} /> Catalogs
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileExpanded === "Catalogs" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === "Catalogs" && (
                <div className="pl-4 pb-2 space-y-1">
                  <a
                    href={customizedCatalogPdf}
                    download="Customized_Heaters_Catalog.pdf"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm text-white/80"
                  >
                    <Download size={14} /> Customized Heater
                    Catalog
                  </a>
                  <a
                    href={standardCatalogPdf}
                    download="Standard_Heater_Catalog.pdf"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm text-white/80"
                  >
                    {" "}
                    <Download size={14} /> Standard Heater
                    Catalog{" "}
                  </a>
                </div>
              )}
            </div>

            {simpleLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium text-white border-b border-black/10"
              >
                {l.name}
              </Link>
            ))}

            <div className="pt-3">
              <Button
                onClick={handleClick}
                className="w-full bg-white text-primary"
              >
                <FaWhatsapp /> Talk to expert
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}