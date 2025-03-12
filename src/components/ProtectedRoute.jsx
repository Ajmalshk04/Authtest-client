import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, fetchUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      console.log('Checking auth in ProtectedRoute, isAuthenticated:', isAuthenticated);
      if (isAuthenticated && !user) {
        console.log('Fetching user data in ProtectedRoute');
        const fetchedUser = await fetchUser();
        if (!fetchedUser) {
          console.log('No user fetched, redirecting to /login');
          window.location.href = '/login';
          return;
        }
      }
      setIsLoading(false);
      setCheckedAuth(true);
    };
    checkUser();
  }, [isAuthenticated, fetchUser, user]);

  if (!checkedAuth || (isAuthenticated && isLoading)) {
    console.log('Still checking auth or loading user data...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated after check, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  console.log('User authenticated, rendering children:', user);
  return children;
};

export default ProtectedRoute;