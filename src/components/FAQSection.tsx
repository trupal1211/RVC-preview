import { useState, useRef, useCallback } from "react";
import { ScrollFade } from "./ScrollFade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    id: "faq-1",
    q: "Is RelationshipVista 100% native to Salesforce?",
    a: "Yes. RelationshipVista is built as a Lightning Web Component that lives entirely inside Salesforce. No external tools, integrations, or data syncing required.",
  },
  {
    id: "faq-2",
    q: "Do I need technical skills to use RelationshipVista?",
    a: "No. RelationshipVista is designed for everyone. Users can explore relationships, apply filters, and create custom views using an intuitive, visual interface.",
  },
  {
    id: "faq-3",
    q: "Can I customize the visualizations for my organization's needs?",
    a: "Absolutely. You can create custom Relationship Views (R-Views) based on any fields in your objects. Filter, group, and organize relationships exactly how your team needs them.",
  },
  {
    id: "faq-4",
    q: "Does RelationshipVista work with custom objects?",
    a: "Yes. RelationshipVista supports all standard and custom objects in Salesforce. It visualizes lookup relationships, reverse lookups, and many-to-many relationships seamlessly.",
  },
  {
    id: "faq-5",
    q: "How quickly can we get started?",
    a: "Installation is fast. Install the component from AppExchange, drop it on a record page, and you're ready to explore.",
  },
];

const FAQs = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((id: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenItem(id), 75);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  return (
    <section className="section-padding section-alt relative overflow-hidden" id="faq">
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="container max-w-3xl relative z-10">
        <ScrollFade>
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase gradient-text mb-3 inline-block">
              FAQ
            </p>
            <h2 className="text-3xl md:text-[38px] font-extrabold font-heading mb-4 text-text-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-text-body text-lg">
              Everything you need to know about RelationshipVista.
            </p>
            <div className="section-divider mt-6 mx-auto" />
          </div>
        </ScrollFade>

        <ScrollFade className="w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            value={openItem || ""}
            onValueChange={setOpenItem}
          >
            {faqItems.map((faq, index) => (
              <ScrollFade
                key={faq.id}
                delay={index * 50}
              >
                <div
                  onMouseEnter={() => handleMouseEnter(faq.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <AccordionItem
                    value={faq.id}
                    className={cn(
                      "border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-lg bg-white",
                      openItem === faq.id && "border-primary/20 shadow-md"
                    )}
                  >
                    <AccordionTrigger
                      className="px-6 py-5 hover:no-underline transition-all duration-200 group rounded-t-2xl [&[data-state=open]]:bg-primary/5 hover:bg-gray-50/50"
                      aria-label={`Question ${index + 1}: ${faq.q}`}
                    >
                      <div className="flex items-center text-left flex-1" aria-hidden="true">
                        <span className="text-base md:text-[17px] font-bold text-text-heading group-hover:text-primary group-data-[state=open]:text-primary transition-colors duration-200">
                          {faq.q}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2 text-[15px] text-text-body leading-relaxed border-t border-gray-50 bg-white">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </ScrollFade>
            ))}
          </Accordion>
        </ScrollFade>
      </div>
    </section>
  );
};

export default FAQs;
