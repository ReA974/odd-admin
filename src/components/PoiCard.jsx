import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Stack } from '@mui/material';

function PoiCard({ id, data }) {
  return (
    <Box
      display="flex"
      sx={{
        border: '1px solid lightGray', padding: '10px 20px', borderRadius: '4px',
      }}
    >
      <Stack>
        <Typography variant="h6">{data.name}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2">{`ID : ${id}`}</Typography>
          <Typography variant="body2">{`Description : ${data.description}`}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

PoiCard.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.node.isRequired,
};

export default PoiCard;
