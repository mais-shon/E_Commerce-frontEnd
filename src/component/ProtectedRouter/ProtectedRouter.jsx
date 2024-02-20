import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({ children, role }) {
  const userToken = localStorage.getItem('userToken');

  // Check if the user is authenticated
  if (userToken) {
    // Check if a role is specified and if it matches the user's role
    if (role && userToken.role === role) {
      return <>{children}</>;
    } else if (!role) {
      // If no specific role is required, allow access
      return <>{children}</>;
    }
  }

  // Redirect to welcome page if not authenticated or role doesn't match
  return <Navigate to="/notfound" />;
}