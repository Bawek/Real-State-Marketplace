import { configureStore } from '@reduxjs/toolkit';
import { videoApi } from './features/blogs/blogsApi';
import authApi from './features/auth/authApi';
import auth from './features/auth/authSlice'; // Use 'auth' for consistency
import commentApi from './features/comments/commentApi';

const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    auth,  // Renamed to 'auth' for consistency
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware, authApi.middleware, commentApi.middleware),
});

export default store;
