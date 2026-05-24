import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Target, Info, Lightbulb, Settings, ChevronRight, X } from "lucide-react";
import './RVUserGuide.css';

/* ═══════════════════════════════════════════════════════════════
   Image helper – all images extracted from the docx live in
   /public/images/imageN.webp and are served as /images/imageN.webp
   ═══════════════════════════════════════════════════════════════ */
const img = (n: number) => `/images/image${n}.webp`;

/* ─── Reusable sub-components ─── */
const Img = ({
  n,
  className,
  maxWidth = '510px'
}: {
  n: number;
  className?: string;
  maxWidth?: string;
}) => (
  <div className={`rv-image-wrapper ${className || ''}`} style={{ width: '100%', maxWidth }}>
    <img src={img(n)} alt={`Figure ${n}`} width={1200} height={800} loading="lazy" decoding="async" />
  </div>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="rv-note">
    <div className="rv-note-label">
      <Info size={14} strokeWidth={2.5} className="inline-block relative -top-[1px] mr-1.5" /> Note
    </div>
    {children}
  </div>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="rv-tip">
    <div className="rv-tip-label">
      <Lightbulb size={14} strokeWidth={2.5} className="inline-block relative -top-[1px] mr-1.5" /> Tip
    </div>
    {children}
  </div>
);

/* ─── Table of Contents data ─── */
type TocChild = { id: string; label: string; children?: TocChild[] };
type TocSection = { id: string; label: string; children?: TocChild[] };

const tocSections: TocSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'component', label: 'RVC Component' },
  { id: 'properties', label: 'Component Properties' },
  {
    id: 'r-views', label: 'Relationship Views (R-Views)', children: [
      { id: 'sample-data', label: 'Sample Data' },
      {
        id: 'toolbar', label: 'Toolbar Actions', children: [
          { id: 'toolbar-expand', label: 'Expand All' },
          { id: 'toolbar-collapse', label: 'Collapse All' },
          { id: 'toolbar-two-panel', label: 'Two-Panel Layout' },
          { id: 'toolbar-fullscreen', label: 'Full Screen' },
          { id: 'toolbar-explorer', label: 'Explorer View' },
          { id: 'toolbar-tree', label: 'Tree View' },
          { id: 'toolbar-rview', label: 'Relationship View' },
          { id: 'toolbar-settings', label: 'Settings' },
        ]
      },
      { id: 'r-view-config', label: 'R-View Configuration' },
      { id: 'root-node', label: 'Root Node Configuration' },
      { id: 'object-node', label: 'Object Node Configuration' },
      { id: 'junction-object', label: 'Junction Object' },
    ]
  },
  {
    id: 'features', label: 'Features', children: [
      { id: 'create-records', label: 'Creating Records' },
      { id: 'restrict-view', label: 'Restricting View Selector' },
      { id: 'configure-views', label: 'Configuring User Views' },
      { id: 'default-view', label: 'Default View' },
      { id: 'user-views', label: 'User-Created Views' },
      { id: 'action-icons', label: 'Action Icons & Permissions' },
      { id: 'rtl', label: 'RTL Language Support' },
    ]
  },
  {
    id: 'howto-rview', label: 'How to Create R-View', children: [
      { id: 'howto-configure-view', label: 'Configure View' },
      { id: 'howto-configure-root', label: 'Configure Root Node' },
      { id: 'howto-configure-object', label: 'Configure Object Node' },
    ]
  },
  { id: 'change-icons', label: 'Change Record Icons' },
  { id: 'icon-bg-color', label: 'Icon Background Color' },
  {
    id: 'why-rvc', label: 'Why RVC?', children: [
      { id: 'why-navigation', label: 'Optimized Data Navigation' },
      { id: 'why-productivity', label: 'Increased Productivity' },
      { id: 'why-security', label: 'Native SF Integration & Security' },
      { id: 'why-scalability', label: 'Scalability & Global Support' },
    ]
  },
  {
    id: 'use-cases', label: 'Use Cases', children: [
      { id: 'usecase1', label: 'Sales Leadership' },
      { id: 'usecase2', label: 'Case Impact Analysis' },
    ]
  },
  { id: 'contact', label: 'Have Questions?' },
];

/* ═══════════════════════════════════════════════════════════════ */

/* ── Pre-compute depth lookup map (O(1) per entry vs O(n³) nested loops) ── */
const depthMap: Record<string, number> = {};
const allTocIds: string[] = [];
tocSections.forEach(s => {
  depthMap[s.id] = 0;
  allTocIds.push(s.id);
  s.children?.forEach(c => {
    depthMap[c.id] = 1;
    allTocIds.push(c.id);
    c.children?.forEach(gc => {
      depthMap[gc.id] = 2;
      allTocIds.push(gc.id);
    });
  });
});

const RVUserGuide = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const sidebarContentRef = useRef<HTMLDivElement>(null);

  // Refs for debouncing — avoids re-renders during fast scroll
  const activeSectionRef = useRef('introduction');
  const rafIdRef = useRef<number>(0);
  const sidebarRafRef = useRef<number>(0);

  // Scroll to top whenever this page is navigated to
  useEffect(() => {
    // Check if we're on the user guide page
    if (location.pathname.includes('user-guide')) {
      // Immediate scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Reset sidebar scroll
      if (sidebarContentRef.current) {
        sidebarContentRef.current.scrollTop = 0;
      }
      activeSectionRef.current = 'introduction';
      setActiveSection('introduction');

      // Ensure scroll happens after DOM settles
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
    }
  }, [location.pathname]);

  /* ── Intersection observer with RAF-debounced state update ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        // Use pre-computed depthMap — O(1) lookup per entry
        const entriesWithDepth = visibleEntries.map(entry => ({
          depth: depthMap[entry.target.id] ?? 0,
          top: entry.boundingClientRect.top,
          id: entry.target.id
        }));

        // Sort by depth (descending) then by top position (ascending)
        entriesWithDepth.sort((a, b) => {
          if (b.depth !== a.depth) return b.depth - a.depth;
          return a.top - b.top;
        });

        const newId = entriesWithDepth[0].id;

        // Skip if same section — no re-render needed
        if (newId === activeSectionRef.current) return;
        activeSectionRef.current = newId;

        // Debounce with RAF — coalesces multiple observer callbacks per frame
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          setActiveSection(newId);
        });
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );

    allTocIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  /* ── Auto-scroll sidebar — RAF-debounced to prevent layout thrashing ── */
  useEffect(() => {
    if (!sidebarContentRef.current) return;

    cancelAnimationFrame(sidebarRafRef.current);
    sidebarRafRef.current = requestAnimationFrame(() => {
      const sidebar = sidebarContentRef.current;
      if (!sidebar) return;

      const activeElement = sidebar.querySelector(`[data-active-id="${activeSection}"]`) as HTMLElement;
      if (!activeElement) return;

      // Read layout properties once — avoids thrashing
      const activeTop = activeElement.offsetTop;
      const sidebarHeight = sidebar.clientHeight;

      // Scroll so that the active item is positioned with ~35% from top
      const targetScrollTop = activeTop - (sidebarHeight * 0.35);

      sidebar.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });
    });

    return () => cancelAnimationFrame(sidebarRafRef.current);
  }, [activeSection]);

  /* ── Memoized helpers — avoid re-creating closures every render ── */
  const isActive = useCallback((id: string) => activeSection === id, [activeSection]);
  const isParentActive = useCallback((section: TocSection | TocChild) => {
    if (activeSection === section.id) return true;
    if (section.children?.some(c => c.id === activeSection)) return true;
    if (section.children?.some(c => c.children?.some(gc => gc.id === activeSection))) return true;
    return false;
  }, [activeSection]);

  const scrollTo = useCallback((id: string) => {
    setSidebarOpen(false);
    // Small delay so sidebar closes and body unlocks before scrolling
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  // Disable background scrolling on small screens when sidebar is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');

    if (sidebarOpen && mq.matches) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (mq.matches) {
        document.body.style.overflow = '';
      }
    };
  }, [sidebarOpen]);

  /* ════════════════════════════════════════════════════════════ */
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 gradient-mesh z-[-1]" aria-hidden="true" />
      <Navbar forceScrolled={sidebarOpen} />
      <div className="rv-guide flex-grow flex justify-center w-full pt-14 md:pt-20">
        <div className="flex w-full max-w-7xl px-4 relative">

          {/* ── SIDEBAR OVERLAY (mobile) ── */}
          <div className={`rv-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

          {/* ── SIDEBAR ── */}
          <nav className={`rv-sidebar flex-shrink-0 sticky top-20 ${sidebarOpen ? 'open' : ''}`}>
            {/* Close button inside sidebar - mobile only */}
            <button className="rv-sidebar-close" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
            <div className="rv-sidebar-content" ref={sidebarContentRef}>
              {tocSections.map(section => (
                <div className="rv-nav-group" key={section.id}>
                  <a className={`rv-nav-link ${isActive(section.id) ? 'active' : ''} ${!isActive(section.id) && isParentActive(section) ? 'parent-active' : ''}`}
                    data-active-id={section.id}
                    onClick={() => scrollTo(section.id)}>
                    {section.label}
                  </a>
                  {section.children?.map(child => (
                    <div key={child.id}>
                      <a className={`rv-nav-link rv-nav-link-sub ${isActive(child.id) ? 'active' : ''} ${!isActive(child.id) && isParentActive(child) ? 'parent-active' : ''}`}
                        data-active-id={child.id}
                        onClick={() => scrollTo(child.id)}>
                        {child.label}
                      </a>
                      {child.children?.map(gc => (
                        <a key={gc.id}
                          className={`rv-nav-link rv-nav-link-sub rv-nav-link-sub-sub ${isActive(gc.id) ? 'active' : ''} ${!isActive(gc.id) && isParentActive(gc) ? 'parent-active' : ''}`}
                          data-active-id={gc.id}
                          onClick={() => scrollTo(gc.id)}>
                          {gc.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </nav>

          {/* ── MOBILE TOGGLE ── */}
          {!sidebarOpen && (
            <button className="rv-sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          )}

          {/* ── MAIN CONTENT ── */}
          <main className="rv-main flex-1">

            {/* ═══ HERO ═══ */}
            <div className="rv-hero">
              {/* <div className="rv-hero-badge">
            <span className="rv-hero-badge-dot" />
            Ardira User Guide
          </div> */}
              <h1>
                <span style={{ color: '#000000' }}>RelationshipVista</span>{' '}
                <span style={{ color: 'var(--rv-primary)' }}>User Guide</span>
              </h1>
              <p className="rv-hero-subtitle">
                Visualize and Analyze Salesforce Relationships — Gain Deeper Insights with Simplified Relationship Mapping
              </p>
            </div>

            {/* ═══ INTRODUCTION ═══ */}
            <section className="rv-section" id="introduction">
              <h2 className="rv-section-h1">Introduction</h2>
              <p className="rv-paragraph">
                Ardira RelationshipVista (RVC) is a Lightning Web Component (LWC) that enables users to easily navigate and visualize all records related to a specific record. By adding the component to a record detail page, users can instantly explore its related data in a structured view.
              </p>
              <p className="rv-paragraph">
                Once the RVC component is placed on a record page, it automatically provides the ability to browse and visualize all associated records.
              </p>
              <p className="rv-paragraph">
                Relationship Views (R-Views) allow you to create customized visual representations of related data based on your requirements. These views function similarly to Salesforce List Views.
              </p>
              <p className="rv-paragraph">
                You can provide flexibility to users by allowing them to create and manage their own R-Views, or you can use predefined configurations to ensure consistent and streamlined data analysis.
              </p>
            </section>

            {/* ═══ COMPONENT ═══ */}
            <section className="rv-section" id="component">
              <h2 className="rv-section-h1">Ardira RelationshipVista Component</h2>
              <p className="rv-paragraph">
                To begin using RelationshipVista, open the record detail page in edit mode, create a custom tab, and add the Ardira RelationshipVista component to the page. You can name the tab as needed (for example, RelationshipVista).
              </p>
              <p className="rv-paragraph">
                The component is not restricted to a custom tab, you can place it anywhere on the record page based on your layout preference.
              </p>
              <Img n={6} maxWidth="100%" />
              <div className="rv-image-row">
                <Img n={7} maxWidth="100%" />
                <Img n={8} maxWidth="95%" />
              </div>
              <p className="rv-paragraph">
                After adding the component, ensure that you save and activate the page.
              </p>
              <p className="rv-paragraph">
                For example, if the component is added to an Account record page, it will enable you to view and explore all records related to that account.
              </p>
              <Img n={9} maxWidth="100%" />
            </section>

            {/* ═══ COMPONENT PROPERTIES ═══ */}
            <section className="rv-section" id="properties">
              <h2 className="rv-section-h1">RVC Component Properties</h2>
              <p className="rv-paragraph">
                The RVC component includes the following configurable properties:
              </p>
              <Img n={10} maxWidth="100%" />

              <table className="rv-property-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="rv-property-name">Record Id</td>
                    <td>This represents the record whose relationships will be displayed. When the component is added to a record page, the Record Id is automatically populated, so no manual input is required.</td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">Use Configuration</td>
                    <td>When a specific view configuration name is provided, the component renders exclusively using that configuration, and users cannot switch to other views. This behavior applies only when no views within the View Configuration are pinned. (Note: If any view is pinned, it overrides the specified configuration. In such cases, the pinned view is displayed in read-only mode.)</td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">Allow Users to Update View Configuration</td>
                    <td>When enabled, users can create and modify their own view configurations. If disabled, users will not have permission to create or edit any configurations. Note: "Use Configuration" takes priority over "Allow Users to Update View Configuration."</td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">Show</td>
                    <td>This setting determines which records are displayed in the visualization. The available options are "My Records" which shows only the records owned by the currently logged-in user, and "All Records" which displays all records accessible to the user. The default setting is "All Records."</td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">Show Objects</td>
                    <td>This setting allows you to limit which object types can be configured in the Object Node and Root Node settings by providing a comma-separated list of object API names. Only the specified objects will be available for selection during configuration.</td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">Visible Records Limit</td>
                    <td>This setting defines the maximum number of child records displayed under a parent record. Any additional records beyond this limit can be viewed by clicking the "View n more..." option.</td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">View Layout</td>
                    <td>
                      This setting lets you choose which visualization layouts are available in the component. The options include:
                      <ul className="rv-list" style={{ marginTop: 8 }}>
                        <li><strong>All:</strong> Enables all supported layouts and allows users to switch between them (default).</li>
                        <li><strong>Explorer:</strong> Displays the relationship view in an indented, hierarchical (explorer-style) format.</li>
                        <li><strong>Tree:</strong> Displays the relationship view as a graphical tree structure.</li>
                      </ul>
                      When Tree or Explorer is selected, the pinned view is displayed. If no pinned view is available, the view with the alphabetically first name is shown; if none exists, the default view is used. In all cases, the view is displayed in read-only mode, without the full-screen button and without the Relationship View dropdown.
                    </td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">Width</td>
                    <td>This setting defines the width of the visualization area. It can be specified in pixels, as a percentage of the container, or set to "auto" to adjust automatically based on the component size. In most cases, the default value of "100%" works best across layouts.</td>
                  </tr>
                  <tr>
                    <td className="rv-property-name">Height</td>
                    <td>This setting defines the height of the visualization area. It can be set in pixels, as a percentage of the container, or "auto" to adjust dynamically based on the component size. The default value of "auto" is generally suitable for most layouts.</td>
                  </tr>
                </tbody>
              </table>
              <Note>These properties can be overridden by view-level configurations.</Note>
            </section>

            {/* ═══ RELATIONSHIP VIEWS ═══ */}
            <section className="rv-section" id="r-views">
              <h2 className="rv-section-h1">Relationship Views ("R-Views")</h2>
              <p className="rv-paragraph">
                When the component is first added to a record page, relationships are displayed based on the attributes configured in the page builder. You can further customize these views using the Relationship View Selector.
              </p>
              <Img n={10} maxWidth="100%" />
              <p className="rv-paragraph">
                Relationship Views (R-Views) allow you to tailor how related records are displayed, helping you focus on the most relevant data. Managing R-Views is similar to working with Salesforce List Views.
              </p>
              <p className="rv-paragraph">
                With R-View configurations, you can define each node in the hierarchy by:
              </p>
              <ul className="rv-list">
                <li>Restricting which types of records are shown</li>
                <li>Applying filters to refine results</li>
                <li>Grouping records based on object fields</li>
                <li>Sort records based on object fields</li>
                <li>And customizing other aspects of the visualization</li>
              </ul>


              {/* ── Sample Data ── */}
              <div id="sample-data">
                <h3 className="rv-section-h2">Sample Data</h3>
                <p className="rv-paragraph">
                  When testing RVC in a sandbox or test environment, you can quickly load sample data using the RelationshipVista Getting Started tab.
                </p>
                <ol className="rv-steps">
                  <li>Navigate to the "RelationshipVista Getting Started" tab from the App Launcher.</li>
                  <Img n={11} maxWidth="30%" />
                  <li>Click "Load Sample Data" to add sample records, allowing you to explore and experience RelationshipVista functionality.</li>
                  <Img n={12} maxWidth="100%" />
                  <li> The screenshots in the following sections are based on this sample data.</li>
                  <Img n={13} maxWidth="40%" />
                </ol>
              </div>

              {/* ── Toolbar Actions ── */}
              <div id="toolbar">
                <h3 className="rv-section-h2">Toolbar Actions</h3>
                <p className="rv-paragraph">
                  The RelationshipVista toolbar includes actions that allow you to manage and interact with the relationship visualization.
                </p>
                <Img n={14} maxWidth="100%" />

                {/* Expand All */}
                <div id="toolbar-expand">
                  <h4 className="rv-section-h3">1. Expand All</h4>
                  <p className="rv-paragraph">
                    The Expand All option allows users to quickly expand the entire relationship hierarchy starting from the root node, making it easier to view related records across multiple levels without manually expanding each node.
                  </p>
                  <p className="rv-paragraph">When this option is used:</p>
                  <ul className="rv-list">
                    <li>All related object nodes under the root node are expanded automatically.</li>
                    <li>The expansion respects the Visible Records Limit defined in the configuration.</li>
                    <li>Any additional records beyond this limit will remain hidden under the "View n more…" link and will not be expanded automatically.</li>
                  </ul>
                  <Img n={15} />
                </div>

                {/* Collapse All */}
                <div id="toolbar-collapse">
                  <h4 className="rv-section-h3">2. Collapse All</h4>
                  <p className="rv-paragraph">
                    The Collapse All option resets the relationship view by collapsing all expanded nodes. Only the root node and its immediate child objects remain visible.
                  </p>
                  <Img n={16} />
                </div>

                {/* Two-Panel Layout */}
                <div id="toolbar-two-panel">
                  <h4 className="rv-section-h3">3. Two-Panel Layout</h4>
                  <p className="rv-paragraph">
                    RelationshipVista supports a Two-Panel View that allows users to navigate and interact with records on the same page.
                  </p>
                  <Img n={17} maxWidth="100%" />
                  <p className="rv-paragraph">When this mode is enabled, the interface is divided into two sections:</p>
                  <ul className="rv-list">
                    <li>The left panel displays the relationship hierarchy.</li>
                    <li>The right panel displays the corresponding records or record details.</li>
                  </ul>
                  <p className="rv-paragraph"><strong>Behavior:</strong></p>
                  <ul className="rv-list">
                    <li>When a user clicks on an Object Node or Group Node, the related records are displayed in a table list view in the right panel.</li>
                    <Img n={18} maxWidth="100%" />
                    <li>When a Record Node is selected, the detailed view of that record is shown in the right panel.</li>
                    <Img n={19} maxWidth="100%" />
                    <li>Users can also edit the record directly from the right panel, provided they have the necessary permissions.</li>
                  </ul>
                  <p className="rv-paragraph">
                    If the user is not using the Two-Panel View and is in the normal mode, clicking on a record node will open the record detail page in a new browser tab instead of displaying it within the component.
                  </p>
                </div>

                {/* Full Screen */}
                <div id="toolbar-fullscreen">
                  <h4 className="rv-section-h3">4. Full Screen</h4>
                  <p className="rv-paragraph">
                    Displays the RelationshipVista component in full-screen mode.
                  </p>
                  <Img n={20} maxWidth="100%" />
                </div>

                {/* Explorer View */}
                <div id="toolbar-explorer">
                  <h4 className="rv-section-h3">5. Explorer View</h4>
                  <p className="rv-paragraph">
                    Displays the relationship visualization in an indented, hierarchical (Explorer-style) layout, where records and related objects are presented in a structured list format.
                  </p>
                  <Img n={21} maxWidth="100%" />
                </div>

                {/* Tree View */}
                <div id="toolbar-tree">
                  <h4 className="rv-section-h3">6. Tree View</h4>
                  <p className="rv-paragraph">
                    Displays the relationship visualization in a graphical tree format, where records and related objects are represented as connected nodes in a visual map.
                  </p>
                  <Img n={22} maxWidth="100%" />
                </div>

                {/* Relationship View */}
                <div id="toolbar-rview">
                  <h4 className="rv-section-h3">7. Relationship View</h4>
                  <p className="rv-paragraph">
                    This option allows users to select or switch between available Relationship Views (R-Views).
                  </p>
                  <Img n={23} />
                </div>

                {/* Settings */}
                <div id="toolbar-settings">
                  <h4 className="rv-section-h3">8. Settings</h4>
                  <p className="rv-paragraph">
                    This option provides access to additional options for the relationship view.
                  </p>
                  <Img n={24} maxWidth="30%" />
                  <ul className="rv-list">
                    <li><strong>New:</strong> Create a new view.</li>
                    <li><strong>Clone:</strong> Create a copy of an existing view.</li>
                    <li><strong>Edit:</strong> Modify an existing view.</li>
                    <li><strong>Delete:</strong> Remove an existing view.</li>
                    <li><strong>Rename:</strong> Rename an existing view and update its configuration details.</li>
                  </ul>
                </div>
              </div>

              {/* ── R-View Configuration ── */}
              <div id="r-view-config">
                <h3 className="rv-section-h2">R-View Configuration</h3>
                <p className="rv-paragraph">
                  A View Configuration allows you to define and manage the settings that control how records are displayed in the relationship view. Using these properties, you can control which records are shown, limit the number of visible records, and manage sharing preferences.
                </p>
                <p className="rv-paragraph">
                  If your Salesforce administrator has enabled the required permissions, you can create, update, and manage view configurations as needed.
                </p>
                <h4 className="rv-section-h3">Steps to Open the Configuration Modal</h4>
                <ol className="rv-steps">
                  <li>Click on the Settings (<Settings size={14} className="inline-block relative -top-[1px]" style={{ color: 'var(--rv-primary)' }} />) icon available in the relationship view.</li>
                  <li>Select either <strong>New</strong> — to create a new view configuration, or <strong>Rename</strong> — to modify an existing view.</li>
                  <li>The Configuration Properties modal will open, allowing you to define or update the settings.</li>
                </ol>
                <Img n={25} maxWidth="100%" />
                <Img n={26} maxWidth="80%" />



                <h4 className="rv-section-h3">Configuration Options</h4>
                <table className="rv-property-table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="rv-property-name">Name</td>
                      <td>Specify the name of the R-View.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Show</td>
                      <td>Determine which records are displayed: <strong>My Records</strong> — Only records owned by the logged-in user. <strong>All Records</strong> — All records accessible to the logged-in user (default).</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Pinned</td>
                      <td>When enabled, the view becomes the default for the user who created the View Configuration.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Visible Records Limit</td>
                      <td>Set the maximum number of child records displayed for a parent record. Any additional records can be viewed by clicking the "View n more..." option. Note that this setting overrides any "Auto Expand" configurations on any Node Configuration.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Sharing Setting</td>
                      <td>Control who can see the R-view: <strong>Only Me</strong> — Visible only to the creator. <strong>All Users</strong> — Visible to every user in the organization.</td>
                    </tr>
                  </tbody>
                </table>
                <Img n={26} maxWidth="80%" />
              </div>

              {/* ── Root Node Configuration ── */}
              <div id="root-node">
                <h3 className="rv-section-h2">Root Node Configuration</h3>
                <p className="rv-paragraph">
                  You can configure the root node in a Relationship View to control how the primary record and its related data are displayed.
                </p>

                <h4 className="rv-section-h3">Steps to Configure Root Node</h4>
                <ol className="rv-steps">
                  <li>Click on the Settings (<Settings size={14} className="inline-block relative -top-[1px]" style={{ color: 'var(--rv-primary)' }} />) icon available in the relationship view.</li>
                  <li>Click Edit.</li>
                  <li>Click the settings icon next to the root node.</li>
                  <li>The Root Node Configuration dialog will open.</li>
                </ol>
                <Img n={27} maxWidth="80%" />

                <h4 className="rv-section-h3">Configuration Options</h4>
                <table className="rv-property-table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="rv-property-name">Object API Name</td>
                      <td>Displays the object type of the root node.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Record Node Label Field</td>
                      <td>Select the field used as the label for the root node in the visualization.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Auto Expand</td>
                      <td>Automatically expands the root node to show its child records when the view loads.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Show Objects</td>
                      <td>Set of objects that will be displayed as children of the root node in the visualization.</td>
                    </tr>
                  </tbody>
                </table>
                <Note>
                  The list of objects available in Show Objects is controlled by the administrator through RVC component settings. Admins can define a comma-separated list of object API names. Only those objects will be available for selection. If no objects are specified, all related objects are available.
                </Note>
              </div>

              {/* ── Object Node Configuration ── */}
              <div id="object-node">
                <h3 className="rv-section-h2">Object Node Configuration</h3>
                <p className="rv-paragraph">
                  You can configure each node in a Relationship View to control how related records are displayed and navigated.
                </p>

                <h4 className="rv-section-h3">Steps to Configure a Node</h4>
                <ol className="rv-steps">
                  <li>Click on the Settings (<Settings size={14} className="inline-block relative -top-[1px]" style={{ color: 'var(--rv-primary)' }} />) icon.</li>
                  <li>Click Edit.</li>
                  <Img n={28} maxWidth="100%" />
                  <li>Click the settings icon next to the required node.</li>
                  <li>The Node Configuration dialog will open with the available configuration options.</li>
                </ol>

                <Img n={29} />
                <Img n={30} maxWidth="70%" />

                <h4 className="rv-section-h3">Configuration Options</h4>
                <table className="rv-property-table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="rv-property-name">Object Node Label</td>
                      <td>Change the label used for the object node in the visualization.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Object Api Name</td>
                      <td>Displays the object type of the current node.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Record Node Label Field</td>
                      <td>Select a field whose value will be used as the label for record nodes.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Auto Expand</td>
                      <td>Automatically expands the node and its immediate child records when the view is loaded.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Display Configuration Node</td>
                      <td>Show the configuration node itself in the visualization layout.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Cascade Auto Expand</td>
                      <td>If Auto Expand is enabled, this expands one additional level beyond object records.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Display Record Node</td>
                      <td>Show or hide record nodes. Useful for junction objects where nodes may not provide relevant information.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Max Node Label Display Length</td>
                      <td>Limit the number of characters displayed for a node label. Longer labels are truncated with "...".</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Record Icon URL</td>
                      <td>
                        Specify any SLDS icon to display for the record node. The URL must follow the SLDS format:
                        <div className="rv-code-block">/_slds/icons/&lt;category&gt;-sprite/svg/symbols.svg#&lt;icon_name&gt;</div>
                        Example:
                        <div className="rv-code-block">/_slds/icons/utility-sprite/svg/symbols.svg#account</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Record Icon Background Color</td>
                      <td>Specify the background color of the icon using a HEX color code (e.g., #FF5733).</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Show Objects</td>
                      <td>Set of objects that will be displayed as children of the object node in the visualization.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Filter Records</td>
                      <td>Apply filters to limit which child records are displayed under the node.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Group Records</td>
                      <td>Organize child records as sub-nodes under the parent node for easier visualization.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Sort Records By</td>
                      <td>Define the field used to sort child records.</td>
                    </tr>
                    <tr>
                      <td className="rv-property-name">Sort Direction</td>
                      <td>Choose ascending or descending order for the selected sort field.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Junction Object ── */}
              <div id="junction-object">
                <h3 className="rv-section-h2">Configuration for Junction Object</h3>

                <Img n={31} maxWidth="40%" />
                <Img n={32} maxWidth="80%" />
                <ol className="rv-steps">
                  <li>Account Contact Relationship is a junction object that can be enabled in Account Settings.</li>
                  <li>Below the junction object, the Id represents the Account Contact Relationship, i.e., the junction record.</li>
                  <li><strong>Cascade Auto Expand:</strong> This setting enables automatic expansion of a node's child nodes. It is especially useful when working with junction objects.</li>
                  <li><strong>Display Record Node:</strong> This setting allows you to hide the record node of a junction object in the visualization. This is helpful when you want to hide record IDs or other related details of the junction object.</li>
                </ol>

                <p className="rv-paragraph">
                  The images below demonstrate the use of the Cascade Auto Expand and Display Record Node settings. In this example, Person Accounts are enabled, which allows a contact to be associated with multiple accounts through the AccountContactRelation junction object.
                </p>
                <Img n={33} maxWidth="100%" />
                <p className="rv-paragraph">
                  When "Display Record Node" is set to false, the record node is hidden. The relationship between the 'New Person' Account and other accounts (such as 'Test Account 1, Test Account 2, and so on up to 4) is displayed directly, without showing the intermediate junction object record.
                </p>
                <Img n={34} maxWidth="100%" />
              </div>
            </section>

            {/* ═══ FEATURES ═══ */}
            <section className="rv-section" id="features">
              <h2 className="rv-section-h1">Features</h2>

              {/* Creating Records */}
              <div id="create-records">
                <h3 className="rv-section-h2">Creating Records from Object Nodes</h3>
                <p className="rv-paragraph">
                  RelationshipVista allows users to create records directly from the relationship hierarchy when they have the necessary permissions. A "+" icon appears next to an Object Node for which the user can create records.
                </p>
                <h4 className="rv-section-h3">Steps to Create a Record:</h4>
                <ol className="rv-steps">
                  <li>Locate the Object Node in the hierarchy.</li>
                  <li>Click the "+" icon next to the node.</li>
                  <li>Fill out the form to create a new record.</li>
                </ol>
                <p className="rv-paragraph"><strong>Display Behavior:</strong></p>
                <ul className="rv-list">
                  <li>
                    <strong>Two-Panel View enabled:</strong> the form appears in the right-hand panel.
                    <Img n={35} maxWidth="100%" />
                  </li>
                  <li>
                    <strong>Two-Panel View not open:</strong> the form opens in a modal window.
                    <Img n={36} maxWidth="100%" />
                  </li>
                </ul>
              </div>

              {/* Restricting View Selector */}
              <div id="restrict-view">
                <h3 className="rv-section-h2">Restricting the Display of View Selector</h3>
                <p className="rv-paragraph">
                  In some cases, an administrator may want to define a specific view and restrict all users to it. To achieve this, the view name can be configured in the "Use Configuration" component attribute within the page builder. When this attribute is set, the view selector is hidden from users. However, this behavior is overridden if a view is pinned in the View Configuration.
                </p>
                <Img n={37} maxWidth="35%" />
              </div>

              {/* Configuring Views */}
              <div id="configure-views">
                <h3 className="rv-section-h2">Configuring Views That a User Can Select</h3>
                <p className="rv-paragraph">
                  In some cases, the administrator may want to provide users with multiple view options to choose from. To achieve this, the administrator can create multiple views. For each view that should be available to users, the "Sharing Setting" must be set to "All users can see."
                </p>
                <Img n={38} maxWidth="80%" />
              </div>

              {/* Default View */}
              <div id="default-view">
                <h3 className="rv-section-h2">Configuring a Default View for the Users</h3>
                <p className="rv-paragraph">
                  The administrator can pin a view by enabling the "Pinned" attribute, making it the default view for all users. This works similarly to pinning Salesforce list views.
                </p>
                <Img n={39} maxWidth="80%" />
              </div>

              {/* User-Created Views */}
              <div id="user-views">
                <h3 className="rv-section-h2">Controlling if the Users Can Create Their Own Views</h3>
                <p className="rv-paragraph">
                  In some cases, the administrator may want to allow users to create their own views. To enable this, the "Allow Users to Update View Configuration" page attribute must be checked in the page builder. Once enabled, users can create their own views and share them with others.
                </p>
                <Img n={40} maxWidth="35%" />
              </div>

              {/* Action Icons */}
              <div id="action-icons">
                <h3 className="rv-section-h2">Displaying Record Action Icons Based on User Permissions</h3>
                <p className="rv-paragraph">
                  The action icons displayed for each record are based on the permissions of the currently logged-in user. Users will only see icons for the actions they are allowed to perform.
                </p>
                <p className="rv-paragraph">
                  For example, if a user has permission to view a record but does not have permission to edit or delete it, only the View icon will be displayed. The Edit and Delete icons will not be shown. This ensures that users can only access actions they are authorized to perform.
                </p>
                <h4 className="rv-section-h3">Available Record Actions:</h4>
                <ul className="rv-list">
                  <li><strong>View:</strong> Opens the record to display its details.</li>
                  <li><strong>Edit:</strong> Allows the user to modify the record.</li>
                  <li><strong>Clone:</strong> Creates a copy of the selected record with the same field values.</li>
                  <li><strong>Delete:</strong> Removes the record from the system.</li>
                </ul>
                <Img n={41} />


              </div>

              {/* RTL Support */}
              <div id="rtl">
                <h3 className="rv-section-h2">Right-to-Left Language Compatible</h3>
                <p className="rv-paragraph">
                  RelationshipVista fully supports Right-to-Left (RTL) language layouts, ensuring a seamless experience for users working in languages such as Hebrew and Arabic.
                </p>
                <p className="rv-paragraph">
                  The component automatically adjusts its visual orientation to align with RTL reading direction, maintaining usability and consistency across global deployments.
                </p>
                <Img n={42} maxWidth="100%" />
                <Img n={43} maxWidth="100%" />
              </div>
            </section>

            {/* ═══ HOW TO CREATE R-VIEW ═══ */}
            <section className="rv-section" id="howto-rview">
              <h2 className="rv-section-h1">How to Create R-View</h2>
              <p className="rv-paragraph">
                Configure how child records are displayed by creating a new view and applying sorting, filtering, and grouping options on the Opportunity object node.
              </p>
              <p className="rv-paragraph">
                Refer to the example below, where these configurations are applied to Opportunity records.
              </p>

              <div id="howto-configure-view">
                <h4 className="rv-section-h3">Configure View</h4>
                <ol className="rv-steps">
                  <li>Click on the Settings (<Settings size={14} className="inline-block relative -top-[1px]" style={{ color: 'var(--rv-primary)' }} />) icon in the relationship view.</li>
                  <li>Click New.</li>
                  <li>The Configuration Properties modal will open.</li>
                </ol>
                <p className="rv-paragraph">Configure the following fields values as shown:</p>
                <Img n={44} maxWidth="80%" />
              </div>

              <div id="howto-configure-root">
                <h4 className="rv-section-h3">Configure Root Node</h4>
                <p className="rv-paragraph">After creating the view:</p>
                <ol className="rv-steps">
                  <li>Click Edit.</li>
                  <Img n={45} maxWidth="80%" />
                  <li>Click the settings icon next to the root node.</li>
                  <Img n={46} />
                  <li>The Root Node Configuration dialog will open.</li>
                  <li> Add Objects from Available to Selected as shown. Example: Opportunity, Case, Contact</li>
                  <Img n={47} maxWidth="80%" />
                  <li>Save the view.</li>
                </ol>
              </div>

              <div id="howto-configure-object">
                <h4 className="rv-section-h3">Configure Object Node</h4>
                <ol className="rv-steps">
                  <li>Click on the setting icon next to the Object Node.</li>
                  <Img n={48} maxWidth="80%" />
                  <li>The Object Node Configuration dialog will open.</li>
                  <li>Configure the following fields values as shown:</li>
                  <Img n={49} maxWidth="70%" />
                </ol>

                <p className="rv-paragraph">
                  Opportunity records are displayed based on the applied filter conditions, grouped by the selected fields, and sorted according to the defined field and direction.
                </p>
                <Img n={50} maxWidth="70%" />
                <ul>
                  <li>Records Sorted by Amount</li>
                  <Img n={51} maxWidth="70%" />
                  <Img n={52} maxWidth="70%" />
                  <li>Records Grouped by Lead Source</li>
                  <Img n={53} maxWidth="70%" />
                </ul>
              </div>


            </section>

            {/* ═══ CHANGE RECORD ICONS ═══ */}
            <section className="rv-section" id="change-icons">
              <h2 className="rv-section-h1">How to Change Record URL Icons from Lightning Design System</h2>
              <p className="rv-paragraph">
                Go to the official Lightning Design System website, navigate to Icons or use the following link:{' '}
                <a href="https://www.lightningdesignsystem.com/icons/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rv-primary-light)' }}>
                  https://www.lightningdesignsystem.com/icons/
                </a>
              </p>
              <Img n={54} maxWidth="100%" />
              <p className="rv-paragraph">Select the name of the icon file:</p>
              <ul className="rv-list">
                <li>
                  For <strong>Standard Icons</strong>, copy the icon name and use it in the URL format:
                  <div className="rv-code-block">/_slds/icons/standard-sprite/svg/symbols.svg#slds_icon_name</div>
                </li>
                <Img n={55} />
                <li>
                  For <strong>Custom Icons</strong>, get the icon name from the Custom Icons section on the same site and use it in the URL as:
                  <div className="rv-code-block">/_slds/icons/custom-sprite/svg/symbols.svg#slds_icon_name</div>
                </li>
                <Img n={56} />
              </ul>


            </section>

            {/* ═══ ICON BACKGROUND COLOR ═══ */}
            <section className="rv-section" id="icon-bg-color">
              <h2 className="rv-section-h1">How to Set Record Icon Background Color</h2>
              <p className="rv-paragraph">
                Use a color picker or the standard Inspect Element tool to obtain the color code and update it as follows:
              </p>
              <ol className="rv-steps">
                <li>Right-click and select Inspect to open Developer Tools, or press F12.</li>
                <li>Use the color picker available in the Developer Tools to select a color.</li>
                <li>Click on any desired color, and its hex code will be copied to the clipboard.</li>
                <Img n={57} maxWidth="100%" />
                <li>Paste the selected color into the record icon background color field and click Save to apply it to the icon.</li>
              </ol>

              <Img n={58} />
            </section>

            {/* ═══ WHY RVC? ═══ */}
            <section className="rv-section" id="why-rvc">
              <h2 className="rv-section-h1">Why RVC?</h2>

              <div className="rv-feature-grid">
                <div className="rv-card" id="why-navigation">
                  <div className="rv-card-title">
                    1. Optimized Data Navigation
                  </div>
                  <ul className="rv-list">
                    <li><strong>Reduced Click-Path:</strong> Eliminates tab fatigue by consolidating multiple Related Lists into a single, interactive Lightning Web Component.</li>
                    <li><strong>Immediate Context:</strong> Provides a 360-degree view of Standard and Custom Object hierarchies without navigating away from the primary record.</li>
                    <li><strong>Visual Data Scannability:</strong> Uses Explorer and Graphical Tree layouts to make complex One-to-Many and Junction Object relationships instantly understandable.</li>
                  </ul>
                </div>

                <div className="rv-card" id="why-productivity">
                  <div className="rv-card-title">
                    2. Increased Productivity
                  </div>
                  <ul className="rv-list">
                    <li><strong>Inline Record Actions:</strong> Accelerates data entry and updates by allowing users to manage related records directly within the component.</li>
                    <li><strong>Dynamic Data Segmentation:</strong> Uses R-Views to group, sort, and filter records, allowing users to focus only on actionable data.</li>
                    <li><strong>On-the-Fly Creation:</strong> Simplifies business processes by enabling new record creation directly from the relationship map.</li>
                  </ul>
                </div>

                <div className="rv-card" id="why-security">
                  <div className="rv-card-title">
                    3. Native Salesforce Integration &amp; Security
                  </div>
                  <ul className="rv-list">
                    <li><strong>Security Alignment:</strong> Inherits existing Salesforce Security Models, including Object-Level Security, Field-Level Security, and Sharing Rules.</li>
                    <li><strong>SLDS Compliance:</strong> Maintains a consistent look and feel with the Salesforce Lightning Design System, ensuring a seamless user experience.</li>
                    <li><strong>Admin Governance:</strong> Provides centralized control via the Lightning App Builder, allowing admins to lock configurations, pin default views, and restrict user-level modifications.</li>
                  </ul>
                </div>

                <div className="rv-card" id="why-scalability">
                  <div className="rv-card-title">
                    4. Scalability &amp; Global Support
                  </div>
                  <ul className="rv-list">
                    <li><strong>Performance Stability:</strong> Manages high record volumes efficiently using Visible Records Limits to prevent page performance degradation.</li>
                    <li><strong>Localization Ready:</strong> Fully supports Translation Workbench and RTL (Right-to-Left) layouts for global orgs.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ═══ USE CASES ═══ */}
            <section className="rv-section" id="use-cases">
              <h2 className="rv-section-h1">Use Cases</h2>

              {/* Use Case 1 */}
              <div id="usecase1" className="rv-usecase-card">
                <h3 className="rv-usecase-title">Use Case 1: Sales Leadership — ROI &amp; Pipeline Analysis</h3>

                <div className="rv-usecase-scenario">
                  <div className="rv-usecase-scenario-label">Scenario</div>
                  A Sales VP at a tech company wants to audit "Closed Won" Opportunities on an Account to see which Lead Sources (e.g., Referral, Web, Partner) are driving the most revenue, sorted by the largest deals first.
                </div>

                <p className="rv-paragraph">
                  <strong>How RelationshipVista Helps:</strong><br />
                  Instead of navigating multiple Reports or Related Lists, the manager can visualize all Opportunities directly from the Account record page.
                </p>

                <p className="rv-paragraph"><strong>Steps:</strong></p>

                <h4 className="rv-section-h3">Configure View</h4>
                <ol className="rv-steps">
                  <li>Click on the Settings (<Settings size={14} className="inline-block relative -top-[1px]" style={{ color: 'var(--rv-primary)' }} />) icon in the relationship view.</li>
                  <li>Click New.</li>
                  <li>The Configuration Properties modal will open.</li>
                </ol>
                <p className="rv-paragraph">Configure the following fields values as shown:</p>
                <Img n={59} maxWidth="80%" />

                <h4 className="rv-section-h3">Configure Root Node</h4>
                <p className="rv-paragraph">After creating the view:</p>
                <ol className="rv-steps">
                  <li>Click Edit.</li>
                  <Img n={60} maxWidth="80%" />
                  <li>Click the settings icon next to the root node.</li>
                  <Img n={46} />
                  <li>The Root Node Configuration dialog will open.</li>
                  <li>In the Show Objects, add Opportunities Object to Selected Objects as shown:</li>
                </ol>
                <Img n={61} maxWidth="80%" />

                <h4 className="rv-section-h3">Configure Object Node</h4>
                <ol className="rv-steps">
                  <li>Click on the setting icon next to the Object Node.</li>
                  <Img n={62} maxWidth="100%" />
                  <li>The Object Node Configuration dialog will open.</li>
                  <li> Configure the following fields values as below:</li>
                </ol>


                <Img n={63} maxWidth="70%" />

                <div className="rv-outcome-box">
                  <div className="rv-outcome-label">
                    <Target size={15} strokeWidth={2.5} className="inline-block relative -top-[1px] mr-1" /> Outcome
                  </div>
                  <p className="rv-paragraph" style={{ marginBottom: 0 }}>
                    The Sales VP can now see all "Closed Won" Opportunities grouped by Lead Source and sorted by Amount — directly from the Account record page. This eliminates the need to run separate reports, making it easy to identify top-performing channels and largest deals at a glance.
                  </p>
                </div>
                <Img n={64} maxWidth="70%" />
              </div>

              {/* Use Case 2 */}
              <div id="usecase2" className="rv-usecase-card">
                <h3 className="rv-usecase-title">Use Case 2: Case Impact Analysis</h3>

                <div className="rv-usecase-scenario">
                  <div className="rv-usecase-scenario-label">Scenario</div>
                  A Customer Success Manager (CSM) wants to make sure big deals aren't lost because of unhappy customers. Often, a customer might have a major support problem (Case) at the same time they are supposed to sign a new deal (Opportunity). If the CSM doesn't know about the problem, they might lose the sale.
                </div>

                <p className="rv-paragraph">
                  <strong>How RelationshipVista Helps:</strong><br />
                  Instead of jumping between different lists and pages, RelationshipVista shows everything in one map. It connects the problem of the Person to the Money. This lets the CSM see the risk immediately and fix the support issue before asking the customer for a renewal.
                </p>

                <p className="rv-paragraph"><strong>Steps:</strong></p>

                <h4 className="rv-section-h3">Configure View</h4>
                <ol className="rv-steps">
                  <li>Click on the Settings (<Settings size={14} className="inline-block relative -top-[1px]" style={{ color: 'var(--rv-primary)' }} />) icon in the relationship view.</li>
                  <li>Click New.</li>
                  <li>The Configuration Properties modal will open.</li>
                </ol>
                <p className="rv-paragraph">Configure the following fields values as shown:</p>
                <Img n={65} maxWidth="100%" />

                <h4 className="rv-section-h3">Configure Root Node</h4>
                <p className="rv-paragraph">After creating the view:</p>
                <ol className="rv-steps">
                  <li>Click Edit.</li>
                  <li>Click the settings icon next to the root node.</li>
                  <Img n={46} />
                  <li>The Root Node Configuration dialog will open.</li>
                  <li>  In Show Objects, move Cases to the Selected list.</li>
                  <li>Set Auto Expand as True.</li>
                  <li>Click Save.</li>
                </ol>


                <Img n={66} maxWidth="80%" />

                <h4 className="rv-section-h3">Configure Object Node</h4>
                <ol className="rv-steps">
                  <li>Click on the setting icon next to the Case Node.</li>
                  <Img n={67} maxWidth="100%" />
                  <li>The Object Node Configuration dialog will open</li>
                  <li>Configure the following fields values as below:</li>
                  <Img n={68} maxWidth="70%" />
                  <li> Click Save.</li>
                  <li>Click the settings icon next to the Contact node.</li>
                  <li>Configure the following fields values as below:</li>
                  <Img n={69} maxWidth="70%" />
                  <li>Click Save.</li>
                  <li> Click the settings icon next to the Opportunity node. </li>
                  <Img n={70} maxWidth="100%" />
                  <li>Configure the following fields values as below:</li>
                  <Img n={71} maxWidth="70%" />
                  <li>  Click Save.</li>
                </ol>
                <div className="rv-outcome-box">
                  <div className="rv-outcome-label">
                    <Target size={15} strokeWidth={2.5} className="inline-block relative -top-[1px] mr-1" /> Outcome
                  </div>
                  <p className="rv-paragraph" style={{ marginBottom: 0 }}>
                    The CSM can now see a connected view of Cases, Contacts, and Opportunities all from a single Account record. If a high-value Opportunity is at risk due to an open critical Case, the CSM can spot it immediately and take action — without jumping between multiple pages. This reduces the chance of losing a renewal due to an unresolved support issue.
                  </p>
                </div>
                <Img n={72} maxWidth="100%" />
              </div>
            </section>

            {/* ═══ HAVE QUESTIONS? ═══ */}
            <section className="rv-section" id="contact">
              <div className="rv-contact">
                <h2>Have Questions?</h2>
                <p>
                  For any questions related to RelationshipVista and how to configure to visualize your Salesforce records' relationships &amp; hierarchies, feel free to contact us.
                </p>
                <a href="mailto:support@ardira.com" className="rv-contact-email">
                  <Mail size={18} className="inline flex-shrink-0" /> support@ardira.com
                </a>
              </div>
            </section>

          </main>

        </div>
      </div>
      <Footer />
    </div>
  );
};
export default RVUserGuide;







