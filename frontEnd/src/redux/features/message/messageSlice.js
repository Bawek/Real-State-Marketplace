import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentConversation: [],
  unreadCount: 0,
  currentMessage: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalMessages: 0,
  },
  activeConversation: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
      state.pagination = action.payload.pagination;
      state.unreadCount = action.payload.unreadCount || 0;
      state.loading = false;
      state.error = null;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
      if (state.activeConversation && 
          (action.payload.sender._id === state.activeConversation.otherUserId ||
           action.payload.receiver._id === state.activeConversation.otherUserId)) {
        state.currentConversation.push(action.payload);
      }
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    updateMessage: (state, action) => {
      const index = state.messages.findIndex(message => message._id === action.payload._id);
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
      const convIndex = state.currentConversation.findIndex(message => message._id === action.payload._id);
      if (convIndex !== -1) {
        state.currentConversation[convIndex] = action.payload;
      }
      if (state.currentMessage?._id === action.payload._id) {
        state.currentMessage = action.payload;
      }
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(message => message._id !== action.payload);
      state.currentConversation = state.currentConversation.filter(message => message._id !== action.payload);
      if (state.currentMessage?._id === action.payload) {
        state.currentMessage = null;
      }
    },
    markAsRead: (state, action) => {
      const message = state.messages.find(msg => msg._id === action.payload);
      if (message && !message.read) {
        message.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      const convMessage = state.currentConversation.find(msg => msg._id === action.payload);
      if (convMessage) {
        convMessage.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.messages.forEach(message => {
        message.read = true;
      });
      state.currentConversation.forEach(message => {
        message.read = true;
      });
      state.unreadCount = 0;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.currentConversation = [];
      state.currentMessage = null;
      state.activeConversation = null;
      state.unreadCount = 0;
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalMessages: 0,
      };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setMessages,
  setCurrentConversation,
  setCurrentMessage,
  setActiveConversation,
  addMessage,
  updateMessage,
  removeMessage,
  markAsRead,
  markAllAsRead,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
