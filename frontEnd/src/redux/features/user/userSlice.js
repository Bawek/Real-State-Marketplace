import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
  },
};

const userSlice = createSlice({
  name: 'userManagement',
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
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users.unshift(action.payload);
      state.pagination.totalUsers += 1;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      if (state.currentUser?._id === action.payload._id) {
        state.currentUser = action.payload;
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
      state.pagination.totalUsers -= 1;
      if (state.currentUser?._id === action.payload) {
        state.currentUser = null;
      }
    },
    clearUsers: (state) => {
      state.users = [];
      state.currentUser = null;
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
      };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setUsers,
  setCurrentUser,
  addUser,
  updateUser,
  removeUser,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;
