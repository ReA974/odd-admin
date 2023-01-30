import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';

function DisplayQuestion({ title, goodAnswer, badAnswers }) {
  return (
    <Box
      padding="1vw"
      margin="10px"
      border="thin solid lightgrey"
      borderRadius="5px"
      style={{
        textAlign: 'center',
        alignItems: 'center',
        width: '80%',
      }}
    >
      <Typography variant="h5">Question</Typography>
      <Typography variant="body1" marginBottom="0.5vw">{title}</Typography>
      <Grid container rowSpacing={2} columnSpacing={2} style={{ alignItems: 'center' }}>
        <Grid item xs={6}>
          <Typography
            textAlign="center"
            sx={{
              background: '#1DD75BFF',
              borderRadius: '5px',
              padding: '5px',
            }}
          >
            {goodAnswer}
          </Typography>
        </Grid>
        {badAnswers.map((answer) => (
          <Grid key={answer} item xs={6}>
            <Typography
              textAlign="center"
              sx={{
                background: '#F22128BF',
                borderRadius: '5px',
                padding: '5px',
              }}
            >
              {answer}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

DisplayQuestion.propTypes = {
  title: PropTypes.string.isRequired,
  goodAnswer: PropTypes.string.isRequired,
  badAnswers: PropTypes.instanceOf(Array).isRequired,
};

export default DisplayQuestion;
