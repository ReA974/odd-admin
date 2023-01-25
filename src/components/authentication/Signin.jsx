import React, { useState, useRef } from 'react';
import {
  Typography, Box, TextField, FormControlLabel, Checkbox,
  CircularProgress, Button, Link,
} from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../services/authentication.service';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remainMe, setRemainMe] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);

  const onChangeHandler = (event, inputName) => {
    const { value } = event.currentTarget;

    if (inputName === 'email') {
      setEmail(value);
      setEmailError(false);
    } else if (inputName === 'password') {
      setPassword(value);
      setPasswordError(false);
    } else if (inputName === 'remain') {
      setRemainMe(!remainMe);
    }
  };

  const onClickSignin = async (event) => {
    event.preventDefault();
    setError(null);
    setEmailError(false);
    setPasswordError(false);

    if (email === '') {
      setEmailError(true);
      return null;
    }
    if (password === '') {
      setPasswordError(true);
      return null;
    }

    setIsLoading(true);
    const response = await logInWithEmailAndPassword(email, password, remainMe);
    console.log('ma response,', response.code);
    if (response !== '') {
      if (response.code === 'auth/invalid-email') {
        setError("L'adresse mail n'est pas valide");
        setEmailError(true);
      } else if (response.code === 'auth/user-not-found') {
        setError("Aucun compte n'existe avec cette adresse mail");
      } else if (response.code === 'auth/wrong-password') {
        setError('Mot de passe incorrect');
      } else if (response.code === 'auth/network-request-failed') {
        setError('Vérifier votre adresse email ou votre mot de passe...');
      } else {
        setError('Une erreur est survenue');
      }
      setIsLoading(false);
    }
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
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>Connexion</Typography>
        <TextField
          sx={{ margin: '5px 0', width: '80%' }}
          value={email}
          label="Email"
          type="email"
          variant="outlined"
          error={emailError}
          onChange={(event) => onChangeHandler(event, 'email')}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter' && email.length > 0) {
              passwordRef.current.focus();
              ev.preventDefault();
            }
          }}
        />
        <TextField
          sx={{ margin: '5px 0', width: '80%' }}
          value={password}
          type="password"
          label="Mot de passe"
          variant="outlined"
          error={passwordError}
          onChange={(event) => onChangeHandler(event, 'password')}
          inputRef={passwordRef}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '80%' }}>
          <FormControlLabel
            control={<Checkbox checked={remainMe} onChange={(event) => onChangeHandler(event, 'remain')} />}
            label="Se souvenir de moi"
          />
          <Link component={LinkRouter} to="/authentication/reset" underline="none" sx={{ marginTop: '-7px' }}>Mot de passe oublié ?</Link>
        </Box>
        {error !== null
        && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          onClick={(event) => onClickSignin(event)}
          sx={{ margin: '10px 0', padding: '10px 0', width: '80%' }}
        >
          {isLoading ? <CircularProgress /> : 'Connexion'}
        </Button>
      </Box>
    </Box>
  );
}

export default Signin;
