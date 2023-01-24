/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import GroupCard from '../components/GroupCard';
import getGroups from '../services/groupQueries';

function GroupPage() {
  const [groups, setGroups] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const gettedData = await getGroups();
      if (gettedData[0]) {
        setGroups(gettedData[1]);
      } else {
        setGroups(null);
      }
    }
    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        marginTop: '50px', flexGrow: 1,
      }}
    >
      { groups != null &&
        <Grid container spacing={2} sx={{ width: '80vw', maxWidth: '1500px' }} display="flex" justifyContent="center">
          {
            groups.map((group) => (
              <Grid key={group.id} item xs={6} sx={{ width: '35vw', minWidth: '300px' }}>
                <GroupCard id={group.id} name={group.name} />
              </Grid>
            ))
          }
        </Grid>
      }
      {
        groups === null && <Typography>Il n'y a aucun groupe</Typography>
      }
      {
        groups === undefined && <CircularProgress />
      }
    </Box>
  );
}

export default GroupPage;
