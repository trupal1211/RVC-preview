import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-sky-50/50 to-indigo-50/50 relative overflow-hidden px-4">
      {/* Background decorative elements */}
      <div className="not-found-blob absolute -top-40 -right-40 w-80 h-80 bg-[hsl(202,35%,62%)]/10 rounded-full blur-[80px]" />
      <div className="not-found-blob not-found-blob--alt absolute -bottom-40 -left-40 w-80 h-80 bg-[hsl(113,42%,42%)]/10 rounded-full blur-[80px]" />

      <div className="not-found-content text-center z-10 max-w-md">
        {/* 404 Number */}
        <h1 className="not-found-pulse text-8xl md:text-9xl font-extrabold gradient-text mb-4 font-heading tracking-tighter">
          404
        </h1>

        {/* Error Message */}
        <div className="not-found-stagger-1">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-text-heading mb-3">Page Not Found</h2>
          <p className="text-base md:text-lg text-text-body leading-relaxed mb-8">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="not-found-stagger-2 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="btn-outline flex items-center justify-center gap-2 !px-7 py-3 transition-all duration-300 font-medium cursor-pointer hover:scale-105 hover:-translate-x-1 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="btn-cta flex items-center justify-center gap-2 !px-7 py-3 hover:shadow-lg transition-all duration-300 font-medium cursor-pointer hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Return Home
          </button>
        </div>

        {/* Path Info */}
        <p className="not-found-stagger-3 mt-10 pt-8 border-t border-border/40 text-xs md:text-sm text-text-muted break-all">
          Requested path: <span className="font-mono text-primary bg-primary/5 px-2 py-1 rounded">{location.pathname}</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
