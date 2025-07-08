import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

/**
 * AuthGuard component for protecting routes that require authentication
 * Redirects to signin page if user is not authenticated
 */

// if there is no user logged in then viewer can not go some pages , use this guard for that page , so the viewer will redirect to signin page

const AuthGuard = ({ children, redirectTo = '/signin' }) => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're not loading and user is not authenticated
    if (!isLoading && !user) {
      toast.warn("Please login to access this page.");
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

  // Don't render children if user is not authenticated
  if (!user) {
    return null;
  }

  return children;
};

export default AuthGuard;
