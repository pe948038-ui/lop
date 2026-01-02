
export enum MessageSender {
  USER = 'USER',
  NAI = 'NAI',
  SYSTEM = 'SYSTEM'
}

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  imageUrl?: string;
  isAudio?: boolean;
}

export interface UserProfile {
  name: string;
  status: 'online' | 'escribiendo...' | 'offline';
  avatar: string;
}
