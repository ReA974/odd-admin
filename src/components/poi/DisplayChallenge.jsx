import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Grid, Stack,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function DisplayChallenge({
  type, title, goodAnswer, badAnswers,
}) {
  return (
    <Box
      marginTop="0.5vw"
      padding="1vw"
      paddingTop="0.5vw"
      border="thin solid lightgrey"
      style={{
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {type === 'multipleChoice' && (
        <Box>
          <Typography variant="h5">Défi</Typography>
          <Typography variant="h6">Question a choix multiple</Typography>
          <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 8 }} style={{ alignItems: 'center' }}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{
                  backgroundColor: 'limegreen',
                  color: 'white',
                  borderRadius: '5px',
                }}
              >
                {goodAnswer}
              </Typography>
            </Grid>
            {badAnswers.map((answer) => (
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  style={{
                    backgroundColor: 'tomato',
                    color: 'white',
                    borderRadius: '5px',
                  }}
                >
                  {answer}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {type === 'field' && (
        <Box display="flex" flexDirection="column">
          <Typography variant="h5">Défi</Typography>
          <Typography variant="h6">Question libre</Typography>
          <Typography>{title}</Typography>
          <Typography
            variant="h6"
            textAlign="center"
          >
            <span
              style={{
                backgroundColor: 'limegreen',
                backgroundSize: 'contain',
                color: 'white',
                borderRadius: '5px',
                padding: '5px',
              }}
            >
              {goodAnswer}
            </span>
          </Typography>
        </Box>
      )}
      {type === 'photo' && (
        <Box>
          <Typography variant="h5">Défi</Typography>
          <Typography variant="h6">Prendre une photo</Typography>
          <Stack direction="row">
            <PhotoCamera sx={{ width: '50%', height: '10vw' }} />
            <Typography sx={{ width: '50%', alignSelf: 'center' }}>{title}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

DisplayChallenge.propTypes = {
  type: PropTypes.oneOf(['multipleChoice', 'field', 'photo']).isRequired,
  title: PropTypes.string,
  goodAnswer: PropTypes.string,
  badAnswers: PropTypes.arrayOf(PropTypes.string),
};

DisplayChallenge.defaultProps = {
  title: '',
  goodAnswer: '',
  badAnswers: [],
};

export default DisplayChallenge;
