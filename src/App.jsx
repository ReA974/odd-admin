import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import GroupPage from './pages/GroupPage';
import Header, { HeaderAuth } from './components/Header';
import Signin from './components/authentication/Signin';
import ResetPassword from './components/authentication/ResetPassword';
import { DisconnectedRoute, PrivateRoute } from './components/Routes';
import './App.css';
import AddPoiPage from './pages/AddPoiPage';
import PoiPage from './pages/PoiPage';

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
            <Route exact path="/group" element={<GroupPage />} />
            <Route exact path="/poi" element={<PoiPage />} />
            <Route exact path="/addPoi" element={<AddPoiPage />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/poi" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
