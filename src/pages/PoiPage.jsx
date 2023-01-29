import React, { useEffect, useState } from 'react';
import {
  Grid, Box, CircularProgress, Typography,
} from '@mui/material';
import getAllPOI from '../services/POIQueries';
import PoiCard from '../components/PoiCard';
import ButtonProps from '../components/inputs/ButtonProps';

function PoiPage() {
  const [POIListData, setPOIListData] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getAllPOI();
      if (fetchedData !== null) {
        setPOIListData(fetchedData);
      } else {
        setPOIListData(null);
      }
    }
    fetchData();
  }, []);

  if (POIListData === undefined) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Box sx={{ marginTop: '50px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <ButtonProps text="Ajouter un point d'intérêt" variant="contained" to="/addPoi" component />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          marginTop: '50px', flexGrow: 1,
        }}
      >
        { POIListData !== undefined && POIListData.length !== 0
          && (
            <Grid container spacing={2} sx={{ width: '80vw', maxWidth: '1500px' }} display="flex">
              {
                Object.keys(POIListData).map((key) => (
                  <Grid key={key} item xs={6} sx={{ width: '35vw', minWidth: '300px' }}>
                    <PoiCard id={key} data={POIListData[key]} />
                  </Grid>
                ))
              }
            </Grid>
          )}
        {
          POIListData !== undefined && POIListData.length === 0
          && <Typography>Il n&apos;y a aucun groupe</Typography>
        }
        {
          POIListData === undefined && <CircularProgress />
        }
      </Box>
    </Box>
  );
}

export default PoiPage;
