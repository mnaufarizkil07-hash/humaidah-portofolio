import React from 'react';

interface DotGridPatternProps {
  rows?: number;
  cols?: number;
  className?: string;
  gap?: string;
}

export const DotGridPattern: React.FC<DotGridPatternProps> = ({
  rows = 4,
  cols = 4,
  className = '',
  gap = 'gap-3.5',
}) => {
  const total = rows * cols;
  return (
    <div
      aria-hidden="true"
      className={`grid pointer-events-none select-none ${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: total }).map((_, idx) => (
        <span
          key={idx}
          className="w-1.5 h-1.5 rounded-full border-[1.5px] border-[#111111]/75 dark:border-zinc-300/70 block"
        />
      ))}
    </div>
  );
};
