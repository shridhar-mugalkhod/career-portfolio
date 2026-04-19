import { useEffect, useRef, useCallback } from 'react';

export function useScrollProgress() {
  const progressRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    progressRef.current = progress;

    if (elementRef.current) {
      elementRef.current.style.transform = `scaleX(${progress})`;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateProgress]);

  return { progressRef, elementRef };
}
