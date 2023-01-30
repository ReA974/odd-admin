import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Box } from '@mui/system';
import {
  Button, ButtonGroup, CircularProgress, Divider, Grid, Stack, Typography,
} from '@mui/material';
import {
  DeleteOutline, EditOutlined, PhotoCamera,
} from '@mui/icons-material';
import DisplayQuestion from './poi/DisplayQuestion';

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
            <Stack>
              <img
                src={data.imageURL}
                alt={`${data.name} img`}
                style={{
                  height: '18vw',
                  width: '90%',
                  objectFit: 'cover',
                  borderRadius: '1vw',
                  alignSelf: 'center',
                }}
              />
              <Typography variant="h4" marginTop="1vw" marginBottom="1.5vw" textAlign="center">{data.name}</Typography>
              <Typography variant="body1" align="justify">{data.description}</Typography>
              <Box display="flex" justifyContent="left">
                {data.linkedODD.map((odd) => (
                  <Typography sx={{
                    borderStyle: 'solid',
                    borderRadius: '10px',
                    borderWidth: 'thin',
                    color: 'lightskyblue',
                    padding: '5px',
                    marginTop: '1vw',
                    marginBottom: '1vw',
                  }}
                  >
                    {`ODD ${odd}`}
                  </Typography>
                ))}
              </Box>
              <ButtonGroup>
                <Button endIcon={<EditOutlined />} color="info">
                  Modifier
                </Button>
                <Button endIcon={<DeleteOutline />} color="error">
                  Supprimer
                </Button>
              </ButtonGroup>
            </Stack>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: '25px' }} />
          <Box sx={{ width: '40%' }}>
            <Stack
              alignItems="center"
            >
              <Typography variant="h5" marginBottom="0.5vw">Localisation GPS</Typography>
              <MapContainer
                center={[data.coordinates.latitude, data.coordinates.longitude]}
                zoom={15}
                scrollWheelZoom
                style={{ height: '13vw', width: '100%' }}
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
                <DisplayQuestion
                  title={data.question.title}
                  goodAnswer={data.question.goodAnswer}
                  badAnswers={data.question.badAnswers}
                />
              )}
              {data.challenge && (
              <Box
                marginTop="0.5vw"
                padding="1vw"
                paddingTop="0.5vw"
                border="thin solid lightgrey"
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {data.challenge.type === 'multipleChoice' && (
                  <Box>
                    <Typography variant="h5">Défi</Typography>
                    <Typography variant="h6">Question a choix multiple</Typography>
                    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 8 }} style={{ alignItems: 'center' }}>
                      <Grid item xs={6}>
                        <Typography
                          variant="h6"
                          style={{
                            backgroundColor: 'limegreen',
                            color: 'white',
                            borderRadius: '5px',
                          }}
                        >
                          {data.challenge.goodAnswer}
                        </Typography>
                      </Grid>
                      {data.challenge.badAnswers.map((answer) => (
                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            style={{
                              backgroundColor: 'tomato',
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
                {data.challenge.type === 'field' && (
                  <Box display="flex" flexDirection="column">
                    <Typography variant="h5">Défi</Typography>
                    <Typography variant="h6">Question libre</Typography>
                    <Typography>{data.challenge.title}</Typography>
                    <Typography
                      variant="h6"
                      textAlign="center"
                    >
                      <span
                        style={{
                          backgroundColor: 'limegreen',
                          backgroundSize: 'contain',
                          color: 'white',
                          borderRadius: '5px',
                          padding: '5px',
                        }}
                      >
                        {data.challenge.goodAnswer}
                      </span>
                    </Typography>
                  </Box>
                )}
                {data.challenge.type === 'photo' && (
                  <Box>
                    <Typography variant="h5">Défi</Typography>
                    <Typography variant="h6">Prendre une photo</Typography>
                    <Stack direction="row">
                      <PhotoCamera sx={{ width: '50%', height: '10vw' }} />
                      <Typography sx={{ width: '50%', alignSelf: 'center' }}>{data.challenge.title}</Typography>
                    </Stack>
                  </Box>
                )}
              </Box>
              )}
              {!data.challenge && (
                <Box
                  marginTop="0.5vw"
                  padding="1vw"
                  paddingTop="0.5vw"
                  border="thin solid lightgrey"
                  style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography color="lightgrey" variant="h3">Pas de défis enregistrés</Typography>
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
