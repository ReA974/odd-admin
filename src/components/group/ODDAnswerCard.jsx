import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';

function arrayEquals(a, b) {
  return Array.isArray(a)
      && Array.isArray(b)
      && a.length === b.length
      && a.every((val, index) => val === b[index]);
}

function ODDAnswerCard({ choosedOdds, poiOdds }) {
  const sortedChoosed = choosedOdds.sort((a, b) => a - b);
  const sortedOdd = poiOdds.sort((a, b) => a - b);
  const isCorrect = arrayEquals(sortedChoosed, sortedOdd);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        border: `1px solid ${isCorrect ? '#1DD75BFF' : '#F22128FF'}`,
        marginTop: '10px',
        paddingBottom: '10px',
        borderRadius: '5px',
        width: '80vw',
        maxWidth: '750px',
        minWidth: '250px',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', margin: '5px 0' }}>ODD choisis</Typography>
      <Box display="flex">
        {
          choosedOdds.map((odd) => (
            <Typography
              key={odd}
              textAlign="center"
              sx={{
                background: `${poiOdds.includes(odd) ? '#1DD75BFF' : '#F22128BF'}`,
                borderRadius: '5px',
                padding: '5px',
                margin: '5px',
              }}
            >
              {`ODD ${odd}`}
            </Typography>
          ))
        }
      </Box>
    </Box>
  );
}

ODDAnswerCard.propTypes = {
  choosedOdds: PropTypes.instanceOf(Array).isRequired,
  poiOdds: PropTypes.instanceOf(Array).isRequired,
};

export default ODDAnswerCard;
