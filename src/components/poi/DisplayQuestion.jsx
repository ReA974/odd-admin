import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';

function DisplayQuestion({ title, goodAnswer, badAnswers }) {
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
      <Typography variant="h5">Question</Typography>
      <Typography variant="body1" marginBottom="0.5vw">{title}</Typography>
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
  );
}

DisplayQuestion.propTypes = {
  title: PropTypes.string.isRequired,
  goodAnswer: PropTypes.string.isRequired,
  badAnswers: PropTypes.instanceOf(Array).isRequired,
};

export default DisplayQuestion;
