import { QuoteRequest } from '../types';

export function generateDraftReply(req: QuoteRequest): string {
  const firstName = req.customerName.split(' ')[0] || req.customerName;

  let serviceSpecificQuestion = '';
  switch (req.serviceType) {
    case 'Pressure Washing':
      serviceSpecificQuestion =
        'To ensure our technicians prepare the right surface-calibration setup, do you have an active exterior hose bib with standard residential water pressure? Also, are there any delicate plantings, painted wood features, or specialty pavers near the wash area?';
      break;
    case 'Window Cleaning':
      serviceSpecificQuestion =
        'Are there any high architectural windows (such as cathedral, transom, or second-story dormers) requiring ladder access, and do you need interior glass detailing in addition to exterior pane washing?';
      break;
    case 'Gutter Cleaning':
      serviceSpecificQuestion =
        'Do your gutters have existing leaf guard covers installed on any sections, and are there underground drain basins we should verify for clear water flow?';
      break;
    case 'Deck & Patio Cleaning':
      serviceSpecificQuestion =
        'Is your deck natural wood (such as cedar or treated pine) or composite material (like Trex), and do you plan to stain or seal the surface following the cleaning?';
      break;
  }

  return `Hello ${firstName},

Thank you for contacting Lakeshore Property Care regarding your ${req.serviceType.toLowerCase()} project in the ${req.zipCode} area.

We have received your project details:
• Service: ${req.serviceType} (${req.propertyType})
• Project Scope: ${req.projectSize}
• Target Timeframe: ${req.timeframe}

${serviceSpecificQuestion}

We would be happy to prepare a detailed quote for your property. Please reply with any additional photos or details, or let us know if a quick 5-minute phone call works best to finalize your estimate.

Best regards,

Inquiries Team
Lakeshore Property Care — Michigan
(Demo Follow-up Draft • No binding pricing implied)`;
}

export const generateDraftEmailReply = generateDraftReply;

export function generateDeterministicJobBrief(req: QuoteRequest): string {
  return `### 1. Service Requested
• **Service:** ${req.serviceType}
• **Property Classification:** ${req.propertyType}
• **Reference ID:** ${req.referenceNumber}

### 2. Primary Customer Need
• ${req.description || 'General seasonal cleaning and maintenance request.'}

### 3. Property & Location Details
• **Scope & Dimensions:** ${req.projectSize}
• **Service Location:** Michigan ZIP ${req.zipCode}
• **Phone Provided:** ${req.phone ? req.phone : 'Not provided (email primary)'}

### 4. Preferred Timeframe
• **Customer Requested Window:** ${req.timeframe}
• **Inquiry Timestamp:** ${new Date(req.createdAt).toLocaleString()}

### 5. Missing Information Worth Asking
• Exterior water spigot location and water pressure availability
• Exact perimeter gate width if mobile rotary equipment or ladder trucks are required
• Specific areas of heavy staining (e.g. oil spots, iron irrigation rust, or lichen)
• Any special pet or landscaping sensitivities surrounding work perimeter

### 6. Suggested Next Administrative Step
• Check technician availability in ZIP ${req.zipCode} area within the ${req.timeframe.toLowerCase()} window.
• Send customized follow-up email draft or phone call to confirm property access details before issuing formal estimate.`;
}

export const generateLocalDeterministicBrief = generateDeterministicJobBrief;
