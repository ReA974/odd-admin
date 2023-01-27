import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

function PoiCard({ id, data }) {
  return (
    <Card
      display="flex"
      sx={{
        border: '1px solid lightGray', padding: '10px 20px', borderRadius: '4px',
      }}
    >
      <CardHeader title={data.name} />
      <CardMedia alt={`${data.name} image`} />
      <CardContent>
        <Typography variant="body1">{`Description : ${data.description}`}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`/poi/${id}`}>
          <Button variant="contained">
            Voir les details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

PoiCard.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.node.isRequired,
};

export default PoiCard;
