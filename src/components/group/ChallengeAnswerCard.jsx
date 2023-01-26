/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Grid } from '@mui/material';

function ChallengeAnswerCard({
  title, groupAnswer, badAnswers, goodAnswer,
}) {
  const isCorrect = groupAnswer === goodAnswer;
  const answers = [goodAnswer, ...badAnswers];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        border: `1px solid ${isCorrect ? '#1DD75BFF' : '#F22128FF'}`,
        marginTop: '10px',
        borderRadius: '5px',
        width: '80vw',
        maxWidth: '750px',
        minWidth: '250px',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', margin: '5px 0' }}>{title}</Typography>
      <Grid container spacing={2} sx={{ width: '90%' }} display="flex" justifyContent="center">
        {
          answers.map((answer) => (
            <Grid key={answer} item xs={6} sx={{ width: '100px', padding: '5px' }}>
              <Typography
                textAlign="center"
                sx={{
                  background: `${answer === groupAnswer ? isCorrect ? '#1DD75BFF' : '#F22128BF' : ''}`,
                  borderRadius: '5px',
                  padding: '5px 0',
                }}
              >
                {answer}
              </Typography>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}

ChallengeAnswerCard.propTypes = {
  title: PropTypes.string.isRequired,
  groupAnswer: PropTypes.string.isRequired,
  badAnswers: PropTypes.instanceOf(Array).isRequired,
  goodAnswer: PropTypes.string.isRequired,
};

export default ChallengeAnswerCard;
