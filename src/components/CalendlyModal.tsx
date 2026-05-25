import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// IMPORTANT: Update this with your actual Calendly URL
// Format: https://calendly.com/your-username or https://calendly.com/your-username/meeting-type
const CALENDLY_URL = "https://calendly.com/d/zzy-699-f8v/book-a-demo";

const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);

      // iOS-safe scroll lock: position:fixed is the only reliable way to
      // prevent background scrolling on mobile Safari
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        clearTimeout(timer);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "unset";
        document.documentElement.style.overflow = "unset";
        window.scrollTo(0, scrollY);
      };
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-12"
        >
          {/* Desktop close button - overlays the iframe (works fine on desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            type="button"
            className="hidden md:flex fixed md:absolute top-4 right-6 z-[10001] p-3 rounded-full text-white bg-zinc-800 hover:bg-black shadow-xl border border-zinc-700/50 transition-colors cursor-pointer items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1060px] h-full md:h-[750px] md:max-h-[95vh] relative flex flex-col bg-white md:bg-transparent"
          >
            {/* Mobile header bar with close button - sits ABOVE the iframe, not over it */}
            <div className="flex md:hidden items-center justify-end px-3 py-2 bg-white shrink-0">
              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-full text-white bg-zinc-800 hover:bg-black shadow-lg border border-zinc-700/50 transition-colors flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-transparent">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                </div>
              </div>
            )}

            {/* Calendly iframe */}
            <div className="w-full flex-1 bg-transparent overflow-hidden relative z-0">
              <iframe
                src={`${CALENDLY_URL}?embed_domain=${window.location.hostname}&embed_type=Inline`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a demo"
                allowFullScreen
                className="w-full h-full max-w-full"
                style={{
                  display: "block",
                  width: "100%",
                  minWidth: "100%",
                  maxWidth: "100%",
                  height: "100%"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CalendlyModal;
