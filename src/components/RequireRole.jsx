import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ role, children }) => {
  const user = useAuthStore((state) => state.user);
  
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;
  
  return children;
};

export default RequireRole;