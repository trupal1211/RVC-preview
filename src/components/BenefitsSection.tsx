import { Zap, Users, Shield, Globe, MousePointerClick, LayoutDashboard } from "lucide-react";
import { ScrollFade } from "./ScrollFade";

const benefits = [
  {
    icon: Zap,
    title: "Accelerate data exploration",
    description: "Go from record to complete relationship map in seconds using interactive visual exploration.",
  },
  {
    icon: Users,
    title: "Empower every team",
    description: "Enable non-technical users to build, assign, and analyze relationships using a natural, visual interface.",
  },
  {
    icon: MousePointerClick,
    title: "Optimized Data Navigation",
    description: "See every related record at a glance — no tab switching, no navigation away from the primary record.",
  },
  {
    icon: LayoutDashboard,
    title: "Increased Productivity",
    description: "Create, update, and segment records inline without ever leaving the relationship view.",
  },
  {
    icon: Shield,
    title: "Native Salesforce & Security",
    description: "Respects your existing Salesforce security model and fits seamlessly into the Lightning experience.",
  },
  {
    icon: Globe,
    title: "Scalability & Global Support",
    description: "Scales effortlessly across high-volume orgs with built-in localization and RTL language support.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="section-padding section-alt relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="container relative z-10">
        <ScrollFade>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-bold tracking-widest uppercase gradient-text mb-3 inline-block">
              Benefits
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold font-heading leading-tight mb-4">
              Built for Enterprise. Designed for{" "}
              <br className="hidden sm:block" />
              <span className="text-primary">Everyone.</span>
            </h2>
            <p className="text-text-body text-lg leading-relaxed">
              Not just a visualization tool. A relationship intelligence layer that turns every
              connection into action inside Salesforce.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollFade>

        <div className="flex flex-wrap justify-center gap-5">
          {benefits.map((b, i) => (
            <ScrollFade
              key={b.title}
              delay={i * 80}
              className="premium-card p-7 group w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#49983E] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left will-change-transform" />
              <div className="icon-box mb-5">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-heading mb-2.5 group-hover:text-primary transition-colors">{b.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{b.description}</p>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
