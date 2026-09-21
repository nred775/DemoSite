import React from 'react';
import { Droplets, MapPin, Phone, Mail, Shield, Sparkles, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenWalkthrough: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWalkthrough }) => {
  return (
    <footer className="bg-[#12231A] text-[#D8E3DC] pt-16 pb-12 border-t border-[#1F382B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#244233]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#224534] text-[#A3E6BA] flex items-center justify-center">
                <Droplets className="w-5 h-5 text-[#A3E6BA]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Lakeshore Property Care
                </span>
                <span className="text-xs tracking-wider uppercase font-semibold text-[#8DAE9A]">
                  Your property, looking its best.
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A8BEB1] leading-relaxed max-w-sm">
              Michigan lakeshore exterior restoration specializing in calibrated pressure washing, 0-PPM pure water window detailing, gutter clearing, and deck brightening.
            </p>

            <div className="p-4 rounded-xl bg-[#183124] border border-[#274B39] text-xs text-[#C6D8CE] space-y-1.5">
              <div className="flex items-center gap-2 text-white font-medium">
                <Sparkles className="w-4 h-4 text-[#A3E6BA]" />
                <span>Portfolio Demonstration Project</span>
              </div>
              <p className="text-[#A2B9AC] text-[11px] leading-normal">
                Designed & built by freelance web developer <strong>Noah Redman</strong>. Demonstrates end-to-end small business website architecture with instant browser-local CRM lead management.
              </p>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pressure & Soft Washing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pure Water Window Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Gutter & Downspout Flush
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Deck & Patio Restoration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quote')}
                  className="text-[#A3E6BA] hover:text-white font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Request Free Estimate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Work (Gallery)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Company
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-[#A3E6BA] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Demo Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWalkthrough}
                  className="text-xs text-[#8DAE9A] hover:text-white cursor-pointer block mt-1"
                >
                  How to test this demo
                </button>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A3E6BA]" />
              <span>Michigan Service Area</span>
            </h4>
            <p className="text-xs text-[#9BB3A5] mb-3 leading-relaxed">
              Serving West Michigan shoreline and inland communities:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-[#D8E3DC]">
              {['Holland', 'Grand Rapids', 'Muskegon', 'Grand Haven', 'Saugatuck', 'Spring Lake', 'Traverse City', 'Kalamazoo'].map((city) => (
                <span
                  key={city}
                  className="px-2 py-0.5 rounded bg-[#1C3728] border border-[#2B523D]"
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#7B9585] mt-4">
              Fictional business demonstration • Operating in browser sandbox
            </p>
          </div>
        </div>

        {/* Bottom Credits & Disclosures */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7F998A]">
          <p>
            © {new Date().getFullYear()} Lakeshore Property Care. Concept and code by <strong>Noah Redman</strong>.
          </p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[#9BB3A5]">
              <Shield className="w-3.5 h-3.5 text-[#537A67]" />
              <span>Demonstration Only • No Real Client Information Collected</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
