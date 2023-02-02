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
        setValueComponent={(value) => setChallenge({ ...challenge, title: value, type: 'photo' })}
        width="50vw"
        minWidth="25vw"
        marginBottom="10px"
        required
      />
      <ImportImageFile
        setImgFile={(value) => setPicture(value)}
        image={challenge && challenge.goodAnswer}
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
