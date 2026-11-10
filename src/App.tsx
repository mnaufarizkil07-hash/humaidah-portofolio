/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Mail,
  Phone,
  Instagram,
  Search,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Sparkles,
  FileText,
  Layers,
} from 'lucide-react';
import {
  STUDENT_PROFILE,
  SERVICES_DATA,
  RESUME_DATA,
  SKILLS_DATA,
  PORTFOLIO_PROJECTS,
  COLLABORATIONS_DATA,
  PortfolioProject,
  SearchResultItem,
  filterProjectsByCategory,
} from './utils/portfolioData';
import { CursorFollower } from './components/CursorFollower';
import { DotGridPattern } from './components/DotGridPattern';
import { NavbarAndQuickNav, SECTION_NAV_ITEMS } from './components/NavbarAndQuickNav';
import { QuickSearchModal } from './components/QuickSearchModal';
import { DataVisualizationsSection } from './components/DataVisualizationsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');
  const [navigationMode, setNavigationMode] = useState<'scroll' | 'page'>('scroll');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState<string>('ALL');
  const [skillFilter, setSkillFilter] = useState<'all' | 'skill' | 'competence'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [heroPose, setHeroPose] = useState<'desk' | 'standing'>('desk');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Resume accordion state (matching Luique screenshot where first item is open '-' and others are '+')
  const [openResumeIds, setOpenResumeIds] = useState<Record<string, boolean>>({
    'edu-ui': true,
    'edu-almatuq': false,
    'exp-nutrivita': true,
    'exp-smilecheck': false,
    'exp-mosgru': false,
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'Kolaborasi Riset / Proyek Farmasi',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcut Cmd+K / Ctrl+K for Quick Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setSelectedProject(null);
        setCvModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll spy when in smooth scroll mode
  useEffect(() => {
    if (navigationMode !== 'scroll') return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = SECTION_NAV_ITEMS[0].id;
      for (const item of SECTION_NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && scrollPos >= el.offsetTop) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationMode]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (navigationMode === 'scroll') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSearchResult = (res: SearchResultItem) => {
    setSearchModalOpen(false);
    if (res.projectId) {
      const found = PORTFOLIO_PROJECTS.find((p) => p.id === res.projectId);
      if (found) {
        setSelectedProject(found);
        return;
      }
    }
    handleNavigate(res.targetSectionId);
  };

  const toggleResumeItem = (id: string) => {
    setOpenResumeIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactError('Mohon lengkapi nama, email, dan pesan Anda terlebih dahulu.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  const educationList = RESUME_DATA.filter((i) => i.type === 'education');
  const experienceList = RESUME_DATA.filter((i) => i.type === 'experience');

  const filteredSkills = SKILLS_DATA.filter((s) =>
    skillFilter === 'all' ? true : s.category === skillFilter
  ).filter((s) =>
    !quickSearchQuery.trim()
      ? true
      : `${s.name} ${s.description} ${s.toolsOrContext}`
          .toLowerCase()
          .includes(quickSearchQuery.trim().toLowerCase())
  );

  const filteredProjects = filterProjectsByCategory(portfolioCategory, quickSearchQuery);

  const shouldShowSection = (sectionId: string) => {
    if (navigationMode === 'scroll') return true;
    return activeSection === sectionId;
  };

  return (
    <div className="min-h-screen bg-[#f0ebe3] dark:bg-[#181e26] text-[#111111] dark:text-zinc-100 relative selection:bg-[#29A587] selection:text-white pb-24">
      {/* Custom Aesthetic Cursor Circle (Luique Match) */}
      <CursorFollower />

      {/* Top Header, Left Spine & Responsive Navigation Dock */}
      <NavbarAndQuickNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Interactive Quick Search Bar & Page Transition Mode Switcher Banner */}
      <div className="pt-24 px-5 sm:px-8 max-w-[1320px] mx-auto">
        <div className="bg-white/85 dark:bg-[#222a35]/90 backdrop-blur-md rounded-2xl p-3 sm:px-5 sm:py-3.5 border-2 border-[#111111] dark:border-zinc-700 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          {/* Quick Inline Filter Input */}
          <div className="flex items-center gap-2.5 flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#29A587] shrink-0" />
            <input
              type="search"
              value={quickSearchQuery}
              onChange={(e) => setQuickSearchQuery(e.target.value)}
              placeholder="Filter cepat halaman (ketik: Molecular Docking, NutriVita, Smile Check, MOSGRU, Rp24.000.000)..."
              aria-label="Filter halaman cepat"
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#111111] dark:text-white placeholder:text-zinc-400 focus:outline-none"
            />
            {quickSearchQuery && (
              <button
                type="button"
                onClick={() => setQuickSearchQuery('')}
                className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#f0ebe3] dark:bg-zinc-800 text-[#111111] dark:text-zinc-200"
              >
                Reset
              </button>
            )}
          </div>

          {/* Interactive Transition Mode Switcher (Smooth Scroll vs Animated Page Slide) */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:inline">
              Mode Transisi:
            </span>
            <div className="flex items-center bg-[#f0ebe3] dark:bg-[#181e26] p-1 rounded-full border border-[#111111]/20 dark:border-white/15">
              <button
                type="button"
                onClick={() => setNavigationMode('scroll')}
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  navigationMode === 'scroll'
                    ? 'bg-[#29A587] text-white'
                    : 'text-[#111111]/70 dark:text-zinc-300'
                }`}
              >
                Semua Seksi
              </button>
              <button
                type="button"
                onClick={() => setNavigationMode('page')}
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1 whitespace-nowrap shrink-0 ${
                  navigationMode === 'page'
                    ? 'bg-[#29A587] text-white'
                    : 'text-[#111111]/70 dark:text-zinc-300'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Slide Per Halaman</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* =========================================================
            HERO SECTION (EXACT LUIQUE SCREENSHOT 6 + LAST SCREENSHOT CUTOUT)
           ========================================================= */}
        {shouldShowSection('hero-section') && (
          <section
            key="hero-section"
            id="hero-section"
            className="section-enter pt-10 pb-20 sm:py-20 px-5 sm:px-8 max-w-[1320px] mx-auto relative overflow-hidden"
          >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Column: Luique Typographic Hierarchy */}
                <div className="lg:col-span-6 space-y-6 z-10">
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest">
                    <span className="text-[#111111] dark:text-white">HELLO, </span>
                    <span className="text-[#29A587]">MY NAME IS</span>
                  </div>

                  {/* Outlined & Filled Hero Name (Matching ZOÉ MILLER in Screenshot) */}
                  <h1 className="text-5xl sm:text-7xl xl:text-[80px] font-extrabold uppercase tracking-tight leading-[1.02] flex flex-wrap gap-x-4 gap-y-1">
                    <span className="luique-title-filled">{STUDENT_PROFILE.name}</span>
                    <span className="luique-title-outline">UI</span>
                  </h1>

                  {/* I AM + Script Subtitle */}
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#111111] dark:text-white">
                      I AM
                    </span>
                    <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
                      Pharmacy Student & Formulator
                    </span>
                  </div>

                  {/* Bio from PDF Slide 1 + Student Metadata */}
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                    {STUDENT_PROFILE.bio}
                  </p>

                  {/* Unboxed Clean Student Credentials Bar (Zero-Pill Discipline) */}
                  <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-bold text-[#111111] dark:text-zinc-200">
                    <span>{STUDENT_PROFILE.faculty}</span>
                    <span aria-hidden="true" className="text-[#29A587]">
                      ·
                    </span>
                    <span>Program Studi {STUDENT_PROFILE.major}</span>
                    <span aria-hidden="true" className="text-[#29A587]">
                      ·
                    </span>
                    <span className="font-mono-num">NPM {STUDENT_PROFILE.npm}</span>
                    <span aria-hidden="true" className="text-[#29A587]">
                      ·
                    </span>
                    <span className="font-mono-num">{STUDENT_PROFILE.phone}</span>
                  </div>

                  {/* Social & Direct Links Row (Exact Luique Placement) */}
                  <div className="flex items-center gap-5 pt-2">
                    <a
                      href={`mailto:${STUDENT_PROFILE.uiEmail}`}
                      aria-label={`Email ${STUDENT_PROFILE.uiEmail}`}
                      className="text-[#111111] dark:text-white hover:text-[#29A587] transition-colors flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="hidden sm:inline">{STUDENT_PROFILE.uiEmail}</span>
                    </a>
                    <a
                      href={`https://instagram.com/${STUDENT_PROFILE.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram @${STUDENT_PROFILE.instagram}`}
                      className="text-[#111111] dark:text-white hover:text-[#29A587] transition-colors flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>@{STUDENT_PROFILE.instagram}</span>
                    </a>
                    <a
                      href="https://bit.ly/E-BOOKSMILE-CHECKUI"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Smile Check UI E-Booklet"
                      className="text-[#111111] dark:text-white hover:text-[#29A587] transition-colors flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Smile Check UI</span>
                    </a>
                  </div>

                  {/* DOWNLOAD CV Pill Button + Connector Line + MY SKILLS (Exact Luique Match) */}
                  <div className="pt-4 flex flex-wrap items-center gap-0">
                    <button
                      type="button"
                      onClick={() => setCvModalOpen(true)}
                      className="px-8 py-4 rounded-full bg-white dark:bg-[#222a35] text-[#111111] dark:text-white text-xs font-extrabold uppercase tracking-widest luique-pill-shadow whitespace-nowrap shrink-0"
                    >
                      LIHAT DATA CV
                    </button>
                    <span
                      aria-hidden="true"
                      className="w-10 h-[2px] bg-[#111111] dark:bg-zinc-300 hidden sm:inline-block"
                    />
                    <button
                      type="button"
                      onClick={() => handleNavigate('skills-section')}
                      className="px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-[#111111] dark:text-white hover:text-[#29A587] transition-colors whitespace-nowrap shrink-0"
                    >
                      MY SKILLS
                    </button>
                  </div>
                </div>

                {/* Right Column: Luique Emerald Circle + Transparent Cutout Photo from Last Screenshot + Floating Stat Pills */}
                <div className="lg:col-span-6 relative flex items-center justify-center">
                  {/* Top-Right Dot Grid Pattern */}
                  <DotGridPattern
                    rows={5}
                    cols={5}
                    gap="gap-4"
                    className="absolute -top-4 right-4 sm:right-10 z-0"
                  />

                  {/* Bottom-Left Dot Grid Pattern */}
                  <DotGridPattern
                    rows={4}
                    cols={4}
                    gap="gap-4"
                    className="absolute bottom-4 left-4 sm:left-8 z-0"
                  />

                  {/* Bottom-Right Dot Grid Pattern */}
                  <DotGridPattern
                    rows={4}
                    cols={4}
                    gap="gap-3.5"
                    className="absolute -bottom-2 right-4 sm:right-8 z-0"
                  />

                  {/* Giant Luique Mint/Emerald Circle Container */}
                  <div className="relative w-[300px] h-[340px] sm:w-[430px] sm:h-[470px] xl:w-[470px] xl:h-[510px] flex items-end justify-center">
                    {/* The Emerald Circle Backdrop */}
                    <div className="w-[300px] h-[300px] sm:w-[430px] sm:h-[430px] xl:w-[470px] xl:h-[470px] rounded-full bg-[#29A587] absolute bottom-0 left-0 z-10 shadow-inner" />

                    {/* Humaidah Cutout Portrait without Background (clipped cleanly to the bottom circle arc while head rises above) */}
                    <div className="relative z-20 w-[300px] sm:w-[430px] xl:w-[470px] h-full flex items-end justify-center overflow-hidden rounded-b-full">
                      <img
                        src={
                          heroPose === 'desk'
                            ? STUDENT_PROFILE.heroImage
                            : STUDENT_PROFILE.standingImage
                        }
                        alt="Humaidah — Fakultas Farmasi Universitas Indonesia"
                        referrerPolicy="no-referrer"
                        className={`object-contain select-none transition-all duration-500 drop-shadow-[0_14px_24px_rgba(0,0,0,0.22)] ${
                          heroPose === 'desk'
                            ? 'w-[96%] max-h-[104%] translate-y-1'
                            : 'h-[98%] object-bottom'
                        }`}
                      />
                    </div>

                    {/* Pose Switcher Mini Button (Top Right of Circle) */}
                    <button
                      type="button"
                      onClick={() =>
                        setHeroPose((prev) => (prev === 'desk' ? 'standing' : 'desk'))
                      }
                      aria-label="Ganti Pose Foto Profil Humaidah"
                      className="absolute top-2 right-0 z-30 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#222a35] text-[11px] font-extrabold uppercase tracking-wider text-[#111111] dark:text-white luique-pill-shadow flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#29A587]" />
                      <span>{heroPose === 'desk' ? 'Foto Slide 6' : 'Foto Slide 1'}</span>
                    </button>

                    {/* Floating Pill 1 (Bottom-Left, exact match to "12 + YEARS OF EXPERIENCE" pill in Screenshot 6) */}
                    <button
                      type="button"
                      onClick={() => handleNavigate('resume-section')}
                      className="absolute bottom-14 -left-2 sm:-left-6 z-30 bg-white dark:bg-[#222a35] px-5 sm:px-7 py-3 sm:py-4 rounded-full luique-pill-shadow flex items-center gap-3.5 text-left"
                    >
                      <span className="font-mono-num text-2xl sm:text-4xl font-extrabold text-[#111111] dark:text-white flex items-center">
                        2025
                        <span className="text-[#29A587] ml-1 text-2xl">+</span>
                      </span>
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider leading-tight text-[#111111] dark:text-white">
                        FAKULTAS FARMASI
                        <span className="block text-[#29A587]">UNIV. INDONESIA</span>
                      </span>
                    </button>

                    {/* Floating Pill 2 (Bottom-Right, exact match to "330 COMPLETED PROJECTS" pill in Screenshot 6) */}
                    <button
                      type="button"
                      onClick={() => handleNavigate('portfolio-section')}
                      className="absolute bottom-2 -right-2 sm:-right-4 z-30 bg-white dark:bg-[#222a35] px-5 sm:px-7 py-3 sm:py-4 rounded-full luique-pill-shadow flex items-center gap-3.5 text-left"
                    >
                      <span className="font-mono-num text-2xl sm:text-4xl font-extrabold text-[#111111] dark:text-white">
                        03
                      </span>
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider leading-tight text-[#111111] dark:text-white">
                        FEATURED RESEARCH
                        <span className="block text-[#29A587]">PROJECTS</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================
              SECTION 1: WHAT I DO / MY SERVICES (EXACT SCREENSHOT 1 MATCH)
             ========================================================= */}
          {shouldShowSection('services-section') && (
            <section
              key="services-section"
              id="services-section"
              aria-labelledby="services-heading"
              className="section-enter py-20 sm:py-24 px-5 sm:px-8 max-w-[1320px] mx-auto"
            >
              {/* Centered Header: WHAT I DO / MY Services */}
              <div className="text-center mb-14">
                <h2
                  id="services-heading"
                  className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-white"
                >
                  WHAT I DO
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                    MY
                  </span>
                  <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
                    Services
                  </span>
                </div>
              </div>

              {/* 3-Column Luique Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES_DATA.map((service) => {
                  const linkedProject = PORTFOLIO_PROJECTS.find(
                    (p) => p.id === service.linkedProjectId
                  );
                  return (
                    <article
                      key={service.id}
                      className="bg-white dark:bg-[#222a35] rounded-[22px] p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px] border border-black/5 dark:border-white/10 hover:border-[#29A587] transition-all"
                    >
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-widest text-[#111111] dark:text-zinc-200">
                          {service.category}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-white mt-8 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-10 flex items-center justify-between relative z-10">
                        <button
                          type="button"
                          onClick={() => {
                            if (linkedProject) setSelectedProject(linkedProject);
                          }}
                          className="inline-flex items-center gap-3 text-sm font-extrabold text-[#111111] dark:text-white hover:text-[#29A587] transition-colors py-2 pr-3"
                        >
                          <span>See Case Study</span>
                          <ArrowRight className="w-4 h-4 text-[#29A587]" />
                        </button>
                      </div>

                      {/* Signature Bottom-Right Dot Matrix Pattern */}
                      <DotGridPattern
                        rows={4}
                        cols={4}
                        gap="gap-3.5"
                        className="absolute bottom-5 right-5"
                      />
                    </article>
                  );
                })}
              </div>

              {/* Luique Carousel Indicator Dots (●—○—○) */}
              <div className="mt-12 flex items-center justify-center">
                <div className="flex items-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#29A587] border-2 border-[#111111] dark:border-white inline-block" />
                  <span className="w-6 h-[2px] bg-[#111111] dark:bg-white inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-zinc-700 border-2 border-[#111111] dark:border-white inline-block" />
                  <span className="w-6 h-[2px] bg-[#111111] dark:bg-white inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-zinc-700 border-2 border-[#111111] dark:border-white inline-block" />
                </div>
              </div>
            </section>
          )}

          {/* =========================================================
              SECTION 2: RESUME / MY STORY (EXACT SCREENSHOT 2 MATCH)
             ========================================================= */}
          {shouldShowSection('resume-section') && (
            <section
              key="resume-section"
              id="resume-section"
              aria-labelledby="resume-heading"
              className="section-enter py-20 sm:py-24 px-5 sm:px-8 max-w-[1320px] mx-auto"
            >
              {/* Centered Header: RESUME / MY Story */}
              <div className="text-center mb-14">
                <h2
                  id="resume-heading"
                  className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-white"
                >
                  RESUME
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                    MY
                  </span>
                  <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
                    Story
                  </span>
                </div>
              </div>

              {/* 2-Column Education & Experience Accordion with Right-Edge '+' / '-' Circles */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column: Education */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-center pb-5 border-b-2 border-[#111111] dark:border-zinc-300 text-[#111111] dark:text-white">
                    Education
                  </h3>

                  <div className="relative border-r-2 border-[#111111] dark:border-zinc-300 pr-6 sm:pr-8">
                    {educationList.map((item) => {
                      const isOpen = Boolean(openResumeIds[item.id]);
                      return (
                        <div
                          key={item.id}
                          className="py-7 border-b-2 border-[#111111] dark:border-zinc-300 relative"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <h4 className="text-lg sm:text-xl font-extrabold text-[#111111] dark:text-white">
                              {item.institutionOrRole}
                            </h4>
                          </div>

                          {isOpen && (
                            <div className="mt-4 space-y-3">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="font-script text-2xl sm:text-3xl font-bold text-[#111111] dark:text-white">
                                  {item.subtitle}
                                </span>
                                <span className="text-xs font-extrabold uppercase tracking-wider text-[#111111] dark:text-zinc-200 font-mono-num">
                                  {item.isPresent ? (
                                    <>
                                      2025 - <span className="text-[#29A587]">PRESENT</span>
                                    </>
                                  ) : (
                                    item.period
                                  )}
                                </span>
                              </div>
                              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                {item.description}
                              </p>
                              <ul className="space-y-1 pt-1">
                                {item.highlights.map((hl) => (
                                  <li
                                    key={hl}
                                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                                  >
                                    • {hl}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Luique Right-Edge '+' / '-' Button */}
                          <button
                            type="button"
                            onClick={() => toggleResumeItem(item.id)}
                            aria-expanded={isOpen}
                            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.institutionOrRole}`}
                            className="w-10 h-10 rounded-full bg-white dark:bg-[#222a35] luique-circle-btn absolute -right-[21px] -bottom-[21px] z-10 flex items-center justify-center font-extrabold text-lg text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white"
                          >
                            {isOpen ? '−' : '+'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Experience */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-center pb-5 border-b-2 border-[#111111] dark:border-zinc-300 text-[#111111] dark:text-white">
                    Experience
                  </h3>

                  <div className="relative border-r-2 border-[#111111] dark:border-zinc-300 pr-6 sm:pr-8">
                    {experienceList.map((item) => {
                      const isOpen = Boolean(openResumeIds[item.id]);
                      return (
                        <div
                          key={item.id}
                          className="py-7 border-b-2 border-[#111111] dark:border-zinc-300 relative"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <h4 className="text-lg sm:text-xl font-extrabold text-[#111111] dark:text-white">
                              {item.institutionOrRole}
                            </h4>
                          </div>

                          {isOpen && (
                            <div className="mt-4 space-y-3">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="font-script text-2xl sm:text-3xl font-bold text-[#111111] dark:text-white">
                                  {item.subtitle}
                                </span>
                                <span className="text-xs font-extrabold uppercase tracking-wider text-[#111111] dark:text-zinc-200 font-mono-num">
                                  {item.isPresent ? (
                                    <>
                                      2026 - <span className="text-[#29A587]">PRESENT</span>
                                    </>
                                  ) : (
                                    item.period
                                  )}
                                </span>
                              </div>
                              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                {item.description}
                              </p>
                              <ul className="space-y-1 pt-1">
                                {item.highlights.map((hl) => (
                                  <li
                                    key={hl}
                                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                                  >
                                    • {hl}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Luique Right-Edge '+' / '-' Button */}
                          <button
                            type="button"
                            onClick={() => toggleResumeItem(item.id)}
                            aria-expanded={isOpen}
                            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.institutionOrRole}`}
                            className="w-10 h-10 rounded-full bg-white dark:bg-[#222a35] luique-circle-btn absolute -right-[21px] -bottom-[21px] z-10 flex items-center justify-center font-extrabold text-lg text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white"
                          >
                            {isOpen ? '−' : '+'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================
              SECTION 3: PROFESSIONAL SKILLS / MY TALENT (EXACT SCREENSHOT 3 MATCH)
             ========================================================= */}
          {shouldShowSection('skills-section') && (
            <section
              key="skills-section"
              id="skills-section"
              aria-labelledby="skills-heading"
              className="section-enter py-20 sm:py-24 px-5 sm:px-8 max-w-[1320px] mx-auto"
            >
              {/* Centered Header: PROFESSIONAL SKILLS / MY Talent */}
              <div className="text-center mb-10">
                <h2
                  id="skills-heading"
                  className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-white"
                >
                  PROFESSIONAL SKILLS
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                    MY
                  </span>
                  <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
                    Talent
                  </span>
                </div>
              </div>

              {/* Filter Tabs for Skills vs Competence (from PDF Page 2) */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
                {[
                  { key: 'all', label: 'ALL TALENTS (10)' },
                  { key: 'skill', label: 'CORE SKILLS (6)' },
                  { key: 'competence', label: 'SOFTWARE & TOOLS (4)' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSkillFilter(tab.key as 'all' | 'skill' | 'competence')}
                    className={`pb-2 text-xs font-extrabold uppercase tracking-widest relative transition-colors whitespace-nowrap shrink-0 ${
                      skillFilter === tab.key
                        ? 'text-[#111111] dark:text-white'
                        : 'text-[#111111]/60 dark:text-zinc-400 hover:text-[#29A587]'
                    }`}
                  >
                    {tab.label}
                    {skillFilter === tab.key && (
                      <span className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#29A587] rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* 3-Column Luique Skills Grid with Green Circle Progress Thumb */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] dark:text-white">
                        {skill.name}
                      </h3>
                      <span className="font-mono-num text-sm sm:text-base font-extrabold text-[#111111] dark:text-white">
                        {skill.percentage} <span className="text-[#29A587]">%</span>
                      </span>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed px-1 min-h-[66px]">
                      {skill.description}
                    </p>

                    {/* Exact Luique Horizontal Track + Emerald Circle Thumb */}
                    <div className="pt-2 relative flex items-center">
                      <div className="w-full h-[2px] bg-black/15 dark:bg-white/20 relative">
                        <div
                          className="h-[2px] bg-[#111111] dark:bg-white transition-all duration-500"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                      <span
                        aria-hidden="true"
                        className="w-6 h-6 rounded-full bg-[#29A587] border-2 border-[#111111] dark:border-white shadow-xs absolute -translate-x-1/2 transition-all duration-500"
                        style={{ left: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* =========================================================
              SECTION 4: INTERACTIVE DATA VISUALIZATIONS (PDF DATA CHARTS)
             ========================================================= */}
          {shouldShowSection('analytics-section') && (
            <div key="analytics-section" className="section-enter">
              <DataVisualizationsSection />
            </div>
          )}

          {/* =========================================================
              SECTION 5: PORTFOLIO / MY CASES (EXACT SCREENSHOT 5 MATCH)
             ========================================================= */}
          {shouldShowSection('portfolio-section') && (
            <section
              key="portfolio-section"
              id="portfolio-section"
              aria-labelledby="portfolio-heading"
              className="section-enter py-20 sm:py-24 px-5 sm:px-8 max-w-[1320px] mx-auto"
            >
              {/* Centered Header: PORTFOLIO / MY Cases */}
              <div className="text-center mb-10">
                <h2
                  id="portfolio-heading"
                  className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-white"
                >
                  PORTFOLIO
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                    MY
                  </span>
                  <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
                    Cases
                  </span>
                </div>
              </div>

              {/* Luique Filter Bar (ALL, PREVENTIVE HEALTH, QUALITY CONTROL, FORMULATION & BUSINESS) */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12">
                {[
                  { id: 'ALL', label: 'ALL' },
                  { id: 'PREVENTIVE HEALTH', label: 'PREVENTIVE HEALTH' },
                  { id: 'QUALITY CONTROL', label: 'QUALITY CONTROL' },
                  { id: 'FORMULATION & BUSINESS', label: 'FORMULATION & BUSINESS' },
                ].map((cat) => {
                  const isActive = portfolioCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPortfolioCategory(cat.id)}
                      className={`pb-2 text-xs font-extrabold uppercase tracking-widest relative transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-[#111111] dark:text-white'
                          : 'text-[#111111]/65 dark:text-zinc-400 hover:text-[#29A587]'
                      }`}
                    >
                      {cat.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-7 h-[3px] bg-[#29A587] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 3-Column Luique Portfolio Cards */}
              {filteredProjects.length === 0 ? (
                <div className="bg-white dark:bg-[#222a35] rounded-[22px] p-12 text-center">
                  <p className="text-base font-bold text-zinc-600 dark:text-zinc-300">
                    Tidak ada proyek yang cocok dengan filter "{quickSearchQuery}".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPortfolioCategory('ALL');
                      setQuickSearchQuery('');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#29A587] text-white text-xs font-extrabold uppercase tracking-wider"
                  >
                    Tampilkan Semua Proyek
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <article
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      data-cursor-hover="true"
                      className="bg-white dark:bg-[#222a35] rounded-[22px] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between cursor-pointer group border border-black/5 dark:border-white/10 hover:border-[#29A587] transition-all"
                    >
                      <div>
                        {/* Rounded Media Container */}
                        <div className="w-full h-56 rounded-[18px] overflow-hidden bg-[#f0ebe3] dark:bg-zinc-900 mb-6 relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Green Uppercase Category Kicker */}
                        <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                          {project.category}, {project.role}
                        </p>

                        {/* Bold Card Heading */}
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-white mt-2 mb-3 group-hover:text-[#29A587] transition-colors">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                          {project.tacticalSolution}
                        </p>
                      </div>

                      {/* See Case Study Link */}
                      <div className="pt-8 flex items-center justify-between relative z-10">
                        <span className="inline-flex items-center gap-3 text-sm font-extrabold text-[#111111] dark:text-white group-hover:text-[#29A587] transition-colors">
                          <span>See Case Study</span>
                          <ArrowRight className="w-4 h-4 text-[#29A587] group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>

                      {/* Bottom-Right Dot Matrix */}
                      <DotGridPattern
                        rows={3}
                        cols={4}
                        gap="gap-3"
                        className="absolute bottom-4 right-4 opacity-75"
                      />
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* =========================================================
              SECTION 6: COLLABORATIONS / TESTIMONIALS (EXACT SCREENSHOT 4 MATCH)
             ========================================================= */}
          {shouldShowSection('collaborations-section') && (
            <section
              key="collaborations-section"
              id="collaborations-section"
              aria-labelledby="collaborations-heading"
              className="section-enter py-20 sm:py-24 px-5 sm:px-8 max-w-[1320px] mx-auto"
            >
              {/* Centered Header: COLLABORATIONS / WHAT Partners Say */}
              <div className="text-center mb-14">
                <h2
                  id="collaborations-heading"
                  className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-white"
                >
                  COLLABORATIONS
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                    INSTITUTIONAL
                  </span>
                  <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
                    Partners & Impact
                  </span>
                </div>
              </div>

              {/* 3-Column Luique Testimonial-Style Cards with Top-Left Quote Cutout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {COLLABORATIONS_DATA.map((collab) => (
                  <article
                    key={collab.id}
                    className="bg-white dark:bg-[#222a35] rounded-[22px] p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between border border-black/5 dark:border-white/10"
                  >
                    <div>
                      {/* Image with Top-Left White Cutout Quote Badge (Exact Luique Screenshot 4 Match) */}
                      <div className="relative w-full h-48 rounded-[18px] overflow-hidden bg-[#f0ebe3] dark:bg-zinc-900 mb-6">
                        <img
                          src={collab.image}
                          alt={collab.partnerName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {/* Top-Left Cutout Notch with Emerald Double Quote Icon */}
                        <div className="w-16 h-16 bg-white dark:bg-[#222a35] rounded-br-[22px] absolute top-0 left-0 flex items-center justify-center">
                          <svg
                            viewBox="0 0 32 32"
                            className="w-7 h-7 fill-[#29A587] stroke-[#111111] dark:stroke-white stroke-[1.8]"
                          >
                            <path d="M10 8c-3.3 0-6 2.7-6 6v8h8v-8H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v8h8v-8h-4c0-1.1.9-2 2-2V8z" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                        “{collab.quote}”
                      </p>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-lg font-extrabold text-[#111111] dark:text-white">
                        {collab.partnerName}
                      </h3>
                      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {collab.roleOrProgram}
                      </p>
                    </div>

                    {/* Bottom-Right Dot Matrix */}
                    <DotGridPattern
                      rows={4}
                      cols={4}
                      gap="gap-3.5"
                      className="absolute bottom-5 right-5"
                    />
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* =========================================================
              SECTION 7: LET'S CONNECT WITH ME! (SLIDE 6 + LAST SCREENSHOT MATCH)
             ========================================================= */}
          {shouldShowSection('contact-section') && (
            <section
              key="contact-section"
              id="contact-section"
              aria-labelledby="contact-heading"
              className="section-enter py-20 sm:py-24 px-5 sm:px-8 max-w-[1320px] mx-auto"
            >
              {/* Centered Header */}
              <div className="text-center mb-14">
                <h2
                  id="contact-heading"
                  className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-white"
                >
                  LET’S CONNECT WITH ME!
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                    DIRECT
                  </span>
                  <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
                    Contact & Collaboration
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Column: Slide 6 Contact Pills + Academic Credentials Card */}
                <div className="lg:col-span-7 bg-white dark:bg-[#222a35] rounded-[26px] p-7 sm:p-10 border-2 border-[#111111] dark:border-zinc-600 relative overflow-hidden space-y-5">
                  <div className="pb-4 border-b border-black/10 dark:border-white/10">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                      ACADEMIC & PROFESSIONAL IDENTITY
                    </p>
                    <h3 className="text-2xl font-extrabold text-[#111111] dark:text-white mt-1">
                      {STUDENT_PROFILE.name} — {STUDENT_PROFILE.faculty} ({STUDENT_PROFILE.major})
                    </h3>
                    <p className="font-mono-num text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 mt-1">
                      NPM: {STUDENT_PROFILE.npm} · Universitas Indonesia
                    </p>
                  </div>

                  {/* Exact Pill Cards from Slide 6 / Last Screenshot with One-Click Copy */}
                  <div className="space-y-3.5">
                    {[
                      {
                        label: 'Personal Email (PDF Slide 6)',
                        value: STUDENT_PROFILE.personalEmail,
                        href: `mailto:${STUDENT_PROFILE.personalEmail}`,
                        icon: <Mail className="w-5 h-5" />,
                      },
                      {
                        label: 'UI Academic Email',
                        value: STUDENT_PROFILE.uiEmail,
                        href: `mailto:${STUDENT_PROFILE.uiEmail}`,
                        icon: <Mail className="w-5 h-5" />,
                      },
                      {
                        label: 'Instagram Official',
                        value: STUDENT_PROFILE.instagram,
                        href: `https://instagram.com/${STUDENT_PROFILE.instagram}`,
                        icon: <Instagram className="w-5 h-5" />,
                      },
                      {
                        label: 'Phone / WhatsApp',
                        value: STUDENT_PROFILE.phone,
                        href: `https://wa.me/628568034305`,
                        icon: <Phone className="w-5 h-5" />,
                      },
                    ].map((contact) => (
                      <div
                        key={contact.value}
                        className="flex items-center justify-between gap-3 p-3.5 sm:px-5 rounded-full bg-[#f0ebe3]/65 dark:bg-[#181e26] border-2 border-[#111111]/80 dark:border-zinc-500 hover:border-[#29A587] transition-all"
                      >
                        <a
                          href={contact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3.5 min-w-0 flex-1"
                        >
                          <span className="w-10 h-10 rounded-full bg-[#111111] dark:bg-[#29A587] text-white flex items-center justify-center shrink-0">
                            {contact.icon}
                          </span>
                          <div className="truncate">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#29A587]">
                              {contact.label}
                            </p>
                            <p className="font-bold text-sm sm:text-base text-[#111111] dark:text-white truncate">
                              {contact.value}
                            </p>
                          </div>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopy(contact.value, contact.value)}
                          aria-label={`Copy ${contact.value}`}
                          className="px-3.5 py-2 rounded-full bg-white dark:bg-[#222a35] border border-black/20 dark:border-white/20 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white transition-colors shrink-0"
                        >
                          {copiedField === contact.value ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#29A587]" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Quick Message Form */}
                  <form
                    onSubmit={handleContactSubmit}
                    className="pt-5 border-t border-black/10 dark:border-white/10 space-y-4"
                  >
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#111111] dark:text-white">
                      KIRIM PESAN DISKUSI / KOLABORASI PROYEK
                    </p>
                    {contactError && (
                      <p role="alert" className="text-xs font-bold text-red-600 dark:text-red-400">
                        {contactError}
                      </p>
                    )}
                    {contactSubmitted ? (
                      <div className="p-4 rounded-2xl bg-[#29A587]/15 border-2 border-[#29A587] text-sm font-bold text-[#111111] dark:text-white flex items-center justify-between">
                        <span>
                          Terima kasih, <strong>{contactForm.name}</strong>! Pesan kolaborasi Anda
                          untuk Humaidah telah tercatat.
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setContactSubmitted(false);
                            setContactForm({
                              name: '',
                              email: '',
                              topic: 'Kolaborasi Riset / Proyek Farmasi',
                              message: '',
                            });
                          }}
                          className="text-xs underline ml-3 shrink-0"
                        >
                          Kirim Lagi
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="block text-[11px] font-extrabold uppercase tracking-wider mb-1"
                            >
                              Nama Anda
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              value={contactForm.name}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, name: e.target.value })
                              }
                              placeholder="Nama lengkap / Instansi"
                              className="w-full px-4 py-2.5 rounded-full bg-[#f0ebe3]/60 dark:bg-[#181e26] border-2 border-[#111111] dark:border-zinc-600 text-sm font-semibold focus:outline-none focus:border-[#29A587]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="contact-email"
                              className="block text-[11px] font-extrabold uppercase tracking-wider mb-1"
                            >
                              Email Anda
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              value={contactForm.email}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, email: e.target.value })
                              }
                              placeholder="nama@instansi.ac.id"
                              className="w-full px-4 py-2.5 rounded-full bg-[#f0ebe3]/60 dark:bg-[#181e26] border-2 border-[#111111] dark:border-zinc-600 text-sm font-semibold focus:outline-none focus:border-[#29A587]"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="contact-message"
                            className="block text-[11px] font-extrabold uppercase tracking-wider mb-1"
                          >
                            Pesan Kolaborasi
                          </label>
                          <textarea
                            id="contact-message"
                            rows={2}
                            value={contactForm.message}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, message: e.target.value })
                            }
                            placeholder="Tulis ajakan riset formulasi obat, molecular docking, atau pengabdian masyarakat..."
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#f0ebe3]/60 dark:bg-[#181e26] border-2 border-[#111111] dark:border-zinc-600 text-sm font-semibold focus:outline-none focus:border-[#29A587]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-7 py-3.5 rounded-full bg-[#29A587] text-white text-xs font-extrabold uppercase tracking-widest luique-pill-shadow"
                        >
                          KIRIM PESAN SEKARANG
                        </button>
                      </>
                    )}
                  </form>
                </div>

                {/* Right Column: Slide 6 / Last Screenshot Transparent Cutout Showcase */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  <div className="relative w-full max-w-md flex flex-col items-center">
                    <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#29A587]/20 border-2 border-[#29A587] absolute top-10 z-0" />
                    <img
                      src={STUDENT_PROFILE.heroImage}
                      alt="Humaidah — Let's connect with me!"
                      referrerPolicy="no-referrer"
                      className="relative z-10 w-full max-h-[460px] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.2)]"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="mt-12 border-t border-black/10 dark:border-white/10 py-10 px-5 sm:px-8">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-[#111111] dark:text-white font-extrabold uppercase">
              {STUDENT_PROFILE.name}
            </span>
            <span>·</span>
            <span>{STUDENT_PROFILE.faculty} Universitas Indonesia</span>
            <span>·</span>
            <span className="font-mono-num">NPM {STUDENT_PROFILE.npm}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{STUDENT_PROFILE.uiEmail}</span>
            <span>·</span>
            <span className="font-mono-num">{STUDENT_PROFILE.phone}</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuickSearchModal
        isOpen={searchModalOpen}
        searchQuery={quickSearchQuery}
        onSearchChange={setQuickSearchQuery}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Full Printable / Interactive Academic CV Modal */}
      {cvModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ringkasan Data CV & Portofolio Humaidah"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCvModalOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-[#f0ebe3] dark:bg-[#181e26] rounded-[24px] luique-pill-shadow p-6 sm:p-8 max-h-[88vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#29A587]" />
                <h3 className="text-xl font-extrabold text-[#111111] dark:text-white">
                  Curriculum Vitae & Data Akademik
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCvModalOpen(false)}
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#222a35] text-xs font-extrabold uppercase border border-black"
              >
                Tutup
              </button>
            </div>

            <div className="bg-white dark:bg-[#222a35] rounded-2xl p-5 space-y-2 text-sm border border-black/10">
              <p>
                <strong>Nama Lengkap:</strong> {STUDENT_PROFILE.name}
              </p>
              <p>
                <strong>Fakultas / Program Studi:</strong> {STUDENT_PROFILE.faculty} /{' '}
                {STUDENT_PROFILE.major} (Universitas Indonesia)
              </p>
              <p className="font-mono-num">
                <strong>NPM:</strong> {STUDENT_PROFILE.npm}
              </p>
              <p className="font-mono-num">
                <strong>No. Telepon / WhatsApp:</strong> {STUDENT_PROFILE.phone}
              </p>
              <p>
                <strong>Email UI:</strong> {STUDENT_PROFILE.uiEmail}
              </p>
              <p>
                <strong>Email Personal:</strong> {STUDENT_PROFILE.personalEmail}
              </p>
              <p>
                <strong>Instagram:</strong> @{STUDENT_PROFILE.instagram}
              </p>
            </div>

            <div className="bg-white dark:bg-[#222a35] rounded-2xl p-5 space-y-2 text-sm border border-black/10">
              <h4 className="font-extrabold uppercase text-xs tracking-widest text-[#29A587]">
                Ringkasan Riset & Proyek Utama (Sesuai PDF)
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <li>
                  • <strong>Education & Impact Lead — NutriVita (2026 - Ongoing):</strong> Finalis
                  Nutrifood Research Center (NRC) Student Bootcamp 2026. Intervensi kesehatan
                  preventif berbasis data & gamifikasi di TBM.
                </li>
                <li>
                  • <strong>Quality Controller — Smile Check UI (2026):</strong> Proyek IPE-05
                  Rumpun Ilmu Kesehatan UI bekerja sama dengan Klinik Satelit Makara UI Depok (
                  <a
                    href="https://bit.ly/E-BOOKSMILE-CHECKUI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#29A587] underline inline-flex items-center gap-1"
                  >
                    bit.ly/E-BOOKSMILE-CHECKUI <ExternalLink className="w-3 h-3" />
                  </a>
                  ).
                </li>
                <li>
                  • <strong>Business Model Strategist — MOSGRU (2025 - 2026):</strong> Formulasi
                  Red Rice Hydro-Boost Cream (<em>Oryza nivara L.</em> + Ceramides) dengan struktur
                  anggaran Rp 24.000.000 untuk panelis Martha Tilaar Group.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
