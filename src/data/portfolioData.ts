export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Pressure Washing' | 'Windows' | 'Gutters' | 'Decks & Patios';
  propertyType: 'Residential' | 'Commercial';
  location: string;
  description: string;
  keyDetails: string[];
  imageUrl: string;
  beforeImageUrl?: string;
  imageAlt: string;
  tag: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'proj-01',
    title: 'Lake Macatawa Craftsman Siding & Walkway Wash',
    category: 'Pressure Washing',
    propertyType: 'Residential',
    location: 'Holland, MI',
    description:
      'Soft wash of two-story white fiber-cement siding and low-pressure rotary restoration of front aggregate walkway and carriage driveway.',
    keyDetails: ['Siding soft-wash below 700 PSI', 'Rotary surface cleaner on aggregate', 'Biodegradable organic surfactant'],
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    beforeImageUrl:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Restored two-story home exterior with pristine siding and driveway',
    tag: 'Soft Wash & Concrete',
  },
  {
    id: 'proj-02',
    title: 'Lakeshore Dune Home Floor-to-Ceiling Windows',
    category: 'Windows',
    propertyType: 'Residential',
    location: 'Saugatuck, MI',
    description:
      'Full interior and exterior cleaning of 28 architectural picture windows overlooking Lake Michigan sand dunes, using 4-stage pure water filtration.',
    keyDetails: ['0 PPM deionized water system', 'Deep track and sill vacuuming', 'Lake sand and sea spray removal'],
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Modern lakefront home with sparkling floor-to-ceiling glass windows',
    tag: 'Pure Water Detailing',
  },
  {
    id: 'proj-03',
    title: 'Historic Heritage Hill Cedar Deck Brightening',
    category: 'Decks & Patios',
    propertyType: 'Residential',
    location: 'Grand Rapids, MI',
    description:
      'Multi-stage wood restoration on weathered western red cedar deck and pergola, conditioning the grain and restoring warm natural tones prior to seal coat.',
    keyDetails: ['Oxygenated bleach wash', 'Citric acid wood neutralizer', 'Splinter-free low pressure rinse'],
    imageUrl:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
    beforeImageUrl:
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Restored cedar deck with warm natural wood tones and patio furniture',
    tag: 'Wood Restoration',
  },
  {
    id: 'proj-04',
    title: 'Dormer Roofline Gutter & Downspout Cleanout',
    category: 'Gutters',
    propertyType: 'Residential',
    location: 'Muskegon, MI',
    description:
      'Heavy seasonal cleanout on multi-pitch roof surrounded by mature white pines, including snake flushing of four buried downspout drains.',
    keyDetails: ['Padded ladder standoff protection', 'Hand-scoop debris extraction', 'High-flow drain flush verified'],
    imageUrl:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Suburban home roofline with clear gutters and trimmed tree canopy',
    tag: 'Full Perimeter Flush',
  },
  {
    id: 'proj-05',
    title: 'Downtown Washington Avenue Retail Facade & Entry',
    category: 'Pressure Washing',
    propertyType: 'Commercial',
    location: 'Grand Haven, MI',
    description:
      'Off-hours commercial hot-water surface wash of 1,800 sq ft concrete entry apron, removing chewing gum, winter deicer staining, and brick facade dust.',
    keyDetails: ['Hot water wash (190°F)', 'Chewing gum spot eradication', 'Completed prior to 7:00 AM business opening'],
    imageUrl:
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Clean urban brick and concrete storefront in downtown retail district',
    tag: 'Commercial Entry',
  },
  {
    id: 'proj-06',
    title: 'Bayside Cottage Transom & Cathedral Glass',
    category: 'Windows',
    propertyType: 'Residential',
    location: 'Traverse City, MI',
    description:
      'Exterior high-reach window detailing on three-tier transom dormers and skylights without requiring heavy equipment on delicate lawn.',
    keyDetails: ['Carbon-fiber telescopic water-fed pole', 'Delicate roofline protection', 'Spot-free optical finish'],
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Pristine upper story windows in lakeside vacation cottage',
    tag: 'High-Reach Glass',
  },
  {
    id: 'proj-07',
    title: 'Lake Breeze Bluestone Patio & Pool Surround',
    category: 'Decks & Patios',
    propertyType: 'Residential',
    location: 'Spring Lake, MI',
    description:
      'Gentle bio-wash of 900 sq ft natural bluestone terrace, dissolving green moss joints without blowing out delicate polymeric sand.',
    keyDetails: ['Bio-fungicide soak', 'Low pressure fan rinse', 'Polymeric sand preserved'],
    imageUrl:
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Restored stone patio terrace with outdoor seating overlooking garden',
    tag: 'Stone Bio-Wash',
  },
  {
    id: 'proj-08',
    title: 'Two-Story Colonial Gutter & Downspout Service',
    category: 'Gutters',
    propertyType: 'Residential',
    location: 'Cascade / Grand Rapids, MI',
    description:
      'Full perimeter seasonal clearance, downspout elbow unclogging, and realignment of two loose aluminum bracket hangers.',
    keyDetails: ['Manual bucket removal', 'Hanger realignment included', 'Zero splatter on flower beds'],
    imageUrl:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Front facade of classic two-story colonial home with clean gutters',
    tag: 'Perimeter Clearance',
  },
];
