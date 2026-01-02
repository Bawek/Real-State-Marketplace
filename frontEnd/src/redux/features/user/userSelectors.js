export const selectUsers = (state) => state.userManagement.users;
export const selectCurrentUser = (state) => state.userManagement.currentUser;
export const selectUserLoading = (state) => state.userManagement.loading;
export const selectUserError = (state) => state.userManagement.error;
export const selectUserPagination = (state) => state.userManagement.pagination;
export const selectTotalUsers = (state) => state.userManagement.pagination.totalUsers;
export const selectCurrentPage = (state) => state.userManagement.pagination.currentPage;
export const selectTotalPages = (state) => state.userManagement.pagination.totalPages;

export const selectUserById = (state, userId) => 
  state.userManagement.users.find(user => user._id === userId);

export const selectUsersByRole = (state, role) =>
  state.userManagement.users.filter(user => user.role === role);

export const selectActiveUsers = (state) =>
  state.userManagement.users.filter(user => user.status === 'active');

export const selectInactiveUsers = (state) =>
  state.userManagement.users.filter(user => user.status === 'inactive');
