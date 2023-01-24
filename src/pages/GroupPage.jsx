import { Box } from '@mui/material';
import React from 'react';
import GroupCard from '../components/GroupCard';

function GroupPage() {
  return (
    <Box>
      <GroupCard name="Group 1" />
      <GroupCard name="Group 2" />
      <GroupCard name="Group 3" />
    </Box>
  );
}

export default GroupPage;
