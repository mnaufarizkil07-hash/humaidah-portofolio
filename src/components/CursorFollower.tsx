import React, { useEffect, useRef, useState } from 'react';

export const CursorFollower: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let targetX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    let targetY = typeof window !== 'undefined' ? window.innerHeight / 2 : 350;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const interactive = targetEl.closest(
          'button, a, input, textarea, select, [role="button"], [data-cursor-hover="true"]'
        );
        setIsHoveringInteractive(Boolean(interactive));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      data-testid="cursor-follower"
      data-hover-state={isHoveringInteractive ? 'interactive' : 'default'}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-[width,height,background-color,border-color,border-width,transform] duration-300 ease-out ${
        isHoveringInteractive
          ? 'w-[84px] h-[84px] bg-transparent border-[1.5px] border-[#111111]/55 dark:border-white/65'
          : isClicking
          ? 'w-6 h-6 bg-[#29A587]/45 border-[1.5px] border-[#29A587]'
          : 'w-[30px] h-[30px] bg-[#111111]/20 dark:bg-white/25 border-0'
      }`}
      style={{
        transform: 'translate3d(500px, 350px, 0) translate(-50%, -50%)',
      }}
    />
  );
};
