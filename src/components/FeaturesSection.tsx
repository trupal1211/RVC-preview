import {
  Network, SlidersHorizontal, GitBranch, LayoutList,
  Filter, Smartphone, Eye, Navigation, LayoutTemplate,
} from "lucide-react";
import FeaturesAnimation from "./FeaturesAnimation";
import { ScrollFade } from "./ScrollFade";

const capabilities = [
  {
    icon: Network,
    title: "Interactive Relationship Visualization",
    description: "Explore all related records in rich, interactive visual maps with multiple layout options.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Relationship Views (R-Views)",
    description: "Create tailored relationship visualizations using custom filters and groups, just like list views.",
  },
  {
    icon: GitBranch,
    title: "Multi-Level Hierarchy Exploration",
    description: "Navigate one-to-one, one-to-many, and many-to-many relationships across your org effortlessly.",
  },
  {
    icon: LayoutList,
    title: "Explorer & Tree Layouts",
    description: "Switch between indented explorer view and graphical tree layout for different exploration needs.",
  },
  {
    icon: Filter,
    title: "Dynamic Filtering & Grouping",
    description: "Filter related records by any field and group by custom attributes for focused analysis.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Responsive Design",
    description: "Full responsiveness across all devices — explore relationships anywhere, anytime.",
  },
  {
    icon: Eye,
    title: "Real-Time Hover Previews",
    description: "Quickly preview record details on hover without navigating away from your visualization.",
  },
  {
    icon: Navigation,
    title: "Smart Record Navigation",
    description: "Click any node to drill into related records or navigate through hierarchy seamlessly.",
  },
  {
    icon: LayoutTemplate,
    title: "Pre-Built & Custom Visualizations",
    description: "Use pre-configured views or empower users to build their own custom R-Views.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding section-alt relative">
      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="container relative z-10 px-3 sm:px-6 md:px-8">
        <ScrollFade>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-bold tracking-widest uppercase gradient-text mb-3 inline-block">
              Features
            </p>
            <h2 className="text-3xl md:text-[38px] font-extrabold font-heading leading-tight mb-3">
              From Scattered Data to <span className="text-primary">Unified Insights</span>
            </h2>
            <div className="section-divider mt-4" />
          </div>
        </ScrollFade>

        <div className="block lg:grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16">
          {/* Left Column: Wrapper for sticky mockup on desktop (centered in available space) */}
          <div
            className="relative sticky top-[74px] lg:top-[90px] lg:h-[calc(100vh-100px)] flex flex-col justify-center w-full max-w-full min-w-0 pb-4 lg:pb-0 mb-2 lg:mb-0"
            style={{ zIndex: 10, backgroundColor: 'hsl(var(--section-alt))' }}
          >
            <ScrollFade delay={100} className="flex flex-col justify-center w-[90%] sm:w-full max-w-full min-w-0 mx-auto">
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border/60 relative overflow-hidden w-full !border-border/40 shadow-xl">
                {/* Browser chrome */}
                <div className="px-2.5 sm:px-5 py-1 sm:py-1.5 border-b border-border/60 flex items-center gap-2 sm:gap-3 bg-muted/30">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/60" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "hsl(45, 80%, 60%)" }} />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/60" />
                  </div>
                  <div className="flex-1 mx-1.5 sm:mx-4 min-w-0">
                    <div className="bg-background/60 rounded-md px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] md:text-xs text-text-muted font-mono text-center truncate tracking-tight sm:tracking-normal">
                      salesforce.com/relationshipvista/AccountView
                    </div>
                  </div>
                </div>
                <FeaturesAnimation />
              </div>
            </ScrollFade>
          </div>

          {/* Right: feature list with staggered animation */}
          <div className="space-y-3 py-4 lg:py-12">
            {capabilities.map((cap, i) => (
              <ScrollFade
                key={cap.title}
                delay={i * 60}
              >
                <div className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-primary/15 hover:bg-card transition-all duration-150 cursor-default group">
                  <div className="icon-box">
                    <cap.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-[15px] font-bold font-heading text-text-heading mb-1 group-hover:text-primary transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
