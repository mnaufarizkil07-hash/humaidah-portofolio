import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { searchPortfolioContent, SearchResultItem } from '../utils/portfolioData';

interface QuickSearchModalProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
}

const SUGGESTED_KEYWORDS = [
  'Molecular Docking',
  'NutriVita',
  'Smile Check UI',
  'MOSGRU',
  'Rp 24.000.000',
  'ImageJ',
  'Ceramide',
  'Klinik Satelit',
  "Al-Ma'tuq",
];

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  searchQuery,
  onSearchChange,
  onClose,
  onSelectResult,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = searchPortfolioContent(searchQuery);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Portfolio Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-[#222a35] rounded-2xl luique-pill-shadow overflow-hidden">
        <div className="p-4 sm:p-5 border-b-2 border-[#111111] dark:border-zinc-700 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#29A587] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari proyek, keahlian, riset (contoh: MOSGRU, Docking, Smile Check, ImageJ)..."
            aria-label="Search portfolio data"
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#111111] dark:text-white placeholder:text-zinc-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="text-xs font-bold uppercase px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Quick Search"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f0ebe3] dark:bg-zinc-800 text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 bg-[#f0ebe3]/50 dark:bg-[#181e26]/50 border-b border-black/10 dark:border-white/10">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#29A587] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Kata Kunci Cepat (Sesuai Data PDF)
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_KEYWORDS.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => onSearchChange(kw)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors border ${
                  searchQuery.toLowerCase() === kw.toLowerCase()
                    ? 'bg-[#29A587] text-white border-[#111111]'
                    : 'bg-white dark:bg-[#222a35] text-[#111111] dark:text-zinc-200 border-[#111111]/30 dark:border-zinc-600 hover:border-[#29A587]'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-4 sm:p-5 space-y-3">
          {!searchQuery.trim() ? (
            <div className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
              Ketik kata kunci di atas atau klik salah satu topik untuk mencari data proyek,
              pendidikan, skill, maupun struktur biaya riset Humaidah secara instan.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
              Tidak ditemukan hasil untuk <strong className="text-[#111111] dark:text-white">"{searchQuery}"</strong>. Coba kata kunci seperti <em>NutriVita</em>, <em>MOSGRU</em>, atau <em>Farmasi</em>.
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectResult(item)}
                className="w-full text-left p-4 rounded-xl bg-[#f0ebe3]/60 dark:bg-[#181e26]/80 hover:bg-[#29A587]/10 border border-black/10 dark:border-white/10 hover:border-[#29A587] transition-all flex items-start justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#29A587]">
                    <span>{item.type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
                      {item.subtitle}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-[#111111] dark:text-white group-hover:text-[#29A587] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2">
                    {item.matchSnippet}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#29A587] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
