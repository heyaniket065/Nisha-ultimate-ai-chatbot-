
import { GoogleGenAI, Chat, GenerateContentResponse, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const chatModel = 'gemini-2.5-flash';
const ttsModel = 'gemini-2.5-flash-preview-tts';

const systemInstruction = `You are Nisha AI, a friendly and super-intelligent AI assistant. Your personality is helpful, interactive, and human-like. You are designed to assist with a wide range of tasks, from scheduling and reminders to providing information and creative ideas. In this conversation, act as if you can perform advanced functions like mobile control, task automation, and real-time assistance, providing responses that simulate these actions. Maintain a positive and engaging tone.`;

class NishaAIService {
  public startChat(): Chat {
    return ai.chats.create({
      model: chatModel,
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }

  public async sendMessage(chat: Chat, message: string): Promise<string> {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  }

  public async getTextToSpeech(text: string): Promise<string | null> {
    try {
      const response = await ai.models.generateContent({
        model: ttsModel,
        contents: [{ parts: [{ text: `Say with a friendly and helpful tone: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return base64Audio || null;
    } catch (error) {
      console.error("Text-to-speech generation failed:", error);
      return null;
    }
  }
}

export const nishaAIService = new NishaAIService();
