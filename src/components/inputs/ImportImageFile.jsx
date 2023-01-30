import React, { useState } from 'react';
import {
  Avatar, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';

function ImportImageFile({ setImgFile, labelId }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentImg, setCurrentImg] = useState('');

  const handleChange = async (event) => {
    setErrorMessage('');
    setCurrentImg(URL.createObjectURL(event.target?.files?.[0]));
    setImgFile(event.target?.files?.[0]);
  };

  return (
    <Box display="flex" justifyContent="center">
      <label htmlFor={labelId}>
        <Avatar
          alt=""
          src={currentImg}
          variant="rounded"
          sx={{
            height: '30vw',
            width: '35vw',
            minWidth: '200px',
            maxWidth: '600px',
            maxHeight: '330px',
            minHeight: '170px',
            marginBottom: '10px',
          }}
        >
          <ImageIcon sx={{
            width: 150, minWidth: 100, height: 'auto',
          }}
          />
        </Avatar>
        <input
          onChange={handleChange}
          type="file"
          accept="image/png, image/jpeg"
          name="picture"
          id={labelId}
          hidden
        />
      </label>
      { errorMessage && <Typography>{errorMessage}</Typography> }
    </Box>
  );
}

ImportImageFile.propTypes = {
  setImgFile: PropTypes.func.isRequired,
  labelId: PropTypes.string.isRequired,
};

export default ImportImageFile;
