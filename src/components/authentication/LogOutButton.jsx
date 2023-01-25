import React from 'react';
import { IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logOut } from '../../services/authentication.service';

function LogOutButton() {
  const handleClick = () => {
    logOut();
  };

  return (
    <IconButton onClick={handleClick}>
      <Logout />
    </IconButton>
  );
}

export default LogOutButton;
