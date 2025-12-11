import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: null,       // Holds user details (e.g., { name, email })
  isAuthenticated: false, // Tracks if the user is authenticated
  loading: false,   // Tracks loading state (e.g., when making API requests)
  error: null,      // Holds error message in case of failures
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user data and mark as authenticated
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    
    // Action to clear user data and mark as unauthenticated
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Action to set loading state (useful during async operations)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Action to set error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Action to update user profile
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// Export the actions
export const { setUser, logOut, setLoading, setError, updateProfile } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
