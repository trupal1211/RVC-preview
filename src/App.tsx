import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index.tsx"));
const UserGuide = lazy(() => import("./pages/UserGuide.tsx"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const InstallationGuide = lazy(() => import("./pages/InstallationGuide.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
import { useRecaptcha } from "@/hooks/useRecaptcha";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

const CanonicalManager = () => {
  const location = useLocation();

  useEffect(() => {
    const canonicalLink = document.getElementById("canonical-link") as HTMLLinkElement;
    if (canonicalLink) {
      // Remove trailing slash if any (unless it's exactly "/") to keep it clean.
      const path = location.pathname.endsWith('/') && location.pathname !== '/'
        ? location.pathname.slice(0, -1)
        : location.pathname;
      canonicalLink.href = `https://www.relationshipvista.com${path}`;
    }
  }, [location.pathname]);

  return null;
};

const App = () => {
  const { loadRecaptcha } = useRecaptcha();

  useEffect(() => {
    // Mobile reCAPTCHA Fix: Toggle open state on tap.
    // Uses MutationObserver to attach only when the badge appears (loaded lazily by ContactSection).
    const handleRecaptchaInteraction = (e: MouseEvent | TouchEvent) => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const badge = document.querySelector('.grecaptcha-badge');
      if (badge && badge.contains(e.target as Node)) {
        badge.classList.toggle('is-open');
      } else if (badge) {
        badge.classList.remove('is-open');
      }
    };

    document.addEventListener('click', handleRecaptchaInteraction);

    // Globally load reCAPTCHA slightly after page load so it's visible globally
    // without hurting initial Lighthouse load speeds.
    const timer = setTimeout(() => loadRecaptcha(), 2500);

    return () => {
      document.removeEventListener('click', handleRecaptchaInteraction);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CanonicalManager />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/resources/user-guide" element={<UserGuide />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/resources/installation-guide" element={<InstallationGuide />} />
                <Route path="/resources/videos" element={<Videos />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
