
import React from 'react';
import { ChatMessage } from '../types';

interface MessageProps {
  message: ChatMessage;
}

const UserAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-sm">
        U
    </div>
);

const AIAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white text-sm">
        N
    </div>
);

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <AIAvatar />}
      <div
        className={`rounded-lg p-3 max-w-lg break-words ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-200'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
       {isUser && <UserAvatar />}
    </div>
  );
};
