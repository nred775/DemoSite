import React, { useState } from 'react';
import { Sparkles, LayoutDashboard, HelpCircle, X } from 'lucide-react';
import { PageView } from '../types';

interface DemoDisclaimerBannerProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenWalkthrough: () => void;
  requestCount: number;
}

export const DemoDisclaimerBanner: React.FC<DemoDisclaimerBannerProps> = ({
  currentPage,
  onNavigate,
  onOpenWalkthrough,
  requestCount,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in fade-in">
        <button
          onClick={() => setIsDismissed(false)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12231A]/95 text-[#E8EFE9] text-xs font-medium shadow-lg border border-[#2B523D] hover:bg-[#1C3728] transition-all cursor-pointer backdrop-blur-xs"
          title="Show Portfolio Demo Notice"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A3E6BA]" />
          <span>Demo Info</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Portfolio Demonstration Notice"
      className="bg-[#12231A] text-[#E8EFE9] text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#234534] relative z-50 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2C523F] text-[#A3E6BA] tracking-wider uppercase shrink-0">
            Portfolio Demo
          </span>
          <p className="text-[#BFD4C8] text-[11px] sm:text-xs truncate sm:overflow-visible">
            <span className="font-semibold text-white">Concept by Noah Redman:</span>{' '}
            <span className="hidden sm:inline">
              Realistic small-business website demonstration paired with a browser-local CRM lead management dashboard.
            </span>
            <span className="inline sm:hidden">Realistic small-business demo site.</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenWalkthrough}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1D3B2C] hover:bg-[#274F3B] text-[#DCE7DF] transition-colors text-xs font-medium cursor-pointer"
            title="How to test the full live workflow"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#A3E6BA]" />
            <span>Interactive Tour</span>
          </button>

          {currentPage !== 'dashboard' ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#A3E6BA] hover:bg-[#B7F0CC] text-[#0F261C] font-bold transition-all text-xs cursor-pointer shadow-xs"
              title="View Owner / Admin Lead Management Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#0F261C]" />
              <span>Owner CRM</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#0F261C] text-[#A3E6BA] text-[10px] font-extrabold">
                {requestCount}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1D3B2C] hover:bg-[#274F3B] text-[#E2EBE5] font-medium transition-colors text-xs cursor-pointer"
            >
              <span>← View Website</span>
            </button>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-md text-[#8EA697] hover:text-white hover:bg-[#1D3B2C] transition-colors cursor-pointer"
            aria-label="Dismiss banner"
            title="Minimize banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
