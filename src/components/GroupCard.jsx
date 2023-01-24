import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardContent } from '@mui/material';

function GroupCard({ name }) {
  return (
    <Card sx={{ maxWidth: 750 }}>
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
    </Card>
  );
}

GroupCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GroupCard;
