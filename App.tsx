
import React, { useState, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { ChatWindow } from './components/ChatWindow';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './types';
import { nishaAIService } from './services/geminiService';
import { useAudioPlayer } from './hooks/useAudioPlayer';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { playAudio } = useAudioPlayer();

  useEffect(() => {
    const initChat = () => {
      const newChat = nishaAIService.startChat();
      setChat(newChat);
      setMessages([
        {
          role: 'model',
          text: "Hello! I am Nisha AI, your personal assistant. How can I help you today?"
        }
      ]);
    };
    initChat();
  }, []);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!chat || isLoading || !userInput.trim()) return;

    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);

    try {
      const textResponse = await nishaAIService.sendMessage(chat, userInput);
      const modelMessage: ChatMessage = { role: 'model', text: textResponse };
      setMessages(prev => [...prev, modelMessage]);
      
      const audioData = await nishaAIService.getTextToSpeech(textResponse);
      if (audioData) {
        playAudio(audioData);
      }
    } catch (error) {
      console.error("Failed to get response from Gemini:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        text: "I'm sorry, but I'm having trouble connecting right now. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading, playAudio]);

  return (
    <div className="flex h-screen font-sans bg-gray-900 text-gray-200">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen">
        <ChatWindow 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
};

export default App;
