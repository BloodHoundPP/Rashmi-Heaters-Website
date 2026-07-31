import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Search,
  Pencil,
  Cog,
  TestTube2,
  Truck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Package
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import customDesignImg from "../../imports/custom-design.jpg";
import manufacturingImg from "../../imports/Manufacting.png";
import qualityTestingImg from "../../imports/Quality-testing.png";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  details: string[];
  tag: string;
}

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Analysis",
    description: "We begin by deeply understanding your specific heating needs — application environment, temperature range, wattage, and operational constraints — before any engineering starts.",
    icon: Search,
    image: "https://images.unsplash.com/photo-1765020553734-2c050ddb9494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    details: [
      "In-depth consultation with our technical team",
      "Analysis of application and environment requirements",
      "Precise temperature and wattage calculations",
      "Feasibility review and material shortlisting"
    ],
    tag: "Discovery"
  },
  {
    step: "02",
    title: "Custom Design",
    description: "Our engineers craft a tailored solution using CAD modeling and simulation, selecting optimal materials and heater geometry to maximize thermal efficiency for your application.",
    icon: Pencil,
    image: customDesignImg,
    details: [
      "CAD modeling and 3D prototyping",
      "Material selection and specification",
      "Thermal efficiency simulation",
      "Design review and client sign-off"
    ],
    tag: "Engineering"
  },
  {
  step: "03",
  title: "Raw Material Procurement",
  description: "After the design is finalized, we procure premium-grade raw materials from certified suppliers. Every material undergoes strict quality inspection to ensure durability, thermal efficiency, and compliance with industry standards before entering production.",
  icon: Package,
  image: "https://images.unsplash.com/photo-1451930309178-fc8e1f80ad68?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  details: [
    "Procurement from certified and trusted suppliers",
    "Inspection of stainless steel, alloys, and heating elements",
    "Material quality verification and certification",
    "Inventory preparation for production"
  ],
  tag: "Materials"
},
  {
    step: "04",
    title: "Manufacturing",
    description: "Precision fabrication using industry-grade machinery and premium raw materials. Every heater is assembled by skilled craftsmen following strict production protocols.",
    icon: Cog,
    image: manufacturingImg,
    details: [
      "Advanced CNC and winding machines",
      "Premium grade stainless and alloy materials",
      "Skilled craftsman assembly",
      "In-process quality checks"
    ],
    tag: "Production"
  },
  
  {
    step: "05",
    title: "Quality Testing",
    description: "Every unit undergoes rigorous electrical safety, insulation resistance, and performance validation tests to meet ISO and international standards before it leaves our facility.",
    icon: TestTube2,
    image: qualityTestingImg,
    details: [
      "Dielectric strength and insulation resistance testing",
      "Temperature uniformity and performance validation",
      "ISO compliance and traceability documentation",
      "Burn-in and endurance testing"
    ],
    tag: "Quality"
  },
  {
    step: "06",
    title: "Delivery & Support",
    description: "Secure packaging, on-time logistics, and end-to-end post-delivery support including installation guidance and a dedicated 24/7 technical helpline.",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1775756789951-3f2ef4307258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    details: [
      "Damage-proof export packaging",
      "Pan-India and international logistics",
      "On-site installation guidance",
      "24/7 technical support hotline"
    ],
    tag: "Delivery"
  }
];

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const active = processSteps[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="py-14 md:py-24 relative overflow-hidden bg-background" ref={containerRef}>
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="text-primary" size={16} />
            <span className="text-sm text-primary font-semibold">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            From Concept to Delivery
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A systematic approach ensuring precision, quality, and satisfaction at every step
          </p>
        </motion.div>

        {/* Main Split Panel */}
        <motion.div
          className="grid lg:grid-cols-[380px_1fr] gap-0 rounded-3xl overflow-hidden border border-border shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* LEFT — Step List */}
          <div className="bg-card border-r border-border flex flex-col">
            {/* Panel label */}
            <div className="px-4 md:px-8 py-4 md:py-5 border-b border-border">
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Steps</p>
            </div>

            <div className="flex flex-col flex-1">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeIndex === index;
                const isPast = index < activeIndex;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex items-center gap-3 px-4 md:px-8 py-4 md:py-6 text-left transition-all duration-300 group border-b border-border last:border-b-0 ${
                      isActive
                        ? "bg-primary/5"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    {/* Active left bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 ${
                        isActive ? "bg-primary opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Step number / check */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : isPast
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      {isPast ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs mb-0.5 transition-colors duration-200 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {step.step}
                      </p>
                      <p
                        className={`font-semibold truncate transition-colors duration-200 ${
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`flex-shrink-0 transition-all duration-200 ${
                        isActive ? "text-primary translate-x-0 opacity-100" : "text-muted-foreground/40 -translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Progress indicator */}
            <div className="px-4 md:px-8 py-4 md:py-5 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="text-xs font-semibold text-primary">{activeIndex + 1} of {processSteps.length}</p>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{ width: `${((activeIndex + 1) / processSteps.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — Content Panel */}
          <div className="relative bg-background min-h-[400px] md:min-h-[560px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="flex flex-col h-full"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Image area */}
                <div className="relative overflow-hidden flex-shrink-0">
                  {/* <ImageWithFallback
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-contain"
                  /> */}
                  {/* Gradient fade to content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />

                  {/* Step tag badge */}
                  <div className="absolute top-5 left-6 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {active.tag}
                  </div>

                  {/* Giant step number watermark */}
                  <div className="absolute bottom-2 right-6 text-[120px] font-black text-white/10 leading-none select-none pointer-events-none">
                    {active.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-8 flex flex-col gap-5 md:gap-6">
                  {/* Title row */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                      <ActiveIcon className="text-primary" size={28} />
                    </div>
                    <div>
                      <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-1">Step {active.step}</p>
                      <h3 className="text-2xl font-bold text-foreground">{active.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{active.description}</p>

                  {/* Detail bullets */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {active.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 bg-muted/40 rounded-xl px-4 py-3 border border-border"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Next step button */}
                  {activeIndex < processSteps.length - 1 && (
                    <div className="mt-auto pt-2">
                      <button
                        onClick={() => setActiveIndex(activeIndex + 1)}
                        className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:gap-3 transition-all duration-200"
                      >
                        Next: {processSteps[activeIndex + 1].title}
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile: Stepper dots (visible only on small screens where grid collapses) */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {processSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
