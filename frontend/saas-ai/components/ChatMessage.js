import Image from 'next/image'
import { format } from 'date-fns'

export default function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-4 max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
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
        <div className={`flex-1 prose dark:prose-invert max-w-none ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  )
}
