export const selectTheme = (state) => state.ui.theme;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectModalOpen = (state) => state.ui.modalOpen;
export const selectModalContent = (state) => state.ui.modalContent;
export const selectNotifications = (state) => state.ui.notifications;
export const selectLoading = (state) => state.ui.loading;
export const selectErrors = (state) => state.ui.errors;
export const selectBreadcrumbs = (state) => state.ui.breadcrumbs;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectFiltersVisible = (state) => state.ui.filtersVisible;
export const selectGridView = (state) => state.ui.gridView;
export const selectSortBy = (state) => state.ui.sortBy;

export const selectGlobalLoading = (state) => state.ui.loading.global;
export const selectLoginLoading = (state) => state.ui.loading.login;
export const selectRegisterLoading = (state) => state.ui.loading.register;
export const selectPropertyLoading = (state) => state.ui.loading.property;
export const selectMessageLoading = (state) => state.ui.loading.message;

export const selectGlobalError = (state) => state.ui.errors.global;
export const selectLoginError = (state) => state.ui.errors.login;
export const selectRegisterError = (state) => state.ui.errors.register;
export const selectPropertyError = (state) => state.ui.errors.property;
export const selectMessageError = (state) => state.ui.errors.message;

export const selectUnreadNotifications = (state) => 
  state.ui.notifications.filter(notification => !notification.read);

export const selectNotificationCount = (state) => state.ui.notifications.length;

export const selectLoadingByType = (state, type) => state.ui.loading[type];
export const selectErrorByType = (state, type) => state.ui.errors[type];
