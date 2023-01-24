import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import TextFieldProps from '../components/inputs/TextFieldProps';
import TextAreaProps from '../components/inputs/TextAreaProps';
import SelectProps from '../components/inputs/SelectProps';
import ButtonProps from '../components/inputs/ButtonProps';

function AddPoiPage() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [oddLie, setOddLie] = useState([]);

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
            setValueComponent={setName}
          />
          <TextAreaProps
            placeholder="Description"
            minRows={3}
            value={description}
            setValueComponent={setDescription}
          />
          <SelectProps
            dataSelectable={oddSelectable}
            setValueComponent={setOddLie}
            valueComponent={oddLie}
            label="ODD liés"
            multiple
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <ButtonProps text="Ajouter un défi" variant="outlined" to="/addChallenge" component />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <ButtonProps text="Ajouter le POI" type="submit" to="/addChallenge" component />
      </Box>
    </Box>
  );
}

export default AddPoiPage;
