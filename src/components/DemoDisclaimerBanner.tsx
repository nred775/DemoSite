import React from 'react';
import { Sparkles, LayoutDashboard, HelpCircle } from 'lucide-react';
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
  return (
    <aside
      aria-label="Portfolio Demonstration Notice"
      className="bg-[#163024] text-[#E8EFE9] text-xs py-2 px-4 border-b border-[#234534] sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2C523F] text-[#A3E6BA] tracking-wide uppercase">
            Portfolio Demo
          </span>
          <p className="text-[#D3DFD7]">
            <strong className="text-white font-medium">Concept by Noah Redman:</strong> Fictional small-business website & working lead dashboard. Data is stored safely in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenWalkthrough}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#203D2E] hover:bg-[#2A4F3C] text-[#E2EBE5] transition-colors text-xs font-medium cursor-pointer"
            title="Learn how to test the full live workflow"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#A3E6BA]" />
            <span>How This Demo Works</span>
          </button>

          {currentPage !== 'dashboard' ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E8EFE9] hover:bg-white text-[#163024] font-semibold transition-colors text-xs cursor-pointer shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#163024]" />
              <span>Demo Dashboard</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#163024] text-[#A3E6BA] text-[10px] font-bold">
                {requestCount}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#203D2E] hover:bg-[#2A4F3C] text-[#E2EBE5] font-medium transition-colors text-xs cursor-pointer"
            >
              <span>← Back to Public Website</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
