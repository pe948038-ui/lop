
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, MessageSender, UserProfile } from './types';
import { ChatHeader } from './components/ChatHeader';
import { ChatBubble } from './components/ChatBubble';
import { InputArea } from './components/InputArea';
import { sendMessageToNai, generateNaiPhoto } from './services/geminiService';
import { INITIAL_MESSAGES } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Naiara',
    status: 'online',
    avatar: 'https://picsum.photos/seed/nai/200/200'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages
  useEffect(() => {
    const saved = localStorage.getItem('nai_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        setMessages(INITIAL_MESSAGES.map(m => ({ ...m, timestamp: new Date() })));
      }
    } else {
      setMessages(INITIAL_MESSAGES.map(m => ({ ...m, timestamp: new Date() })));
    }
  }, []);

  // Persist messages
  useEffect(() => {
    localStorage.setItem('nai_chat_history', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: MessageSender.USER,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setProfile(p => ({ ...p, status: 'escribiendo...' }));

    // Prepare history for Gemini
    const history = messages
      .filter(m => !m.imageUrl) // Only text for context
      .slice(-10) // Last 10 messages for speed
      .map(m => ({
        role: m.sender === MessageSender.USER ? "user" : "model",
        parts: [{ text: m.text }]
      }));

    const responseText = await sendMessageToNai(text, history);

    const naiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: MessageSender.NAI,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, naiMsg]);
    setProfile(p => ({ ...p, status: 'online' }));
  };

  const handlePhotoRequest = async () => {
    // Nai "decides" to send a photo
    setProfile(p => ({ ...p, status: 'sacando una foto...' }));
    
    // Simulate thinking
    await new Promise(r => setTimeout(r, 1500));
    
    const photoUrl = await generateNaiPhoto("Taking a selfie in my room, smiling, 17 years old");
    
    if (photoUrl) {
      const naiMsg: Message = {
        id: Date.now().toString(),
        text: '¡Mirá! Recién salidita ✨',
        sender: MessageSender.NAI,
        timestamp: new Date(),
        imageUrl: photoUrl
      };
      setMessages(prev => [...prev, naiMsg]);
    } else {
      handleUserMessage("No me anda la cámara, boludo...");
    }
    setProfile(p => ({ ...p, status: 'online' }));
  };

  const handleVoiceClick = () => {
    alert("Che, el audio no está implementado todavía, pero me podés escribir por ahora! ✨");
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto shadow-2xl bg-white/40 backdrop-blur-sm">
      <ChatHeader profile={profile} />
      
      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar space-y-1">
        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <InputArea 
        onSendMessage={handleUserMessage} 
        onVoiceClick={handleVoiceClick}
        onPhotoRequest={handlePhotoRequest}
      />
    </div>
  );
};

export default App;
