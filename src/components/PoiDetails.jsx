import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Box } from '@mui/system';
import {
  Button, ButtonGroup, CircularProgress, Divider, Grid, Stack, Typography,
} from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

function PoiDetails({ id, data }) {
  console.log(id);
  return (
    <Box
      sx={{
        marginTop: '50px', flexGrow: 1, width: '100%', justifyContent: 'center',
      }}
    >
      {data
      && (
        <Box display="flex" flexDirection="row" justifyContent="center" sx={{ width: '100vw' }}>
          <Box sx={{ width: '40%' }}>
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
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: '25px' }} />
          <Box sx={{ width: '40%' }}>
            <Stack
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
              <Box style={{ textAlign: 'center', alignItems: 'center' }}>
                <Typography variant="h6">Question</Typography>
                <Typography variant="body1">{data.question.title}</Typography>
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 8 }} style={{ alignItems: 'center' }}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      style={{
                        backgroundColor: 'lime',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                    >
                      {data.question.goodAnswer}
                    </Typography>
                  </Grid>
                  {data.question.badAnswers.map((answer) => (
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '5px',
                        }}
                      >
                        {answer}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              )}
            </Stack>
          </Box>
        </Box>
      )}
      {!data && (<CircularProgress />)}
    </Box>
  );
}

PoiDetails.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.node.isRequired,
};

export default PoiDetails;
