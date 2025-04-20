import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // Use the environment variable
});

export async function fetchGoodStocksWithRisk() {
  try {

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Identify a list of 3-5 publicly traded stocks that show good potential. For each stock, provide:
    - The company name.
    - The stock ticker symbol.
    - An assessment of the risk level ("High", "Medium", or "Low").
    - A brief investment suggestion (e.g., "Consider for long-term growth", "Good for short-term gains").
    - An estimated percentage for potential gain over the next 1-2 years.

    Format the output as a JSON array of objects, where each object includes: company_name, stock_symbol, risk_level, suggestion, and potential_gain. Do not include markdown formatting or explanations—just the raw JSON array.`,
      });
    const textOutput = response.text;

    console.log("Gemini response:", textOutput);

    // 🧠 Remove potential Markdown/code block wrappers (like ```json ... ```)
    const cleanJson = textOutput.replace(/```json|```/g, "").trim();

    const rawData = JSON.parse(cleanJson);
    const formatted = rawData.map((stock, i) => ({
      id: i + 1,
      company_name: stock.company_name,
      stock_symbol: stock.stock_symbol,
      risk_level: stock.risk_level,
      suggestion: stock.suggestion,
      potential_gain: stock.potential_gain,
      created_at: new Date().toISOString(),
    }));

    console.log("✅ Gemini response:", formatted);

    return formatted;

  } catch (error) {
    console.error("❌ Error fetching or parsing Gemini response:", error);
    return { error: error.message };
  }
}
