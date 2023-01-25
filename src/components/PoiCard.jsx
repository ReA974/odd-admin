import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Stack, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

function PoiCard({ id, data }) {
  return (
    <Accordion
      display="flex"
      sx={{
        border: '1px solid lightGray', padding: '10px 20px', borderRadius: '4px',
      }}
    >
      <AccordionSummary>
        <Stack>
          <Typography variant="h6">{data.name}</Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body1">{`ID : ${id}`}</Typography>
            <Typography variant="body1">{`Description : ${data.description}`}</Typography>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <MapContainer
          center={[data.coordinates.latitude, data.coordinates.longitude]}
          zoom={15}
          scrollWheelZoom
          style={{ height: '200px' }}
          sx={{ border: '1px solid black' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[data.coordinates.latitude, data.coordinates.longitude]}>
            <Popup>
              {data.name}
            </Popup>
          </Marker>
        </MapContainer>
      </AccordionDetails>
    </Accordion>
  );
}

PoiCard.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.node.isRequired,
};

export default PoiCard;
