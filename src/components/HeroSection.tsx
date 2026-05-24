import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { useState, useCallback, lazy, Suspense } from "react";
import HeroInfographic from "./HeroInfographic";
import "./HeroSection.css";

const CalendlyModal = lazy(() => import("./CalendlyModal"));

const APPEXCHANGE_URL =
  "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FZcqBUAT";

const HeroSection = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCalendly = useCallback(() => setIsCalendlyOpen(true), []);
  const closeCalendly = useCallback(() => setIsCalendlyOpen(false), []);
  const openAppExchange = useCallback(
    () => window.open(APPEXCHANGE_URL, "_blank"),
    []
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 md:pt-28 pb-12 md:pb-20 lg:pb-24 relative overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="blob blob-1 w-[500px] h-[500px] -top-40 -left-40" />
      <div className="blob blob-2 w-[400px] h-[400px] -bottom-20 -right-20" />

      <div className="container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center justify-items-center">
          {/* Text */}
          <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="hero-anim-badge">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-100">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Salesforce-Native Solution
                </span>
              </div>
            </div>

            <div className="hero-anim-title w-full">
              <h1 className="text-[32px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-extrabold leading-[1.1] font-heading tracking-tight">
                <span className="relative inline-block z-10">
                  RelationshipVista
                  <svg
                    className="absolute -bottom-4 sm:-bottom-7 left-0 w-[102%] -translate-x-[1%] -z-10 overflow-visible"
                    viewBox="0 0 200 24"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="hero-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(var(--primary))"
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity="0.6"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M3,14 Q90,7 200,17"
                      stroke="url(#hero-gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={1}
                      className="hero-underline-path"
                    />
                  </svg>
                </span>
                <br className="hidden sm:block" />
                <span className="gradient-text mt-2 block">
                  for Intelligent Relationship Mapping &amp; Visualization
                </span>
              </h1>
            </div>

            <div className="hero-anim-subtitle">
              <p className="text-lg sm:text-xl md:text-[22px] font-semibold text-text-heading leading-snug">
                Interactive Data Exploration for{" "}
                <br className="hidden sm:block" />
                Account Hierarchies &amp; Connected Records.
              </p>
            </div>

            <div className="hero-anim-desc">
              <p className="text-sm sm:text-base text-text-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                Unlock deeper insights into your record hierarchies,
                opportunity pipelines, and connected records — all inside
                Salesforce. No code required.
              </p>
            </div>

            <div className="hero-anim-buttons w-full flex flex-col items-center lg:items-start">
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 w-full">
                <button
                  onClick={openCalendly}
                  className="btn-cta text-sm sm:text-base px-6 sm:px-7 w-full sm:w-auto justify-center"
                >
                  Book a Demo <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={openAppExchange}
                  className="btn-outline text-sm sm:text-base px-6 sm:px-7 w-full sm:w-auto justify-center"
                >
                  Start Free on AppExchange{" "}
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Infographic */}
          <div className="hero-anim-infographic w-full flex justify-center items-center relative">
            <div className="w-full max-w-[580px] lg:max-w-none">
              <HeroInfographic />
            </div>
          </div>
        </div>
      </div>

      {isCalendlyOpen && (
        <Suspense fallback={null}>
          <CalendlyModal isOpen={isCalendlyOpen} onClose={closeCalendly} />
        </Suspense>
      )}
    </section>
  );
};

export default HeroSection;
