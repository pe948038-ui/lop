
import React from 'react';
import { Message, MessageSender } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isNai = message.sender === MessageSender.NAI;
  const isSystem = message.sender === MessageSender.SYSTEM;

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="bg-[#dcf8c6] text-[#075e54] text-[10px] px-2 py-1 rounded shadow-sm uppercase tracking-wider font-semibold">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-1 ${isNai ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] md:max-w-[70%] relative px-3 py-1.5 rounded-lg shadow-sm ${
        isNai ? 'bg-white rounded-tl-none' : 'bg-[#dcf8c6] rounded-tr-none'
      }`}>
        {/* Tail */}
        <div className={`absolute top-0 w-3 h-3 ${isNai ? '-left-2 bg-white' : '-right-2 bg-[#dcf8c6]'}`} 
             style={{ clipPath: isNai ? 'polygon(100% 0, 100% 100%, 0 0)' : 'polygon(0 0, 0 100%, 100% 0)' }}>
        </div>
        
        {message.imageUrl && (
          <img src={message.imageUrl} alt="Sent by Nai" className="rounded mb-2 w-full max-h-60 object-cover cursor-pointer hover:opacity-95 transition-opacity" />
        )}
        
        <p className="text-[14.5px] text-[#303030] leading-normal whitespace-pre-wrap break-words">
          {message.text}
        </p>
        
        <div className="flex justify-end items-center gap-1 mt-0.5">
          <span className="text-[10px] text-gray-500 uppercase">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          {!isNai && (
            <svg className="w-3.5 h-3.5 text-[#34b7f1]" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              <path d="M10.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L2.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
