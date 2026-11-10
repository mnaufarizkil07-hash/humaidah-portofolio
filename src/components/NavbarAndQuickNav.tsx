import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Search,
  ChevronUp,
  ChevronDown,
  X,
  Home,
  Briefcase,
  GraduationCap,
  Sliders,
  BarChart3,
  FolderKanban,
  MessageSquareQuote,
  Mail,
} from 'lucide-react';
import { STUDENT_PROFILE } from '../utils/portfolioData';

export interface SectionNavItem {
  id: string;
  label: string;
  shortLabel: string;
}

export const SECTION_NAV_ITEMS: SectionNavItem[] = [
  { id: 'hero-section', label: 'Home', shortLabel: 'Home' },
  { id: 'services-section', label: 'What I Do', shortLabel: 'Services' },
  { id: 'resume-section', label: 'Resume', shortLabel: 'Resume' },
  { id: 'skills-section', label: 'Skills', shortLabel: 'Skills' },
  { id: 'analytics-section', label: 'Data Charts', shortLabel: 'Charts' },
  { id: 'portfolio-section', label: 'Portfolio', shortLabel: 'Portfolio' },
  { id: 'collaborations-section', label: 'Partners', shortLabel: 'Partners' },
  { id: 'contact-section', label: 'Contact', shortLabel: 'Contact' },
];

interface NavbarAndQuickNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
}

export const NavbarAndQuickNav: React.FC<NavbarAndQuickNavProps> = ({
  activeSection,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentIdx = Math.max(
    0,
    SECTION_NAV_ITEMS.findIndex((i) => i.id === activeSection)
  );

  const handlePrevSection = () => {
    const prevIdx = (currentIdx - 1 + SECTION_NAV_ITEMS.length) % SECTION_NAV_ITEMS.length;
    onNavigate(SECTION_NAV_ITEMS[prevIdx].id);
  };

  const handleNextSection = () => {
    const nextIdx = (currentIdx + 1) % SECTION_NAV_ITEMS.length;
    onNavigate(SECTION_NAV_ITEMS[nextIdx].id);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'hero-section':
        return <Home className="w-4 h-4" />;
      case 'services-section':
        return <Briefcase className="w-4 h-4" />;
      case 'resume-section':
        return <GraduationCap className="w-4 h-4" />;
      case 'skills-section':
        return <Sliders className="w-4 h-4" />;
      case 'analytics-section':
        return <BarChart3 className="w-4 h-4" />;
      case 'portfolio-section':
        return <FolderKanban className="w-4 h-4" />;
      case 'collaborations-section':
        return <MessageSquareQuote className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Top Bar matching Luique screenshot + 3-Zone Contract */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#f0ebe3]/90 dark:bg-[#181e26]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (Exact Luique LUIQUE ° style -> HUMAIDAH °) */}
          <a
            href="#hero-section"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero-section');
            }}
            className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-[#111111] dark:text-white whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>HUMAIDAH</span>
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#29A587] inline-block"
            />
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-[#111111]/80 dark:text-zinc-300"
          >
            {SECTION_NAV_ITEMS.slice(0, 6).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-[#29A587] border-[#29A587]'
                      : 'border-transparent hover:text-[#29A587]'
                  }`}
                >
                  {item.shortLabel}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Luique Controls (Quick Search, Moon Theme Toggle, Two-line Drawer Menu) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Open Quick Search"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-[#222a35] border-2 border-[#111111] dark:border-zinc-300 text-xs font-bold tracking-wider uppercase text-[#111111] dark:text-white hover:border-[#29A587] transition-colors whitespace-nowrap shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-[#29A587]" />
              <span className="hidden sm:inline">Cari Cepat</span>
              <kbd className="hidden md:inline-block text-[10px] px-1.5 py-0.5 bg-[#f0ebe3] dark:bg-zinc-800 rounded font-mono-num">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#111111] dark:text-white hover:text-[#29A587] dark:hover:text-[#29A587] transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 stroke-[2]" />}
            </button>

            {/* Luique Signature Two-Line Hamburger Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={drawerOpen}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-[#111111] dark:text-white hover:text-[#29A587] transition-colors"
            >
              <span className="w-6 h-[2px] bg-current block transition-transform" />
              <span className="w-6 h-[2px] bg-current block transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Left Vertical Decorative Spine (Exact Match to Luique Screenshots) */}
      <div
        aria-hidden="true"
        className="hidden xl:flex fixed left-6 top-28 bottom-12 z-20 flex-col items-center justify-between pointer-events-none"
      >
        <span className="w-2.5 h-2.5 rounded-full border-2 border-[#111111] dark:border-zinc-300 bg-[#f0ebe3] dark:bg-[#181e26]" />
        <span className="w-[1.5px] flex-1 bg-[#111111]/40 dark:bg-zinc-500/40" />
        <span className="w-2.5 h-2.5 rounded-full border-2 border-[#111111] dark:border-zinc-300 bg-[#f0ebe3] dark:bg-[#181e26]" />
      </div>

      {/* Responsive Floating Navigation Dock & Stepper (Practical Quick Access on Mobile & Desktop) */}
      <nav
        aria-label="Responsive Quick Section Navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 dark:bg-[#222a35]/95 backdrop-blur-md luique-pill-shadow max-w-[95vw]"
      >
        <button
          type="button"
          onClick={handlePrevSection}
          aria-label="Previous Section"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white transition-colors shrink-0"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-1">
          {SECTION_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#29A587] text-white shadow-sm'
                    : 'text-[#111111]/75 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {getIcon(item.id)}
                <span className="hidden sm:inline">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNextSection}
          aria-label="Next Section"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white transition-colors shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </nav>

      {/* Luique Slide-Out Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Full Navigation Menu"
            className="w-full max-w-md bg-[#f0ebe3] dark:bg-[#181e26] h-full p-8 flex flex-col justify-between border-l-2 border-[#111111] dark:border-zinc-700 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10">
                <span className="text-xl font-extrabold tracking-wider uppercase text-[#111111] dark:text-white flex items-center gap-1.5">
                  HUMAIDAH
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-[#29A587] inline-block" />
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close Navigation Menu"
                  className="w-10 h-10 rounded-full luique-circle-btn bg-white dark:bg-[#222a35] flex items-center justify-center text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-2">
                {SECTION_NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onNavigate(item.id);
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-extrabold uppercase tracking-wider text-sm transition-all ${
                        isActive
                          ? 'bg-[#29A587] text-white'
                          : 'text-[#111111] dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono-num text-xs opacity-70">0{idx + 1}.</span>
                        <span>{item.label}</span>
                      </span>
                      {getIcon(item.id)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 dark:border-white/10 text-xs space-y-1.5 text-[#111111]/80 dark:text-zinc-300">
              <p className="font-extrabold uppercase tracking-wider text-[#29A587]">
                Academic Identity
              </p>
              <p className="font-bold">
                {STUDENT_PROFILE.name} · {STUDENT_PROFILE.faculty} ({STUDENT_PROFILE.major})
              </p>
              <p className="font-mono-num">NPM: {STUDENT_PROFILE.npm}</p>
              <p className="font-mono-num">Tel: {STUDENT_PROFILE.phone}</p>
              <p>{STUDENT_PROFILE.uiEmail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
