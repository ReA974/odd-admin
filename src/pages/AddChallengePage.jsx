import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import TextFieldProps from '../components/inputs/TextFieldProps';
import TextAreaProps from '../components/inputs/TextAreaProps';
import ButtonProps from '../components/inputs/ButtonProps';
import SelectStringProps from '../components/inputs/SelectStringProps';

function AddChallengePage() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [challengeType, setChallengeType] = useState();
  const [challengeAnswer, setChallengeAnswer] = useState();

  console.log(challengeType);
  const challengeTypeSelectable = {
    1: {
      name: 'Photo',
    },
    2: {
      name: 'Quizz',
    },
  };

  return (
    <Box>
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
        <SelectStringProps
          label="Type de défi"
          valueComponent={challengeType}
          setValueComponent={setChallengeType}
          dataSelectable={challengeTypeSelectable}
        />
        {
          challengeType && challengeType === 'Photo'
            ? (
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
            )
            : (
              <TextFieldProps
                label="Résultat attendu"
                required
                value={challengeAnswer}
                setValueComponent={setChallengeAnswer}
              />
            )
        }
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <ButtonProps text="Ajouter le défi" type="submit" component />
      </Box>
    </Box>
  );
}

export default AddChallengePage;
