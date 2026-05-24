import { useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

// Use environment variable for reCAPTCHA site key
// This supports VITE_RECAPTCHA_SITE_KEY (standard Vite) or RECAPTCHA_SITE_KEY (Lovable platform secrets if exposed)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || import.meta.env.RECAPTCHA_SITE_KEY || "";

export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadRecaptcha = useCallback(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key is not configured. Set VITE_RECAPTCHA_SITE_KEY in your environment.");
      return;
    }

    if (isLoaded || document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      if (window.grecaptcha) setIsLoaded(true);
      return;
    }

    // Guard against concurrent injection calls
    if ((window as any).___recaptcha_injected) return;
    (window as any).___recaptcha_injected = true;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, [isLoaded]);

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key is not configured");
      return null;
    }
    if (!window.grecaptcha) {
      console.warn("reCAPTCHA has not loaded yet");
      return null;
    }
    try {
      return await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    } catch (e) {
      console.error("reCAPTCHA execution failed", e);
      return null;
    }
  };

  return { loadRecaptcha, executeRecaptcha, isLoaded };
};
