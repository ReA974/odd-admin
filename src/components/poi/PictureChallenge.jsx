import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import TextFieldProps from '../inputs/TextFieldProps';
import ImportImageFile from '../inputs/ImportImageFile';

function PictureChallenge({ setChallenge, challenge }) {
  const [picture, setPicture] = useState();

  useEffect(() => {
    if (picture) {
      setChallenge({ ...challenge, goodAnswer: picture, type: 'photo' });
    }
  }, [picture]);

  return (
    <Box marginBottom="15px">
      <TextFieldProps
        label="Intitulé"
        value={challenge && challenge.title}
        setValueComponent={(value) => setChallenge({ ...challenge, title: value })}
        maxWidth="300px"
        width="100%"
        required
      />
      <ImportImageFile
        setImgFile={(value) => setPicture(value)}
        labelId="imgPictureChallenge"
      />
    </Box>
  );
}

PictureChallenge.propTypes = {
  setChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.instanceOf(Object),
};

PictureChallenge.defaultProps = {
  challenge: undefined,
};

export default PictureChallenge;
