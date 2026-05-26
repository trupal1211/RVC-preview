import React from "react";
import logo from "@/assets/logo.webp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Globe, Mail, Phone } from "lucide-react";
import { ScrollFade } from "./ScrollFade";

const quickLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Contact Us", href: "#contact" },
  { label: "Resources", href: "/resources/user-guide", target: "_blank" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isHome = location.pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");

    if (!isHome) {
      // If not on home page, use window.location to navigate with hash
      window.location.href = "/" + href;
      return;
    }

    // On home page, scroll to section smoothly
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer style={{ background: "linear-gradient(180deg, hsl(210, 14%, 16%), hsl(210, 14%, 12%))" }} className="relative overflow-hidden">
      <div className="container pt-8 pb-6 md:pt-12">
        {/* Main Footer Content - Flexbox with wrap for side-by-side layout on mobile */}
        <ScrollFade>
          <div className="flex flex-wrap justify-between lg:flex-nowrap lg:justify-between gap-y-8 gap-x-0 md:gap-12 lg:gap-0">
            {/* Brand Column - full width, stays on top */}
            <div className="w-full lg:w-[35%] flex-shrink-0">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer hover:opacity-80 transition-opacity mb-4 flex items-center bg-none border-none p-0"
                aria-label="RelationshipVista - Return to Home"
              >
                <img src={logo} alt="RelationshipVista" className="h-16 sm:h-20 w-auto" loading="lazy" decoding="async" />
              </Link>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 8%, 65%)" }}>
                Turn complex relationships into clear,<br />
                actionable insights natively inside Salesforce.
              </p>
            </div>

            {/* Quick Links Column - 30% width on mobile, 15% on lg */}
            <div className="w-[30%] lg:w-[15%] flex-shrink-0">
              <h4 className="font-bold text-white mb-4 text-sm tracking-wider font-heading">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((l) => (
                  <li key={l.label} className="py-0">
                    <a
                      href={l.href}
                      onClick={(e) => !l.target && handleNavClick(e, l.href)}
                      target={l.target}
                      rel={l.target ? "noopener noreferrer" : undefined}
                      className="relative text-sm transition-colors duration-300 inline leading-none"
                      style={{ color: "hsl(210, 8%, 65%)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column - 65% width on mobile, 50% on md, 18% on lg */}
            <div className="w-[65%] md:w-[50%] lg:w-[18%] flex-shrink-0">
              <h4 className="font-bold text-white mb-4 text-sm tracking-wider font-heading">Contact Info</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="py-0">
                  <a
                    href="https://www.relationshipvista.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative transition-colors duration-300 inline leading-none"
                    style={{ color: "hsl(210, 8%, 65%)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
                  >
                    <Globe size={18} className="inline flex-shrink-0 mr-2" style={{ color: "hsl(113, 42%, 60%)" }} />
                    www.relationshipvista.com
                  </a>
                </li>
                <li className="py-0">
                  <a
                    href="mailto:support@ardira.com"
                    className="relative transition-colors duration-300 inline leading-none"
                    style={{ color: "hsl(210, 8%, 65%)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
                  >
                    <Mail size={18} className="inline flex-shrink-0 mr-2" style={{ color: "hsl(113, 42%, 60%)" }} />
                    support@ardira.com
                  </a>
                </li>
                <li className="py-0">
                  <a
                    href="tel:+16697776838"
                    className="relative transition-colors duration-300 inline leading-none"
                    style={{ color: "hsl(210, 8%, 65%)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
                  >
                    <Phone size={18} className="inline flex-shrink-0 mr-2" style={{ color: "hsl(113, 42%, 60%)" }} />
                    1.669.777.6838
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ScrollFade>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid hsl(210, 8%, 22%)" }}>
        <div className="container py-3.5">
          {/* Mobile layout: Links on top, copyright below */}
          <div className="md:hidden flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-4 py-0 h-fit">
              <Link
                to="/terms-of-use"
                className="relative text-sm transition-colors duration-300 leading-none py-0 align-middle inline-flex items-center"
                style={{ color: "hsl(210, 8%, 65%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
              >
                Terms of Use
              </Link>
              <span className="text-sm py-0 leading-none align-middle" style={{ color: "hsl(210, 8%, 65%)" }}>|</span>
              <Link
                to="/privacy-policy"
                className="relative text-sm transition-colors duration-300 leading-none py-0 align-middle inline-flex items-center"
                style={{ color: "hsl(210, 8%, 65%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-sm py-0 leading-none" style={{ color: "hsl(210, 8%, 65%)" }}>
              © {currentYear} Ardira Corporation. All Rights Reserved.
            </p>
          </div>

          {/* Desktop layout: Copyright on left, links on right */}
          <div className="hidden md:flex items-center justify-between gap-3">
            <p className="text-sm" style={{ color: "hsl(210, 8%, 65%)" }}>
              © {currentYear} Ardira Corporation. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/terms-of-use"
                className="relative text-sm transition-colors duration-300"
                style={{ color: "hsl(210, 8%, 65%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
              >
                Terms of Use
              </Link>
              <Link
                to="/privacy-policy"
                className="relative text-sm transition-colors duration-300"
                style={{ color: "hsl(210, 8%, 65%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(113, 42%, 60%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(210, 8%, 65%)")}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




