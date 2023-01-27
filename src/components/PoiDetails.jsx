import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Box } from '@mui/system';
import {
  Button, ButtonGroup, Divider, Grid, Stack, Typography,
} from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

function PoiDetails({ id, data }) {
  console.log(data);
  return (
    <Box
      sx={{
        margin: '25px', marginTop: '50px', flexGrow: 1,
      }}
    >
      {data
      && (
        <Grid container spacing={2} sx={{ width: '80vw', maxWidth: '1500px' }}>
          <Grid key={id} item xs={5} sx={{ width: '35vw', minWidth: '300px' }}>
            <Stack
              justifyContent="center"
              alignItems="center"
            >
              <img src={data.imageURL} alt={`${data.name} img`} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
              <Typography variant="h5">{data.name}</Typography>
              <Typography variant="body1">{data.description}</Typography>
              <ButtonGroup>
                <Button>
                  Modifier
                  <EditOutlined />
                </Button>
                <Button>
                  Supprimer
                  <DeleteOutline />
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid key={id} item xs={7} sx={{ width: '35vw', minWidth: '300px' }}>
            <Stack
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">Localisation GPS</Typography>
              <MapContainer
                center={[data.coordinates.latitude, data.coordinates.longitude]}
                zoom={15}
                scrollWheelZoom
                style={{ height: '150px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[data.coordinates.latitude, data.coordinates.longitude]}>
                  <Popup>
                    {data.name}
                  </Popup>
                </Marker>
              </MapContainer>
              {data.question
              && (
              <Stack style={{ textAlign: 'center' }}>
                <Typography variant="h6">Question</Typography>
                <Typography variant="body1">{data.question.title}</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 8 }} style={{ alignItems: 'center' }}>
                  <Grid item xs={6} style={{ backgroundColor: 'lime', color: 'white', borderRadius: '4px' }}>
                    {data.question.goodAnswer}
                  </Grid>
                  {data.question.badAnswers.map((answer) => (
                    <Grid item xs={6} style={{ backgroundColor: 'red', color: 'white', borderRadius: '4px' }}>
                      {answer}
                    </Grid>
                  ))}
                </Grid>
              </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

PoiDetails.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.node.isRequired,
};

export default PoiDetails;
