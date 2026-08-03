import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  X,
  ChevronDown,
  Globe,
} from "lucide-react";
import { Link } from "react-router";

function WhatsAppIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

import IsoSvg    from "../../imports/ISO_9001-2015.svg";
import CeSvg     from "../../imports/CE.svg";
import NsicSvg   from "../../imports/NSIC.svg";
import IsiSvg    from "../../imports/Isi_mark.svg";
import PesoSvg   from "../../imports/P___E_S_O_C.svg";

const certLogos = [
  { src: IsoSvg,  alt: "ISO 9001:2015" },
  { src: CeSvg,   alt: "CE Certified"  },
  { src: NsicSvg, alt: "NSIC"          },
  { src: IsiSvg,  alt: "ISI Mark"      },
  { src: PesoSvg, alt: "PESO"          },
];

/* ─── Location data ─────────────────────────────────────────────── */
const indiaLocations: Record<string, string[]> = {
  Maharashtra: [
    "Pune",
    "Mumbai",
    "Thane",
    "Nashik",
    "Nagpur",
    "Aurangabad",
    "Kolhapur",
    "Sangli",
    "Satara",
    "Solapur",
    "Ahmednagar",
    "Chandrapur",
    "Amaravati",
    "Buldhana",
    "Jalgaon",
    "Ratnagiri",
    "Bhandara",
    "Gadchiroli",
    "Beed",
    "Gondia",
    "Latur",
    "Nanded",
    "Akola",
    "Hingoli",
    "Jalna",
    "Palghar",
    "Dhule",
    "Sindhudurg",
    "Wardha",
  ],
  Gujarat: [
    "Ahmedabad",
    "Vadodara",
    "Surat",
    "Rajkot",
    "Gandhinagar",
    "Bharuch",
    "Bhuj",
    "Jamnagar",
    "Kheda",
    "Porbandar",
    "Dwarka",
    "Kutch",
    "Godhra",
  ],
  "Andhra Pradesh": [
    "Hyderabad",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kakinada",
    "Tirupati",
    "Rajahmundry",
    "Kurnool",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Anantapur",
  ],
  Karnataka: [
    "Bangalore",
    "Mysore",
    "Mangalore",
    "Hubli",
    "Hassan",
    "Hampi",
    "Udupi",
    "Karwar",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Tirunelveli",
    "Thanjavur",
    "Ooty",
    "Kodaikanal",
    "Rameshwaram",
    "Kanyakumari",
    "Karur",
  ],
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Khammam",
    "Nizamabad",
    "Adilabad",
    "Nalgonda",
    "Medak",
    "Sangareddy",
  ],
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
    "Bikaner",
    "Jaisalmer",
    "Alwar",
    "Bundi",
    "Patiala",
  ],
  Punjab: [
    "Amritsar",
    "Ludhiana",
    "Chandigarh",
    "Jalandhar",
    "Patiala",
  ],
  Haryana: ["Chandigarh", "Faridabad", "Gurgaon"],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Agra",
    "Varanasi",
    "Allahabad",
    "Meerut",
  ],
  Delhi: ["Delhi", "New Delhi"],
  "Madhya Pradesh": [
    "Bhopal",
    "Indore",
    "Gwalior",
    "Khajuraho",
    "Orchha",
  ],
  Kerala: [
    "Kochi",
    "Thiruvananthapuram",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Kannur",
    "Alleppey",
    "Munnar",
    "Kottayam",
  ],
  "West Bengal": ["Kolkata", "Durgapur", "Asansol", "Siliguri"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Orissa: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Puri",
    "Konark",
  ],
  Assam: [
    "Guwahati",
    "Dispur",
    "Dibrugarh",
    "Jorhat",
    "Tezpur",
  ],
  Goa: ["Panaji", "Vasco Da Gama", "Margao", "Mapusa", "Ponda"],
  "Himachal Pradesh": [
    "Shimla",
    "Manali",
    "Dharamshala",
    "Kullu",
    "Mandi",
  ],
  "Jammu & Kashmir": [
    "Srinagar",
    "Jammu",
    "Leh",
    "Gulmarg",
    "Pahalgam",
  ],
  Bihar: ["Patna", "Gaya", "Nalanda", "Vaishali"],
  Chhattisgarh: ["Raipur"],
  Sikkim: ["Gangtok"],
};

const internationalLocations: Record<string, string[]> = {
  "Gulf & Middle East": [
    "UAE (Dubai)",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Oman",
    "Bahrain",
    "Iraq",
    "Jordan",
    "Iran",
    "Turkey",
    "Yemen",
    "Syria",
  ],
  Europe: [
    "Germany",
    "Poland",
    "France",
    "UK",
    "Italy",
    "Netherlands",
    "Spain",
    "Sweden",
    "Norway",
    "Belgium",
    "Austria",
    "Switzerland",
    "Denmark",
    "Finland",
    "Czech Republic",
    "Portugal",
    "Romania",
    "Greece",
  ],
  Asia: [
    "South Korea",
    "Japan",
    "Singapore",
    "Malaysia",
    "Indonesia",
    "Vietnam",
    "Thailand",
    "Taiwan",
    "Philippines",
    "Sri Lanka",
    "Bangladesh",
    "Nepal",
    "China",
    "Cambodia",
  ],
  Africa: [
    "South Africa",
    "Nigeria",
    "Egypt",
    "Kenya",
    "Ghana",
    "Ethiopia",
    "Tanzania",
    "Morocco",
    "Algeria",
    "Libya",
    "Tunisia",
    "Uganda",
    "Angola",
    "Zambia",
    "Zimbabwe",
  ],
  Americas: [
    "USA",
    "Canada",
    "Brazil",
    "Mexico",
    "Colombia",
    "Argentina",
    "Peru",
    "Chile",
    "Venezuela",
    "Ecuador",
  ],
  "Central Asia": [
    "Kazakhstan",
    "Uzbekistan",
    "Kyrgyzstan",
    "Turkmenistan",
    "Tajikistan",
    "Russia",
  ],
};

/* ─── Google Translate injection ────────────────────────────────── */
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function useGoogleTranslate(elementId: string) {
  useEffect(() => {
    if (document.getElementById("google-translate-script"))
      return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout:
              window.google.translate.TranslateElement
                .InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          elementId,
        );
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, [elementId]);
}

/* ─── Map Tooltip ───────────────────────────────────────────────── */
function MapTooltip({
  place,
  suffix,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
}: {
  place: string;
  suffix: string;
  x: number;
  y: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const query = encodeURIComponent(`${place}${suffix}`);
  const src = `https://maps.google.com/maps?q=${query}&z=10&output=embed&hl=en`;

  /* flip to left if near right edge */
  const flipX = x > window.innerWidth - 300;

  return (
    <div
      className="fixed z-[300] pointer-events-auto"
      style={{
        top: y - 8,
        left: flipX ? x - 280 : x + 12,
        transform: "translateY(-50%)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden w-64">
        <div className="bg-primary px-3 py-1.5 flex items-center gap-1.5">
          <MapPin size={11} className="text-white shrink-0" />
          <span className="text-white text-[11px] font-semibold truncate">
            {place}
          </span>
          <span className="ml-auto text-white/50 text-[9px]">scroll to zoom</span>
        </div>
        <iframe
          src={src}
          width="256"
          height="180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block border-0"
        />
      </div>
    </div>
  );
}

/* ─── Hoverable chip ────────────────────────────────────────────── */
function CityChip({
  name,
  suffix,
  className,
}: {
  name: string;
  suffix: string;
  className?: string;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const scheduleHide = () => {
    hideTimer.current = setTimeout(() => setPos(null), 200);
  };

  const show = (e: React.MouseEvent) => {
    cancelHide();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: r.right, y: r.top + r.height / 2 });
  };

  return (
    <>
      <span
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        className={`cursor-default transition-colors hover:bg-primary/10 hover:border-primary/40 hover:text-primary ${className ?? ""}`}
      >
        {name}
      </span>
      {pos && (
        <MapTooltip
          place={name}
          suffix={suffix}
          x={pos.x}
          y={pos.y}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        />
      )}
    </>
  );
}

/* ─── Locations Modal ───────────────────────────────────────────── */
function LocationsModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"india" | "international">(
    "india",
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 bg-gradient-to-r from-primary to-primary/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <MapPin className="text-white" size={22} />
            <div>
              <h2 className="text-white font-bold text-lg leading-none">
                Locations We Serve
              </h2>
              <p className="text-white/70 text-xs mt-0.5">
                250+ cities across India · Exports to 6 continents ·{" "}
                <span className="italic opacity-80">
                  Hover a city to preview on map
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-7 pt-4 pb-0 flex-shrink-0">
          {(["india", "international"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-t-xl text-sm font-semibold transition-all border-b-2 ${
                tab === t
                  ? "bg-primary/10 text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {t === "india" ? "🇮🇳 India" : "🌍 International"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-7 py-5">
          {tab === "india" ? (
            <div className="columns-2 md:columns-3 gap-6 space-y-5">
              {Object.entries(indiaLocations).map(
                ([state, cities]) => (
                  <div
                    key={state}
                    className="break-inside-avoid mb-5"
                  >
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 border-b border-primary/20 pb-1">
                      {state}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {cities.map((city) => (
                        <CityChip
                          key={city}
                          name={city}
                          suffix={`, ${state}, India`}
                          className="text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5"
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.entries(internationalLocations).map(
                ([region, countries]) => (
                  <div
                    key={region}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 pb-1 border-b border-primary/20">
                      {region}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {countries.map((country) => (
                        <CityChip
                          key={country}
                          name={country}
                          suffix=""
                          className="text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-2 py-0.5"
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── TopBar ────────────────────────────────────────────────────── */
export function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [showLocations, setShowLocations] = useState(false);

  useGoogleTranslate("google_translate_element");

  useEffect(() => {
    const handleScroll = () =>
      setIsVisible(window.scrollY < 600);
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`h-15 fixed top-0 left-0 right-0 z-[60] bg-[#FFFAF3] border-b border-[#C41E3A]/20 transition-all duration-300 `}
      >
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center justify-between h-12 text-sm">
            {/* Left — cert logos */}
            <div className="hidden lg:flex items-center gap-2">
              {certLogos.map((c) => (
                <div
                  key={c.alt}
                  className="group relative h-6 w-auto flex items-center justify-center bg-white border border-gray-200 rounded px-1.5 py-0.5 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:shadow-md"
                  title={c.alt}
                >
                  <img
                    src={c.src}
                    alt={c.alt}
                    className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                  {/* Zoom preview on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-[100] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 scale-90 group-hover:scale-100">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-3 flex flex-col items-center gap-2 w-28">
                      <img
                        src={c.src}
                        alt={c.alt}
                        className="w-16 h-16 object-contain"
                      />
                      <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight whitespace-nowrap">
                        {c.alt}
                      </span>
                    </div>
                    {/* Arrow */}
                    <div className="w-2.5 h-2.5 bg-white border-r border-b border-gray-100 rotate-45 mx-auto -mt-1.5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Center — contact */}
            <div className="flex items-center gap-2 sm:gap-4 ml-0 lg:ml-auto">
              {/* Phone */}
              <a
                href="tel:+919822946344"
                className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors"
              >
                <Phone size={12} className="text-primary" />
                <span className="hidden sm:inline text-xs">+91 9822946344</span>
              </a>

              <span className="text-gray-200 text-xs">|</span>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919822946344"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-600 hover:text-[#25D366] transition-colors"
              >
                <span className="text-[#25D366]">
                  <WhatsAppIcon size={13} />
                </span>
                <span className="hidden sm:inline text-xs">WhatsApp</span>
              </a>

              <span className="text-gray-200 text-xs">|</span>

              {/* Email */}
              <Link
                to="/contact"
                className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors"
              >
                <Mail size={12} className="text-primary" />
                <span className="hidden sm:inline text-xs">sales@rashmiheaters.com</span>
              </Link>
            </div>

            {/* Right — Locations + Translate */}
            <div className="flex items-center gap-2 sm:gap-4 ml-4 sm:ml-6 lg:ml-6">
              {/* Locations We Serve */}
              <button
                onClick={() => setShowLocations(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors border border-primary/30 hover:border-primary/60 rounded-full px-2 sm:px-3 py-1 bg-primary/5 hover:bg-primary/10"
              >
                <MapPin size={14} className="sm:w-3 sm:h-3" />
                <span className="hidden sm:inline">
                  Locations We Serve
                </span>
                <ChevronDown size={11} className="hidden sm:inline" />
              </button>

              {/* Google Translate */}
              
                <div
                  id="google_translate_element"
                  className="  [&_.goog-te-gadget]:!text-[0px] [&_.goog-te-gadget_span]:!hidden [&_select]:!text-[10px] [&_select]:!border-0 [&_select]:!outline-none [&_select]:!bg-transparent [&_select]:!text-gray-600 [&_select]:!font-medium [&_select]:cursor-pointer [&_select]:!p-0 [&_select]:!m-0 [&_select]:!h-6 [&_select]:max-w-[80px] [&_select]:!leading-none"
                />
            <div>Select Language</div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Locations modal */}
      {showLocations && (
        <LocationsModal
          onClose={() => setShowLocations(false)}
        />
      )}
    </>
  );
}