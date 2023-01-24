import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Box, IconButton, Dialog, DialogTitle,
  DialogActions, Button,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteGroup } from '../services/groupQueries';

function GroupCard({ id, name }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    handleClose();
    deleteGroup(id);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: '1px solid lightGray', padding: '10px 20px', borderRadius: '4px',
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <IconButton onClick={handleClickOpen}>
        <DeleteOutlineOutlinedIcon color="error" />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {`Voulez-vous vraiment supprimer le groupe "${name}" ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Non</Button>
          <Button onClick={handleDelete} color="error">Oui</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

GroupCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default GroupCard;
