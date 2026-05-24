import { memo, useState, useEffect, useCallback } from 'react';
import './HeroInfographic.css';

const HeroInfographic = () => {
  const [activeTab, setActiveTab] = useState<'tree' | 'explorer'>('tree');
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setActiveTab(prev => prev === 'tree' ? 'explorer' : 'tree');
    }, 6000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const handleTreeTab = useCallback(() => {
    setActiveTab('tree');
    setUserInteracted(true);
  }, []);

  const handleExplorerTab = useCallback(() => {
    setActiveTab('explorer');
    setUserInteracted(true);
  }, []);

  return (
    <div className="hero-anim-root relative w-full h-auto overflow-visible bg-transparent font-sans flex justify-center py-2">
      <div className="scene">
        <div className="main-panel">
          {/*  Sidebar  */}
          <div className="sidebar">
            <div className="sidebar-icon active">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
            </div>
            <div className="sidebar-icon">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
            </div>
            <div className="sidebar-icon">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </div>
            <div className="sidebar-icon">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
            </div>
            <div className="sidebar-icon" style={{ marginTop: 'auto' }}>
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
            </div>
          </div>

          {/*  Tab Content Area (mobile: fixed height container)  */}
          <div className="tab-content-area">

            {/*  Visual Relationship Tree  */}
            <div className={`tree-section ${activeTab === 'tree' ? 'tab-active' : ''}`}>
              <div className="section-header" onClick={handleTreeTab}>Visual Relationship Tree</div>
              <div className="tree-canvas">
                {/* Desktop SVG connections */}
                <svg className="connections-svg desktop-svg" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} preserveAspectRatio="none">
                  {/*  Lines  */}
                  <line x1="50%" y1="50%" x2="42%" y2="18%" className="conn-line" stroke="#8bc34a" />
                  <line x1="50%" y1="50%" x2="82%" y2="32%" className="conn-line" stroke="#4caf50" />
                  <line x1="50%" y1="50%" x2="18%" y2="38%" className="conn-line" stroke="#7986cb" />
                  <line x1="50%" y1="50%" x2="22%" y2="78%" className="conn-line" stroke="#ffb74d" />
                  <line x1="50%" y1="50%" x2="50%" y2="86%" className="conn-line" stroke="#ef5350" />
                  <line x1="50%" y1="50%" x2="82%" y2="72%" className="conn-line" stroke="#4dd0e1" />

                  {/*  Connection nodes (small circles)  */}
                  <circle cx="42%" cy="18%" r="4" fill="#8bc34a" />
                  <circle cx="82%" cy="32%" r="4" fill="#4caf50" />
                  <circle cx="18%" cy="38%" r="4" fill="#7986cb" />
                  <circle cx="22%" cy="78%" r="4" fill="#ffb74d" />
                  <circle cx="50%" cy="86%" r="4" fill="#ef5350" />
                  <circle cx="82%" cy="72%" r="4" fill="#4dd0e1" />

                  {/*  Center dot (main)  */}
                  <circle cx="50%" cy="50%" r="6" fill="#4caf50" opacity="0.8" />
                </svg>

                {/* Mobile SVG connections */}
                <svg className="connections-svg mobile-svg" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} preserveAspectRatio="none">
                  {/*  Lines  */}
                  <line x1="50%" y1="50%" x2="30%" y2="18%" className="conn-line" stroke="#8bc34a" />
                  <line x1="50%" y1="50%" x2="70%" y2="18%" className="conn-line" stroke="#4caf50" />
                  <line x1="50%" y1="50%" x2="18%" y2="50%" className="conn-line" stroke="#7986cb" />
                  <line x1="50%" y1="50%" x2="30%" y2="82%" className="conn-line" stroke="#ffb74d" />
                  <line x1="50%" y1="50%" x2="70%" y2="82%" className="conn-line" stroke="#ef5350" />
                  <line x1="50%" y1="50%" x2="82%" y2="50%" className="conn-line" stroke="#4dd0e1" />

                  {/*  Connection nodes (small circles)  */}
                  <circle cx="30%" cy="18%" r="4" fill="#8bc34a" />
                  <circle cx="70%" cy="18%" r="4" fill="#4caf50" />
                  <circle cx="18%" cy="50%" r="4" fill="#7986cb" />
                  <circle cx="30%" cy="82%" r="4" fill="#ffb74d" />
                  <circle cx="70%" cy="82%" r="4" fill="#ef5350" />
                  <circle cx="82%" cy="50%" r="4" fill="#4dd0e1" />

                  {/*  Center dot (main)  */}
                  <circle cx="50%" cy="50%" r="6" fill="#4caf50" opacity="0.8" />
                </svg>

                {/*  Node Cards  */}
                <div className="node-card node-center">
                  <div className="node-icon"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16 M9 7h2 M9 11h2 M9 15h2 M13 7h2 M13 11h2 M13 15h2" /></svg></div>
                  <div className="node-label"><span className="hidden md:inline">Acme Corporation</span><span className="md:hidden">Acme Corp.</span></div>
                </div>
                <div className="node-card node-opp">
                  <div className="node-icon"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6 6 .5-4.5 4 1.5 6-6-3.5L6 18.5l1.5-6L3 8.5 9 8z" /></svg></div>
                  <div className="node-label">Opportunities</div>
                </div>
                <div className="node-card node-assets">
                  <div className="node-icon"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></div>
                  <div className="node-label">Assets</div>
                </div>
                <div className="node-card node-contacts">
                  <div className="node-icon"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
                  <div className="node-label">Contacts</div>
                </div>
                <div className="node-card node-cases">
                  <div className="node-icon"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg></div>
                  <div className="node-label">Cases</div>
                </div>
                <div className="node-card node-activities">
                  <div className="node-icon"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div>
                  <div className="node-label">Activities</div>
                </div>
                <div className="node-card node-contracts">
                  <div className="node-icon"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></div>
                  <div className="node-label">Contracts</div>
                </div>
              </div>
            </div>

            {/*  Relationship Explorer  */}
            <div className={`explorer-section ${activeTab === 'explorer' ? 'tab-active' : ''}`}>
              <div className="section-header" onClick={handleExplorerTab}>Relationship Explorer</div>
              <div className="explorer-content">
                <div className="explorer-toolbar">
                  <input className="search-box" type="text" placeholder="Search..." readOnly />
                  <div className="toolbar-btn">▽</div>
                  <div className="toolbar-btn">↻</div>
                  <div className="toolbar-btn">+</div>
                  <div className="toolbar-btn">⋮</div>
                </div>
                <div className="explorer-tree">
                  {/*  Acme Corporation (Level 1)  */}
                  <div className="tree-item parent"><span className="arrow">▾</span><span className="icon" style={{ background: '#e8f5e9', color: '#2e7d32' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16 M9 7h2 M9 11h2 M9 15h2 M13 7h2 M13 11h2 M13 15h2" /></svg></span>Acme Corporation</div>
                  <div className="tree-children">

                    {/*  Opportunities (Level 2)  */}
                    <div className="tree-item parent"><span className="arrow">▾</span><span className="icon" style={{ background: '#f1f8e9', color: '#558b2f' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6 6 .5-4.5 4 1.5 6-6-3.5L6 18.5l1.5-6L3 8.5 9 8z" /></svg></span>Opportunities</div>
                    <div className="tree-sub">
                      {/*  Deals (Level 3)  */}
                      <div className="tree-item parent" style={{ paddingTop: '2px', fontSize: '12px', color: '#475569' }}><span className="arrow">▾</span><span className="icon" style={{ background: '#fff7ed', color: '#ea580c' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg></span>Enterprise Deals</div>
                      <div className="tree-sub">
                        <div className="tree-sub-item"><span className="dot" style={{ background: '#66bb6a' }}></span>Closed Won</div>
                        <div className="tree-sub-item"><span className="dot" style={{ background: '#42a5f5' }}></span>Proposal</div>
                      </div>
                      <div className="tree-sub-item"><span className="dot" style={{ background: '#ffa726' }}></span>Qualification</div>
                    </div>

                    {/*  Contacts (Level 2)  */}
                    <div className="tree-item" style={{ paddingTop: '6px' }}><span className="arrow">▸</span><span className="icon" style={{ background: '#e8eaf6', color: '#3f51b5' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></span>Key Contacts</div>

                    {/*  Cases (Level 2)  */}
                    <div className="tree-item parent" style={{ paddingTop: '6px' }}><span className="arrow">▾</span><span className="icon" style={{ background: '#fff3e0', color: '#ef6c00' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg></span>Support Cases</div>
                    <div className="tree-sub">
                      <div className="tree-sub-item"><span className="dot" style={{ background: '#ef4444' }}></span>Critical Issues</div>
                      <div className="tree-sub-item"><span className="dot" style={{ background: '#f59e0b' }}></span>High Priority</div>
                    </div>

                    {/*  Assets (Level 2)  */}
                    <div className="tree-item" style={{ paddingTop: '6px' }}><span className="arrow">▸</span><span className="icon" style={{ background: '#e8f5e9', color: '#2e7d32' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></span>Assets</div>

                    {/*  Contracts (Level 2)  */}
                    <div className="tree-item" style={{ paddingTop: '6px' }}><span className="arrow">▸</span><span className="icon" style={{ background: '#e0f7fa', color: '#00838f' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></span>Contracts</div>

                    {/*  Activities (Level 2)  */}
                    <div className="tree-item" style={{ paddingTop: '6px' }}><span className="arrow">▸</span><span className="icon" style={{ background: '#ffebee', color: '#c62828' }}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></span>Activities</div>

                  </div>
                </div>
              </div>
            </div>{/* end explorer-content */}
          </div>{/* end tab-content-area */}
        </div>
      </div>
    </div>
  );
};

export default memo(HeroInfographic);
