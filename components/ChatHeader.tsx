
import React from 'react';
import { UserProfile } from '../types';

interface ChatHeaderProps {
  profile: UserProfile;
  onBack?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ profile, onBack }) => {
  return (
    <div className="bg-[#075e54] text-white p-3 flex items-center shadow-md sticky top-0 z-50">
      <button onClick={onBack} className="mr-2 md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="relative">
        <img 
          src={profile.avatar} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
        />
        {profile.status === 'online' && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#075e54] rounded-full"></div>
        )}
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <h1 className="font-bold text-lg leading-tight truncate">Nai 🇦🇷</h1>
        <p className="text-xs text-green-100 opacity-90 transition-all duration-300">
          {profile.status}
        </p>
      </div>
      <div className="flex gap-4">
        <button className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </button>
        <button className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
