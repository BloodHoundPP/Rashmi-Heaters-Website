import { Link } from "react-router";
import { useEffect, useRef } from "react";
import {
  Award,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Headphones,
  Factory,
  Pill,
  Package,
  Car,
  Utensils,
  Recycle,
  Globe,
  Settings,
  Eye,
  SmilePlus
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { ImageStack3D } from "../components/ImageStack3D";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { HeroSlider } from "../components/HeroSlider";
import { ClientsCarousel } from "../components/ClientsCarousel";
import { CertificatesSection } from "../components/CertificatesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import heroImage1 from "../../imports/image_be12e0a3.png";
import heroImage2 from "../../imports/image_adf5f190.png";
import heroImage3 from "../../imports/d-type.png";
import heroImage4 from "../../imports/Untitled_design__22_.png";
import rashmiHeaterVideo from "../../imports/Rashmi_Heater_Video.mp4";
import rashmiLogoImg from "../../imports/Untitled_design__19_.png";
import customizedHeaterImg from "../../imports/CUSTOMIZED CARD IMG.png";
import openWireImg from "../../imports/open wire card.png";
import controlPanelImg from "../../imports/control panel card img (1).png";
import cartridgeHeaterImg from "../../imports/cat-cartaige-heater.png";
import dTypeImg from "../../imports/d-type.png";
import standardHeaterImg from "../../imports/std_card.png";

export function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {});
    }
    return () => {
      video.pause();
    };
  }, []);

  const heroImages = [
    {
      src: heroImage1,
      alt: "Rashmi Heaters Cartridge Heater",
    },
    {
      src: heroImage2,
      alt: "Rashmi Heaters Industrial Heating Equipment",
    },
    {
      src: heroImage3,
      alt: "Rashmi Heaters Control Panel System",
    },
    {
      src: heroImage4,
      alt: "Rashmi Heaters Control Panel System",
    },
  ];

  const products = [
    {
      id: "customized-heaters",
      name: "Customized Heaters",
      description: "Our Customized Heaters are developed to meet unique industrial heating requirements with precision engineering and superior performance. We manufacture heaters in custom sizes, shapes, wattages, voltages, and temperature ranges according to client specifications.",
      image: customizedHeaterImg,
    },
    {
      id: "d-type-heaters",
      name: "D Type Heaters ",
      description: "D-Type Heaters are specially engineered heating elements designed for applications requiring compact and customized heating arrangements. Their unique shape ensures better fitting, efficient heat transfer, and optimized performance in restricted spaces.",
      image: dTypeImg,
    },
    {
      id: "control-panel",
      name: "Control Panel",
      description: "We provide advanced Control Panels for efficient monitoring and management of industrial heating systems. These panels are designed to control temperature, voltage, power distribution, and safety operations with high precision",
      image: controlPanelImg,
    },
    {
      id: "std-heaters",
      name: "Std. Heaters",
      description: "Our Standard Heaters are manufactured to meet common industrial heating requirements with reliable and consistent performance. Available in multiple sizes, capacities, and specifications, these heaters are easy to install and maintain",
      image: standardHeaterImg,
    },
    {
      id: "cartridge-heaters",
      name: "Cartridge Heaters ",
      description: "Our Cartridge Heaters are high density tubular heating elements designed for concentrated and efficient heat transfer. Built using premium materials for superior durability and thermal performance",
      image: cartridgeHeaterImg,
    },
    {
      id: "open-wire",
      name: "Open Wire",
      description: "Our Open Wire Heaters are designed for fast, efficient, and uniform heating in industrial applications. Manufactured using high quality resistance wire and durable ceramic insulators, these heaters provide excellent thermal performance with low power consumption.",
      image: openWireImg,
    },
    
    
    
    
  ];

  const industries = [
    {
      name: "Plastic & Rubber",
      icon: Recycle,
      image: "https://images.unsplash.com/photo-1700727448686-b314cb5f9948?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "High-precision heating solutions for plastic extrusion"
    },
    {
      name: "Pharmaceutical",
      icon: Pill,
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Clean room compatible heating systems"
    },
    {
      name: "Thermal Power Station",
      icon: Package,
      image: "https://images.unsplash.com/photo-1578776349090-de61da00ff1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Industrial heating for power generation"
    },
    {
      name: "Automobile",
      icon: Car,
      image: "https://plus.unsplash.com/premium_photo-1664298230305-9116cf510bed?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Reliable automotive part manufacturing"
    },
    {
      name: "Food Processing",
      icon: Utensils,
      image: "https://images.unsplash.com/photo-1652211955967-99c892925469?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Food-grade heating solutions"
    },
    {
      name: "Aero Space",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1567416661576-659c4298a2c6?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Aerospace-grade precision heating"
    },
    {
      name: "Steel Industry",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Heavy-duty steel manufacturing solutions"
    },
    {
      name: "Petrochemical",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Petrochemical refinery heating systems"
    },
    {
      name: "Gas Industry",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Gas processing and pipeline heating"
    },
    {
      name: "Chemical Industry",
      icon: Factory,
      image: "https://plus.unsplash.com/premium_photo-1661434779070-cf8fc0e253ab?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Chemical processing heating solutions"
    },
    {
      name: "HVAC",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1681042803902-f79c240d8f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      description: "HVAC system heating components"
    },
    {
      name: "Defence",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1643941832709-8bcc227e3b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Defence equipment manufacturing"
    },
  ];

  const process = [
    { step: "01", title: "Requirement Analysis", description: "Understanding your specific heating needs" },
    { step: "02", title: "Design", description: "Custom engineering for optimal performance" },
    { step: "03", title: "Manufacturing", description: "Precision fabrication with quality materials" },
    { step: "04", title: "Testing", description: "Rigorous quality control and validation" },
    { step: "05", title: "Delivery", description: "On-time installation and support" },
  ];

  const clients = [
    "Tata Motors", "L&T", "Reliance", "JSW Steel", "Mahindra", "Godrej",
    "Asian Paints", "Pidilite", "Sun Pharma", "Dr. Reddy's", "Britannia", "ITC"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* ── Infinite ticker ── */}
      <div
        className="relative overflow-hidden py-4.5 z-10 mt-5"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 24px rgba(201,169,97,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(255,200,100,0.18), transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(255,200,100,0.18), transparent)" }} />

        <div className="flex ticker-track whitespace-nowrap">
          {[...Array(3)].map((_, pass) => (
            <div key={pass} className="flex shrink-0 items-center">
              {[
                { icon: "✦", text: "Quality Service" },
                { icon: "⚡", text: "Quick Response and Offers" },
                { icon: "✦", text: "Technical Solutions with customised designs" },
               
                { icon: "⚡", text: "35+ Years of Experience" },
                { icon: "⚡", text: "All Industrial hubs Across India" },
                { icon: "✦", text: "5000+ Happy Clients" },
                { icon: "⚡", text: "Custom Engineered Solutions" },
                { icon: "✦", text: "100% Quality Inspection" },
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2.5 mx-8">
                  <span className="text-[#C41E3A] text-[8px]">{item.icon}</span>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "rgba(80,40,20,0.85)" }}
                  >
                    {item.text}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        <style>{`
          .ticker-track {
            animation: ticker 35s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
          @keyframes ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>

      {/* Hero Section OLD — hidden */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden hidden">
        {/* Background with gradient overlay and texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"></div>
        
        {/* Grid texture pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Dot texture pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Gradient blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        {/* Curved bottom border */}
        <div className="absolute bottom-0 left-0 right-0 text-background">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor"/>
          </svg>
        </div>

        <div className="relative max-w-[1320px] mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                <Award className="text-primary" size={18} />
                <span className="text-sm text-primary">ISO 9001:2015 Certified</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Industrial Heater Manufacturer & Custom Heating Solutions in India
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                From standard heating elements to fully customized industrial heating systems, we deliver energy-efficient, reliable, and application-specific solutions tailored to your process requirements.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="text-lg px-8">
                    Explore Products
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Get a Quote
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">30+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">500+</div>
                    <div className="text-sm text-muted-foreground">Clients</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">Global</div>
                    <div className="text-sm text-muted-foreground">Exported Globally</div>
                  </div>
                </div>
               
                
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative min-h-[600px] lg:min-h-0 flex items-center justify-center pt-16">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
              <div className="relative w-full max-w-lg aspect-[3/4]">
                <ImageStack3D images={heroImages} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      {/* <CertificatesSection /> */}

      {/* Product Categories */}
      <section className="py-14 md:py-24 bg-card/50 relative">
        {/* Curved top border */}
        <div className="absolute top-0 left-0 right-0 text-card/50 -translate-y-[1px]">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 5C120 10 240 20 360 23.3C480 26.7 600 23.3 720 20C840 16.7 960 13.3 1080 13.3C1200 13.3 1320 16.7 1380 18.3L1440 20V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V0Z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Products Categories
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of industrial heating solutions designed for precision and durability
            </p>
          </div>

          {/* Grid layout - 3 per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                <div className="aspect-[1/1] overflow-hidden bg-secondary">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <Link to={`/products/${product.id}`}>
                    <Button variant="ghost" className="group/btn p-0 h-auto">
                      View Details
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-14 md:py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="max-w-[1320px] mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <Factory className="text-primary" size={18} />
              <span className="text-sm text-primary">Industry Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Industries We Serve
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted heating solutions across diverse industrial sectors with proven excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="group relative overflow-hidden rounded-2xl aspect-[3/2] cursor-pointer"
              >
                {/* Image */}
                <ImageWithFallback
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div> */}

                {/* Red accent bar - appears on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Title */}
                  <h3 className="text-3xl font-bold text-primary mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {industry.name}
                  </h3>

                  {/* Description - hidden by default, shown on hover */}
                  <p className="text-sm text-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {industry.description}
                  </p>
                </div>

                {/* Border glow effect on hover */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 md:py-24 bg-card/50">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Video */}
            <div className="flex items-center">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-border max-h-[480px]">
                <video
                  ref={videoRef}
                  src={rashmiHeaterVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover max-h-[480px]"
                />
              </div>
            </div>

            {/* Right: Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Why Choose Rashmi Heaters
                </h2>
                <p className="text-base md:text-xl text-muted-foreground">
                  Industry-leading heating solutions built on decades of expertise
                </p>
              </div>
          
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Clarity in Understanding Customer Needs</h3>
                    <p className="text-muted-foreground">
                      We invest time to deeply understand every requirement before engineering begins, ensuring the solution is a perfect fit.
                    </p>
                  </div>
                </div>
                
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Technical Support</h3>
                    <p className="text-muted-foreground">
                      Dedicated engineering team available for consultation,on-site support and installation.
                    </p>
                  </div>
                </div>
                
                 <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Custom Manufacturing</h3>
                    <p className="text-muted-foreground">
                      Tailored solutions designed to meet your specific heating requirements and specifications.
                    </p>
                  </div>
                </div>


                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Fast Delivery</h3>
                    <p className="text-muted-foreground">
                      Efficient production and logistics ensure on-time delivery to keep your operations running.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">High Durability</h3>
                    <p className="text-muted-foreground">
                      Premium materials and engineering ensure long-lasting performance in demanding environments.
                    </p>
                  </div>
                </div>

               

                

               

                

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SmilePlus className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Customer Satisfaction</h3>
                    <p className="text-muted-foreground">
                      Our success is measured by your success, we go beyond delivery to ensure every client is fully satisfied with results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessTimeline />

      {/* Clients Section */}
      <ClientsCarousel />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Banner */}
      <section className="py-16 md:py-24 relative overflow-hidden mx-4 md:mx-10 lg:mx-16 my-10 md:my-16 rounded-2xl md:rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-[1320px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 md:mb-6">
            Need a Custom Heating Solution?
          </h2>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
            Our expert team is ready to design the perfect heating system for your specific industrial needs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get a Free and Fast Quote
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}