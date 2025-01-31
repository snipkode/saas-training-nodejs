import { useState, useEffect } from 'react'
import useChatStore from '@/store/useChatStore'
import { FaPaperPlane, FaPlus, FaBars } from 'react-icons/fa'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import { useRouter } from 'next/router'

// ChatMessage component
function ChatMessage({ message, isUser }) {
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
          <p className="text-gray-900 dark:text-gray-100 text-black dark:text-white whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  )
}

function Chat() {
  const [message, setMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { messages, addMessage, setMessages } = useChatStore()
  const router = useRouter()

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token')
          router.replace('/auth/login')
          return
        }

        try {
          const response = await axios.get('/api/ai-prompt-usage', {
            headers: {
              'x-access-token': token,
              'Content-Type': 'application/json'
            },
          })
          setMessages(response.data)
        } catch (err) {
        //   setError('Failed to load messages')
        } finally {
          setLoading(false)
        }
      } else {
        router.replace('/auth/login')
      }
    }

    fetchMessages()
  }, [router, setMessages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token')
        router.replace('/auth/login')
        return
      }

      try {
        const response = await axios.post('/api/ai-prompt-usage', {
          prompt_text: message,
        }, {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          },
        })

        addMessage({
          id: response.data.promptUsageId,
          content: message,
          timestamp: new Date().toISOString(),
          isUser: true,
        })
        addMessage({
          id: `${response.data.promptUsageId}-response`,
          content: response.data.aiResponse,
          timestamp: new Date().toISOString(),
          isUser: false,
        })
        setMessage('')
      } catch (err) {
        setError('Failed to send message')
      }
    }
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'hidden'} transition-all duration-300 border-r border-gray-200 dark:border-gray-800`}>
        <div className="p-4">
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full">
            <FaPlus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <FaBars className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Chat with AI</h1>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">Loading messages...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">Start a conversation with AI...</p>
          ) : (
            messages.map((msg, key) => (
              <ChatMessage key={key} message={msg} isUser={msg.isUser} />
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message ChatAI..."
              className="w-full p-4 pr-12 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 resize-none text-black dark:text-white"
              rows="1"
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
