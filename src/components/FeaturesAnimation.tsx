import React, { useEffect, useState, useMemo, useRef, memo } from "react";

// ── TYPES ──
interface Node {
  x: number;
  y: number;
  r: number;
  label: string;
  type: 'root' | 'mid' | 'leaf' | 'tiny';
  color: string;
  bg: string;
  border: string;
  icon: string;
}

interface EdgeStyle {
  stroke: string;
  width: number;
  dash: string;
  arrow: string;
  labelBg: string;
  labelColor: string;
}

// ── NODE DEFINITIONS ──
const NODES: Record<string, Node> = {
  acme:     { x:78,  y:180, r:28,  label:'Acme',           type:'root',    color:'#1d4ed8', bg:'#eff6ff', border:'#bfdbfe', icon:'A' },
  hvo:      { x:210, y:80,  r:20,  label:'High Value\nOpps', type:'mid',   color:'#6d28d9', bg:'#f5f3ff', border:'#c4b5fd', icon:'O' },
  contacts: { x:210, y:180, r:20,  label:'Contacts',       type:'mid',     color:'#0369a1', bg:'#f0f9ff', border:'#7dd3fc', icon:'C' },
  cases:    { x:210, y:290, r:20,  label:'Cases',          type:'mid',     color:'#0d9488', bg:'#f0fdfa', border:'#99f6e4', icon:'C' },
  prosp:    { x:340, y:45,  r:15,  label:'Prospecting',    type:'leaf',    color:'#0369a1', bg:'#f0f9ff', border:'#bae6fd', icon:'P' },
  qual:     { x:340, y:100, r:15,  label:'Qualification',  type:'leaf',    color:'#0369a1', bg:'#f0f9ff', border:'#bae6fd', icon:'Q' },
  phone:    { x:460, y:25,  r:11,  label:'Phone Inquiry',  type:'tiny',    color:'#64748b', bg:'#f8fafc', border:'#e2e8f0', icon:'T' },
  partner:  { x:460, y:68,  r:11,  label:'Partner Ref.',   type:'tiny',    color:'#64748b', bg:'#f8fafc', border:'#e2e8f0', icon:'T' },
  amy:      { x:340, y:148, r:13,  label:'Amy Chu',        type:'leaf',    color:'#0369a1', bg:'#f0f9ff', border:'#bae6fd', icon:'A' },
  anna:     { x:340, y:180, r:13,  label:'Anna Fairchild', type:'leaf',    color:'#0369a1', bg:'#f0f9ff', border:'#bae6fd', icon:'A' },
  anthony:  { x:340, y:212, r:13,  label:'Anthony Q.',     type:'leaf',    color:'#0369a1', bg:'#f0f9ff', border:'#bae6fd', icon:'A' },
  more:     { x:460, y:200, r:13,  label:'+ 15 more',      type:'tiny',    color:'#94a3b8', bg:'#f8fafc', border:'#e2e8f0', icon:'…' },
  c1:       { x:340, y:268, r:12,  label:'00001026',       type:'leaf',    color:'#b45309', bg:'#fffbeb', border:'#fcd34d', icon:'C' },
  c2:       { x:340, y:300, r:12,  label:'00001027',       type:'leaf',    color:'#b45309', bg:'#fffbeb', border:'#fcd34d', icon:'C' },
  c3:       { x:340, y:332, r:12,  label:'00001028',       type:'leaf',    color:'#b45309', bg:'#fffbeb', border:'#fcd34d', icon:'C' },
};

// ── EDGE DEFINITIONS ──
const EDGE_STYLES: Record<string, EdgeStyle> = {
  green:  { stroke:'#16a34a', width:1.8, dash:'',    arrow:'arr-green', labelBg:'#f0fdf4', labelColor:'#15803d' },
  blue:   { stroke:'#3b82f6', width:1.4, dash:'',    arrow:'arr-blue',  labelBg:'#eff6ff', labelColor:'#1d4ed8' },
  amber:  { stroke:'#d97706', width:1.2, dash:'5 3', arrow:'arr-amber', labelBg:'#fffbeb', labelColor:'#92400e' },
  purple: { stroke:'#8b5cf6', width:1.2, dash:'4 3', arrow:'arr-gray',  labelBg:'#f5f3ff', labelColor:'#6d28d9' },
  gray:   { stroke:'#cbd5e1', width:1,   dash:'3 3', arrow:'arr-gray',  labelBg:'#f8fafc', labelColor:'#64748b' },
};

// ── REVEAL SEQUENCE ──
const STEPS = [
  { nodes:['acme'], edges:[] },
  {
    nodes:['hvo','contacts','cases'],
    edges:[
      { id:'e1', from:'acme', to:'hvo',      style:'green',  label:'Parent / Child' },   
      { id:'e2', from:'acme', to:'contacts', style:'green',  label:'Parent / Child' },   
      { id:'e3', from:'acme', to:'cases',    style:'green',  label:'Parent / Child' },   
    ]
  },
  {
    nodes:['prosp','qual'],
    edges:[
      { id:'e4', from:'hvo', to:'prosp', style:'blue', label:'Contains' },
      { id:'e5', from:'hvo', to:'qual',  style:'blue', label:'Contains' },
    ]
  },
  {
    nodes:['amy','anna','anthony'],
    edges:[
      { id:'e6', from:'contacts', to:'amy',     style:'blue', label:'Has Contact' },     
      { id:'e7', from:'contacts', to:'anna',    style:'blue', label:'Has Contact' },     
      { id:'e8', from:'contacts', to:'anthony', style:'blue', label:'Has Contact' },     
    ]
  },
  {
    nodes:['c1','c2','c3'],
    edges:[
      { id:'e9',  from:'cases', to:'c1', style:'blue', label:'Has Case' },
      { id:'e10', from:'cases', to:'c2', style:'blue', label:'Has Case' },
      { id:'e11', from:'cases', to:'c3', style:'blue', label:'Has Case' },
    ]
  },
  {
    nodes:['phone','partner','more'],
    edges:[
      { id:'e12', from:'prosp',    to:'phone',   style:'gray', label:'' },
      { id:'e13', from:'prosp',    to:'partner', style:'gray', label:'' },
      { id:'e14', from:'contacts', to:'more',    style:'gray', label:'' },
    ]
  },
];

const FeaturesAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runStep = () => {
      if (currentStep >= STEPS.length) {
        timeout = setTimeout(() => {
          setFadingOut(true);
          setTimeout(() => {
            setCurrentStep(0);
            setFadingOut(false);
          }, 600); // Wait for fade out
        }, 3000);
        return;
      }
      
      const step = STEPS[currentStep];
      const delay = currentStep === 1 ? 800 : currentStep <= 3 ? 1000 : 900;
      timeout = setTimeout(() => setCurrentStep((prev) => prev + 1), delay + step.nodes.length * 150);
    };

    if (!fadingOut) {
      runStep();
    }
    
    return () => clearTimeout(timeout);
  }, [currentStep, fadingOut]);

  // Calculate visible edges
  const visibleEdges = useMemo(() => {
    const edges = [];
    for (let i = 0; i < currentStep; i++) {
        edges.push(...STEPS[i].edges.map((e, index) => ({...e, animDelay: index * 100})));
    }
    return edges;
  }, [currentStep]);

  // Calculate visible nodes
  const visibleNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < currentStep; i++) {
        nodes.push(...STEPS[i].nodes.map((id, index) => ({id, animDelay: index * 150 + 150})));
    }
    return nodes;
  }, [currentStep]);

  const connCount = visibleEdges.filter(e => e.label && e.style !== 'gray').length;
  const displayCount = currentStep === STEPS.length? 28 : connCount;

  return (
    <div className={`relative w-full bg-white rounded-xl shadow-xl overflow-hidden font-sans border border-border/40 ${isMobile ? '' : 'flex flex-col'}`} style={isMobile ? {} : { aspectRatio: '16/11', maxHeight: 'calc(100vh - 180px)' }}>
        <style dangerouslySetInnerHTML={{__html: `
            .features-anim {
                font-family: var(--font-sans), sans-serif;
            }

            @keyframes popIn {
                0%  { opacity:0; transform:scale(0.2); }
                65% { transform:scale(1.08); }
                100%{ opacity:1; transform:scale(1); }
            }
            @keyframes drawPath {
                from{ stroke-dashoffset:500; }
                to  { stroke-dashoffset:0; }
            }
            @keyframes labelFade {
                from{ opacity:0; transform:translateY(3px); }
                to  { opacity:1; transform:translateY(0); }
            }
        `}} />

        {/* ── HEADER ── */}
        <div className="border-b border-border/40 bg-gradient-to-b from-white to-slate-50 shrink-0" style={{ padding: isMobile ? '4px 8px' : 'clamp(3px, 1vw, 10px) clamp(4px, 1.5vw, 16px)' }}>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
                <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border-[1.5px] border-blue-200 flex items-center justify-center shrink-0" style={{ width: 'clamp(22px, 5vw, 32px)', height: 'clamp(22px, 5vw, 32px)' }}>
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 'clamp(14px, 3vw, 18px)', height: 'clamp(14px, 3vw, 18px)' }}>
                        <circle cx="8" cy="8" r="6" stroke="#3b82f6" strokeWidth="1.2"/>     
                        <circle cx="8" cy="8" r="2.5" fill="#3b82f6" opacity="0.7"/>
                        <line x1="8" y1="2" x2="8" y2="4" stroke="#3b82f6" strokeWidth="1.2"/>
                        <line x1="8" y1="12" x2="8" y2="14" stroke="#3b82f6" strokeWidth="1.2"/>
                        <line x1="2" y1="8" x2="4" y2="8" stroke="#93c5fd" strokeWidth="1.2"/>
                        <line x1="12" y1="8" x2="14" y2="8" stroke="#93c5fd" strokeWidth="1.2"/>
                    </svg>
                </div>
                <div>
                    <div className="font-semibold text-slate-900 tracking-tight flex gap-1 sm:gap-2 items-center" style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}>
                        Relationship Map <span className="text-slate-400 font-medium tracking-wider" style={{ fontSize: '0.9em' }}>ACCOUNT NETWORK</span>
                    </div>
                </div>
                <div className="ml-auto rounded-lg bg-blue-50 border border-blue-200 font-medium text-blue-700 tracking-wider shrink-0" style={{ padding: 'clamp(2px, 1vw, 6px) clamp(4px, 1.5vw, 10px)', fontSize: 'clamp(6px, 1.6vw, 9.5px)', fontVariantNumeric: 'tabular-nums' }}>
                    <span>{displayCount}</span> CONNECTIONS
                </div>
            </div>
        </div>

        {/* ── CANVAS ── */}
        <div className={`relative overflow-hidden features-anim ${isMobile ? '' : 'flex-1'}`}>
            <svg viewBox={isMobile ? "42 5 510 350" : "0 0 580 360"} preserveAspectRatio="xMidYMid meet" className={`w-full block ${isMobile ? '' : 'h-full'}`} style={{ opacity: fadingOut ? 0 : 1, transition: 'opacity 0.6s' }}>
                <defs>
                    <filter id="shadow-sm" x="-30%" y="-30%" width="160%" height="160%">    
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.10)"/>
                    </filter>
                    <filter id="shadow-md" x="-40%" y="-40%" width="180%" height="180%">    
                        <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(0,0,0,0.12)"/>
                    </filter>
                    <marker id="arr-blue" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M1 1.5L6 4L1 6.5" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                    <marker id="arr-green" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M1 1.5L6 4L1 6.5" fill="none" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                    <marker id="arr-amber" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M1 1.5L6 4L1 6.5" fill="none" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                    <marker id="arr-gray" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M1 1.5L6 4L1 6.5" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                </defs>

                <g id="layer-lines">
                    {visibleEdges.map(edge => {
                        const fn = NODES[edge.from];
                        const tn = NODES[edge.to];
                        const s = EDGE_STYLES[edge.style];
                        if (!fn || !tn) return null;

                        const x1 = fn.x + (fn.x < tn.x ? fn.r : -fn.r);
                        const y1 = fn.y;
                        const x2 = tn.x - (fn.x < tn.x ? tn.r : -tn.r);
                        const y2 = tn.y;
                        const cx = (x1 + x2) / 2;

                        return (
                            <path 
                                key={edge.id}
                                d={`M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`}
                                fill="none"
                                stroke={s.stroke}
                                strokeWidth={s.width}
                                strokeDasharray={s.dash || '500'}
                                strokeDashoffset={500}
                                markerEnd={`url(#${s.arrow})`}
                                style={{ animation: `drawPath 0.6s ease ${edge.animDelay}ms forwards` }}
                            />
                        );
                    })}
                </g>

                <g id="layer-labels">
                    {visibleEdges.map(edge => {
                        const fn = NODES[edge.from];
                        const tn = NODES[edge.to];
                        const s = EDGE_STYLES[edge.style];
                        
                        if (!fn || !tn || !edge.label || edge.style === 'gray') return null;

                        const x1 = fn.x + (fn.x < tn.x ? fn.r : -fn.r);
                        const y1 = fn.y;
                        const x2 = tn.x - (fn.x < tn.x ? tn.r : -tn.r);
                        const y2 = tn.y;
                        const lx = (x1 + x2) / 2;
                        const ly = (y1 + y2) / 2 - 6;

                        return (
                            <g key={`label-${edge.id}`} style={{ animation: `labelFade 0.4s ease ${edge.animDelay + 400}ms both`, opacity: 0 }}>
                                <rect x={lx - 30} y={ly - 8} width={60} height={14} rx={7} fill={s.labelBg} stroke={s.stroke} strokeWidth={0.5} />
                                <text x={lx} y={ly + 2} fill={s.labelColor} fontSize={7.5} fontWeight={500} textAnchor="middle">{edge.label}</text>
                            </g>
                        );
                    })}
                </g>

                <g id="layer-nodes">
                    {visibleNodes.map(nObj => {
                        const n = NODES[nObj.id];
                        if (!n) return null;

                        const onRight = n.x >= 340;
                        const labelX = onRight ? n.x + n.r + 6 : n.x;
                        const labelY = onRight ? n.y + 4 : n.y + n.r + 12;
                        const anchor = onRight ? 'start' : 'middle';
                        const lines = n.label.split('\n');

                        return (
                            <g key={`node-${nObj.id}`} style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: `popIn 0.45s cubic-bezier(0.34,1.15,0.64,1) ${nObj.animDelay}ms both` }}>
                                <circle cx={n.x} cy={n.y} r={n.r} fill={n.bg} stroke={n.border} strokeWidth={n.type === 'root' ? 2 : 1.2} filter={n.type === 'root' ? 'url(#shadow-md)' : 'url(#shadow-sm)'} />
                                
                                {n.type === 'root' || n.type === 'mid' ? (
                                    <circle cx={n.x} cy={n.y} r={n.r * 0.45} fill={n.color} opacity={0.85} />
                                ) : (
                                    <rect x={n.x - 5} y={n.y - 5} width={10} height={10} rx={2} fill={n.color} opacity={0.7} />
                                )}

                                {lines.map((line: string, i: number) => (
                                    <text 
                                        key={i}
                                        x={labelX} 
                                        y={labelY + i * 13} 
                                        fill={n.type === 'root' ? '#1e3a8a' : n.type === 'mid' ? '#1e293b' : '#475569'}
                                        fontSize={n.type === 'root' ? 11 : n.type === 'mid' ? 9.5 : 8.5}
                                        fontWeight={n.type === 'root' ? 600 : n.type === 'mid' ? 500 : 400}
                                        textAnchor={anchor}
                                    >
                                        {line}
                                    </text>
                                ))}
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>

        {/* ── LEGEND ── */}
        <div className="border-t border-border/40 bg-slate-50 flex flex-wrap items-center shrink-0 justify-start" style={{ padding: isMobile ? '4px 8px' : 'clamp(4px, 1vw, 8px) clamp(4px, 1.5vw, 16px)', gap: isMobile ? '6px' : 'clamp(6px, 2vw, 16px)' }}>
            <div className="flex items-center" style={{ gap: 'clamp(4px, 1vw, 6px)' }}><div className="h-0.5 rounded-sm bg-green-600" style={{ width: 'clamp(12px, 2vw, 16px)' }}></div><span className="font-medium text-slate-500" style={{ fontSize: 'clamp(7px, 1.8vw, 10px)' }}>Parent/Child</span></div>
            <div className="flex items-center" style={{ gap: 'clamp(4px, 1vw, 6px)' }}><div className="h-0.5 rounded-sm bg-blue-500" style={{ width: 'clamp(12px, 2vw, 16px)' }}></div><span className="font-medium text-slate-500" style={{ fontSize: 'clamp(7px, 1.8vw, 10px)' }}>Partner</span></div>
            <div className="flex items-center" style={{ gap: 'clamp(4px, 1vw, 6px)' }}><div className="h-0 border-t-2 border-dashed border-amber-600" style={{ width: 'clamp(12px, 2vw, 16px)' }}></div><span className="font-medium text-slate-500" style={{ fontSize: 'clamp(7px, 1.8vw, 10px)' }}>Competitor</span></div>
            <div className="flex items-center" style={{ gap: 'clamp(4px, 1vw, 6px)' }}><div className="h-0 border-t-2 border-dashed border-purple-400" style={{ width: 'clamp(12px, 2vw, 16px)' }}></div><span className="font-medium text-slate-500" style={{ fontSize: 'clamp(7px, 1.8vw, 10px)' }}>Influencer</span></div>
            <div className="ml-auto font-bold text-slate-400 tracking-wider hidden lg:block" style={{ fontSize: 'clamp(7px, 1.8vw, 9px)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.1em' }}>REAL-TIME GRAPH · SALESFORCE</div>
        </div>
    </div>
  );
};

export default memo(FeaturesAnimation);