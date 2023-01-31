import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TextFieldProps from '../inputs/TextFieldProps';
import ImportImageFile from '../inputs/ImportImageFile';

function PoiQuestion({
  setParentValues, badAnswerOne, badAnswerTwo, badAnswerThree,
  setBadAnswerOne, setBadAnswerTwo, setBadAnswerThree, typeTitle,
  parentValues,
}) {
  const [question, setQuestion] = useState(parentValues);

  useEffect(() => {
    if (parentValues) {
      setQuestion(parentValues);
    }
  }, [parentValues]);

  useEffect(() => {
    if ((parentValues && question !== parentValues) || parentValues === undefined) {
      setParentValues({ ...question });
    }
  }, [question]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center',
    }}
    >
      {
        typeTitle === ''
        && (
          <Typography>Question</Typography>
        )
      }
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        margin: '15px',
      }}
      >
        {
          (typeTitle === 'Texte' || typeTitle === undefined)
          && (
            <TextFieldProps
              label="Intitulé"
              value={question && question.title}
              setValueComponent={(value) => setQuestion({ ...question, title: value })}
              maxWidth="40vw"
              marginBottom="10px"
              required
            />
          )
        }
        {
          typeTitle === 'Image'
          && (
            <ImportImageFile
              setImgFile={(value) => setQuestion({ ...question, image: value })}
              image={question && question.image}
              labelId="QuizzChallenge"
            />
          )
        }
        {
          typeTitle === 'Les deux'
          && (
            <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="center">
              <ImportImageFile
                setImgFile={(value) => setQuestion({ ...question, image: value })}
                image={question && question.image}
                labelId="QuizzChallenge"
              />
              <TextFieldProps
                label="Intitulé"
                value={question && question.title}
                setValueComponent={(value) => setQuestion({ ...question, title: value })}
                maxWidth="40vw"
                marginBottom="10px"
                marginTop="10px"
                required
              />
            </Box>
          )
        }
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <Grid
            container
            spacing={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Grid item xs={6} minWidth="200px">
              <TextFieldProps
                label="Bonne réponse"
                setValueComponent={(value) => setQuestion({ ...question, goodAnswer: value })}
                value={question && question.goodAnswer}
                color="success"
                required
              />
            </Grid>
            <Grid item xs={6} minWidth="200px">
              <TextFieldProps
                label="Mauvaise réponse 1"
                setValueComponent={(value) => setBadAnswerOne(value)}
                value={badAnswerOne && badAnswerOne}
                color="error"
                required
              />
            </Grid>
            <Grid item xs={6} minWidth="200px">
              <TextFieldProps
                label="Mauvaise réponse 2"
                setValueComponent={(value) => setBadAnswerTwo(value)}
                value={badAnswerTwo && badAnswerTwo}
                color="error"
                required
              />
            </Grid>
            <Grid item xs={6} minWidth="200px">
              <TextFieldProps
                label="Mauvaise réponse 3"
                setValueComponent={(value) => setBadAnswerThree(value)}
                value={badAnswerThree && badAnswerThree}
                color="error"
                required
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

PoiQuestion.propTypes = {
  setParentValues: PropTypes.func.isRequired,
  setBadAnswerOne: PropTypes.func.isRequired,
  setBadAnswerTwo: PropTypes.func.isRequired,
  setBadAnswerThree: PropTypes.func.isRequired,
  badAnswerOne: PropTypes.string,
  badAnswerTwo: PropTypes.string,
  badAnswerThree: PropTypes.string,
  parentValues: PropTypes.instanceOf(Object),
  typeTitle: PropTypes.string,
};

PoiQuestion.defaultProps = {
  badAnswerOne: '',
  badAnswerTwo: '',
  badAnswerThree: '',
  typeTitle: undefined,
  parentValues: undefined,
};

export default PoiQuestion;
