import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

//if There is already a user this is for where the user can not go , use this in there ,like signup page , signin page
const GuestGuard = ({ children, redirectTo = '/' }) => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're not loading and user is authenticated
    if (!isLoading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, isLoading, redirectTo, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if user is authenticated
  if (user) {
    return null;
  }

  return children;
};

export default GuestGuard;
