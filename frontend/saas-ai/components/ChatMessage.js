import React from 'react';

function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-4 max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
          {isUser ? (
            <div className="bg-gray-300 dark:bg-gray-600 w-full h-full rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
          ) : (
            <div className="bg-green-600 w-full h-full rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">AI</span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 p-4 rounded-lg shadow-md ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
        }`}>
          <p className="whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
