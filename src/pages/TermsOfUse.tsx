import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { ArrowUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "@/components/HeroSection.css";

const TermsOfUse = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 gradient-mesh z-[-1]" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="container max-w-4xl md:max-w-6xl px-4 md:px-6">
          <Link to="/" className="mb-6 flex items-center w-max text-primary font-medium hover:underline transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Link>
          <div
            className="hero-fade-up space-y-6 md:space-y-8"
          >
            {/* Header */}
            <div className="space-y-4 relative">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Terms of Use</h1>
                </div>
                <a
                  href="https://surveyvista.com/ardira-appexchange-app-terms-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-secondary-blue font-semibold whitespace-normal md:whitespace-nowrap md:mt-2 text-sm md:text-base transition-all duration-300"
                >
                  Ardira AppExchange App Terms and Conditions
                </a>
              </div>
            </div>

            {/* Content Sections */}
            <div className="prose prose-invert max-w-none space-y-6 md:space-y-8 text-justify">
              <section className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  The website located at <a href="https://www.relationshipvista.com" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-secondary-blue transition-all duration-300">www.RelationshipVista.com</a>, (the "Website") is published, owned, and operated by Ardira Corporation, its affiliates and related entities ("RelationshipVista", "the Company," "we," "us," and "our"). These Terms of Use (the "Terms") govern your access to and use of the Website.
                </p>
              </section>

              <section className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  By accessing, browsing, submitting information to and/or using the Website, you agree and acknowledge on your own behalf (referred to throughout the Terms as "you") that you have read, understand and agree to be bound by these Terms and to comply with all applicable laws including, without limitation, all federal, state and local tax and tariff laws, regulations, and/or directives. If you do not agree to the Terms, please do not use the Website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Purpose of the Website</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  The Website are provided solely for informational purposes and the purposes of enabling communication between you and the Company. The information provided is intended to be general in nature and does not necessarily address all the terms, exclusions, and conditions applicable to our products and services.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  We do not warrant the accuracy, completeness, or usefulness of this information at any particular time. Any reliance you place on such information is strictly at your own risk. The Company disclaims all liability and responsibility arising from any reliance placed on such content by you or any other visitor to our Website, or by anyone who may be informed of any of its contents. Any information you provide or that is collected by the Company through the Website shall be handled in accordance with the Website's <a href="/privacy-policy" className="text-primary underline hover:text-secondary-blue transition-all duration-300">Privacy Policy</a>, which is hereby incorporated by reference.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Use of the Website</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  The Company grants you a non-exclusive right to access and use the Website and the data, material, content or information herein (collectively, the "Content") solely for your personal use. Your right to access and use the Website shall be limited to non-commercial purposes unless you are otherwise expressly authorized by the Company to use the Website for commercial purposes. You agree to use the Website only for lawful purposes, comply with all rules governing any transactions on and through the Website and comply with applicable laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-3 text-sm md:text-base">You agree that you will not:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm md:text-base">
                  <li>Use the Website in any manner that could damage, disable, overburden, or impair the Website or interfere with any other party's use and enjoyment of them;</li>
                  <li>Attempt to gain unauthorized access to any Website account, computer systems or networks associated with the Company or the Website;</li>
                  <li>Obtain or attempt to obtain any materials or information through the Website by any means not intentionally made available or provided by the Company;</li>
                  <li>Use any robot, spider, or other automatic device, process or means to access the Website for any purpose, including monitoring or copying any of the material on the Website;</li>
                  <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful;</li>
                  <li>Attack the Website via a denial-of-service attack or a distributed denial-of-service attack; or</li>
                  <li>Impersonate or attempt to impersonate the Company, a Company employee, another user or any other person or entity (including, without limitation, by using email addresses associated with any of the foregoing).</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Third Party Sites</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  The Website may contain links to Website controlled or operated by persons and companies other than the Company ("Linked Sites"). Linked Sites are not under the control of the Company, and the Company is not responsible for the contents of any Linked Site, including without limitation any link contained on a Linked Site, or any changes or updates to a Linked Site. The Company is not responsible if the Linked Site is not working correctly or for any viruses, malware, or other harms resulting from your use of a Linked Site. The Company is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by the Company of the site or any association with its operators. You are responsible for viewing and abiding by the privacy policies and terms of use posted on the Linked Sites. You are solely responsible for any dealings with third parties who support the Company or are identified in the Website, including any delivery of and payment for goods and services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Intellectual Property Notices</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  The Website and Content are protected by copyrights, trademarks, or are subject to other proprietary rights. Accordingly, you are not permitted to use the Website or Content in any manner, except as expressly permitted by the Company in these Terms. The Website or Content may not be copied, reproduced, modified, published, uploaded, posted, transmitted, performed, or distributed in any way, and you agree not to modify, rent, lease, loan, sell, distribute, transmit, broadcast, or create derivatives with the express written consent of the Company or applicable owner.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You acknowledge and agree that you are solely responsible for complying with the applicable restrictions on use of all Content, copyrighted materials and trademarks that you see, hear, and use on the Website. You understand that any unauthorized use of such intellectual property would result in irreparable injury for which money damages would be inadequate. You further acknowledge that, in the event of any such unauthorized use, the Company or the applicable intellectual property owner will have the right, in addition to other remedies available at law and in equity, to immediate injunctive relief to prevent any such unauthorized use.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Questions regarding the use of any intellectual property provided on the Website should be directed to{" "}
                  <a href="mailto:legal@ardira.com" className="text-primary underline hover:text-secondary-blue transition-all duration-300">
                    legal@ardira.com
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  ALL INFORMATION OR SERVICES PROVIDED BY THE COMPANY TO YOU VIA THE WEBSITE, INCLUDING, WITHOUT LIMITATION, ALL CONTENT, ARE PROVIDED "AS IS" AND "WHERE IS" AND WITHOUT ANY WARRANTIES OF ANY KIND. THE COMPANY AND ITS THIRD-PARTY LICENSORS EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. NOTWITHSTANDING ANY PROVISION CONTAINED HEREIN TO THE CONTRARY, THE COMPANY AND ITS THIRD-PARTY LICENSORS MAKE NO REPRESENTATION, WARRANTY OR COVENANT CONCERNING THE ACCURACY, QUALITY, SUITABILITY, COMPLETENESS, SEQUENCE, TIMELINESS, SECURITY OR AVAILABILITY OF THE WEBSITE OR ANY CONTENT POSTED ON OR OTHERWISE ACCESSIBLE VIA THE WEBSITE. YOU SPECIFICALLY ACKNOWLEDGE THAT THE COMPANY AND ITS THIRD-PARTY LICENSORS ARE NOT LIABLE FOR THE DEFAMATORY, OBSCENE OR UNLAWFUL CONDUCT OF OTHER THIRD PARTIES OR USERS OF THE WEBSITE AND THAT THE RISK OF INJURY FROM THE FOREGOING RESTS ENTIRELY WITH YOU. NEITHER THE COMPANY NOR ANY OF ITS THIRD-PARTY LICENSORS REPRESENT, WARRANT OR COVENANT THAT THE WEBSITE WILL BE SECURE, UNINTERRUPTED OR ERROR-FREE. THE COMPANY FURTHER MAKES NO WARRANTY THAT THE WEBSITE WILL BE FREE OF VIRUSES, WORMS OR TROJAN HORSES OR THAT IT WILL FUNCTION OR OPERATE IN CONJUNCTION WITH ANY OTHER PRODUCT OR SOFTWARE. YOU EXPRESSLY AGREE THAT USE OF THE WEBSITE IS AT YOUR SOLE RISK AND THAT THE COMPANY, ITS AFFILIATES AND THEIR THIRD-PARTY LICENSORS SHALL NOT BE RESPONSIBLE FOR ANY TERMINATION, INTERRUPTION OF SERVICES, DELAYS, ERRORS, FAILURES OF PERFORMANCE, DEFECTS, LINE FAILURES, OR OMISSIONS ASSOCIATED WITH THE WEBSITE OR YOUR USE THEREOF. YOUR SOLE REMEDY AGAINST THE COMPANY FOR DISSATISFACTION WITH THE WEBSITE OR THE CONTENT IS TO CEASE YOUR USE OF THE WEBSITE AND/OR THE CONTENT.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  UNDER NO CIRCUMSTANCES SHALL THE COMPANY OR ANY OF ITS THIRD-PARTY LICENSORS BE LIABLE TO YOU OR TO ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, SPECIAL OR EXEMPLARY DAMAGES (INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OF USE, LOSS OF DATA, LOSS OF INFORMATION OR PROGRAMS ON YOUR DATA HANDLING SYSTEM, TRANSACTION LOSSES, OPPORTUNITY COSTS, INTERRUPTION OF BUSINESS OR COSTS OF PROCURING SUBSTITUTE GOODS) RESULTING FROM, ARISING OUT OF OR IN ANY WAY RELATING TO THE WEBSITE, OR THE CONTENT, DATA, CONTENT OR INFORMATION ACCESSED VIA THE WEBSITE OR ANY HYPERLINKED WEBSITE, OR ANY DISRUPTION OR DELAY IN THE PERFORMANCE OF THE WEBSITE, REGARDLESS OF THE FORM OF THE CLAIM OR ACTION, WHETHER BASED ON CONTRACT, TORT, STRICT LIABILITY, STATUTE OR OTHERWISE, AND REGARDLESS OF WHETHER OR NOT SUCH DAMAGES WERE FORESEEN, UNFORESEEN OR FORESEEABLE, EVEN IF THE COMPANY OR ITS THIRD-PARTY LICENSORS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Indemnity</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  You agree to defend, indemnify and hold harmless the Company and its affiliates, licensors and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Website, including, but not limited to, any use of the Website Content, services, or products other than as expressly authorized in these Terms or your use of any information obtained from the Website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Termination and Restriction of Access</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  In its sole discretion, the Company may terminate or suspend your access to the Website for breach of these Terms. The Company shall not be liable for any losses or damages arising from any such termination of service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Arbitration</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  At its sole discretion, the Company may require you to submit any disputes arising from use of the Website, or breach of these Terms, including disputes arising from or concerning their interpretation, violation, invalidity, non-performance, or termination, to final and binding arbitration under the Rules of Arbitration of the American Arbitration Association applying Ohio law. By using the Website, you hereby consent to submission of any dispute to be final and binding arbitration.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">Limitation on Time to File Claims</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any cause of action or claim you may have arising out of or relating to these Terms or the Website must be commenced within one (1) year after the cause of action accrues, otherwise, such cause of action or claim is permanently barred.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">Governing Law & Jurisdiction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of the State of Ohio, U.S.A. You hereby irrevocably consent to the exclusive jurisdiction and venue of the courts in Cleveland, Ohio, U.S.A. in all disputes arising out of or relating to the use of the Website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">Changes to these Terms of Use</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Company may update or change these Terms from time to time in order to reflect changes in any offered services, changes in the law, or for other reasons as deemed necessary by the Company. The effective date of any Terms will be reflected in the "Last Revised" entry. Your continued use of the Website after any such change is communicated shall constitute your consent to such change(s).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">General</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree that no joint venture, partnership, employment, or agency relationship exists between you and the Company as a result of these Terms or use of the Website. You may not assign these Terms without the prior written consent of the Company in all instances. The Company may assign these Terms, in whole or in part, at any time. The Company's performance of this agreement is subject to existing laws and legal process, and nothing contained in these Terms is in derogation of the Company's right to comply with governmental, court, and law enforcement requests or requirements relating to your use of the Website or information provided to or gathered by the Company with respect to such use.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  If any part of these Terms are determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision, and the remainder of these Terms shall continue in effect.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms, including the Privacy Policy and all other documents expressly incorporated herein by reference, constitute the entire agreement between you and the Company with respect to the Website, and supersede all prior or contemporaneous communications and proposals, whether electronic, oral, or written, between you and the Company. A printed version of these Terms and of any notices given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button - Fixed Position */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 md:bottom-6 right-4 md:right-6 z-40 w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
          }`}
        title="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <Footer />
    </div>
  );
};

export default TermsOfUse;


