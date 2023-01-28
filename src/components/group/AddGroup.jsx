import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogActions, DialogContent,
  TextField, Box, Typography,
} from '@mui/material';
import { addGroup } from '../../services/groupQueries';

function AddGroup() {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setErrorMessage('');
    const regex = /^[0-9\b]+$/;
    switch (event.target.name) {
      case 'name':
        setErrorName(false);
        setName(value);
        break;
      case 'phone':
        if (value === '' || regex.test(value)) {
          setErrorPhone(false);
          setPhone(value);
        }
        break;
      default:
        console.log('Unexpected input');
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setName('');
    setErrorName(false);
    setPhone('');
    setErrorPhone(false);
  };

  const handleAdd = () => {
    if (name === '') {
      setErrorName(true);
      setErrorMessage('Veuillez renseigner un nom de groupe');
    } else if (phone === '' || phone.length !== 10) {
      setErrorPhone(true);
      setErrorMessage('Le numéro de téléphone doit contenir 10 caractères');
    } else {
      handleClose();
      addGroup(name, phone);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>Ajouter un groupe</Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Ajouter un groupe</DialogTitle>
        <DialogContent>
          <Box sx={{ paddingTop: '10px' }}>
            <TextField
              name="name"
              label="Nom du groupe"
              value={name}
              onChange={handleChange}
              variant="outlined"
              error={errorName}
              sx={{ marginRight: '5px' }}
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              name="phone"
              label="Téléphone du référent"
              value={phone}
              onChange={handleChange}
              variant="outlined"
              error={errorPhone}
              inputProps={{ maxLength: 10 }}
            />
          </Box>
          {
            errorMessage !== '' && <Typography color="error">{errorMessage}</Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Annuler</Button>
          <Button onClick={handleAdd} autoFocus>Ajouter</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddGroup;
