import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  Activity, 
  GitCommit, 
  X,
  RotateCcw
} from 'lucide-react';

const DIAGRAMS = [
  {
    id: 1,
    title: "1. Laboratory System",
    fullTitle: "1. College Laboratory Management System",
    subtitle: "Issue Laboratory Equipment",
    actImg: "/diagrams/activity/activity_1.webp",
    stateImg: "/diagrams/state/state_1.webp"
  },
  {
    id: 2,
    title: "2. Library System",
    fullTitle: "2. Library Management System",
    subtitle: "Book Issue and Return",
    actImg: "/diagrams/activity/activity_2.webp",
    stateImg: "/diagrams/state/state_2.webp"
  },
  {
    id: 3,
    title: "3. Hospital System",
    fullTitle: "3. Hospital Management System",
    subtitle: "Patient Appointment",
    actImg: "/diagrams/activity/activity_3.webp",
    stateImg: "/diagrams/state/state_3.webp"
  },
  {
    id: 4,
    title: "4. Student Info",
    fullTitle: "4. Student Information System",
    subtitle: "Student Marks Entry",
    actImg: "/diagrams/activity/activity_4.webp",
    stateImg: "/diagrams/state/state_4.webp"
  },
  {
    id: 5,
    title: "5. Food Ordering",
    fullTitle: "5. Online Food Ordering System",
    subtitle: "Place Food Order",
    actImg: "/diagrams/activity/activity_5.webp",
    stateImg: "/diagrams/state/state_5.webp"
  },
  {
    id: 6,
    title: "6. Online Shopping",
    fullTitle: "6. Online Shopping System",
    subtitle: "Purchase Product",
    actImg: "/diagrams/activity/activity_6.webp",
    stateImg: "/diagrams/state/state_6.webp"
  },
  {
    id: 7,
    title: "7. Banking System",
    fullTitle: "7. Banking Management System",
    subtitle: "Money Transfer",
    actImg: "/diagrams/activity/activity_7.webp",
    stateImg: "/diagrams/state/state_7.webp"
  },
  {
    id: 8,
    title: "8. Hotel System",
    fullTitle: "8. Hotel Management System",
    subtitle: "Room Reservation",
    actImg: "/diagrams/activity/activity_8.webp",
    stateImg: "/diagrams/state/state_8.webp"
  },
  {
    id: 9,
    title: "9. Placement System",
    fullTitle: "9. College Placement Management System",
    subtitle: "Student Job Application",
    actImg: "/diagrams/activity/activity_9.webp",
    stateImg: "/diagrams/state/state_9.webp"
  },
  {
    id: 10,
    title: "10. Exam System",
    fullTitle: "10. Examination Management System",
    subtitle: "Result Generation",
    actImg: "/diagrams/activity/activity_10.webp",
    stateImg: "/diagrams/state/state_10.webp"
  }
];

export default function App() {
  const [diagramType, setDiagramType] = useState('activity'); // 'activity' | 'state'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Swipe gesture trackers
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const current = DIAGRAMS[currentIndex];
  const currentImg = diagramType === 'activity' ? current.actImg : current.stateImg;

  const nextDiagram = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % DIAGRAMS.length);
    setZoom(1);
  }, []);

  const prevDiagram = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + DIAGRAMS.length) % DIAGRAMS.length);
    setZoom(1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextDiagram();
      if (e.key === 'ArrowLeft') prevDiagram();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextDiagram, prevDiagram]);

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Trigger swipe only when horizontal gesture dominates and is >= 35px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) >= 35) {
      if (diffX > 0) {
        nextDiagram();
      } else {
        prevDiagram();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="h-[100dvh] w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none">
      
      {/* Mobile-First Header */}
      <header className="flex-shrink-0 bg-slate-900 border-b border-slate-800 px-3 py-2 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <Layers className="w-4 h-4" />
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                SE Diagrams Viewer
              </h1>
            </div>

            {/* Top Right Quick Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoom((z) => (z >= 2.2 ? 1 : z + 0.6))}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 font-mono"
                title="Zoom In / Reset"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{Math.round(zoom * 100)}%</span>
              </button>

              <button
                onClick={() => setIsFullscreen(true)}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                title="Full Phone Screen View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </button>
            </div>
          </div>

          {/* EXACT TWO NAVBAR OPTIONS */}
          <nav className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setDiagramType('activity');
                setZoom(1);
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                diagramType === 'activity'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Activity Diagrams</span>
            </button>

            <button
              onClick={() => {
                setDiagramType('state');
                setZoom(1);
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                diagramType === 'state'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <GitCommit className="w-4 h-4" />
              <span>State Chart Diagrams</span>
            </button>
          </nav>

        </div>
      </header>

      {/* Title Subheader */}
      <div className="flex-shrink-0 bg-slate-950 px-3 py-1.5 border-b border-slate-800/80 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
            {currentIndex + 1} of 10
          </span>
          <h2 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[280px] sm:max-w-md">
            {current.fullTitle}
          </h2>
        </div>
      </div>

      {/* Main Viewport: Fills entire remaining screen */}
      <main 
        className="flex-1 min-h-0 relative bg-slate-950 flex items-center justify-center overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Previous Arrow */}
        <button
          onClick={prevDiagram}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white border border-slate-700 flex items-center justify-center shadow-lg active:scale-90 transition-all backdrop-blur-sm"
          title="Previous Diagram"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Floating Next Arrow */}
        <button
          onClick={nextDiagram}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white border border-slate-700 flex items-center justify-center shadow-lg active:scale-90 transition-all backdrop-blur-sm"
          title="Next Diagram"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div className="w-full h-full p-2 flex items-center justify-center overflow-auto">
          <img
            key={`${diagramType}-${currentIndex}`}
            src={currentImg}
            alt={current.fullTitle}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: zoom === 1 ? 'transform 0.2s ease-out' : 'none'
            }}
            className="w-full h-full object-contain rounded-lg bg-white shadow-xl cursor-pointer"
            onClick={() => setZoom((z) => (z === 1 ? 1.8 : 1))}
          />
        </div>

        {/* Mobile Swipe Hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 pointer-events-none flex items-center gap-1 shadow-md">
          <span>👈 Swipe left/right • Tap to zoom 👉</span>
        </div>
      </main>

      {/* Bottom Horizontal Jump Bar */}
      <footer className="flex-shrink-0 bg-slate-900 border-t border-slate-800 px-2 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {DIAGRAMS.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setZoom(1);
                }}
                className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  isSelected
                    ? diagramType === 'activity'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                #{item.id} {item.title.replace(/^\d+\.\s*/, '')}
              </button>
            );
          })}
        </div>
      </footer>

      {/* 100% PHONE FULLSCREEN OVERLAY */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Fullscreen Bar */}
          <div className="flex-shrink-0 bg-black/90 backdrop-blur-md px-3 py-2.5 flex items-center justify-between border-b border-zinc-800 z-30">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-600 text-white">
                {currentIndex + 1} / 10
              </span>
              <span className="text-xs font-semibold text-white truncate max-w-[180px] sm:max-w-md">
                {current.fullTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => (z > 1 ? 1 : 2.2))}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs flex items-center gap-1 font-medium"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{zoom > 1 ? 'Fit' : 'Zoom'}</span>
              </button>

              <button
                onClick={() => {
                  setIsFullscreen(false);
                  setZoom(1);
                }}
                className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-md active:scale-95"
                title="Close Fullscreen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Diagram Display - Takes 100% of the phone screen */}
          <div className="flex-1 w-full h-full relative flex items-center justify-center p-0 m-0 overflow-auto bg-black">
            {/* Prev button */}
            <button
              onClick={prevDiagram}
              className="absolute left-2 z-30 p-2.5 rounded-full bg-zinc-900/80 text-white border border-zinc-700 shadow-xl active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={nextDiagram}
              className="absolute right-2 z-30 p-2.5 rounded-full bg-zinc-900/80 text-white border border-zinc-700 shadow-xl active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={currentImg}
              alt={current.fullTitle}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
              }}
              className="w-full h-full object-contain select-none"
              onClick={() => setZoom((z) => (z === 1 ? 2.2 : 1))}
            />
          </div>

          {/* Bottom Bar in Fullscreen */}
          <div className="flex-shrink-0 bg-black/90 backdrop-blur-md px-3 py-2 flex items-center justify-between text-[11px] text-zinc-400 z-30 border-t border-zinc-800">
            <span>👈 Swipe to navigate 👉</span>
            <span className="font-semibold text-indigo-400">
              {diagramType === 'activity' ? 'Activity Diagram' : 'State Chart Diagram'}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
