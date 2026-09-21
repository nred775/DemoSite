import { ServiceType } from '../types';

export interface ServiceDetail {
  id: string;
  type: ServiceType;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  fullOverview: string;
  workCovered: string[];
  equipmentAndMethod: string;
  recommendedFrequency: string;
  imageUrl: string;
  imageAlt: string;
  iconName: 'Droplets' | 'Sparkles' | 'ShieldAlert' | 'SunMedium';
  highlights: { title: string; desc: string }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'pressure-washing',
    type: 'Pressure Washing',
    title: 'Precision Pressure & Soft Washing',
    tagline: 'Restore natural vibrancy without damaging exterior building materials.',
    badge: 'Exterior Siding & Hardscapes',
    description:
      'Targeted, surface-calibrated cleaning designed to safely lift embedded Michigan road dust, pollen, mold, and seasonal grime from house siding, concrete, brick, and walkways.',
    fullOverview:
      'Exterior surfaces along Lake Michigan endure humidity, heavy freeze-thaw cycles, and organic buildup. We pair commercial-grade rotary surface cleaners with specialized biodegradable detergents to deliver consistent, streak-free deep cleaning without risking blown seals or etched masonry.',
    workCovered: [
      'Vinyl, cedar shake, and fiber cement siding soft wash',
      'Concrete driveway & front entryway restoration',
      'Aggregate, brick paver, and bluestone patio wash',
      'Retaining wall and decorative stone cleaning',
      'Mildew, lichen, and organic algae elimination',
      'Efflorescence and light salt deposit removal',
    ],
    equipmentAndMethod:
      'Low-pressure chemical soft washing for delicate siding; calibrated high-flow surface rotary cleaners for flat hardscapes.',
    recommendedFrequency: 'Annually in spring or early autumn',
    imageUrl:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Exterior surface cleaning technician operating pressure wash equipment on stone pavers',
    iconName: 'Droplets',
    highlights: [
      { title: 'Safe Siding Pressure', desc: 'Calibrated below 800 PSI for siding to protect paint, caulking, and underlying insulation.' },
      { title: 'Even Swirl-Free Finish', desc: 'Commercial rotary discs eliminate the unsightly zebra striping caused by basic wands.' },
      { title: 'Eco-Safe Treatments', desc: 'Plant-friendly, pet-conscious cleaning solutions that rinse clean without chemical residue.' },
    ],
  },
  {
    id: 'window-cleaning',
    type: 'Window Cleaning',
    title: 'Streak-Free Pure Water Window Cleaning',
    tagline: 'Crystal clarity that lets natural lakeshore light fill every room.',
    badge: 'Interior & Exterior Glass',
    description:
      'Professional interior and exterior window detailing utilizing multi-stage water filtration to ensure zero spots, mineral stains, or drying streaks.',
    fullOverview:
      'Lake winds, seasonal storms, and shoreline salt spray quickly deposit a fine film over exterior glass. Our 4-stage deionizing pure water pole system strips impurities down to zero parts-per-million, allowing windows to dry naturally with unmatched optical clarity while keeping delicate landscaping undisturbed.',
    workCovered: [
      'Multi-story exterior glass cleaning up to 3 floors',
      'Interior window cleaning with protective floor boot covers',
      'Screen wash, deep dust removal, and frame wipe-down',
      'Window track detailing and sill vacuuming/sponge wash',
      'Sliding glass patio doors and skylight cleaning',
      'Sunroom, transom, and architectural picture windows',
    ],
    equipmentAndMethod:
      'Reverse-osmosis / deionized pure water filtration fed through carbon fiber water-fed poles and traditional brass squeegee detailing.',
    recommendedFrequency: 'Twice yearly (Spring lake bloom & Autumn prep)',
    imageUrl:
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Professional window technician detailing exterior glass with squeegee and purified water',
    iconName: 'Sparkles',
    highlights: [
      { title: 'Spot-Free Pure Water', desc: '0 PPM purified water leaves no detergent film, keeping glass cleaner for twice as long.' },
      { title: 'Complete Frame & Sill Care', desc: 'We clean the glass, sills, tracks, and screens—not just a quick swipe across the center.' },
      { title: 'Up to 3 Stories Safely', desc: 'Carbon fiber equipment reaches high cathedral and dormer windows from the ground.' },
    ],
  },
  {
    id: 'gutter-cleaning',
    type: 'Gutter Cleaning',
    title: 'Complete Gutter & Downspout Cleanout',
    tagline: 'Protect your roofline, fascia boards, and foundation from water intrusion.',
    badge: 'Debris Removal & Downspout Flush',
    description:
      'Thorough hand-clearing and high-volume water flushing that ensures unobstructed rainwater management from roof shingles down to underground runoff lines.',
    fullOverview:
      'Clogged gutters pose severe hazards during Midwest downpours and winter freeze cycles, contributing to roof rot, basement dampness, and cracked foundation corners. We hand-scoop all organic debris into disposal buckets, flush downspouts to verify unobstructed discharge, and inspect hangers for early signs of sagging.',
    workCovered: [
      'Full perimeter gutter hand removal of pine needles, leaves & silt',
      'High-volume water test and flush of every downspout',
      'Underground drain basin verification and clear check',
      'Roof valley sweep to prevent premature gutter damming',
      'Gutter exterior face wipe (optional gutter brightening)',
      'Loose fastener and hanger bracket integrity inspection',
    ],
    equipmentAndMethod:
      'Padded ladder standoff stabilizers (never resting on your gutters), manual debris collection bins, and snake flush nozzles.',
    recommendedFrequency: 'Twice annually (late spring seed drop & late autumn post-leaf drop)',
    imageUrl:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Residential architectural roofline, eaves, and aluminum gutter drainage system',
    iconName: 'ShieldAlert',
    highlights: [
      { title: 'Careful Debris Bagging', desc: 'Debris is scooped directly into collection bins—never blown or splattered onto your lawn.' },
      { title: 'Downspout Flush Verification', desc: 'We run water through every elbow and vertical pipe to guarantee free discharge.' },
      { title: 'Gutter Standoffs Used', desc: 'Ladder brackets prevent bending, scratching, or denting of your aluminum gutter system.' },
    ],
  },
  {
    id: 'deck-and-patio',
    type: 'Deck & Patio Cleaning',
    title: 'Deck & Patio Wood/Paver Restoration',
    tagline: 'Revitalize outdoor living spaces for warm-weather gathering.',
    badge: 'Hardwood, Composite & Stone',
    description:
      'Specialized care for natural cedar, pressure-treated pine, Trex/composite boards, and stone patios to eliminate slick moss, gray UV oxidation, and mold.',
    fullOverview:
      'Decks and patios are the centerpieces of Michigan summer living, but continuous humidity and shade foster slippery biofilms and deep graying. We tailor chemical treatments specifically to wood density or composite matrix—conditioning wood grain and preparing it for uniform staining while eliminating slip hazards on stone.',
    workCovered: [
      'Cedar, redwood, and pressure-treated pine deep conditioning',
      'Trex, TimberTech, and composite decking low-pressure cleanse',
      'Flagstone, slate, and bluestone patio biological treatment',
      'Railing, baluster, and perimeter privacy screen washing',
      'Stain-prep wood brightening to open wood pores evenly',
      'Outdoor kitchen surround and firepit perimeter wash',
    ],
    equipmentAndMethod:
      'Alkaline cleaning wash followed by an organic acid brightener, rinsed under controlled low pressure (<600 PSI) with wide fan tips.',
    recommendedFrequency: 'Annually before summer season or prior to re-staining',
    imageUrl:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Clean outdoor wooden deck and backyard entertainment space with patio seating',
    iconName: 'SunMedium',
    highlights: [
      { title: 'Wood-Safe Conditioning', desc: 'Zero fuzzy wood fibers or wand scars; our oxygenated cleaners lift graying gently.' },
      { title: 'Slip Hazard Removal', desc: 'Targeted botanical fungicides eliminate slippery green biofilms that cause falls.' },
      { title: 'Composite Certified', desc: 'Strict adherence to composite manufacturer guidelines prevents warranty voids.' },
    ],
  },
];
