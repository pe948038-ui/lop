
import { GoogleGenAI, Type } from "@google/genai";
import { NAI_SYSTEM_INSTRUCTION } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const sendMessageToNai = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.parts[0].text }] })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: NAI_SYSTEM_INSTRUCTION,
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Che, se me cortó el wifi, bancame un toque... (Error de conexión)";
  }
};

export const generateNaiPhoto = async (prompt: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `A 17-year-old Argentinian girl named Naiara with long dark hair, casual outfit, selfie style, realistic. Context: ${prompt}` }
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
