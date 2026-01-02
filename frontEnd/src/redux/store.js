import { configureStore } from '@reduxjs/toolkit';
import { videoApi } from './features/blogs/blogsApi';
import authApi from './features/auth/authApi';
import auth from './features/auth/authSlice';
import commentApi from './features/comments/commentApi';
import { propertyApi } from '../api/propertyApi';
import { userApi } from '../api/userApi';
import { messageApi } from '../api/messageApi';
import { roleApi } from '../api/roleApi';
import { appointmentApi } from '../api/appointmentApi';
import userReducer from './features/user/userSlice';
import propertyReducer from './features/property/propertySlice';
import messageReducer from './features/message/messageSlice';
import uiReducer from './features/ui/uiSlice';

const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    auth,
    userManagement: userReducer,
    property: propertyReducer,
    message: messageReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      videoApi.middleware,
      authApi.middleware,
      commentApi.middleware,
      propertyApi.middleware,
      userApi.middleware,
      messageApi.middleware,
      roleApi.middleware,
      appointmentApi.middleware
    ),
});

export default store;
