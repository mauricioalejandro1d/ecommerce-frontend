import { Navigate } from 'react-router-dom';
import { useContext } from 'react';


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;