import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Lakeshore Property Care Demo" });
  });

  // Server-side Gemini API for Job Brief generation
  app.post("/api/job-brief", async (req, res) => {
    const { requestData } = req.body;
    if (!requestData) {
      return res.status(400).json({ error: "Missing requestData" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "NO_API_KEY",
        message: "Gemini API key is not configured on the server. A structured local summary will be provided.",
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are an administrative assistant for Lakeshore Property Care, an exterior property care company in Michigan.
Generate a concise, professional, structured Job Brief from the following customer inquiry.
Customer Information:
- Reference ID: ${requestData.referenceNumber || "N/A"}
- Service Requested: ${requestData.serviceType || "N/A"}
- Property Type: ${requestData.propertyType || "Residential"}
- Approx Size: ${requestData.projectSize || "Standard"}
- Timeframe: ${requestData.timeframe || "Flexible"}
- Description: ${requestData.description || "None provided"}
- Customer Location: ZIP ${requestData.zipCode || "Michigan"}

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
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      const text = response.text || "";
      return res.json({ brief: text, source: "gemini" });
    } catch (err: any) {
      console.error("Gemini brief generation error:", err);
      return res.status(500).json({
        error: "GENERATION_FAILED",
        message: err?.message || "Failed to generate AI brief.",
      });
    }
  });

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
