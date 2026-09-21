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

export default function App() {
  // Page state
  const [currentPage, setCurrentPage] = useState<PageView>('home');
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

    // Check URL hash for direct routing e.g. #dashboard or #quote
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'work', 'about', 'quote', 'dashboard'].includes(hash)) {
        setCurrentPage(hash as PageView);
      }
    };

    // Check initial pathname or hash
    const path = window.location.pathname.toLowerCase();
    if (path.includes('demo-dashboard') || path.includes('dashboard')) {
      setCurrentPage('dashboard');
    } else if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize hash when navigation occurs
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigating to quote with a specific service chosen
  const handleSelectServiceForQuote = (serviceType: ServiceType) => {
    setPreselectedService(serviceType);
    setCurrentPage('quote');
    window.location.hash = 'quote';
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
