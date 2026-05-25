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
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[hsl(202,35%,62%)]/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[hsl(113,42%,42%)]/10 rounded-full blur-[80px]" />

      <div className="text-center z-10 max-w-md">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold gradient-text mb-4 font-heading tracking-tighter">
          404!
        </h1>

        {/* Error Message */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-text-heading mb-3">Page Not Found</h2>
          <p className="text-base md:text-lg text-text-body leading-relaxed mb-8">
            The page you're looking for doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="btn-outline flex items-center justify-center gap-2 !px-7 py-3 font-medium cursor-pointer hover:!translate-y-0"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="btn-cta flex items-center justify-center gap-2 !px-7 py-3 font-medium cursor-pointer hover:!translate-y-0"
          >
            <Home className="w-5 h-5" />
            Return Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
