import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../services/firestore.service';

export function PrivateRoute() {
  const [user] = useAuthState(auth);

  return user ? <Outlet /> : <Navigate to="/authentication/signin" />;
}

export function DisconnectedRoute() {
  const [user] = useAuthState(auth);

  return user ? <Navigate to="/poi" /> : <Outlet />;
}
