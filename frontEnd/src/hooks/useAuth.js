import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectIsAuthenticated } from '../redux/features/auth/authSlice';
import { useLogoutMutation } from '../api/userApi';
import { logOut } from '../redux/features/auth/authSlice';
import { addNotification } from '../redux/features/ui/uiSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logOut());
      dispatch(addNotification({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been successfully logged out.',
      }));
      navigate('/login');
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        title: 'Logout Failed',
        message: 'Failed to logout. Please try again.',
      }));
    }
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const isAdmin = () => hasRole('admin');
  const isAgent = () => hasRole('agent');
  const isLandlord = () => hasRole('landlord');
  const isUser = () => hasRole('user');

  return {
    user,
    isAuthenticated,
    logout,
    hasRole,
    hasAnyRole,
    isAdmin,
    isAgent,
    isLandlord,
    isUser,
  };
};

export default useAuth;
