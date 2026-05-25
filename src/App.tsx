import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index.tsx";
import UserGuide from "./pages/UserGuide.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import InstallationGuide from "./pages/InstallationGuide.tsx";
import Videos from "./pages/Videos.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const { loadRecaptcha } = useRecaptcha();

  useEffect(() => {
    // Load reCAPTCHA immediately on app mount to display the badge globally
    loadRecaptcha();

    // Mobile reCAPTCHA Fix: Toggle open state on tap, since hover lacks a native dismiss-on-retap gesture
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

    return () => {
      document.removeEventListener('click', handleRecaptchaInteraction);
    };
  }, [loadRecaptcha]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
