import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  notifications: [],
  loading: {
    global: false,
    login: false,
    register: false,
    property: false,
    message: false,
  },
  errors: {
    global: null,
    login: null,
    register: null,
    property: null,
    message: null,
  },
  breadcrumbs: [],
  searchQuery: '',
  filtersVisible: true,
  gridView: true,
  sortBy: 'newest',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.notifications.unshift(notification);
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id !== notification.id);
      }, 5000);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    },
    setError: (state, action) => {
      const { type, error } = action.payload;
      state.errors[type] = error;
    },
    clearError: (state, action) => {
      const type = action.payload;
      state.errors[type] = null;
    },
    clearAllErrors: (state) => {
      state.errors = {
        global: null,
        login: null,
        register: null,
        property: null,
        message: null,
      };
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleFiltersVisible: (state) => {
      state.filtersVisible = !state.filtersVisible;
    },
    setFiltersVisible: (state, action) => {
      state.filtersVisible = action.payload;
    },
    toggleGridView: (state) => {
      state.gridView = !state.gridView;
    },
    setGridView: (state, action) => {
      state.gridView = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setError,
  clearError,
  clearAllErrors,
  setBreadcrumbs,
  setSearchQuery,
  toggleFiltersVisible,
  setFiltersVisible,
  toggleGridView,
  setGridView,
  setSortBy,
} = uiSlice.actions;

export default uiSlice.reducer;
