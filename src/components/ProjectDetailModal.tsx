import React, { useState } from 'react';
import { PortfolioProject } from '../utils/portfolioData';
import { X, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) return null;

  const allImages = [project.image, ...project.secondaryImages];
  const activeImg = selectedImage && allImages.includes(selectedImage) ? selectedImage : project.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case Study: ${project.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl bg-[#f0ebe3] dark:bg-[#181e26] rounded-[24px] luique-pill-shadow max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-black/15 dark:border-white/15">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
              {project.category} · {project.period}
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] dark:text-white mt-1">
              {project.title}
            </h3>
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 mt-1">
              Role: <span className="text-[#111111] dark:text-white">{project.role}</span> —{' '}
              {project.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Case Study Modal"
            className="w-10 h-10 rounded-full luique-circle-btn bg-white dark:bg-[#222a35] flex items-center justify-center text-[#111111] dark:text-white hover:bg-[#29A587] hover:text-white shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Showcase */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white dark:bg-[#222a35] rounded-2xl p-3 border border-black/10 dark:border-white/10">
            <img
              src={activeImg}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[380px] object-contain rounded-xl bg-[#f0ebe3]/50 dark:bg-zinc-900"
            />
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-1">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    aria-label={`View slide image ${idx + 1}`}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImg === imgUrl
                        ? 'border-[#29A587] scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} visual ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Metrics & External Link */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-[#222a35] rounded-2xl p-5 border border-black/10 dark:border-white/10 space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587]">
                KEY METRICS (FROM PDF)
              </p>
              {project.keyMetrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between py-2 border-b border-black/10 dark:border-white/10 last:border-0"
                >
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    {m.label}
                  </span>
                  <span className="font-mono-num text-sm font-extrabold text-[#111111] dark:text-white">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-[#222a35] rounded-2xl p-5 border border-black/10 dark:border-white/10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#29A587] mb-1">
                CORE STATEMENT
              </p>
              <p className="font-script text-2xl font-bold text-[#111111] dark:text-white">
                “{project.quote}”
              </p>
            </div>

            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-full bg-[#29A587] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 luique-pill-shadow"
              >
                <span>Buka E-Booklet Resmi</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Identification of Problems -> Tactical Solution */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#222a35] rounded-2xl p-6 border border-black/10 dark:border-white/10">
            <span className="inline-block px-3 py-1 rounded-full border-2 border-[#111111] dark:border-zinc-300 text-xs font-extrabold uppercase tracking-wider mb-3">
              Identification of Problems
            </span>
            <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
              {project.problemIdentification}
            </p>
          </div>

          <div className="bg-white dark:bg-[#222a35] rounded-2xl p-6 border border-black/10 dark:border-white/10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#29A587] text-white border-2 border-[#111111] text-xs font-extrabold uppercase tracking-wider mb-3">
              Tactical Solution
            </span>
            <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
              {project.tacticalSolution}
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-6 space-y-4">
          {project.details.map((sec) => (
            <div
              key={sec.heading}
              className="bg-white dark:bg-[#222a35] rounded-2xl p-6 border border-black/10 dark:border-white/10"
            >
              <h4 className="font-extrabold text-base text-[#111111] dark:text-white mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#29A587]" />
                {sec.heading}
              </h4>
              <ul className="space-y-2">
                {sec.items.map((itemText) => (
                  <li
                    key={itemText}
                    className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#29A587] shrink-0 mt-0.5" />
                    <span>{itemText}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
