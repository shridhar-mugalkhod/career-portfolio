import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  alternate?: boolean;
  divider?: 'wave' | 'diagonal' | 'none';
}

export function SectionWrapper({
  id,
  children,
  className = '',
  alternate = false,
  divider = 'none',
}: SectionWrapperProps) {
  return (
    <>
      {divider === 'wave' && (
        <div className="relative -mb-px">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block w-full h-[40px] md:h-[60px]"
            style={{ color: alternate ? 'var(--bg-secondary)' : 'var(--bg-primary)' }}
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      {divider === 'diagonal' && (
        <div
          className="relative -mb-px h-[40px] md:h-[60px]"
          style={{
            background: alternate ? 'var(--bg-secondary)' : 'var(--bg-primary)',
            clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0 100%)',
          }}
        />
      )}
      <section
        id={id}
        className={`relative py-section px-6 md:px-12 lg:px-20 ${className}`}
        style={{
          backgroundColor: alternate ? 'var(--bg-secondary)' : 'var(--bg-primary)',
        }}
      >
        <div className="mx-auto max-w-6xl">{children}</div>
      </section>
    </>
  );
}
