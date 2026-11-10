import React, { useState } from 'react';
import {
  MOSGRU_COST_STRUCTURE,
  NUTRIVITA_SURVEY_PREFERENCES,
  NUTRIVITA_BEHAVIOR_TRIGGERS,
  SKILLS_DATA,
  calculateScaledMosgruBudget,
} from '../utils/portfolioData';
import { DotGridPattern } from './DotGridPattern';
import { BarChart3, PieChart, Sliders, TrendingUp } from 'lucide-react';

export const DataVisualizationsSection: React.FC = () => {
  const [activeChartTab, setActiveChartTab] = useState<'nutrivita' | 'mosgru' | 'competence'>(
    'nutrivita'
  );
  const [batchScale, setBatchScale] = useState<number>(1);
  const [hoveredCostId, setHoveredCostId] = useState<string | null>(null);
  const [hoveredTriggerIdx, setHoveredTriggerIdx] = useState<number | null>(null);

  const scaledBudget = calculateScaledMosgruBudget(batchScale);

  // Build SVG Donut segments for MOSGRU cost structure
  let cumulativePercent = 0;
  const mosgruDonutSegments = MOSGRU_COST_STRUCTURE.map((item) => {
    const startPercent = cumulativePercent;
    cumulativePercent += item.percentage;
    return {
      ...item,
      startPercent,
      endPercent: cumulativePercent,
    };
  });

  // Build SVG Donut segments for NutriVita behavior triggers
  let triggerCumulative = 0;
  const triggerDonutSegments = NUTRIVITA_BEHAVIOR_TRIGGERS.map((item, idx) => {
    const start = triggerCumulative;
    triggerCumulative += item.percentage;
    return {
      ...item,
      idx,
      start,
    };
  });

  return (
    <section
      id="analytics-section"
      aria-labelledby="analytics-heading"
      className="scroll-mt-24 py-20 sm:py-28 px-5 sm:px-8 max-w-[1320px] mx-auto relative"
    >
      {/* Luique Centered Section Header */}
      <div className="text-center mb-12">
        <h2
          id="analytics-heading"
          className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-[#111111] dark:text-white"
        >
          DATA ANALYTICS
        </h2>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
            RESEARCH
          </span>
          <span className="font-script text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
            Visualizations
          </span>
        </div>
      </div>

      {/* Interactive Chart View Selector Tabs (Exact Luique Portfolio Tab Style) */}
      <div
        role="tablist"
        aria-label="Research Data Visualization Tabs"
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12"
      >
        <button
          role="tab"
          aria-selected={activeChartTab === 'nutrivita'}
          type="button"
          onClick={() => setActiveChartTab('nutrivita')}
          className={`pb-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-colors relative flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeChartTab === 'nutrivita'
              ? 'text-[#111111] dark:text-white'
              : 'text-[#111111]/60 dark:text-zinc-400 hover:text-[#29A587]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#29A587]" />
          <span>NUTRIVITA SURVEY DATA (N=30)</span>
          {activeChartTab === 'nutrivita' && (
            <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#29A587] rounded-full" />
          )}
        </button>

        <button
          role="tab"
          aria-selected={activeChartTab === 'mosgru'}
          type="button"
          onClick={() => setActiveChartTab('mosgru')}
          className={`pb-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-colors relative flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeChartTab === 'mosgru'
              ? 'text-[#111111] dark:text-white'
              : 'text-[#111111]/60 dark:text-zinc-400 hover:text-[#29A587]'
          }`}
        >
          <PieChart className="w-4 h-4 text-[#29A587]" />
          <span>MOSGRU COST STRUCTURE (RP 24M)</span>
          {activeChartTab === 'mosgru' && (
            <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#29A587] rounded-full" />
          )}
        </button>

        <button
          role="tab"
          aria-selected={activeChartTab === 'competence'}
          type="button"
          onClick={() => setActiveChartTab('competence')}
          className={`pb-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-colors relative flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeChartTab === 'competence'
              ? 'text-[#111111] dark:text-white'
              : 'text-[#111111]/60 dark:text-zinc-400 hover:text-[#29A587]'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#29A587]" />
          <span>PHARMACY COMPETENCY RADAR</span>
          {activeChartTab === 'competence' && (
            <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#29A587] rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: NUTRIVITA MARKET RESEARCH CHARTS (PDF Page 3) */}
      {activeChartTab === 'nutrivita' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Card: Parent Preferences for Child Health Education (n=30) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#222a35] rounded-[22px] p-7 sm:p-9 relative overflow-hidden border border-black/10 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                  ONLINE MARKET RESEARCH · N = 30 PARENTS
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-white mt-1">
                  Metode Edukasi Kesehatan Paling Menarik Untuk Anak
                </h3>
              </div>
              <span className="font-mono-num text-xs font-bold text-zinc-500 dark:text-zinc-400">
                Source: NutriVita Slide 3
              </span>
            </div>

            <div className="space-y-5 relative z-10">
              {NUTRIVITA_SURVEY_PREFERENCES.map((item) => (
                <div key={item.method} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span className="text-[#111111] dark:text-white">{item.method}</span>
                    <span className="font-mono-num text-[#111111] dark:text-white">
                      {item.responses}/30 ({item.percentage}{' '}
                      <span className="text-[#29A587]">%</span>)
                    </span>
                  </div>
                  <div className="w-full h-3.5 bg-[#f0ebe3] dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.highlight ? 'bg-[#29A587]' : 'bg-[#111111] dark:bg-zinc-300'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-300">
              <span>
                Temuan Utama: <strong className="text-[#29A587]">80% Orang Tua</strong> memilih{' '}
                <strong>Permainan Edukatif</strong> (Pos-to-Pos Ular Tangga, Detektif Label Gizi &
                Puppet).
              </span>
            </div>

            <DotGridPattern
              rows={3}
              cols={4}
              className="absolute bottom-4 right-4 opacity-50"
            />
          </div>

          {/* Right Card: Child Focus & Emotion Triggers (POV Orang Tua, Usia 9-12 Tahun) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#222a35] rounded-[22px] p-7 sm:p-9 relative overflow-hidden border border-black/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                OBSERVASI POV ORANG TUA (USIA 9–12 TAHUN)
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-white mt-1">
                Pemicu Utama Anak Sulit Fokus & Emosi Naik-Turun
              </h3>

              {/* Interactive SVG Donut Chart */}
              <div className="my-6 flex items-center justify-center relative">
                <svg viewBox="0 0 42 42" className="w-48 h-48 -rotate-90">
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#f0ebe3"
                    strokeWidth="4.8"
                  />
                  {triggerDonutSegments.map((seg) => (
                    <circle
                      key={seg.trigger}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth={hoveredTriggerIdx === seg.idx ? '6.2' : '4.8'}
                      strokeDasharray={`${seg.percentage} ${100 - seg.percentage}`}
                      strokeDashoffset={-seg.start}
                      className="transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredTriggerIdx(seg.idx)}
                      onMouseLeave={() => setHoveredTriggerIdx(null)}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-10">
                  <span className="font-mono-num text-xl font-extrabold text-[#111111] dark:text-white">
                    {hoveredTriggerIdx !== null
                      ? `${NUTRIVITA_BEHAVIOR_TRIGGERS[hoveredTriggerIdx].percentage}%`
                      : '40.0%'}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 max-w-[96px] leading-tight mt-0.5">
                    {hoveredTriggerIdx !== null
                      ? NUTRIVITA_BEHAVIOR_TRIGGERS[hoveredTriggerIdx].trigger
                      : 'Keasikan Main Game'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                {NUTRIVITA_BEHAVIOR_TRIGGERS.map((t, idx) => (
                  <button
                    key={t.trigger}
                    type="button"
                    onMouseEnter={() => setHoveredTriggerIdx(idx)}
                    onMouseLeave={() => setHoveredTriggerIdx(null)}
                    onClick={() =>
                      setHoveredTriggerIdx(hoveredTriggerIdx === idx ? null : idx)
                    }
                    className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-start justify-between gap-3 ${
                      hoveredTriggerIdx === idx
                        ? 'bg-[#f0ebe3] dark:bg-zinc-800'
                        : 'hover:bg-[#f0ebe3]/60 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 border border-black"
                        style={{ backgroundColor: t.color }}
                      />
                      <div>
                        <p className="text-xs font-extrabold text-[#111111] dark:text-white">
                          {t.trigger}
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          {t.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono-num text-xs font-extrabold text-[#111111] dark:text-white shrink-0">
                      {t.percentage}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MOSGRU COST STRUCTURE & SIMULATOR (PDF Page 5: Total Rp 24.000.000) */}
      {activeChartTab === 'mosgru' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Donut + Simulator */}
          <div className="lg:col-span-5 bg-white dark:bg-[#222a35] rounded-[22px] p-7 sm:p-9 relative overflow-hidden border border-black/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                MARTHA TILAAR GROUP PANEL PROJECT
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-white mt-1">
                MOSGRU R&D & Prototyping Cost Structure
              </h3>

              {/* SVG Donut */}
              <div className="my-6 flex items-center justify-center relative">
                <svg viewBox="0 0 42 42" className="w-52 h-52 -rotate-90">
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#f0ebe3"
                    strokeWidth="6"
                  />
                  {mosgruDonutSegments.map((seg) => (
                    <circle
                      key={seg.id}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth={hoveredCostId === seg.id ? '7.5' : '6'}
                      strokeDasharray={`${seg.percentage} ${100 - seg.percentage}`}
                      strokeDashoffset={-seg.startPercent}
                      className="transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredCostId(seg.id)}
                      onMouseLeave={() => setHoveredCostId(null)}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#29A587]">
                    TOTAL BUDGET ({batchScale}x)
                  </span>
                  <span className="font-mono-num text-lg sm:text-xl font-extrabold text-[#111111] dark:text-white mt-0.5">
                    Rp {scaledBudget.total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Interactive Production Batch Scale Simulator */}
              <div className="p-4 rounded-xl bg-[#f0ebe3]/70 dark:bg-[#181e26] border border-black/10 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold">
                  <span className="flex items-center gap-1.5 text-[#111111] dark:text-white">
                    <Sliders className="w-3.5 h-3.5 text-[#29A587]" />
                    Simulasi Skala Produksi Batch
                  </span>
                  <span className="font-mono-num text-[#29A587]">
                    {batchScale}x Batch ({batchScale === 1 ? 'PDF Baseline' : 'Scaled'})
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={batchScale}
                  aria-label="Production Batch Scale Multiplier"
                  onChange={(e) => setBatchScale(Number(e.target.value))}
                  className="w-full accent-[#29A587] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono-num text-zinc-500">
                  <span>1x (Rp 24 Jt)</span>
                  <span>2x (Rp 34 Jt)</span>
                  <span>3x (Rp 44 Jt)</span>
                  <span>4x (Rp 54 Jt)</span>
                  <span>5x (Rp 64 Jt)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Cost Allocation Breakdown Table/Bars */}
          <div className="lg:col-span-7 bg-white dark:bg-[#222a35] rounded-[22px] p-7 sm:p-9 relative overflow-hidden border border-black/10 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                  RED RICE HYDRO-BOOST CREAM (ORYZA NIVARA L. + CERAMIDES)
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-white mt-1">
                  Alokasi Anggaran Riset, Formulasi & Komersialisasi
                </h3>
              </div>
              {batchScale !== 1 && (
                <button
                  type="button"
                  onClick={() => setBatchScale(1)}
                  className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-[#29A587] text-white"
                >
                  Reset ke 1x (Rp 24.000.000)
                </button>
              )}
            </div>

            <div className="space-y-4 relative z-10">
              {MOSGRU_COST_STRUCTURE.map((cost) => {
                const scaledItem = scaledBudget.items.find((i) => i.id === cost.id)!;
                const isHovered = hoveredCostId === cost.id;
                return (
                  <div
                    key={cost.id}
                    onMouseEnter={() => setHoveredCostId(cost.id)}
                    onMouseLeave={() => setHoveredCostId(null)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isHovered
                        ? 'bg-[#f0ebe3]/80 dark:bg-zinc-800 border-[#29A587]'
                        : 'bg-[#f0ebe3]/35 dark:bg-[#181e26]/50 border-black/10 dark:border-white/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full border border-black shrink-0"
                          style={{ backgroundColor: cost.color }}
                        />
                        <span className="font-extrabold text-sm text-[#111111] dark:text-white">
                          {cost.category}
                        </span>
                      </div>
                      <div className="font-mono-num text-sm font-extrabold text-[#111111] dark:text-white">
                        Rp {scaledItem.scaledAmount.toLocaleString('id-ID')}{' '}
                        <span className="text-xs text-[#29A587]">({scaledItem.share}%)</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 pl-5">
                      {cost.detail}
                    </p>
                    <div className="mt-2 pl-5">
                      <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${scaledItem.share}%`,
                            backgroundColor: cost.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <DotGridPattern
              rows={3}
              cols={4}
              className="absolute bottom-4 right-4 opacity-40"
            />
          </div>
        </div>
      )}

      {/* TAB 3: PHARMACY & INTERPROFESSIONAL COMPETENCY MATRIX */}
      {activeChartTab === 'competence' && (
        <div className="bg-white dark:bg-[#222a35] rounded-[22px] p-7 sm:p-10 relative overflow-hidden border border-black/10 dark:border-white/10">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
              SKILLS & TECHNICAL COMPETENCE BENCHMARK (PDF SLIDE 2)
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] dark:text-white mt-1">
              Distribusi Kompetensi Akademik & Praktis Humaidah
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
              Perbandingan indeks penguasaan 6 Core Skills kefarmasian/kesehatan dan 4 Technical
              Competences berdasarkan portofolio proyek di Fakultas Farmasi UI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {SKILLS_DATA.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#f0ebe3]/45 dark:bg-[#181e26]/70 border border-black/10 dark:border-white/10"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-[#111111] dark:text-white">
                    {item.name}
                  </span>
                  <span className="font-mono-num text-sm font-extrabold text-[#111111] dark:text-white">
                    {item.percentage} <span className="text-[#29A587]">%</span>
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  {item.toolsOrContext}
                </p>
                {/* Exact Luique Skill Bar with Green Circle Thumb */}
                <div className="relative h-4 flex items-center">
                  <div className="w-full h-[2px] bg-black/20 dark:bg-white/20 relative">
                    <div
                      className="h-[2px] bg-[#111111] dark:bg-white"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span
                    className="w-4 h-4 rounded-full bg-[#29A587] border-2 border-[#111111] dark:border-white absolute -translate-x-1/2"
                    style={{ left: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
