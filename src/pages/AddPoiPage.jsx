import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { GeoPoint } from '@firebase/firestore';
import { PhotoCamera } from '@mui/icons-material';
import TextFieldProps from '../components/inputs/TextFieldProps';
import TextAreaProps from '../components/inputs/TextAreaProps';
import ButtonProps from '../components/inputs/ButtonProps';
import AddChallengePage from './AddChallengePage';
import SelectObjectProps from '../components/inputs/SelectObjectProps';
import { addPoi } from '../services/POIQueries';

function AddPoiPage() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [linkedOdd, setLinkedOdd] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [errorName, setErrorName] = useState(false);
  const [errorLatitude, setErrorLatitude] = useState(false);
  const [errorLongitude, setErrorLongitude] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [displayAddChallenge, setDisplayAddChallenge] = useState(false);

  const handleAddPoi = () => {
    const regex = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    if (name === '') {
      setErrorName(true);
      setErrorMessage('Veuillez renseigner un nom de POI');
    } else if (description === '') {
      setErrorMessage('Veuillez renseigner une description du POI');
    } else if (linkedOdd === []) {
      setErrorMessage('Veuillez renseigner un ou plusieurs ODD lié(s) au POI');
    } else if (latitude === '') {
      setErrorLatitude(true);
      setErrorMessage('Veuillez renseigner la latitude du POI');
    } else if (longitude === '') {
      setErrorLongitude(true);
      setErrorMessage('Veuillez renseigner la longitude du POI');
    } else if (!regex.test(latitude)) {
      setErrorLatitude(true);
      setErrorMessage('Veuillez renseigner la latitude seulement avec des des chiffres et un point');
    } else if (!regex.test(longitude)) {
      setErrorLongitude(true);
      setErrorMessage('Veuillez renseigner la longitude seulement avec des des chiffres et une virgule');
    } else {
      const geoPoint = new GeoPoint(Number(latitude), Number(longitude));
      addPoi(name, description, linkedOdd, geoPoint);
      setErrorLongitude(false);
      setErrorLatitude(false);
      setErrorName(false);
      setErrorMessage('');
    }
  };

  const oddSelectable = {
    1: {
      name: 'odd1',
      description: 'je suis l\'odd1',
    },
    2: {
      name: 'odd2',
      description: 'je suis l\'odd2',
    },
  };

  return (
    <Box>
      <Box
        component="form"
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Box>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextFieldProps
            label="Nom"
            required
            value={name}
            error={errorName}
            setValueComponent={setName}
          />
          <TextAreaProps
            placeholder="Description"
            minRows={3}
            value={description}
            setValueComponent={setDescription}
          />
          <SelectObjectProps
            dataSelectable={oddSelectable}
            setValueComponent={setLinkedOdd}
            valueComponent={linkedOdd}
            label="ODD liés"
            multiple
          />
          <TextFieldProps
            label="Latitude"
            required
            value={latitude}
            error={errorLatitude}
            setValueComponent={setLatitude}
          />
          <TextFieldProps
            label="Longitude"
            required
            value={longitude}
            error={errorLongitude}
            setValueComponent={setLongitude}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {
          displayAddChallenge
            ? <AddChallengePage />
            : <Button variant="outlined" onClick={() => setDisplayAddChallenge(!displayAddChallenge)}>Ajouter un défi</Button>
        }
      </Box>
      {
        errorMessage !== '' && <Typography color="error">{errorMessage}</Typography>
      }
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <ButtonProps text="Ajouter le POI" type="submit" onClick={handleAddPoi} />
      </Box>
    </Box>
  );
}

export default AddPoiPage;
