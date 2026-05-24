import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Download, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollFade } from "@/components/ScrollFade";
import "@/components/HeroSection.css";
import rvInstallImage1 from "@/assets/RVInstallation/relationshipvista-installation-g-1.webp";
import rvInstallImage2 from "@/assets/RVInstallation/relationshipvista-installation-g-2.webp";
import rvInstallImage3 from "@/assets/RVInstallation/relationshipvista-installation-g-3.webp";
import rvInstallImage4 from "@/assets/RVInstallation/relationshipvista-installation-g-4.webp";
import rvInstallImage5 from "@/assets/RVInstallation/relationshipvista-installation-g-5.webp";
import rvInstallImage6 from "@/assets/RVInstallation/relationshipvista-installation-g-6.webp";
import rvInstallImage7 from "@/assets/RVInstallation/relationshipvista-installation-g-7.webp";
import rvInstallImage8 from "@/assets/RVInstallation/relationshipvista-installation-g-8.webp";
import rvInstallImage9 from "@/assets/RVInstallation/relationshipvista-installation-g-9.webp";
import rvInstallImage10 from "@/assets/RVInstallation/relationshipvista-installation-g-10.webp";
import rvInstallImage11 from "@/assets/RVInstallation/relationshipvista-installation-g-11.webp";
import rvInstallImage12 from "@/assets/RVInstallation/relationshipvista-installation-g-12.webp";

export default function RelationshipVistaInstallationGuide() {
  const location = useLocation();

  // Scroll to top when page loads
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
        <div className="max-w-4xl mx-auto relative z-10">
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
              <span className="text-primary">Installation Guide</span>
            </h1>
            <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              Step-by-step instructions to install and configure
              RelationshipVista in your Salesforce org.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-8 pb-10 px-6 border-t border-primary/10">
        <div className="max-w-4xl mx-auto">
          <ScrollFade>
            <h2 className="text-3xl font-semibold font-heading text-text-heading mb-3">
              Install RelationshipVista Package
            </h2>

            <p className="text-base text-text-body mb-12 leading-relaxed font-medium">
              Follow these steps to install RelationshipVista in your Salesforce
              org:
            </p>

            {/* Step 1 */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-heading mb-2">
                    Access AppExchange
                  </h4>
                  <p className="text-text-body text-sm leading-relaxed">
                    Visit{" "}
                    <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FZcqBUAT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      the RelationshipVista AppExchange listing
                    </a>{" "}
                    to begin the installation process.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-heading mb-2">
                    Click Get It Now
                  </h4>
                  <p className="text-text-body text-sm leading-relaxed">
                    Click the "Get It Now" button to initiate the installation
                    wizard.
                  </p>
                </div>
              </div>
              <div className="my-8 flex justify-center">
                <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                  <img loading="lazy" width={1200} height={800}
                    src={rvInstallImage1}
                    alt="Click Get It Now button"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-heading mb-2">
                    Login to Salesforce
                  </h4>
                  <p className="text-text-body text-sm leading-relaxed">
                    You will be asked to login with your Salesforce
                    Administrator credentials into the org where you want to
                    install RelationshipVista.
                  </p>
                </div>
              </div>
              <div className="my-8 flex justify-center">
                <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                  <img loading="lazy" width={1200} height={800}
                    src={rvInstallImage2}
                    alt="Login to Salesforce"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-heading mb-2">
                    Choose Installation Org
                  </h4>
                  <p className="text-text-body text-sm leading-relaxed">
                    Select whether you want to install RelationshipVista in a
                    Sandbox or Production org.
                  </p>
                </div>
              </div>
              <div className="my-8 flex justify-center">
                <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                  <img loading="lazy" width={1200} height={800}
                    src={rvInstallImage3}
                    alt="Choose Installation Org"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-heading mb-2">
                    Accept Terms & Install
                  </h4>
                  <p className="text-text-body text-sm leading-relaxed">
                    Check the box to accept the terms and conditions, then click
                    "Confirm and Install".
                  </p>
                </div>
              </div>
              <div className="my-8 flex justify-center">
                <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                  <img loading="lazy" width={1200} height={800}
                    src={rvInstallImage4}
                    alt="Accept Terms & Install"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-10 border-l-4 border-l-primary/60">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-primary-dark inline-flex items-center gap-1 translate-y-[3px]"><Info size={16} /> Important:</strong> When
                  installing RelationshipVista, we recommend that you select{" "}
                  <strong>"Install for Admins Only"</strong>. You can later give
                  access to other users by updating their profiles and assigning
                  permission sets.
                </p>
              </div>
              <div className="my-8 flex justify-center">
                <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                  <img loading="lazy"
                    src={rvInstallImage5}
                    alt="Install for Admins Only option"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-semibold font-heading text-text-heading mb-6 mt-16">
              Configure User Access
            </h2>

            <p className="text-base text-text-body mb-10 leading-relaxed font-medium">
              To use RelationshipVista, users need to be granted permissions to
              an apex class and a custom object. You can do this either by
              assigning them a permission set or updating their profile.
            </p>

            <h3 className="text-2xl font-semibold font-heading text-text-heading mt-10 mb-6">
              Option 1: Assigning Permission Set
            </h3>
            <p className="text-base text-text-body mb-6 leading-relaxed">
              This is the recommended approach as it's simpler and more
              maintainable.
            </p>
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <h4 className="text-xl font-bold font-heading text-text-heading mb-4">
                Permission Set Assignment
              </h4>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-8">
                <p className="text-sm text-slate-700 flex items-start gap-3 leading-relaxed">
                  <CheckCircle2
                    size={18}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span>
                    Assign the packaged permission set{" "}
                    <strong>"RV Standard User"</strong> to the user
                  </span>
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                    <img loading="lazy" width={1200} height={800}
                      src={rvInstallImage6}
                      alt="Permission Set Assignment"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                    <img loading="lazy" width={1200} height={800}
                      src={rvInstallImage7}
                      alt="Permission Set Confirmation"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold font-heading text-text-heading mt-14 mb-6">
              Option 2: Updating User Profile
            </h3>
            <p className="text-base text-text-body mb-10 leading-relaxed">
              If you prefer to manage access through profiles, update the custom
              profile assigned to users with the following changes:
            </p>

            {/* Apex Class Access */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <h4 className="text-xl font-bold font-heading text-text-heading mb-4">
                Apex Class Access
              </h4>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 inline-block">
                <p className="text-sm text-slate-700 font-mono font-medium">
                  RVController
                </p>
              </div>
              <div className="flex justify-center">
                <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                  <img loading="lazy" width={1200} height={800}
                    src={rvInstallImage8}
                    alt="Apex Class Access Configuration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Object Access */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <h4 className="text-xl font-bold font-heading text-text-heading mb-4">
                Object Access
              </h4>
              <p className="text-sm text-text-body mb-6 leading-relaxed">
                Grant the following permissions on the{" "}
                <strong>RV Configuration</strong> custom object:
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8 space-y-3">
                <p className="text-slate-700 flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-primary shrink-0" />{" "}
                  <span>Read</span>
                </p>
                <p className="text-slate-700 flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-primary shrink-0" />{" "}
                  <span>Create</span>
                </p>
                <p className="text-slate-700 flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-primary shrink-0" />{" "}
                  <span>Edit</span>
                </p>
                <p className="text-slate-700 flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-primary shrink-0" />{" "}
                  <span>Delete</span>
                </p>
                <p className="text-slate-700 flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-primary shrink-0" />{" "}
                  <span>View All</span>
                </p>
              </div>
              <div className="flex justify-center">
                <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                  <img loading="lazy" width={1200} height={800}
                    src={rvInstallImage9}
                    alt="Object Access Configuration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Fields Access */}
            <div className="mb-12 border-l-4 border-primary/30 pl-6">
              <h4 className="text-xl font-bold font-heading text-text-heading mb-4">
                Fields Access
              </h4>
              <p className="text-sm text-text-body mb-6 leading-relaxed">
                Grant Read/Write access on the following{" "}
                <strong>RV Configuration</strong> fields:
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8 space-y-4">
                <p className="text-slate-700 text-sm">• Auto Expand Levels</p>
                <p className="text-slate-700 text-sm">• Configuration</p>
                <p className="text-slate-700 text-sm">
                  • Max Visible Record Count
                </p>
                <p className="text-slate-700 text-sm">• Pinned</p>
                <p className="text-slate-700 text-sm">• Sharing Setting</p>
                <p className="text-slate-700 text-sm">• Show</p>
              </div>
              <div className="space-y-8">
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                    <img loading="lazy" width={1200} height={800}
                      src={rvInstallImage10}
                      alt="Fields Access Configuration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                    <img loading="lazy" width={1200} height={800}
                      src={rvInstallImage11}
                      alt="Additional Fields Configuration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden border border-primary/20 shadow-md max-w-2xl">
                    <img loading="lazy" width={1200} height={800}
                      src={rvInstallImage12}
                      alt="Complete Fields Configuration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-semibold font-heading text-text-heading mb-6 mt-12">
              Next Steps
            </h2>
            <p className="text-base text-text-body mb-3 leading-relaxed font-medium">
              After installation and configuration, refer to the{" "}
              <Link
                to="/resources/user-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark font-semibold"
              >
                User Guide
              </Link>{" "}
              to learn how to configure and use RelationshipVista in your
              Salesforce org.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary/5 border-t border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold font-heading text-text-heading mb-4">
            Ready to Install?
          </h2>
          <p className="text-text-body mb-8">
            Start using RelationshipVista in your Salesforce org today
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
            <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FZcqBUAT"
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


