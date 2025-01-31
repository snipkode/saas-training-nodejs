import {create} from 'zustand'

const useChatStore = create((set) => ({
  messages: [],
  currentChat: null,
  
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  
  setCurrentChat: (chat) => set({ currentChat: chat }),
  
  clearChat: () => set({ messages: [], currentChat: null }),
}))

export default useChatStore
