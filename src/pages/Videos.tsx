import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Play, Clock, Film, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollFade } from "@/components/ScrollFade";
import "@/components/HeroSection.css";

const videos = [
    {
        title: "What is RVC?",
        description:
            "Get a quick overview of RelationshipVista — what it does, why it matters, and how it helps you visualize Salesforce relationships effortlessly.",
        icon: Film,
        accent: "from-primary/20 to-secondary-blue/20",
        borderAccent: "group-hover:border-primary/40",
        number: "01",
    },
    {
        title: "How to Configure RVC?",
        description:
            "A step-by-step walkthrough of configuring RelationshipVista in your Salesforce org — from initial setup to building your first relationship view.",
        icon: Play,
        accent: "from-secondary-blue/20 to-primary/20",
        borderAccent: "group-hover:border-secondary-blue/40",
        number: "02",
    },
    {
        title: "How to Load Sample Data for evaluating RelationshipVista?",
        description:
            "Learn how to set up sample data that you can use to explore all RelationshipVista features.",
        icon: Play,
        accent: "from-primary/15 to-emerald-500/15",
        borderAccent: "group-hover:border-primary/40",
        number: "03",
    },
];

export default function Videos() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 50);
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 gradient-mesh z-[-1]" aria-hidden="true" />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 md:pt-32 pb-8 px-6 bg-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(77,154,63,0.08),transparent)] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 font-semibold text-sm group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Back to RelationshipVista
                    </Link>
                    <div className="hero-fade-up">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading leading-[1.05] tracking-tight text-text-heading mb-4">
                            RelationshipVista{" "}
                            <span className="text-primary">Video Guides</span>
                        </h1>
                        <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl font-normal">
                            Watch our video tutorials to learn how to set up, configure, and
                            get the most out of RelationshipVista in your Salesforce org.
                        </p>
                    </div>
                </div>
            </section>

            {/* Videos Grid Section */}
            <section className="py-8 px-6 border-t border-primary/10">
                <div className="max-w-5xl mx-auto">

                    {/* Video Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {videos.map((video, index) => (
                            <ScrollFade
                                key={video.title}
                                delay={index * 120}
                                className="group"
                            >
                                <div
                                    className={`relative flex flex-col h-full bg-white rounded-2xl border border-border/60 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_12px_40px_-10px_rgba(77,154,63,0.15),0_4px_6px_-4px_rgba(0,0,0,0.05)]`}
                                >
                                    {/* Video Thumbnail / Coming Soon Placeholder */}
                                    <div className="relative w-full aspect-video bg-slate-200 flex items-center justify-center overflow-hidden backdrop-blur-md border-b border-border/40">
                                        {/* Decorative faint elements */}
                                        <div className="absolute inset-0 opacity-[0.05]">
                                            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full" />
                                            <div className="absolute bottom-6 right-6 w-32 h-32 border-2 border-white rounded-full" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full" />
                                        </div>

                                        {/* Coming Soon Center Text */}
                                        <div className="relative z-10 flex items-center gap-2.5 transition-transform duration-500 ">
                                            <Clock size={18} className="text-slate-500" />
                                            <span className="text-base font-bold tracking-widest uppercase text-slate-500">
                                                Coming Soon...
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-col flex-1 px-4 py-5 md:px-4 md:py-5">
                                        <div className="mb-3">
                                            <h3 className="text-base md:text-lg font-semibold text-text-heading leading-snug">
                                                {video.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-text-muted leading-relaxed flex-1">
                                            {video.description}
                                        </p>

                                    </div>
                                </div>
                            </ScrollFade>
                        ))}
                    </div>


                </div>
            </section>

            {/* CTA Section */}
            <section className="py-9 px-6 bg-primary/5 border-t border-primary/20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold font-heading text-text-heading mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-text-body mb-8">
                        Install RelationshipVista and start exploring Salesforce
                        relationships today.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/resources/user-guide"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-primary/30 text-primary-dark bg-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors"
                        >
                            User Guide
                        </Link>
                        <a
                            href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FZcqBUAT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm"
                        >
                            Install from AppExchange <Download size={15} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
