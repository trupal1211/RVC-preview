import { useState, useEffect } from "react";
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
      // Simulate loading time
      const timer = setTimeout(() => setIsLoading(false), 1000);
      // Hide body scrollbar when modal opens
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      // Restore body scrollbar when modal closes
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-12"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1060px] h-[700px] max-h-full relative flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 z-20 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
                </div>
              </div>
            )}

            {/* Scrollable Calendar Container */}
            <div className="w-full h-full overflow-hidden bg-transparent">
              <iframe
                src={`${CALENDLY_URL}?embed_domain=${window.location.hostname}&embed_type=Inline`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a demo"
                allowFullScreen
                scrolling="no"
                style={{ display: "block" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;
