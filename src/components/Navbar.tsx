import React, { useState } from 'react';
import { Menu, X, Droplets, LayoutDashboard, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  requestCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  requestCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Our Work', page: 'work' },
    { label: 'About', page: 'about' },
  ];

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E0D6] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163024] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-[#163024] text-[#A3E6BA] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5 text-[#A3E6BA]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#163024] block leading-none">
                Lakeshore
              </span>
              <span className="text-[11px] tracking-wider uppercase font-semibold text-[#537A67] block mt-0.5">
                Property Care • MI
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#163024] bg-[#E8EFE9] font-semibold'
                      : 'text-[#44524A] hover:text-[#163024] hover:bg-[#F2ECE3]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3">
            <button
              onClick={() => handleNav('dashboard')}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                currentPage === 'dashboard'
                  ? 'bg-[#163024] text-white border-[#163024]'
                  : 'bg-white text-[#2C4839] border-[#D9D0C5] hover:border-[#163024] hover:bg-[#F9F6F0]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#537A67]" />
              <span>CRM Dashboard</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#E8EFE9] text-[#163024] text-[10px] font-bold">
                {requestCount}
              </span>
            </button>

            <button
              onClick={() => handleNav('quote')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer ${
                currentPage === 'quote'
                  ? 'bg-[#0E2018] text-white'
                  : 'bg-[#163024] hover:bg-[#1C3D2E] text-white'
              }`}
            >
              <span>Request Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNav('quote')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#163024] text-white"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#163024] hover:bg-[#EAE4DC] transition-colors focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF7F2] border-b border-[#E7E0D6] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNav(link.page)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                currentPage === link.page
                  ? 'bg-[#E8EFE9] text-[#163024] font-bold'
                  : 'text-[#3E4D45] hover:bg-[#F2ECE3]'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-[#E7E0D6] space-y-2">
            <button
              onClick={() => handleNav('dashboard')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-[#D9D0C5] text-[#163024] font-semibold text-sm"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#537A67]" />
                <span>Demo Business Dashboard</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E8EFE9] text-[#163024] text-xs font-bold">
                {requestCount} leads
              </span>
            </button>

            <button
              onClick={() => handleNav('quote')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#163024] text-white font-semibold text-sm shadow-xs"
            >
              <span>Request a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
