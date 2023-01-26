import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';

function ImportImageFile({ picture, setImgFile }) {
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = async (event) => {
    setErrorMessage('');
    setImgFile(event.target?.files?.[0]);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Typography>Ajouter votre image</Typography>
      <img alt="" src={picture} />
      <IconButton onChange={handleChange} component="label">
        <>
          <EditOutlined />
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="picture"
            hidden
          />
        </>
      </IconButton>
      { errorMessage && <Typography>{errorMessage}</Typography> }
    </Box>
  );
}

ImportImageFile.propTypes = {
  picture: PropTypes.string,
  setImgFile: PropTypes.func.isRequired,
};

ImportImageFile.defaultProps = {
  picture: '',
};

export default ImportImageFile;
