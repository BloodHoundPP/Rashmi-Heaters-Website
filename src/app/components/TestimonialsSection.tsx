import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight, Building2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mr. M.S. Shanbagh",
    designation: "Managing Director",
    company: "Shachi Engineering Pvt. Ltd.",
    quote: "We have not faced any problem with supplied heaters. We have been associated with Rashmi Heaters Pvt. Ltd. for the last 12 years and have always found their pre & post order services very good. We are satisfied with the quality of their heaters.",
    rating: 5,
    initials: "SE",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    name: "Mr. Anand Thigale",
    designation: "",
    company: "Saka Engg.",
    quote: "The purchased heaters have met all our requirements & we are totally satisfied with the performance. We have been associated with Rashmi Heaters Pvt. Ltd. for the last 10 years and look forward to a continued long-term relationship.",
    rating: 5,
    initials: "SK",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    id: 3,
    name: "Mr. P.K. Basu",
    designation: "Maintenance Manager (Electrical)",
    company: "Gujarat Fluoro Chemicals",
    quote: "The new supplied heaters are working without any trouble. Their services are excellent. Earlier we were using heaters from another manufacturer which gave us repeated problems. Since we switched to Rashmi Heaters we have had no issues whatsoever.",
    rating: 5,
    initials: "GF",
    color: "from-teal-600 to-teal-800",
  },
  {
    id: 4,
    name: "Mr. Kale",
    designation: "",
    company: "Shoei Finishing",
    quote: "We have not faced any problems in dealing with them. We have been associated with Rashmi Heaters Pvt. Ltd. for the last 25 years. They have always provided excellent design & supply of heaters for our critical applications and we are fully satisfied.",
    rating: 5,
    initials: "SF",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    name: "Mr. Sanjay Khamkar",
    designation: "",
    company: "Tata Toyo",
    quote: "The supplied heating system is working to our satisfaction and we are getting good post services from RHPL. We appreciate their prompt response and the quality of heaters supplied to us.",
    rating: 5,
    initials: "TT",
    color: "from-slate-600 to-slate-800",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, activeIndex]);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setAutoPlay(false);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const next = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const active = testimonials[activeIndex];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 })
  };

  return (
    <section className="py-14 md:py-24 relative overflow-hidden bg-card/30" ref={containerRef}>
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-[1320px] mx-auto px-4 md:px-6 relative">

        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <Quote className="text-primary" size={16} />
            <span className="text-sm text-primary font-semibold">Client Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From power stations to pharmaceutical plants — hear what India's top industries say about us
          </p>
        </motion.div>

        {/* Main testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Decorative giant quote mark */}
            <div className="absolute -top-8 -left-4 text-[180px] leading-none text-primary/6 font-serif select-none pointer-events-none z-0">
              "
            </div>

            <div className="relative z-10 bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-[280px_1fr]">

                {/* Left — company identity panel */}
                <div className="relative p-6 md:p-8 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-border bg-muted/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id + "-left"}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center gap-4"
                    >
                      {/* Avatar */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${active.color} flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
                        {active.initials}
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: active.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Name + role */}
                      <div>
                        <p className="font-bold text-foreground">{active.name}</p>
                        {active.designation && (
                          <p className="text-sm text-muted-foreground mt-0.5">{active.designation}</p>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="w-10 h-px bg-border" />

                      {/* Company */}
                      {/* <div className="flex items-center gap-1.5 text-primary">
                        <Building2 size={14} />
                        <span className="text-sm font-semibold">{active.company}</span>
                      </div> */}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right — quote panel */}
                <div className="p-6 md:p-10 flex flex-col justify-between gap-6 md:gap-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.blockquote
                      key={active.id}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-base md:text-lg text-foreground/90 leading-relaxed italic"
                    >
                      "{active.quote}"
                    </motion.blockquote>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    {/* Dot indicators */}
                    <div className="flex gap-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className={`transition-all duration-300 rounded-full ${
                            i === activeIndex
                              ? "w-8 h-2 bg-primary"
                              : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Prev / Next */}
                    <div className="flex gap-2">
                      <button
                        onClick={prev}
                        className="w-10 h-10 rounded-xl border border-border bg-background hover:bg-primary hover:border-primary hover:text-white text-muted-foreground transition-all duration-200 flex items-center justify-center"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="w-10 h-10 rounded-xl border border-border bg-background hover:bg-primary hover:border-primary hover:text-white text-muted-foreground transition-all duration-200 flex items-center justify-center"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom company strip */}
        {/* <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">
            Trusted by India's leading corporations
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {t.company.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
