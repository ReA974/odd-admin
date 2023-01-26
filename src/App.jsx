import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import PoiPage from './pages/PoiPage';
import GroupPage from './pages/GroupPage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import Header, { HeaderAuth } from './components/Header';
import Signin from './components/authentication/Signin';
import ResetPassword from './components/authentication/ResetPassword';
import { DisconnectedRoute, PrivateRoute } from './components/Routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ paddingTop: '64px' }}>
        <Routes>
          <Route
            path="/authentication"
            element={(
              <>
                <HeaderAuth />
                <DisconnectedRoute />
              </>
            )}
          >
            <Route exact path="/authentication/signin" element={<Signin />} />
            <Route exact path="/authentication/reset" element={<ResetPassword />} />
          </Route>
          <Route
            path="/"
            element={(
              <>
                <Header />
                <PrivateRoute />
              </>
            )}
          >
            <Route exact path="/group/:id" element={<GroupDetailsPage />} />
            <Route exact path="/group" element={<GroupPage />} />
            <Route exact path="/poi" element={<PoiPage />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/poi" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
