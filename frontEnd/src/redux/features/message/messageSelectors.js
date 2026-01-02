export const selectMessages = (state) => state.message.messages;
export const selectCurrentConversation = (state) => state.message.currentConversation;
export const selectCurrentMessage = (state) => state.message.currentMessage;
export const selectMessageLoading = (state) => state.message.loading;
export const selectMessageError = (state) => state.message.error;
export const selectMessagePagination = (state) => state.message.pagination;
export const selectUnreadCount = (state) => state.message.unreadCount;
export const selectActiveConversation = (state) => state.message.activeConversation;
export const selectTotalMessages = (state) => state.message.pagination.totalMessages;

export const selectMessageById = (state, messageId) =>
  state.message.messages.find(message => message._id === messageId);

export const selectMessagesBySender = (state, senderId) =>
  state.message.messages.filter(message => message.sender._id === senderId);

export const selectMessagesByReceiver = (state, receiverId) =>
  state.message.messages.filter(message => message.receiver._id === receiverId);

export const selectUnreadMessages = (state) =>
  state.message.messages.filter(message => !message.read);

export const selectSentMessages = (state, userId) =>
  state.message.messages.filter(message => message.sender._id === userId);

export const selectReceivedMessages = (state, userId) =>
  state.message.messages.filter(message => message.receiver._id === userId);

export const selectConversationBetweenUsers = (state, userId1, userId2) =>
  state.message.messages.filter(message => 
    (message.sender._id === userId1 && message.receiver._id === userId2) ||
    (message.sender._id === userId2 && message.receiver._id === userId1)
  );

export const selectRecentMessages = (state, hours = 24) => {
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - hours);
  return state.message.messages.filter(message => 
    new Date(message.createdAt) >= cutoffTime
  );
};
