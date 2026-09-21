import React, { useState, useEffect } from 'react';
import { PageView, ServiceType, QuoteRequest } from './types';
import { getStoredRequests } from './utils/storage';
import { DemoDisclaimerBanner } from './components/DemoDisclaimerBanner';
import { WalkthroughModal } from './components/WalkthroughModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { AboutPage } from './pages/AboutPage';
import { QuotePage } from './pages/QuotePage';
import { DashboardPage } from './pages/DashboardPage';

function getPageFromLocation(): PageView {
  if (typeof window === 'undefined') return 'home';

  // 1. Check pathname first (Vercel SPA direct visits)
  const pathname = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  if (pathname === 'services') return 'services';
  if (pathname === 'our-work' || pathname === 'work') return 'work';
  if (pathname === 'about') return 'about';
  if (pathname === 'quote') return 'quote';
  if (pathname === 'demo-dashboard' || pathname === 'dashboard') return 'dashboard';

  // 2. Check hash fallback
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'services') return 'services';
  if (hash === 'our-work' || hash === 'work') return 'work';
  if (hash === 'about') return 'about';
  if (hash === 'quote') return 'quote';
  if (hash === 'demo-dashboard' || hash === 'dashboard') return 'dashboard';

  return 'home';
}

function getPathForPage(page: PageView): string {
  switch (page) {
    case 'home':
      return '/';
    case 'services':
      return '/services';
    case 'work':
      return '/our-work';
    case 'about':
      return '/about';
    case 'quote':
      return '/quote';
    case 'dashboard':
      return '/demo-dashboard';
    default:
      return '/';
  }
}

export default function App() {
  // Page state initialized from URL
  const [currentPage, setCurrentPage] = useState<PageView>(getPageFromLocation);
  const [preselectedService, setPreselectedService] = useState<ServiceType | null>(null);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  // Requests state for badge counts and live synchronization
  const [requests, setRequests] = useState<QuoteRequest[]>([]);

  // Load requests on initial mount
  const refreshRequests = () => {
    const loaded = getStoredRequests();
    setRequests(loaded);
  };

  useEffect(() => {
    refreshRequests();

    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Synchronize history state and view when navigation occurs
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    const targetPath = getPathForPage(page);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigating to quote with a specific service chosen
  const handleSelectServiceForQuote = (serviceType: ServiceType) => {
    setPreselectedService(serviceType);
    setCurrentPage('quote');
    const targetPath = getPathForPage('quote');
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'quote' }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmittedSuccess = (newRequest: QuoteRequest) => {
    refreshRequests();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E2823] flex flex-col font-sans selection:bg-[#A3E6BA] selection:text-[#0E2018]">
      {/* Top Disclaimer Banner */}
      <DemoDisclaimerBanner
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        requestCount={requests.length}
      />

      {/* Main Brand Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        requestCount={requests.length}
      />

      {/* Main Page Stage */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
            onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}

        {currentPage === 'work' && (
          <OurWorkPage
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
          />
        )}

        {currentPage === 'quote' && (
          <QuotePage
            preselectedService={preselectedService}
            onNavigate={handleNavigate}
            onSubmittedSuccess={handleSubmittedSuccess}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onRefreshRequests={refreshRequests}
            requests={requests}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
      />

      {/* Guided Walkthrough Modal */}
      <WalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onStartWorkflow={() => {
          handleSelectServiceForQuote('Pressure Washing');
        }}
      />
    </div>
  );
}
