import { Award } from "lucide-react";
import certificatesImage from "../../imports/image.png";

export function CertificatesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-card/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 relative">
        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="text-primary" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Certified Excellence
            </h3>
          </div>

          {/* Certificates Display */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-4xl">
            <div className="flex items-center justify-center">
              <img
                src={certificatesImage}
                alt="Quality Certifications - IS 9459, CE, BIS, ISO 9001:2015, CIMFR"
                className="w-full max-w-2xl h-auto object-contain filter brightness-100 dark:brightness-90"
              />
            </div>

            {/* Supporting text */}
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              Certified by leading international and national standards bodies, ensuring the highest quality and safety in all our industrial heating products
            </p>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
            <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
              <div className="text-lg font-bold text-foreground mb-1">ISO 9001:2015</div>
              <div className="text-xs text-muted-foreground">Quality Management</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
              <div className="text-lg font-bold text-foreground mb-1">BIS & CE Certified</div>
              <div className="text-xs text-muted-foreground">International Standards</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
              <div className="text-lg font-bold text-foreground mb-1">CIMFR Approved</div>
              <div className="text-xs text-muted-foreground">Mining & Safety Standards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
