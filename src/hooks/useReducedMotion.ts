import { useState, useEffect, useRef } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    );
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setReduced(mediaQuery.matches || window.innerWidth < 768);
    };

    const handleResize = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(update, 150);
    };

    mediaQuery.addEventListener('change', update);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', update);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return reduced;
}
