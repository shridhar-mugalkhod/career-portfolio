import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ProgressBar() {
  const { elementRef } = useScrollProgress();

  return (
    <div className="progress-bar fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent">
      <div
        ref={elementRef}
        className="h-full origin-left"
        style={{
          backgroundColor: 'var(--accent)',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
