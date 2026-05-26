import { ArrowRight } from "lucide-react";
import { ScrollFade } from "./ScrollFade";
import { useState } from "react";
import CalendlyModal from "./CalendlyModal";

const CTASection = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <section id="cta-section" className="py-10 md:py-12 lg:py-16 relative overflow-hidden bg-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[600px] h-[600px] rounded-full -top-60 -left-60 bg-white/10 blur-3xl" />
        <div className="absolute w-[400px] h-[400px] rounded-full -bottom-40 -right-40 bg-white/10 blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />

      <div className="container text-center max-w-3xl relative z-10">
        <ScrollFade delay={80}>
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-primary-foreground mb-6 leading-tight">
            Ready to Visualize Your Salesforce Relationships?
          </h2>
        </ScrollFade>
        <ScrollFade delay={160}>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            See RelationshipVista in action. Transform how your org explores and
            understands data connections.
          </p>
        </ScrollFade>
        <ScrollFade delay={240}>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-primary font-bold text-base hover:bg-background/90 transition-colors shadow-xl cursor-pointer"
              style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
            >
              Book a Demo <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </ScrollFade>
      </div>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </section>
  );
};

export default CTASection;
