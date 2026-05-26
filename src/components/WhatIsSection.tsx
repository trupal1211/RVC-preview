import { ScrollFade } from "./ScrollFade";
import HeroAnimation from "./HeroAnimation";

const WhatIsSection = () => {
  return (
    <section id="overview" className="section-padding overflow-hidden relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">

          {/* Image */}
          <ScrollFade
            delay={80}
            className="relative w-full flex items-center justify-center h-auto order-2 lg:order-1 -mt-4 lg:mt-0"
          >
            <HeroAnimation />
          </ScrollFade>

          {/* Text Container: Uses 'contents' on mobile to flatten children into the grid for reordering, but stays a block on desktop to group them. */}
          <div className="contents lg:block order-1 lg:order-2">

            {/* Title */}
            <ScrollFade
              delay={80}
              className="order-1 lg:order-none"
            >
              <p className="text-sm font-bold tracking-widest uppercase gradient-text mb-3 inline-block">
                Overview
              </p>
              <h2 className="text-3xl md:text-[36px] font-bold leading-tight font-heading">
                Uncover Deeper Insights with <span className="text-primary">Simplified Relationship Mapping</span>
              </h2>
            </ScrollFade>

            {/* Paragraphs */}
            <div className="space-y-5 order-3 lg:order-none lg:mt-5">
              <ScrollFade delay={80}>
                <div className="space-y-4 text-text-body text-[15px] leading-relaxed">
                  <p>
                    You shouldn't have to click through multiple records just to understand how things are connected.
                  </p>
                  <p>
                    RelationshipVista gives you a clear, visual view of your data so you can instantly see how accounts, contacts, opportunities, and custom objects relate to each other.
                  </p>
                  <p>
                    When everything is laid out in front of you, you can:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 marker:text-primary/70">
                    <li>Identify the right people in a deal</li>
                    <li>Understand account structures faster</li>
                    <li>Make decisions without second-guessing</li>
                  </ul>
                  <p>
                    No more jumping between tabs. No more piecing things together manually.
                  </p>
                  <p>
                    It works directly inside Salesforce with your existing data. No setup headaches. No code required. Just a faster, clearer way to work.
                  </p>
                </div>
                <div className="relative pl-5 mt-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                  <p className="text-primary font-semibold italic text-lg">
                    "Visualize any relationship. Customize any view. Explore any hierarchy."
                  </p>
                </div>
              </ScrollFade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
