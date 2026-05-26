import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

// Lazy load below-the-fold sections for better performance
const WhatIsSection = lazy(() =>
  import("@/components/WhatIsSection").catch(err => {
    console.error("Failed to load WhatIsSection:", err);
    throw err;
  })
);
const FeaturesSection = lazy(() =>
  import("@/components/FeaturesSection").catch(err => {
    console.error("Failed to load FeaturesSection:", err);
    throw err;
  })
);
const BenefitsSection = lazy(() =>
  import("@/components/BenefitsSection").catch(err => {
    console.error("Failed to load BenefitsSection:", err);
    throw err;
  })
);
const UseCasesSection = lazy(() =>
  import("@/components/UseCasesSection").catch(err => {
    console.error("Failed to load UseCasesSection:", err);
    throw err;
  })
);
const FAQSection = lazy(() =>
  import("@/components/FAQSection").catch(err => {
    console.error("Failed to load FAQSection:", err);
    throw err;
  })
);
const ContactSection = lazy(() =>
  import("@/components/ContactSection").catch(err => {
    console.error("Failed to load ContactSection:", err);
    throw err;
  })
);
const CTASection = lazy(() =>
  import("@/components/CTASection").catch(err => {
    console.error("Failed to load CTASection:", err);
    throw err;
  })
);

// Loading fallback component
const SectionSkeleton = () => (
  <div className="min-h-[400px] w-full bg-gradient-to-b from-background to-background/50 animate-pulse" />
);

// True lazy loading wrapper dependent on scroll intersection
const LazySection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If there is a targeted hash url, immediately render all sections to ensure jump links function.
    if (window.location.hash && window.location.hash !== "#" && window.location.hash !== "#home") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" } // Render 600px before coming into view
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={!isVisible ? "min-h-[400px]" : ""}>
      {isVisible ? <Suspense fallback={<SectionSkeleton />}>{children}</Suspense> : <SectionSkeleton />}
    </div>
  );
};

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      let attempts = 0;
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          // If attempts > 0, the element was lazy loaded and missed the native browser jump.
          if (attempts > 0) {
            const offset = 90;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        } else if (attempts < 20) {
          attempts++;
          setTimeout(scrollToHash, 200);
        }
      };
      scrollToHash();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 gradient-mesh z-[-1]" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <LazySection>
          <WhatIsSection />
        </LazySection>
        <LazySection>
          <FeaturesSection />
        </LazySection>
        <LazySection>
          <BenefitsSection />
        </LazySection>
        <LazySection>
          <UseCasesSection />
        </LazySection>
        <LazySection>
          <FAQSection />
        </LazySection>
        <LazySection>
          <ContactSection />
        </LazySection>
        <LazySection>
          <CTASection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;


