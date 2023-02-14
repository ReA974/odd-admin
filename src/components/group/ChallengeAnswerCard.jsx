/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Box, Grid, Avatar,
} from '@mui/material';
import { getImage } from '../../services/groupQueries';

function ChallengeAnswerCard({
  type, title, imageTitle, groupAnswer, badAnswers, goodAnswer, photoAnswer,
}) {
  const isCorrect = type === 'photo' ? groupAnswer === true : groupAnswer.toUpperCase() === goodAnswer.toUpperCase();
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
      if (photoAnswer) {
        const img = await getImage(photoAnswer);
        setImageAnswer(img);
      }
    }
    dlImage();
  }, [photoAnswer]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
      sx={{
        border: `1px solid ${isCorrect ? '#1DD75BFF' : '#F22128FF'}`,
        marginTop: '10px',
        borderRadius: '5px',
        width: '80vw',
        maxWidth: '750px',
        minWidth: '250px',
      }}
    >
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
      <Box display="flex" flexDirection="column" alignItems="center" maxWidth="50%" minWidth="250px">
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', margin: '5px 0' }} textAlign="center">{title}</Typography>
        {type === 'multipleChoice'
        && (
        <Grid container spacing={2} sx={{ width: '90%' }} display="flex" justifyContent="center">
          {
            answers.map((answer) => (
              <Grid key={answer} item xs={6} sx={{ width: '100px', padding: '5px' }}>
                <Typography
                  textAlign="center"
                  sx={{
                    background: `${answer.toUpperCase() === groupAnswer.toUpperCase() ? isCorrect ? '#1DD75BFF' : '#F22128BF' : ''}`,
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
              background: `${isCorrect ? '#1DD75BFF' : '#F22128BF'}`,
              borderRadius: '5px',
              padding: '5px',
              marginBottom: '5px',
            }}
          >
            {groupAnswer}
          </Typography>
        )}
        { photoAnswer
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

ChallengeAnswerCard.propTypes = {
  type: PropTypes.oneOf(['multipleChoice', 'field', 'photo']).isRequired,
  title: PropTypes.string,
  imageTitle: PropTypes.string,
  groupAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  badAnswers: PropTypes.instanceOf(Array),
  goodAnswer: PropTypes.string,
  photoAnswer: PropTypes.string,
};

ChallengeAnswerCard.defaultProps = {
  title: undefined,
  imageTitle: undefined,
  badAnswers: undefined,
  goodAnswer: undefined,
  photoAnswer: undefined,
};

export default ChallengeAnswerCard;
