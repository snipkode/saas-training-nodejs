import { useState } from 'react'
import useChatStore from '@/store/useChatStore'
import ChatMessage from '@/components/ChatMessage'
import { FaPaperPlane, FaPlus, FaBars } from 'react-icons/fa'
import withAuth from '@/utils/withAuth'

function Chat() {
  const [message, setMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { messages, addMessage } = useChatStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    addMessage({
      id: Date.now().toString(),
      content: message,
      timestamp: new Date().toISOString(),
      isUser: true,
    })
    setMessage('')
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-80' : 'w-0'
      } transition-all duration-300 overflow-hidden border-r border-gray-200 dark:border-gray-800`}>
        <div className="flex flex-col h-full p-4">
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full">
            <FaPlus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
          <div className="flex-1 mt-4 space-y-2 overflow-y-auto">
            {/* Chat history items would go here */}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Chat with AI</h1>
            <div className="w-9" /> {/* Spacer */}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                Start a conversation with AI...
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} isUser={msg.isUser} />
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message ChatAI..."
                className="w-full p-4 pr-12 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 resize-none"
                rows="1"
                style={{ minHeight: '60px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-3 bottom-3 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={!message.trim()}
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Chat)
