import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Menu, X, ArrowUp, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.webp";
import CalendlyModal from "./CalendlyModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = ({ forceScrolled = false }: { forceScrolled?: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolledState, setScrolledState] = useState(false);
  const scrolled = scrolledState || forceScrolled;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOverColoredSection, setIsOverColoredSection] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const scrollStopTimer = useRef<NodeJS.Timeout>();

  // Determine if we're on an independent page (not the home page)
  const isIndependentPage = location.pathname !== "/" && location.pathname !== "";


  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolledState(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 300);

      // Detect if navbar is over a colored section (like CTA section)
      const ctaElement = document.getElementById("cta-section");

      let overColored = false;

      if (ctaElement) {
        const rect = ctaElement.getBoundingClientRect();
        if (rect.top < 80 && rect.bottom > 0) {
          overColored = true;
        }
      }

      setIsOverColoredSection(overColored);

      // Debounce mechanism to perfectly detect the exact end of a programmatic smooth scroll
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);

      if (isProgrammaticScroll.current) {
        // Turn off the scroll lock exactly 150ms after the physical scroll animation stops completely
        scrollStopTimer.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 150);
        return; // ABORT section detection entirely while programmatic scrolling is happening!
      }

      // Reliable scroll-based section detection (only happens during standard manual user scrolling)
      if (!isIndependentPage) {
        const sectionIds = ["cta-section", "contact", "faq", "use-cases", "benefits", "features", "overview", "home"];
        let detected = activeSection;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 400 && rect.bottom >= 100) {
              detected = id === "faq" || id === "cta-section" ? "contact" : id;
              break;
            }
          }
        }
        if (detected !== activeSection) {
          setActiveSection(detected);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial check
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isIndependentPage, activeSection]);

  const scrollToSection = (targetId: string) => {
    const selector = targetId.startsWith("#") ? targetId : `#${targetId}`;
    const element = document.querySelector(selector);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      isProgrammaticScroll.current = true;
      // Absolute fallback timeout just in case scroll events refuse to fire
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 3000);

      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } catch (e) {
        window.scrollTo(0, offsetPosition);
      }
    }
  };

  const handleClick = (href: string) => {
    setMobileOpen(false);

    if (isIndependentPage && href.startsWith("#")) {
      window.location.href = "/" + href;
    } else if (href.startsWith("#")) {
      setActiveSection(href.slice(1));

      // Lock scroll detection immediately to prevent scroll events firing 
      // during the 50ms timeout from reverting the state to the old section.
      isProgrammaticScroll.current = true;
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 3000);

      // Delay programmatic scroll slightly so DOM unmount of the overlay
      // doesn't cause a layout shift that interrupts mobile Safari scrolling.
      setTimeout(() => {
        scrollToSection(href);
      }, 50);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (isIndependentPage) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[150]"
    >
      <div
        className={`container transition-all duration-500 ease-out md:mt-4 ${scrolled
          ? isOverColoredSection
            ? "md:rounded-[2.5rem] bg-slate-900/80 backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.4)] border border-white/10"
            : "md:rounded-[2.5rem] bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50"
          : "md:rounded-[2.5rem] bg-transparent border border-transparent shadow-none"
          }`}
      >
        <nav className={`flex items-center justify-between transition-all duration-500 ease-out ${scrolled ? 'h-16 md:h-18 md:px-2' : 'h-16 md:h-20'}`}>
          <a href="/" onClick={handleLogoClick} aria-label="RelationshipVista Home" className="flex items-center gap-2 transition-all duration-500 ease-out">
            <img src={logo} alt="RelationshipVista Logo" width={200} height={54} className={`transition-all duration-500 ease-out w-auto origin-left ${scrolled ? 'h-14 md:h-16' : 'h-14 md:h-20'}`} /></a><div className="hidden lg:flex items-center justify-end gap-1 ml-auto">{navLinks.map((link) => (
              <a
                key={link.href}
                href={isIndependentPage ? `/${link.href}` : link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`relative px-4 py-2 text-[15px] cursor-pointer inline-block font-medium rounded-lg transition-colors duration-300 ${isIndependentPage
                  ? isOverColoredSection && scrolled ? "text-white/80 hover:text-white" : "text-slate-800 hover:bg-slate-800/5"
                  : activeSection === link.href.slice(1)
                    ? isOverColoredSection && scrolled ? "text-white" : "text-primary"
                    : isOverColoredSection && scrolled ? "text-white/70 hover:text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-800/5"
                  }`}
              >
                {link.label}
                {!isIndependentPage && activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                    className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${isOverColoredSection && scrolled ? "bg-white" : "bg-primary"}`}
                  />
                )}
              </a>
            ))}

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                className={`relative px-4 py-2 text-[15px] font-medium        
rounded-lg transition-all duration-300 flex items-center gap-1 ${isOverColoredSection && scrolled ? "text-white/80 hover:text-white" : "text-slate-800 hover:bg-slate-800/5"
                  }`}
              >
                Resources <ChevronDown className="h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-slate-50/80 backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.2)] border border-white/40 rounded-2xl p-2 z-[9999]">
                <DropdownMenuItem asChild className="!bg-transparent hover:!bg-slate-800/5 p-0 rounded-lg focus:!bg-slate-800/5">
                  <a href="/resources/user-guide" target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer font-medium p-3 text-text-heading hover:text-primary transition-colors outline-none rounded-lg block">
                    User Guide
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="!bg-transparent hover:!bg-slate-800/5 p-0 rounded-lg focus:!bg-slate-800/5">
                  <a href="/resources/installation-guide" target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer font-medium p-3 text-text-heading hover:text-primary transition-colors outline-none rounded-lg block">
                    Installation Guide
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="!bg-transparent hover:!bg-slate-800/5 p-0 rounded-lg focus:!bg-slate-800/5">
                  <a href="/resources/videos" target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer font-medium p-3 text-text-heading hover:text-primary transition-colors outline-none rounded-lg block">
                    Videos
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setIsCalendlyOpen(true)}
              aria-label="Book a product demo"
              className={`ml-4 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden shadow-[0_4px_15px_hsl(var(--primary)/0.3)] hover:shadow-[0_4px_25px_hsl(var(--primary)/0.45)] transition-all duration-500 ease-out ${scrolled ? "px-6 py-3 text-xs" : "px-7 py-3.5 text-sm"
                }`}
            >
              Book a Demo
            </button>
          </div>

          <button
            className={`lg:hidden mr-1 flex items-center justify-center transition-all duration-300 ${isOverColoredSection && scrolled
              ? "text-white/80 hover:text-white"
              : "text-primary hover:text-primary-dark"
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`lg:hidden absolute top-full left-4 right-4 mt-2 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden rounded-2xl pointer-events-auto z-50 ${scrolled ? "bg-white/90" : "bg-white/95"
              }`}
          >
            <div className="flex flex-col p-4 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={isIndependentPage ? `/${link.href}` : link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl cursor-pointer text-[15px] font-medium transition-colors ${!isIndependentPage && activeSection === link.href.slice(1)
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  {link.label}
                </a>
              ))}

              <div
                className="block w-full text-left px-4 py-2 border-t border-slate-100 pt-4 mt-2 text-[15px] font-bold text-slate-800"
              >
                Resources
              </div>
              <div className="flex flex-col pl-4">
                <a
                  href="/resources/user-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl text-[15px] font-medium text-slate-600 focus:text-primary transition-colors"
                >
                  User Guide
                </a>
                <a
                  href="/resources/installation-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl text-[15px] font-medium text-slate-600 focus:text-primary transition-colors"
                >
                  Installation Guide
                </a>
                <a
                  href="/resources/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-50 rounded-xl text-[15px] font-medium text-slate-600 focus:text-primary transition-colors"
                >
                  Videos
                </a>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => setIsCalendlyOpen(true), 150);
                  }}
                  aria-label="Book a product demo"
                  className="bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold mt-2 text-center w-full shadow-[0_4px_15px_hsl(var(--primary)/0.3)] transition-colors duration-300"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-[0_4px_15px_hsl(var(--primary)/0.3)] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </motion.header>
  );
};

export default Navbar;









