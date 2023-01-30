import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Divider, Typography, Avatar, ButtonGroup, Button,
} from '@mui/material';
import { Landscape, DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

function PoiDetails({
  image, name, description, linkedOdds, coordinates,
}) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap" sx={{ width: '100%', maxWidth: '1800px' }}>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '49%', background: 'red', minWidth: '350px' }}>
        <Typography>Gauche</Typography>
        <Avatar
          alt=""
          src={image}
          variant="rounded"
          sx={{
            height: '30vw',
            width: '80%',
            minWidth: '250px',
            maxWidth: '600px',
            maxHeight: '330px',
            minHeight: '200px',
          }}
        >
          <Landscape sx={{ width: 200, height: 'auto' }} />
        </Avatar>
        <Typography variant="h4" margin="10px 0" width="80%" textAlign="center">{name}</Typography>
        <Typography variant="body1" align="justify" width="80%">{description}</Typography>
        <Box display="flex" justifyContent="left" width="80%" flexWrap="wrap" marginTop="15px">
          {linkedOdds.map((odd) => (
            <Typography sx={{
              borderRadius: '10px',
              color: '#00BDD6FF',
              background: '#EBFDFFFF',
              padding: '5px',
              margin: '2px',
            }}
            >
              {`ODD ${odd}`}
            </Typography>
          ))}
        </Box>
        <ButtonGroup sx={{ width: '80%', margin: '20px 0' }}>
          <Button endIcon={<EditOutlined />} color="info">
            Modifier
          </Button>
          <Button endIcon={<DeleteOutline />} color="error">
            Supprimer
          </Button>
        </ButtonGroup>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '49%', background: 'green', minWidth: '350px' }}>
        <Typography>Droite</Typography>
        <Typography variant="h5" marginBottom="0.5vw">Localisation GPS</Typography>
        <MapContainer
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={15}
          scrollWheelZoom
          style={{ height: '13vw', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.latitude, coordinates.longitude]}>
            <Popup>
              {name}
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}

PoiDetails.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkedOdds: PropTypes.arrayOf(PropTypes.string).isRequired,
  coordinates: PropTypes.instanceOf(Object).isRequired,
};

PoiDetails.defaultProps = {
  image: '',
};

export default PoiDetails;
