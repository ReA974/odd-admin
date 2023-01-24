import React from 'react';
import { Box } from '@mui/material';
import ButtonProps from '../components/inputs/ButtonProps';

function PoiPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <ButtonProps text="Ajouter un point d'intérêt" variant="contained" to="/addPoi" component />
    </Box>
  );
}

export default PoiPage;
