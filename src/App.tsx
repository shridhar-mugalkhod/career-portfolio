import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SectionSkeleton } from '@/components/ui/Skeleton';
import { ToastContainer } from '@/components/ui/Toast';
import { portfolioConfig } from '@/config/portfolio.config';

// Lazy-loaded sections
const Hero = lazy(() => import('@/components/sections/Hero'));
const About = lazy(() => import('@/components/sections/About'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const Education = lazy(() => import('@/components/sections/Education'));
const Contact = lazy(() => import('@/components/sections/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function HomePage() {
  return (
    <>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><Hero /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><About /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><Experience /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><Skills /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><Projects /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><Testimonials /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><Education /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionSkeleton />}><Contact /></Suspense></ErrorBoundary>
    </>
  );
}

function HireMeCTA() {
  if (!portfolioConfig.personal.openToWork) return null;

  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-[90] md:hidden flex items-center gap-2 px-5 py-3 rounded-full text-small font-medium shadow-lg"
      style={{
        backgroundColor: 'var(--card-bg)',
        color: 'var(--accent)',
        border: '1px solid var(--accent-glow)',
        backdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      Hire Me
    </a>
  );
}

export default function App() {
  return (
    <HashRouter>
      <CustomCursor />
      <ProgressBar />
      <Navbar />
      <CommandPalette />
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<SectionSkeleton />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
      <HireMeCTA />
      <ToastContainer />
    </HashRouter>
  );
}
