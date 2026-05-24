import React, { useMemo, useRef, useState, useEffect, memo } from 'react';

const levelColors: Record<number, string> = {
  1: '#7FFF00',
  2: '#4A7C9B',
  3: '#1A7A56',
  4: 'rgba(0,0,0,0.4)',
  5: '#FEBC2E',
};

const nodes = [
  { id: 0, x: 500, y: 80, r: 28, level: 1, label: 'Enterprise' },
  { id: 1, x: 250, y: 200, r: 22, level: 2 }, { id: 2, x: 500, y: 200, r: 22, level: 2 }, { id: 3, x: 750, y: 200, r: 22, level: 2 },
  { id: 4, x: 130, y: 330, r: 17, level: 3 }, { id: 5, x: 280, y: 330, r: 17, level: 3 }, { id: 6, x: 420, y: 330, r: 17, level: 3 }, { id: 7, x: 580, y: 330, r: 17, level: 3 }, { id: 8, x: 700, y: 330, r: 17, level: 3 }, { id: 9, x: 850, y: 330, r: 17, level: 3 },
  { id: 10, x: 80, y: 450, r: 13, level: 4 }, { id: 11, x: 180, y: 450, r: 13, level: 4 }, { id: 12, x: 260, y: 460, r: 13, level: 4 }, { id: 13, x: 340, y: 450, r: 13, level: 4 }, { id: 14, x: 440, y: 460, r: 13, level: 4 }, { id: 15, x: 540, y: 450, r: 13, level: 4 }, { id: 16, x: 640, y: 460, r: 13, level: 4 }, { id: 17, x: 740, y: 450, r: 13, level: 4 }, { id: 18, x: 830, y: 460, r: 13, level: 4 }, { id: 19, x: 920, y: 450, r: 13, level: 4 },
  { id: 20, x: 60, y: 560, r: 9, level: 5 }, { id: 21, x: 130, y: 570, r: 9, level: 5 }, { id: 22, x: 200, y: 560, r: 9, level: 5 }, { id: 23, x: 290, y: 570, r: 9, level: 5 }, { id: 24, x: 370, y: 560, r: 9, level: 5 }, { id: 25, x: 460, y: 570, r: 9, level: 5 }, { id: 26, x: 550, y: 560, r: 9, level: 5 }, { id: 27, x: 630, y: 570, r: 9, level: 5 }, { id: 28, x: 720, y: 560, r: 9, level: 5 }, { id: 29, x: 800, y: 570, r: 9, level: 5 }, { id: 30, x: 880, y: 560, r: 9, level: 5 }, { id: 31, x: 950, y: 570, r: 9, level: 5 },
];

const edges = [
  [0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [2, 7], [3, 8], [3, 9],
  [4, 10], [4, 11], [5, 12], [5, 13], [6, 14], [6, 15], [7, 16], [7, 17], [8, 18], [9, 19],
  [10, 20], [10, 21], [11, 22], [12, 23], [13, 24], [14, 25], [15, 26], [16, 27], [17, 28], [18, 29], [19, 30], [19, 31],
  [1, 2], [2, 3], [5, 6], [7, 8], [12, 14], [16, 18]
];

const HeroAnimation = () => {
  // Reduce particles on mobile for better performance
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 30;
  const particles = useMemo(() => Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animationDelay: Math.random() * 4 + 's',
    animationDuration: (3 + Math.random() * 3) + 's',
  })), [particleCount]);

  const animatedEdges = useMemo(() => edges.filter(([a, b]) => nodes[a].level !== nodes[b].level).slice(0, 8), []);

  return (
    <div className="hero-anim-root relative w-full h-auto overflow-visible bg-transparent font-sans">
      <style>{`
        .hero-anim-root {
          --forest: #0B3D2E;
          --forest-mid: #14563F;
          --forest-light: #1A7A56;
          --steel: #4A7C9B;
          --steel-light: #6BA3C7;
          --neon: #7FFF00;
          --neon-soft: rgba(127,255,0,0.6);
          --glass: rgba(255,255,255,0.85);
          --glass-border: rgba(0,0,0,0.1);
          --glass-strong: rgba(255,255,255,0.95);
        }
        
        .ha-scene { position:relative; z-index:1; width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:40px 0; }
        @media (max-width: 768px) {
          .ha-scene { padding:0; }
        }
        @media (max-width: 640px) {
          .ha-scene { padding:0; }
        }
        .ha-dashboard {
          position:relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 600px;
          perspective:1000px;
          padding: 20px 0;
        }
        @media (max-width: 768px) {
          .ha-dashboard { padding: 0; }
        }
        .ha-dashboard-inner {
          width:100%; height:100%;
          transform:rotateX(4deg) rotateY(-2deg);
          transform-style:preserve-3d;
          position:relative;
        }
        .ha-glass-panel {
          position:absolute;
          background:var(--glass);
          border:1px solid var(--glass-border);
          border-radius:clamp(10px, 2vw, 20px);
          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5);
          overflow:hidden;
        }
        .ha-glass-panel::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent);
        }

        .ha-panel-main {
          top:10px; left:5%; width:90%; height:100%;
          z-index:2;
        }
        @media (max-width: 640px) {
          .ha-panel-main { top:8px; left:5%; width:90%; }
        }
        @keyframes haFloatMain { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-12px) translateZ(15px)} }

        .ha-panel-bottom {
          bottom:0; left:20%; width:clamp(250px, 45%, 400px); height:18%;
          z-index:3;
          transform:translateZ(20px);
          animation:haFloatBottom 5s ease-in-out infinite;
        }
        @keyframes haFloatBottom { 0%,100%{transform:translateZ(20px) translateY(0)} 50%{transform:translateZ(20px) translateY(-6px)} }

        .ha-panel-top-right {
          top:2%; right:clamp(1%, 4vw, 5%); width:clamp(160px, 28%, 220px); height:15%;
          z-index:3;
          transform:translateZ(15px);
          animation:haFloatTopR 6.5s ease-in-out infinite;
        }
        @keyframes haFloatTopR { 0%,100%{transform:translateZ(15px) translateY(0)} 50%{transform:translateZ(15px) translateY(-10px)} }

        .ha-node-map { width:100%; height:calc(100% - 40px); }
        .ha-panel-header {
          padding:clamp(8px, 1.5vw, 16px) clamp(12px, 2vw, 20px);
          border-bottom:1px solid var(--glass-border);
          display:flex; align-items:center; gap:8px;
        }
        @media (max-width: 640px) {
          .ha-panel-header { padding:8px 10px; gap:6px; }
        }
        .ha-dot { width:clamp(6px, 1.2vw, 10px); height:clamp(6px, 1.2vw, 10px); border-radius:50%; }
        @media (max-width: 640px) {
          .ha-dot { width:6px; height:6px; }
        }
        .ha-dot-r { background:#ef5350; } .ha-dot-y { background:#ffb74d; } .ha-dot-g { background:#4caf50; }
        .ha-panel-title {
          font-size:clamp(11px, 1.5vw, 14px);
          font-weight: 600;
          color:#1a202c;
          letter-spacing:0.5px;
          margin-left:8px;
        }
        @media (max-width: 640px) {
          .ha-panel-title { font-size:10px; margin-left:4px; letter-spacing:0px; }
        }



        .ha-gauge-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; height:calc(100% - 44px); padding:12px; }
        .ha-gauge-ring { width:clamp(40px, 8vw, 80px); height:clamp(40px, 8vw, 80px); border-radius:50%; border:3px solid rgba(0,0,0,0.05); position:relative; display:flex; align-items:center; justify-content:center; }
        .ha-gauge-ring::before {
          content:''; position:absolute; top:-3px; left:-3px; right:-3px; bottom:-3px;
          border-radius:50%; border:3px solid transparent; border-top-color:var(--forest-light); border-right-color:var(--forest-light);
          animation:haSpin 3s linear infinite;
        }
        @keyframes haSpin { to{transform:rotate(360deg)} }
        .ha-gauge-num { font-size:clamp(14px, 2vw, 22px); color:#0f172a; font-weight:700; }
        .ha-gauge-label { font-size:clamp(7px, 1vw, 9px); color:rgba(0,0,0,0.5); margin-top:clamp(4px, 1vw, 8px); text-transform:uppercase; letter-spacing:1px; }

        .ha-glow-orb { position:absolute; border-radius:50%; filter:blur(40px); opacity:0.1; pointer-events:none; z-index:0; }
        .ha-glow-1 { width:300px; height:300px; background:var(--forest-light); top:10%; left:20%; animation:haOrbMove1 12s ease-in-out infinite; }
        .ha-glow-2 { width:250px; height:250px; background:var(--steel); bottom:10%; right:15%; animation:haOrbMove2 15s ease-in-out infinite; }
        @keyframes haOrbMove1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes haOrbMove2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,20px)} }

        .ha-scanline {
          position:absolute; top:0; left:0; width:100%; height:2px;
          background:linear-gradient(90deg,transparent,rgba(127,255,0,0.3),transparent);
          opacity:0.25; z-index:20; pointer-events:none;
          animation:haScanDown 4s linear infinite;
        }
        @keyframes haScanDown { 0%{top:0} 100%{top:100%} }

        .ha-particles { position:absolute; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none; overflow:hidden; }
        .ha-particle {
          position:absolute; width:max(2px, 0.2vw); height:max(2px, 0.2vw);
          background:var(--forest-light); border-radius:50%; opacity:0;
          animation:haParticleFade 4s ease-in-out infinite;
        }
        @keyframes haParticleFade { 0%,100%{opacity:0;transform:translateY(0)} 50%{opacity:0.4;transform:translateY(-20px)} }

        .ha-grid-floor {
          position:absolute; bottom:-20%; left:-10%; width:120%; height:60%;
          background: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size:clamp(20px, 4vw, 60px) clamp(20px, 4vw, 60px);
          transform:perspective(500px) rotateX(60deg);
          transform-origin:center bottom; opacity:0.8; z-index:0;
          mask-image:linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          -webkit-mask-image:linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }
      `}</style>

      {/* Orbs & Particles */}
      <div className="ha-glow-orb ha-glow-1" />
      <div className="ha-glow-orb ha-glow-2" />
      <div className="ha-particles">
        {particles.map(p => (
          <div key={p.id} className="ha-particle" style={{ left: p.left, top: p.top, animationDelay: p.animationDelay, animationDuration: p.animationDuration }} />
        ))}
      </div>

      <div className="ha-scene">
        <div className="ha-dashboard">
          <div className="ha-grid-floor" />
          <div className="ha-dashboard-inner">

            {/* Main Panel */}
            <div className="ha-glass-panel ha-panel-main">
              <div className="ha-panel-header">
                <span className="ha-dot ha-dot-r" /><span className="ha-dot ha-dot-y" /><span className="ha-dot ha-dot-g" />
                <span className="ha-panel-title">Relationship Hierarchy Map</span>
              </div>
              <div className="ha-scanline" />
              <svg className="ha-node-map" viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="ha-glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  {[1, 2, 3, 4, 5].map(level => (
                    <radialGradient key={level} id={`ha-nodeGrad${level}`}>
                      <stop offset="0%" stopColor={levelColors[level]} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={levelColors[level]} stopOpacity="0.3" />
                    </radialGradient>
                  ))}
                  {edges.map(([a, b], i) => {
                    const n1 = nodes[a], n2 = nodes[b];
                    const isCross = a > 0 && Math.abs(a - b) === 1 && n1.level === n2.level;
                    if (isCross) return null;
                    return (
                      <linearGradient key={i} id={`ha-lineGrad${i}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={levelColors[n1.level] || '#0f172a'} />
                        <stop offset="100%" stopColor={levelColors[n2.level] || '#0f172a'} />
                      </linearGradient>
                    );
                  })}
                </defs>

                {/* Edges */}
                {edges.map(([a, b], i) => {
                  const n1 = nodes[a], n2 = nodes[b];
                  const isCross = a > 0 && Math.abs(a - b) === 1 && n1.level === n2.level;
                  return (
                    <line key={i} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                      stroke={isCross ? 'rgba(74,124,155,0.15)' : `url(#ha-lineGrad${i})`}
                      strokeWidth={isCross ? "1" : "1.5"}
                      strokeDasharray={isCross ? "4,4" : "none"}
                      opacity={isCross ? "1" : "0.6"} />
                  )
                })}

                {/* Animated Edge Pulses */}
                {animatedEdges.map(([a, b], i) => (
                  <circle key={`anim${i}`} r="4" fill="var(--forest-light)" filter="url(#ha-glow)" opacity="0.8">
                    <animateMotion dur={`${2 + (i % 2)}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} path={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`} />
                  </circle>
                ))}

                {/* Nodes */}
                {nodes.map(n => (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={n.r + 8} fill={levelColors[n.level] || '#0f172a'} opacity="0.05" filter="url(#ha-glow)" />
                    <circle cx={n.x} cy={n.y} r={n.r} fill="rgba(255,255,255,0.5)" stroke={levelColors[n.level] || '#0f172a'} strokeWidth={n.level === 1 ? "2" : "1.5"} strokeOpacity="0.5" />
                    <circle cx={n.x} cy={n.y} r={n.r * 0.45} fill={`url(#ha-nodeGrad${n.level})`}>
                      <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2 + n.level * 0.5}s`} repeatCount="indefinite" />
                    </circle>
                    {n.r > 15 && (
                      <line x1={n.x - n.r * 0.5} y1={n.y - n.r * 0.3} x2={n.x + n.r * 0.3} y2={n.y + n.r * 0.5} stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                    )}
                  </g>
                ))}
              </svg>
            </div>




          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroAnimation);
