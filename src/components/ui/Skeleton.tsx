interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`flex items-center justify-center py-32 ${className}`}>
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: 'var(--accent-soft)',
          }}
        />
        <div
          className="absolute inset-2 rounded-full animate-pulse"
          style={{
            backgroundColor: 'var(--accent)',
          }}
        />
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-section px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-6">
        <div
          className="h-8 w-48 rounded-lg animate-pulse"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        />
        <div className="space-y-3">
          <div
            className="h-4 w-full rounded animate-pulse"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          />
          <div
            className="h-4 w-3/4 rounded animate-pulse"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          />
          <div
            className="h-4 w-1/2 rounded animate-pulse"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          />
        </div>
      </div>
    </div>
  );
}
