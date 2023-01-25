import React, { useState } from 'react';
import {
  TextField, Typography, CircularProgress,
  Button, Box,
} from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import { resetPassword } from '../../services/authentication.service';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event, name) => {
    const { value } = event.currentTarget;
    if (name === 'email') {
      setEmail(value);
      setEmailError(false);
    }
  };

  const handleResetClick = async (event) => {
    event.preventDefault();
    setError(null);
    setEmailError(null);

    if (email === '') {
      setEmailError(true);
      return null;
    }

    setIsLoading(true);
    const response = await resetPassword(email);
    if (response !== '') {
      if (response.code === 'auth/invalid-email') {
        setError("L'adresse mail n'est pas valide");
        setEmailError(true);
      } else if (response.code === 'auth/user-not-found') {
        setError("Aucun compte n'existe avec cette adresse mail");
      } else if (response.code === 'auth/network-request-failed') {
        setError('Vérifiez votre connexion internet');
      } else {
        setError('Une erreur est survenue');
      }
    } else {
      setEmailHasBeenSent(true);
    }
    setIsLoading(false);
    return null;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: '150px', width: '80vw', maxWidth: '600px', minWidth: '300px', borderRadius: '5px', padding: '40px 20px', boxShadow: '0px 0px 15px -5px rgba(0,0,0,0.49)',
        }}
      >
        <Typography variant="h5">Réinitialiser le mot de passe</Typography>
        <Typography textAlign="center" sx={{ margin: '20px 0', width: '80%' }}>
          Veuillez entrer l&apos;adresse mail de votre compte,
          un email va vous être envoyé afin de réinitialiser
          votre mot de passe.
        </Typography>
        <TextField
          sx={{ margin: '5px 0', width: '80%' }}
          value={email}
          type="email"
          label="Email"
          variant="outlined"
          error={emailError}
          onChange={(event) => onChangeHandler(event, 'email')}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter' && email.length > 0) {
              handleResetClick(ev);
              ev.preventDefault();
            }
          }}
        />
        {error !== null && <Typography color="error">{error}</Typography>}
        <Button sx={{ margin: '10px 0', padding: '10px 0', width: '80%' }} variant="contained" onClick={(event) => handleResetClick(event)}>
          { isLoading
            ? <CircularProgress /> : 'Réinitialiser'}
        </Button>
        {emailHasBeenSent
        && <Typography>Un email vous a été envoyé</Typography>}
        <Button component={LinkRouter} to="/authentication/signin">Se connecter</Button>
      </Box>
    </Box>
  );
}

export default ResetPassword;
