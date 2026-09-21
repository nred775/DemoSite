import { GoogleGenAI } from '@google/genai';

interface VercelRequest {
  method?: string;
  body?: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: (data?: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const requestData = body?.requestData || body?.request;

  if (!requestData) {
    return res.status(400).json({ error: 'Missing requestData' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'NO_API_KEY',
      message: 'Gemini API key is not configured on the server. A structured local summary will be provided.',
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are an administrative assistant for Lakeshore Property Care, an exterior property care company in Michigan.
Generate a concise, professional, structured Job Brief from the following customer inquiry.
Customer Information:
- Reference ID: ${requestData.referenceNumber || 'N/A'}
- Service Requested: ${requestData.serviceType || 'N/A'}
- Property Type: ${requestData.propertyType || 'Residential'}
- Approx Size: ${requestData.projectSize || 'Standard'}
- Timeframe: ${requestData.timeframe || 'Flexible'}
- Description: ${requestData.description || 'None provided'}
- Customer Location: ZIP ${requestData.zipCode || 'Michigan'}

Format strictly using the following headings:
1. Service Requested
2. Primary Customer Need
3. Property & Location Details
4. Preferred Timeframe
5. Missing Information Worth Asking
6. Suggested Next Administrative Step

Strict Rules:
- Distinguish verified provided information from questions or inferences.
- Never invent prices, quotes, schedule commitments, or technical diagnoses.
- Keep tone professional, scannable, and practical for property care dispatchers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const text = response.text || '';
    return res.status(200).json({ brief: text, source: 'gemini' });
  } catch (err: any) {
    console.error('Gemini brief generation error:', err);
    return res.status(500).json({
      error: 'GENERATION_FAILED',
      message: err?.message || 'Failed to generate AI brief.',
    });
  }
}
