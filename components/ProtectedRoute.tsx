import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext provides useAuth
import { ROUTES } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show a loading spinner while checking auth status
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner text="Authenticating..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they signin, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;