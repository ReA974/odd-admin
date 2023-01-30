import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Divider, Typography, Avatar, ButtonGroup, Button, DialogActions, DialogTitle, Dialog,
} from '@mui/material';
import { Landscape, DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import DisplayChallenge from './poi/DisplayChallenge';
import { deletePoi } from '../services/POIQueries';

function PoiDetails({
  id, image, name, description, linkedOdds, coordinates, question, challenge,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    handleClose();
    deletePoi(id);
    navigate('/poi');
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap" paddingTop="40px" sx={{ width: '100%', maxWidth: '1800px' }}>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '49%', minWidth: '350px' }}>
        <Avatar
          alt=""
          src={image}
          variant="rounded"
          sx={{
            height: '30vw',
            width: '80%',
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
            <Typography
              key={odd}
              sx={{
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
          <Button endIcon={<EditOutlined />} color="info" variant="contained">
            Modifier
          </Button>
          <Button onClick={handleClickOpen} endIcon={<DeleteOutline />} color="error" variant="contained">
            Supprimer
          </Button>
        </ButtonGroup>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {`Voulez-vous vraiment supprimer le point d'intéret "${name}" ?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Non</Button>
            <Button onClick={handleDelete} color="error">Oui</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '49%', minWidth: '350px', paddingBottom: '10px' }}>
        <Typography variant="h5" marginBottom="5px">Localisation GPS</Typography>
        <MapContainer
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={15}
          scrollWheelZoom
          style={{ height: '300px', width: '80%' }}
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
        {question
          && (
            <DisplayChallenge
              isChallenge={false}
              type="multipleChoice"
              title={question.title}
              goodAnswer={question.goodAnswer}
              badAnswers={question.badAnswers}
            />
          )}
        {challenge
          && (
            <DisplayChallenge
              isChallenge
              type={challenge.type}
              title={challenge.title}
              imageTitle={challenge.image}
              goodAnswer={challenge.goodAnswer}
              badAnswers={challenge.badAnswers}
            />
          )}
        {!challenge && (
          <Box
            border="thin solid lightgrey"
            borderRadius="5px"
            marginTop="10px"
            style={{
              textAlign: 'center',
              alignItems: 'center',
              width: '80%',
            }}
          >
            <Typography color="lightgrey" variant="h5" sx={{ margin: '15px 0' }}>Pas de défi enregistré</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

PoiDetails.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkedOdds: PropTypes.arrayOf(PropTypes.number).isRequired,
  coordinates: PropTypes.instanceOf(Object).isRequired,
  question: PropTypes.instanceOf(Object).isRequired,
  challenge: PropTypes.instanceOf(Object),
};

PoiDetails.defaultProps = {
  image: '',
  challenge: undefined,
};

export default PoiDetails;
