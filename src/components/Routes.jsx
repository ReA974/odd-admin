import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../services/firestore.service';

export function PrivateRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" sx={{ paddingTop: '50px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? <Outlet /> : <Navigate to="/authentication/signin" />;
}

export function DisconnectedRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" sx={{ paddingTop: '50px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? <Navigate to="/poi" /> : <Outlet />;
}
