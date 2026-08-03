import { SYSTEM_PROMPT } from "../data/knowledgeBase";

const rawKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();

export type Message = {
  role: "user" | "model";
  content: string;
};

// Verified active models for current Gemini API
const CANDIDATE_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro"
];

export async function chatWithAI(history: Message[], prompt: string): Promise<string> {
  if (!apiKey) {
    return "Error: Gemini API key is not configured in your .env file.";
  }

  const formattedHistory = history
    .filter((_, idx) => idx > 0)
    .map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

  const contents = [
    ...formattedHistory,
    { role: "user", parts: [{ text: prompt }] }
  ];

  let lastErr = "";

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { temperature: 0.2 }
        })
      });

      const data = await res.json();
      
      if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }

      if (data.error) {
        lastErr = `[${res.status} ${model}]: ${data.error.message}`;
        console.warn(`Gemini API attempt (${model}) failed:`, lastErr);
      }
    } catch (e: any) {
      lastErr = e.message;
    }
  }

  return `Error connecting to Gemini API: ${lastErr}. Please check your API key in .env.`;
}
