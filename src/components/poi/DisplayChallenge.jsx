/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Box, Grid, Avatar,
} from '@mui/material';
import { getImage } from '../../services/groupQueries';

function DisplayChallenge({
  isChallenge, type, title, imageTitle, badAnswers, goodAnswer,
}) {
  const answers = type === 'multipleChoice' ? [goodAnswer, ...badAnswers] : [];
  const [imageTitleDl, setImageTitleDl] = useState(undefined);
  const [imageAnswer, setImageAnswer] = useState(undefined);

  useEffect(() => {
    async function dlImage() {
      if (imageTitle) {
        const img = await getImage(imageTitle);
        setImageTitleDl(img);
      }
    }
    dlImage();
  }, [imageTitle]);

  useEffect(() => {
    async function dlImage() {
      if (goodAnswer) {
        const img = await getImage(goodAnswer);
        setImageAnswer(img);
      }
    }
    if (type === 'photo') {
      dlImage();
    }
  }, [goodAnswer]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
      sx={{
        border: '1px solid lightgrey',
        marginTop: '10px',
        paddingBottom: '10px',
        borderRadius: '5px',
        width: '80%',
        maxWidth: '750px',
        minWidth: '250px',
      }}
    >
      <Typography variant="h6" margin="5px">{isChallenge ? 'Défi' : 'Question'}</Typography>
      { imageTitle
        && (
        <Avatar
          src={imageTitleDl}
          sx={{
            height: '30vw',
            width: '35vw',
            minWidth: '250px',
            maxWidth: '200px',
            maxHeight: '110px',
            minHeight: '200px',
            margin: '5px',
          }}
          variant="rounded"
        />
        )}
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '5px' }} textAlign="center">{title}</Typography>
        {type === 'multipleChoice'
        && (
        <Grid container spacing={1} sx={{ width: '90%' }} display="flex" justifyContent="center" flexWrap="wrap">
          {
            answers.map((answer) => (
              <Grid key={answer} item xs={6} sx={{ width: '100px', padding: '5px', minWidth: '200px' }}>
                <Typography
                  textAlign="center"
                  sx={{
                    background: `${answer === goodAnswer ? '#1DD75BFF' : '#F22128BF'}`,
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
        )}
        {type === 'field'
        && (
          <Typography
            textAlign="center"
            sx={{
              background: '#1DD75BFF',
              borderRadius: '5px',
              padding: '5px',
              marginBottom: '5px',
            }}
          >
            {goodAnswer}
          </Typography>
        )}
        { imageAnswer
          && (
          <Avatar
            src={imageAnswer}
            sx={{
              height: '30vw',
              width: '35vw',
              minWidth: '250px',
              maxWidth: '200px',
              maxHeight: '110px',
              minHeight: '200px',
              margin: '5px',
            }}
            variant="rounded"
          />
          )}
      </Box>
    </Box>
  );
}

DisplayChallenge.propTypes = {
  isChallenge: PropTypes.bool,
  type: PropTypes.oneOf(['multipleChoice', 'field', 'photo']).isRequired,
  title: PropTypes.string,
  imageTitle: PropTypes.string,
  badAnswers: PropTypes.instanceOf(Array),
  goodAnswer: PropTypes.string,
};

DisplayChallenge.defaultProps = {
  isChallenge: false,
  title: undefined,
  imageTitle: undefined,
  badAnswers: undefined,
  goodAnswer: undefined,
};

export default DisplayChallenge;
