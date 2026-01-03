import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth/authSlice';
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
      propertyApi.middleware,
      userApi.middleware,
      messageApi.middleware,
      roleApi.middleware,
      appointmentApi.middleware
    ),
});

export default store;
