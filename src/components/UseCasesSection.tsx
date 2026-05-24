import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollFade } from "./ScrollFade";
import {
   Building2, TrendingUp, Contact, Headphones,
   Package, FileText, Database, GitBranch,
   Eye, Maximize2, GitMerge
} from "lucide-react";

// The complete relationship network dataset
// The complete relationship network dataset
const useCases = [
   { id: 0, parent: null, x: 100, y: 300, icon: Building2, label: "Accounts", title: "Account Management", desc: "Visualize complex master-detail account hierarchies, parent-child structures, and all related contacts in a single view." },

   { id: 1, parent: 0, x: 400, y: 160, icon: TrendingUp, label: "Opportunities", title: "Opportunity Pipeline", desc: "Group and explore opportunities by stage, source, or amount. Spot roadblocks early with a clear visual sales pipeline hierarchy." },
   { id: 2, parent: 0, x: 400, y: 300, icon: Contact, label: "Contacts", title: "Contact Mapping", desc: "Map out who reports to whom. Uncover hidden decision-makers and key influencers across multi-org networks." },
   { id: 3, parent: 0, x: 400, y: 440, icon: Headphones, label: "Cases", title: "Case Management", desc: "Accelerate resolution times by visualizing case histories, related escalations, and support chains at a glance." },

   { id: 4, parent: 1, x: 700, y: 90, icon: Package, label: "Assets", title: "Asset Tracking", desc: "Connect the dots between physical assets, software products, and active contracts assigned to your accounts." },
   { id: 5, parent: 1, x: 700, y: 230, icon: FileText, label: "Contracts", title: "Contract Management", desc: "See the exact relationships between master service agreements, amendments, and software license dependencies." },
   { id: 6, parent: 2, x: 700, y: 370, icon: GitBranch, label: "Partners", title: "Partner Management", desc: "Explore extensive partner hierarchies, channel distribution relationships, and complex tiered reseller structures." },
   { id: 7, parent: 3, x: 700, y: 510, icon: Database, label: "Custom", title: "Custom Objects", desc: "Don't settle for standard objects. Build stunning visual maps for absolutely any custom object relationship in your org." },
];

const mockMetrics = [
   { a: "Hierarchy", b: "Parent/Child", c: "Bi-directional" },
   { a: "Forecasting", b: "Stage Tracking", c: "Roll-up Data" },
   { a: "Stakeholders", b: "Report-to Chains", c: "Cross-Org" },
   { a: "Escalation", b: "SLA Tracking", c: "Root Cause" },
   { a: "Inventory", b: "Lifecycle Maps", c: "Warranties" },
   { a: "Agreements", b: "Amendments", c: "Dependencies" },
   { a: "Channel Ops", b: "Tiered Resellers", c: "Revenue Splits" },
   { a: "Data Model", b: "Any Object", c: "Full Support" },
];

export default function UseCasesSection() {
   const [activeId, setActiveId] = useState(0);
   const [isHovered, setIsHovered] = useState(false);
   const sectionRef = useRef<HTMLElement>(null);
   const [isVisible, setIsVisible] = useState(false);
   const [isPaused, setIsPaused] = useState(false);
   const pauseTimeoutRef = useRef<number | null>(null);

   const handleNodeClick = (id: number) => {
      setActiveId(id);
      setIsPaused(true);

      if (pauseTimeoutRef.current) {
         clearTimeout(pauseTimeoutRef.current);
      }

      pauseTimeoutRef.current = window.setTimeout(() => {
         setIsPaused(false);
      }, 6000);
   };

   useEffect(() => {
      return () => {
         if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
         }
      };
   }, []);

   // Only run autoplay when section is visible in viewport
   useEffect(() => {
      const el = sectionRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
         ([entry]) => setIsVisible(entry.isIntersecting),
         { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
   }, []);

   // Auto-play map explorer (only when visible and not paused)
   useEffect(() => {
      if (!isVisible || isPaused) return;
      const interval = setInterval(() => {
         setActiveId(prev => (prev + 1) % useCases.length);
      }, 2000);
      return () => clearInterval(interval);
   }, [isVisible, isPaused]);

   // Recursively find path to root for active edge highlighting
   const getPathToRoot = (nodeId: number) => {
      const path = [];
      let currentId: number | null = nodeId;
      while (currentId !== null) {
         path.push(currentId);
         const current = useCases.find(u => u.id === currentId);
         currentId = current && current.parent !== null ? current.parent : null;
      }
      return path;
   };

   const activePath = getPathToRoot(activeId);
   const activeCase = useCases.find(u => u.id === activeId) || useCases[0];
   const metrics = mockMetrics[activeId];

   return (
      <section ref={sectionRef} id="use-cases" className="section-padding bg-background relative overflow-hidden font-sans border-t border-border/40">

         {/* Floating Glares - hardware accelerated to prevent scroll lag */}
         <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none transform-gpu" />
         <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none transform-gpu" />

         <div className="container relative z-20 mb-8 lg:mb-12 text-center">
            <ScrollFade>
               <p className="text-sm font-bold tracking-widest uppercase gradient-text mb-3 inline-block">
                  Use Cases
               </p>
               <h2 className="text-3xl md:text-[40px] font-extrabold font-heading leading-tight mb-4 text-slate-900">
                  Interactive Relationship <span className="text-primary">Mapping</span>
               </h2>
               <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  Experience your Salesforce data like never before. Navigate any complex relationship model dynamically within our embedded interactive canvases.
               </p>
               <div className="section-divider mt-6" />
            </ScrollFade>
         </div>

         <div className="container relative z-30">
            <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-center">

               {/* LEFT: INTERACTIVE NETWORK GRAPH UI */}
               <div
                  className="w-full xl:w-[55%] flex-shrink-0 bg-background/80 backdrop-blur-xl border border-primary/25 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.15),0_4px_6px_-4px_hsl(0,0%,0%/0.05)] rounded-2xl overflow-hidden relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
               >
                  {/* Window Chrome */}
                  <div className="w-full h-11 bg-muted/30 border-b border-border/60 flex items-center px-4 gap-3 relative z-20">
                     <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
                        <div className="w-3 h-3 rounded-full bg-primary/70"></div>
                     </div>
                     <div className="ml-4 px-3 py-1 bg-background/60 rounded text-[10px] font-mono text-muted-foreground border border-border/50 flex items-center gap-2">
                        <GitMerge className="w-3 h-3 text-primary" />
                        Relationship_Mapping.io
                     </div>
                  </div>

                  {/* Graph Canvas */}
                  <div className="w-full bg-primary/5">
                     <div className="w-full relative aspect-[6/5] sm:aspect-[16/10] mx-auto overflow-hidden">

                        {/* Connections SVG Layer */}
                        <svg viewBox="0 0 800 640" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                           <defs>
                              <linearGradient id="activeEdgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                 <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                                 <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                              </linearGradient>
                              <style>
                                 {`
                            @keyframes smoothFlowStream {
                              0% { stroke-dashoffset: 18; }
                              100% { stroke-dashoffset: 0; }
                            }
                            .flow-stream { 
                              animation: smoothFlowStream 0.8s linear infinite; 
                            }
                          `}
                              </style>
                           </defs>

                           {useCases.map(node => {
                              if (node.parent === null) return null;
                              const p = useCases.find(u => u.id === node.parent);
                              if (!p) return null;

                              const isActiveEdge = activePath.includes(node.id) && activePath.includes(p.id);

                              // Seamless connection points (stops line from piercing icon backgrounds)
                              // Icon radius is approx 24px (w-12 h-12 = 48x48)
                              const startX = p.x + 24;
                              const endX = node.x - 24;

                              // Smooth Bezier S-Curve logic connecting explicit node borders
                              const cpX = startX + (endX - startX) / 2;
                              const pathData = `M ${startX} ${p.y} C ${cpX} ${p.y}, ${cpX} ${node.y}, ${endX} ${node.y}`;

                              return (
                                 <g key={`edge-${node.id}`}>
                                    {/* Background inactive/dimmed line */}
                                    <path
                                       d={pathData}
                                       fill="none"
                                       stroke="currentColor"
                                       className="opacity-10 text-slate-400"
                                       strokeWidth="1.5"
                                       strokeDasharray="6 6"
                                    />

                                    {/* Glowing Active Line Overlay */}
                                    {isActiveEdge && (
                                       <path
                                          d={pathData}
                                          fill="none"
                                          stroke="hsl(var(--primary))"
                                          className="opacity-100"
                                          strokeWidth="1.5"
                                          strokeDasharray="6 6"
                                          style={{ transition: "all 0.5s ease" }}
                                       />
                                    )}
                                 </g>
                              )
                           })}
                        </svg>

                        {/* DOM Node Layer */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                           {useCases.map(node => {
                              const isInPath = activePath.includes(node.id);
                              const isCurrentlyActive = activeId === node.id;

                              return (
                                 <div
                                    key={node.title}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                                    style={{ left: `${(node.x / 800) * 100}%`, top: `${(node.y / 640) * 100}%` }}
                                 >
                                    <div
                                       onClick={() => handleNodeClick(node.id)}
                                       className="flex flex-col items-center group cursor-pointer relative"
                                    >
                                       {isCurrentlyActive && (
                                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 animate-pulse z-0" />
                                       )}

                                       <div className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-lg flex items-center justify-center transition-all duration-300
                                     ${isCurrentlyActive ? 'bg-primary shadow-[0_8px_24px_rgba(var(--primary),0.4)] scale-110 border-none' :
                                             isInPath ? 'bg-primary/10 border-primary/40 border shadow-sm' :
                                                'bg-background border border-border/60 group-hover:bg-muted/50 group-hover:border-primary/30'}
                                  `}>
                                          <node.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300 
                                        ${isCurrentlyActive ? 'text-white' :
                                                isInPath ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}
                                     `} />
                                       </div>

                                       <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 sm:mt-1.5 md:mt-2.5 text-[8px] sm:text-[9px] md:text-[11px] font-bold whitespace-nowrap px-1 sm:px-1.5 md:px-2.5 py-0.5 sm:py-0.5 md:py-1 rounded-sm sm:rounded-md backdrop-blur-md shadow-sm transition-all duration-300
                                     ${isCurrentlyActive ? 'bg-primary/10 border border-primary/30 text-primary scale-105' :
                                             isInPath ? 'bg-background/80 border border-slate-300 text-slate-800' :
                                                'bg-background/50 border border-transparent text-slate-500 group-hover:text-slate-800'}
                                  `}>
                                          {node.label}
                                       </span>
                                    </div>
                                 </div>
                              )
                           })}
                        </div>

                     </div>
                  </div>
               </div>

               {/* RIGHT: DYNAMIC DATA PANEL */}
               <div className="w-full xl:w-[45%] flex flex-col justify-center lg:pl-4">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={activeCase.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col"
                     >
                        {/* Header Block */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                           <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner shrink-0 leading-none">
                              <activeCase.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                           </div>
                           <div>
                              <h3 className="text-xl md:text-3xl font-bold font-heading text-slate-900 tracking-tight leading-none pt-0.5">
                                 {activeCase.title}
                              </h3>
                           </div>
                        </div>

                        {/* Body Text */}
                        <div className="bg-slate-50/50 border border-slate-200/60 p-5 rounded-xl mb-8 relative overflow-hidden">
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
                           <p className="text-lg text-slate-600 leading-relaxed">
                              {activeCase.desc}
                           </p>
                        </div>

                        {/* Faux Metric Grid */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2">
                           <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                              <div className="text-[11px] font-bold text-slate-500 mb-0.5 sm:mb-1 tracking-wider uppercase">Core Entity</div>
                              <div className="text-[14px] sm:text-[16px] font-bold text-slate-900 leading-tight truncate">{metrics.a}</div>
                           </div>
                           <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                              <div className="text-[11px] font-bold text-slate-500 mb-0.5 sm:mb-1 tracking-wider uppercase">Visualization</div>
                              <div className="text-[14px] sm:text-[16px] font-bold text-slate-900 leading-tight truncate">{metrics.b}</div>
                           </div>
                           <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                              <div className="text-[11px] font-bold text-slate-500 mb-0.5 sm:mb-1 tracking-wider uppercase">Mapping Type</div>
                              <div className="text-[14px] sm:text-[16px] font-bold text-slate-900 leading-tight truncate">{metrics.c}</div>
                           </div>
                           <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
                              <div className="absolute inset-0 bg-primary/5"></div>
                              <div className="text-[11px] font-bold text-slate-500 mb-0.5 sm:mb-1 tracking-wider uppercase relative z-10">Data Sync</div>
                              <div className="text-[13px] sm:text-[16px] font-bold text-primary flex items-center gap-1 sm:gap-1.5 relative z-10 truncate">
                                 <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse shrink-0"></span> Native Real-time
                              </div>
                           </div>
                        </div>

                     </motion.div>
                  </AnimatePresence>
               </div>

            </div>
         </div>
      </section>
   )
}
