import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { user, isModalOpen, toggleModal } = useAuth();

  useEffect(() => {
    if (!user && !isModalOpen) {
      toggleModal();
    }
  }, [user, isModalOpen, toggleModal]);


  if (!user) {

    return <Navigate to="/" replace />;
  }


  return <Outlet />;
}

export default ProtectedRoute; 