import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Download, 
  Layers, 
  Activity, 
  GitCommit,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

const DIAGRAMS_DATA = [
  {
    id: 1,
    title: "1. College Laboratory Management System",
    subtitle: "Issue Laboratory Equipment",
    description: "Flow of student validation, laboratory equipment stock check, and issue slip generation.",
    activityImg: "/diagrams/activity/activity_1.webp",
    activityImgHd: "/diagrams/activity/activity_1.png",
    stateImg: "/diagrams/state/state_1.webp",
    stateImgHd: "/diagrams/state/state_1.png"
  },
  {
    id: 2,
    title: "2. Library Management System",
    subtitle: "Book Issue and Return",
    description: "Student membership verification, book availability lookup, issuing, return date check, and fine handling.",
    activityImg: "/diagrams/activity/activity_2.webp",
    activityImgHd: "/diagrams/activity/activity_2.png",
    stateImg: "/diagrams/state/state_2.webp",
    stateImgHd: "/diagrams/state/state_2.png"
  },
  {
    id: 3,
    title: "3. Hospital Management System",
    subtitle: "Patient Appointment",
    description: "Patient registration, doctor schedule availability check, appointment confirmation, and billing flow.",
    activityImg: "/diagrams/activity/activity_3.webp",
    activityImgHd: "/diagrams/activity/activity_3.png",
    stateImg: "/diagrams/state/state_3.webp",
    stateImgHd: "/diagrams/state/state_3.png"
  },
  {
    id: 4,
    title: "4. Student Information System",
    subtitle: "Student Marks Entry",
    description: "Faculty grade entry, draft validation, admin approval workflow, and student record updates.",
    activityImg: "/diagrams/activity/activity_4.webp",
    activityImgHd: "/diagrams/activity/activity_4.png",
    stateImg: "/diagrams/state/state_4.webp",
    stateImgHd: "/diagrams/state/state_4.png"
  },
  {
    id: 5,
    title: "5. Online Food Ordering System",
    subtitle: "Place Food Order",
    description: "Cart validation, payment gateway interaction, restaurant dispatch, and delivery partner assignment.",
    activityImg: "/diagrams/activity/activity_5.webp",
    activityImgHd: "/diagrams/activity/activity_5.png",
    stateImg: "/diagrams/state/state_5.webp",
    stateImgHd: "/diagrams/state/state_5.png"
  },
  {
    id: 6,
    title: "6. Online Shopping System",
    subtitle: "Purchase Product",
    description: "E-commerce search, inventory check, payment processing, invoice generation, and warehouse packaging.",
    activityImg: "/diagrams/activity/activity_6.webp",
    activityImgHd: "/diagrams/activity/activity_6.png",
    stateImg: "/diagrams/state/state_6.webp",
    stateImgHd: "/diagrams/state/state_6.png"
  },
  {
    id: 7,
    title: "7. Banking Management System",
    subtitle: "Money Transfer",
    description: "Receiver validation, account balance check, secure OTP/PIN verification, and debit/credit ledger update.",
    activityImg: "/diagrams/activity/activity_7.webp",
    activityImgHd: "/diagrams/activity/activity_7.png",
    stateImg: "/diagrams/state/state_7.webp",
    stateImgHd: "/diagrams/state/state_7.png"
  },
  {
    id: 8,
    title: "8. Hotel Management System",
    subtitle: "Room Reservation",
    description: "Room category selection, dates check, advance payment handling, and reservation status update.",
    activityImg: "/diagrams/activity/activity_8.webp",
    activityImgHd: "/diagrams/activity/activity_8.png",
    stateImg: "/diagrams/state/state_8.webp",
    stateImgHd: "/diagrams/state/state_8.png"
  },
  {
    id: 9,
    title: "9. College Placement Management System",
    subtitle: "Student Job Application",
    description: "Job application submission, eligibility verification, corporate shortlisting, and interview scheduling.",
    activityImg: "/diagrams/activity/activity_9.webp",
    activityImgHd: "/diagrams/activity/activity_9.png",
    stateImg: "/diagrams/state/state_9.webp",
    stateImgHd: "/diagrams/state/state_9.png"
  },
  {
    id: 10,
    title: "10. Examination Management System",
    subtitle: "Result Generation",
    description: "Collecting marks from faculty, grade calculation, controller validation, and student result publishing.",
    activityImg: "/diagrams/activity/activity_10.webp",
    activityImgHd: "/diagrams/activity/activity_10.png",
    stateImg: "/diagrams/state/state_10.webp",
    stateImgHd: "/diagrams/state/state_10.png"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('activity'); // 'activity' | 'state'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);

  const currentItem = DIAGRAMS_DATA[currentIndex];
  const currentImg = activeTab === 'activity' ? currentItem.activityImg : currentItem.stateImg;
  const currentImgHd = activeTab === 'activity' ? currentItem.activityImgHd : currentItem.stateImgHd;

  const nextDiagram = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % DIAGRAMS_DATA.length);
    setZoom(1);
    setLoaded(false);
  }, []);

  const prevDiagram = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + DIAGRAMS_DATA.length) % DIAGRAMS_DATA.length);
    setZoom(1);
    setLoaded(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextDiagram();
      if (e.key === 'ArrowLeft') prevDiagram();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
      if (e.key === '+') setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 0.5));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextDiagram, prevDiagram, isFullscreen]);

  // Touch swipe handling
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextDiagram();
    } else if (isRightSwipe) {
      prevDiagram();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 text-slate-100 flex flex-col select-none">
      {/* Top Navigation Bar with exact 2 required options */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Branding */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-indigo-500/25 shadow-lg">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  SE UML Showcase
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">10 Systems • Correct Orientation • Vercel Ready</p>
              </div>
            </div>

            {/* TWO MAIN NAVBAR OPTIONS */}
            <nav className="flex items-center bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
              <button
                onClick={() => {
                  setActiveTab('activity');
                  setZoom(1);
                  setLoaded(false);
                }}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'activity'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Activity Diagrams</span>
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">10</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('state');
                  setZoom(1);
                  setLoaded(false);
                }}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'state'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
                }`}
              >
                <GitCommit className="w-4 h-4" />
                <span>State Chart Diagrams</span>
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">10</span>
              </button>
            </nav>

            {/* Header Right Badges */}
            <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Straight & HD Corrected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-between">
        
        {/* Info & Toolbar Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-4 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Diagram {currentIndex + 1} of 10
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-medium">
                {activeTab === 'activity' ? 'Activity Workflow' : 'State Transition Diagram'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {currentItem.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              <span className="text-indigo-300 font-medium">{currentItem.subtitle}:</span> {currentItem.description}
            </p>
          </div>

          {/* Viewer Controls */}
          <div className="flex items-center gap-2 self-end md:self-center">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700/60">
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                title="Zoom Out (-)"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-slate-300 min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                title="Zoom In (+)"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                title="Reset Zoom"
                className="p-1.5 ml-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fullscreen & HD Download */}
            <button
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <a
              href={currentImgHd}
              download={`${activeTab}_diagram_${currentIndex + 1}.png`}
              title="Download Full HD Image (PNG)"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">HD PNG</span>
            </a>
          </div>
        </div>

        {/* Swipeable Viewport */}
        <div 
          className="relative flex-1 bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-2 sm:p-6 min-h-[460px] sm:min-h-[580px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={imageContainerRef}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={prevDiagram}
            className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 group"
            title="Previous diagram (or swipe right / Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={nextDiagram}
            className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 group"
            title="Next diagram (or swipe left / Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Diagram Display Container */}
          <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
            <div 
              style={{ 
                transform: `scale(${zoom})`, 
                transformOrigin: 'center center',
                transition: zoom === 1 ? 'transform 0.3s ease-out' : 'none'
              }}
              className="max-w-full max-h-[75vh] flex items-center justify-center"
            >
              <img
                src={currentImg}
                alt={`${currentItem.title} - ${activeTab === 'activity' ? 'Activity Diagram' : 'State Chart Diagram'}`}
                className={`max-w-full max-h-[75vh] object-contain rounded-xl bg-white shadow-2xl border border-slate-200 transition-opacity duration-300 ${
                  loaded ? 'opacity-100' : 'opacity-80'
                }`}
                onLoad={() => setLoaded(true)}
              />
            </div>
          </div>

          {/* Swipe Hint overlay on mobile */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 sm:hidden">
            👈 Swipe left / right to navigate 👉
          </div>
        </div>

        {/* Thumbnail Filmstrip Navigation for Instant Jumping */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Select diagram ({currentIndex + 1}/10)</span>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Tip: Use Left/Right Arrow keys or swipe to change
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {DIAGRAMS_DATA.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setZoom(1);
                    setLoaded(false);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 border ${
                    isSelected
                      ? activeTab === 'activity'
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 scale-105'
                        : 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30 scale-105'
                      : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.id}
                  </span>
                  <span className="whitespace-nowrap max-w-[140px] sm:max-w-[180px] truncate">
                    {item.title.replace(/^\d+\.\s*/, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Software Engineering Diagrams Showcase. All 20 diagrams oriented & verified straight.</p>
          <p className="flex items-center gap-2">
            <span>React + Vite</span>
            <span>•</span>
            <span className="text-emerald-400">Ready for Vercel Deployment</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
