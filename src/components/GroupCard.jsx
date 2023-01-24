import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';

function GroupCard({ name }) {
  return (
    <Box
      display="flex"
      sx={{
        border: '1px solid lightGray', padding: '10px 20px', borderRadius: '4px',
      }}
    >
      <Typography variant="h6">{name}</Typography>
    </Box>
  );
}

GroupCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GroupCard;
