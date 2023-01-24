import React, { useEffect, useState } from 'react';
import {
  Grid, Box, CircularProgress, Typography,
} from '@mui/material';
import {
  query, collection, orderBy, onSnapshot,
} from '@firebase/firestore';
import GroupCard from '../components/GroupCard';
import { db } from '../services/firestore.service';

function GroupPage() {
  const [snapshot, setSnapshot] = useState(null);
  const [groups, setGroups] = useState(undefined);

  // retrieve data and listen for changes
  useEffect(() => {
    const q = query(collection(db, 'GROUP'), orderBy('created', 'desc'));

    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setSnapshot(querySnapshot);
    });
    return () => {
      unsuscribe();
    };
  }, []);

  useEffect(() => {
    if (snapshot) {
      const groupsArray = [];
      snapshot.forEach((document) => {
        groupsArray.push({ id: document.id, ...document.data() });
      });
      setGroups(groupsArray);
    }
  }, [snapshot]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        marginTop: '50px', flexGrow: 1,
      }}
    >
      { groups !== undefined && groups.length !== 0
        && (
          <Grid container spacing={2} sx={{ width: '80vw', maxWidth: '1500px' }} display="flex" justifyContent="center">
            {
              groups.map((group) => (
                <Grid key={group.id} item xs={6} sx={{ width: '35vw', minWidth: '300px' }}>
                  <GroupCard id={group.id} name={group.name} />
                </Grid>
              ))
            }
          </Grid>
        )}
      {
        groups !== undefined && groups.length === 0
        && <Typography>Il n&apos;y a aucun groupe</Typography>
      }
      {
        groups === undefined && <CircularProgress />
      }
    </Box>
  );
}

export default GroupPage;
