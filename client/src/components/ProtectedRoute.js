// client/src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Eğer kullanıcı yoksa (giriş yapmamışsa), onu giriş sayfasına yönlendir.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Kullanıcı varsa, istenen sayfayı (children) göster.
  return children;
}

export default ProtectedRoute;