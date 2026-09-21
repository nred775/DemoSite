import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Send, LayoutDashboard, Sliders } from 'lucide-react';
import { PageView } from '../types';

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartWorkflow: () => void;
}

export const WalkthroughModal: React.FC<WalkthroughModalProps> = ({
  isOpen,
  onClose,
  onStartWorkflow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E4DCD3] overflow-hidden text-[#1E2823]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#163024] text-white p-6 sm:p-8 flex items-start justify-between border-b border-[#234534]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2C523F] text-[#A3E6BA] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Portfolio Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F8F5]">
              How to Explore This Demo
            </h2>
            <p className="text-[#C4D5CB] text-sm mt-1 max-w-lg">
              Built by freelance developer Noah Redman to showcase a dual-product system: a polished consumer-facing website coupled with an instant lead management dashboard.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#C4D5CB] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close walkthrough dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Steps */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-[#E9E2D8] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#E8EFE9] text-[#163024] flex items-center justify-center shrink-0 font-bold font-serif text-lg">
              1
            </div>
            <div>
              <h3 className="font-semibold text-[#163024] text-base flex items-center gap-2">
                <span>Explore the 5-Page Website</span>
              </h3>
              <p className="text-sm text-[#57655D] mt-1">
                Browse the Homepage, full Services breakdown, Our Work portfolio gallery, and About company page. Notice responsive layouts, generous spacing, and service-specific quote buttons.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-[#E9E2D8] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#E8EFE9] text-[#163024] flex items-center justify-center shrink-0 font-bold font-serif text-lg">
              2
            </div>
            <div>
              <h3 className="font-semibold text-[#163024] text-base flex items-center gap-2">
                <Send className="w-4 h-4 text-[#537A67]" />
                <span>Submit a Fictional Quote Request</span>
              </h3>
              <p className="text-sm text-[#57655D] mt-1">
                Use the 4-step wizard to submit a project inquiry. Use your own test notes or click <em>&ldquo;Fill with Fictional Demo Data&rdquo;</em> for immediate testing. You will get a generated reference number (e.g. <code>LPC-8492</code>).
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-[#E9E2D8] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#E8EFE9] text-[#163024] flex items-center justify-center shrink-0 font-bold font-serif text-lg">
              3
            </div>
            <div>
              <h3 className="font-semibold text-[#163024] text-base flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#537A67]" />
                <span>Open the Business Demo Dashboard</span>
              </h3>
              <p className="text-sm text-[#57655D] mt-1">
                Immediately open <strong>Demo Dashboard</strong>. Your new submission appears at the top in real time, preserved in your browser’s localStorage. Total metrics update dynamically.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-[#E9E2D8] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#E8EFE9] text-[#163024] flex items-center justify-center shrink-0 font-bold font-serif text-lg">
              4
            </div>
            <div>
              <h3 className="font-semibold text-[#163024] text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#537A67]" />
                <span>Manage, Organize, and Draft Follow-Ups</span>
              </h3>
              <p className="text-sm text-[#57655D] mt-1">
                Open inquiry details to update status (New, Quoted, In Progress, Completed), record follow-up dates, edit internal technician notes, generate customer email drafts, export to CSV, or trigger the AI Job Brief.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#F3EFE9] border-t border-[#E4DCD3] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6B7971] text-center sm:text-left">
            No real emails sent • No accounts needed • Stored locally in your browser
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#D5CCC1] text-[#3B4740] hover:bg-white text-sm font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartWorkflow();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#163024] hover:bg-[#10241B] text-white text-sm font-semibold shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <span>Try the Live Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
