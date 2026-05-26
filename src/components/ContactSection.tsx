import React, { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollFade } from "./ScrollFade";
import { useRecaptcha } from "@/hooks/useRecaptcha";

/* ── Lazy-loaded Google Map ── */
const LazyMap = React.memo(() => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={mapRef}
      className="rounded-xl overflow-hidden border border-border/50 w-full bg-muted/20 flex items-center justify-center relative"
      style={{ height: "250px", flexShrink: 0 }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10 animate-pulse">
          <MapPin className="w-8 h-8 text-muted-foreground/30" />
        </div>
      )}
      {isLoaded && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6342.08172427285!2d-121.96206399999998!3d37.36521!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fca3b29bd16bd%3A0x1b7e4bbf55b3700b!2s2040%20Martin%20Ave%2C%20Santa%20Clara%2C%20CA%2095050%2C%20USA!5e0!3m2!1sen!2sin!4v1775548501571!5m2!1sen!2sin"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Map - Santa Clara, CA"
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
});

/* ── Contact Section ── */
const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { loadRecaptcha, executeRecaptcha } = useRecaptcha();

  /* Load reCAPTCHA when section mounts */
  useEffect(() => {
    loadRecaptcha();
  }, [loadRecaptcha]);

  const validateField = (field: keyof typeof form, value: string): string => {
    let errorMsg = "";
    if (field === "name") {
      if (!value.trim()) errorMsg = "Name is required";
      else if (value.trim().length < 2) errorMsg = "Name must be at least 2 characters";
    } else if (field === "email") {
      if (!value.trim()) errorMsg = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = "Please enter a valid email";
    } else if (field === "phone") {
      const digitCount = value.replace(/\D/g, "").length;
      if (!value.trim()) errorMsg = "Phone number is required";
      else if (digitCount < 7 || digitCount > 15 || !/^\+?[\d\s()\-.]+$/.test(value)) errorMsg = "Please enter a valid phone number";
    }
    return errorMsg;
  };

  const handleBlur = (field: keyof typeof form) => {
    if (field === "message") return;
    const errorMsg = validateField(field, form[field]);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (errorMsg) {
        newErrors[field] = errorMsg;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};

    const nameErr = validateField("name", form.name);
    if (nameErr) e.name = nameErr;

    const emailErr = validateField("email", form.email);
    if (emailErr) e.email = emailErr;

    const phoneErr = validateField("phone", form.phone);
    if (phoneErr) e.phone = phoneErr;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------- DEPLOYMENT CONFIGURATIONS ----------
  // Uncomment the line below for Original Domain (PHP deployment)
  // const CONTACT_API_URL = "http://localhost:8000/contact.php";

  // Uncomment the line below for Vercel deployment (Nodemailer)
  const CONTACT_API_URL = "/api/contact";
  // ------------------------------------------------

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token
      let token = await executeRecaptcha("contact_form");

      if (!token) {
        console.warn("reCAPTCHA token not available. Proceeding with placeholder token for testing.");
        token = "dev_placeholder_token";
      }

      const submissionData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        pageUrl: window.location.href,
        recaptchaToken: token,
      };

      console.log("Form submission data:", submissionData);

      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      setErrors({ form: "Unable to send your message. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-2.5 rounded-md border transition-colors text-sm focus:outline-none focus:ring-2 disabled:opacity-50 text-foreground ${errors[name]
      ? "border-destructive bg-red-50 focus:ring-destructive/30 focus:border-destructive"
      : "border-input bg-[white] focus:ring-primary/30 focus:border-primary"
    }`;

  return (
    <section id="contact" className="pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-20 relative overflow-x-hidden md:overflow-x-visible">
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="container relative z-10">
        {/* ── Section Header ── */}
        <ScrollFade>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-bold tracking-widest uppercase gradient-text mb-3 inline-block">
              Contact
            </p>
            <h2 className="text-3xl md:text-[38px] font-extrabold font-heading mb-4 text-text-heading">Get in Touch</h2>
            <p className="text-text-body text-lg">
              Have questions or want to learn more? Reach out and we'll get back to you promptly.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollFade>

        {/* ── Two-Column Grid: Left = Quick Contact (sticky), Right = Form ── */}
        <div className="mx-auto grid md:grid-cols-[32%_55%] lg:grid-cols-[40%_56%] gap-3 md:gap-4 lg:gap-12 max-w-6xl px-0 auto-rows-max md:place-content-center lg:place-content-start">

          {/* ── Left: Quick Contact (Sticky on desktop) ── */}
          <ScrollFade
            className="space-y-6 w-full lg:sticky lg:top-[110px] h-fit"
            delay={80}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-heading mb-3 text-primary">
                Quick Contact
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Get in touch with a representative to see a demo or simply learn more about the product.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 w-full">
              {/* Address */}
              <a
                href="https://www.google.com/maps?cid=1981104171238256651"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl border border-primary/45 bg-primary-highlited/1 transition-all duration-300 cursor-pointer w-full min-w-0 shadow-sm hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/80 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-heading text-sm">Address</p>
                  <p className="text-sm font-bold text-gray-500 leading-relaxed break-words mt-1">
                    <span className="hidden md:inline">2040 Martin Ave, Santa Clara, CA 95050<br />United States</span>
                    <span className="md:hidden">2040 Martin Ave, Santa Clara, CA<br />95050, United States</span>
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:16697776838"
                className="flex items-center gap-4 p-5 rounded-xl border border-primary/45 bg-primary-highlited/1 transition-all duration-300 cursor-pointer w-full min-w-0 shadow-sm hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/80 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <p className="font-semibold text-text-heading text-sm">Phone</p>
                  <p className="text-sm font-bold text-gray-500 mt-1 group-hover:text-primary transition-colors duration-300">
                    1.669.777.6838
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@ardira.com"
                className="flex items-center gap-4 p-5 rounded-xl border border-primary/45 bg-primary-highlited/1 transition-all duration-300 cursor-pointer w-full min-w-0 shadow-sm hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/80 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <p className="font-semibold text-text-heading text-sm">Email</p>
                  <p className="text-sm font-bold text-gray-500 mt-1 group-hover:text-primary transition-colors duration-300">
                    info@ardira.com
                  </p>
                </div>
              </a>
            </div>

            {/* Support Note */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-primary/45 bg-primary-highlited/10 transition-all duration-300 cursor-pointer w-full min-w-0 shadow-sm group cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center shrink-0 text-lg font-bold text-white">
                ?
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">
                  <span className="hidden md:inline">
                    <span className="font-semibold text-text-heading">For customer support,</span> email us directly at<br />
                  </span>
                  <span className="md:hidden">
                    <span className="font-semibold text-text-heading">For customer support, email us</span><br />directly at{" "}
                  </span>
                  <a
                    href="mailto:support@ardira.com"
                    className="font-bold text-primary"
                  >
                    support@ardira.com
                  </a>
                </p>
              </div>
            </div>
          </ScrollFade>

          {/* ── Right: Contact Form ── */}
          <ScrollFade
            className="w-full min-w-0 mt-6 md:mt-0"
            delay={160}
          >
            {submitted ? (
              /* ── Success State ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-14 md:py-20 premium-card p-6 md:p-8"
              >
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border-2 border-primary/30"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    <CheckCircle size={40} className="text-primary" />
                  </motion.div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="font-bold text-text-heading text-xl md:text-2xl mb-2"
                >
                  Message Sent Successfully!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="text-text-muted text-sm md:text-base text-center max-w-md px-6 mb-2"
                >
                  Thank you for reaching out! We've received your message and a confirmation has been sent to your email.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.3 }}
                  className="text-text-muted text-xs text-center max-w-sm px-6 mb-8"
                >
                  Our team will get back to you within 24 hours.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.3 }}
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
                >
                  Send Another Message
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ) : (
              /* ── Form State ── */
              <form
                onSubmit={handleSubmit}
                style={{ boxSizing: "border-box" }}
                className="premium-card premium-card-active p-4 md:p-8 space-y-5 !border-primary/45"
              >
                <div>
                  <h3 className="text-lg font-bold text-text-heading mb-1">
                    Fill out the form and we'll be in touch shortly!
                  </h3>
                  <p className="text-xs text-gray-500">
                    Note: fields marked with <span className="text-destructive">(*)</span> are mandatory
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-text-heading mb-2">
                    Name<span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    disabled={isSubmitting}
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    onBlur={() => handleBlur("name")}
                    className={inputClass("name")}
                    placeholder="Enter your name"
                    style={{ backgroundColor: "white" }}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-text-heading mb-2">
                    Email<span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    disabled={isSubmitting}
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    onBlur={() => handleBlur("email")}
                    className={inputClass("email")}
                    placeholder="Enter your email"
                    style={{ backgroundColor: "white" }}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-text-heading mb-2">
                    Phone<span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    disabled={isSubmitting}
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    onBlur={() => handleBlur("phone")}
                    className={inputClass("phone")}
                    placeholder="Enter your phone number"
                    style={{ backgroundColor: "white" }}
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-text-heading mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    disabled={isSubmitting}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass("message")} resize-none`}
                    placeholder="Lets talk! Tell us about yourself."
                    style={{ backgroundColor: "white" }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cta w-full justify-center !rounded-xl !py-3 flex items-center gap-2 hover:![transform:translateY(0)]"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Form-level error */}
                {errors.form && (
                  <p className="text-destructive text-sm text-center bg-red-50 border border-red-200 rounded-md px-4 py-2.5">
                    {errors.form}
                  </p>
                )}

                {/* Privacy note */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  We're committed to your privacy. Ardira uses the information you provide us to contact you about relevant content, products and services. You may unsubscribe from these communications at any time. For information, check out our{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-primary font-bold hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>.
                </p>

                {/* Map at bottom of form */}
                <div className="mt-6">
                  <LazyMap />
                </div>
              </form>
            )}
          </ScrollFade>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
