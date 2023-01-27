import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import PoiPage from './pages/PoiPage';
import GroupPage from './pages/GroupPage';
import Header from './components/Header';
import './App.css';
import PoiDetailsPage from './pages/PoiDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/group" element={<GroupPage />} exact />
          <Route path="/poi" element={<PoiPage />} />
          <Route path="/poi/:id" element={<PoiDetailsPage />} />
          <Route path="*" element={<Navigate replace to="/poi" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
