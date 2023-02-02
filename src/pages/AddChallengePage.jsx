import React, { useEffect, useState } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import SelectStringProps from '../components/inputs/SelectStringProps';
import PictureChallenge from '../components/poi/PictureChallenge';
import QuizzChallenge from '../components/poi/QuizzChallenge';
import QuestionChallenge from '../components/poi/QuestionChallenge';

function AddChallengePage({ challenge, setChallenge }) {
  const [challengeType, setChallengeType] = useState();
  const [pictureChallenge, setPictureChallenge] = useState();
  const [questionChallenge, setQuestionChallenge] = useState();
  const [quizzChallenge, setQuizzChallenge] = useState();
  const challengeTypeSelectable = {
    1: {
      name: 'Prendre une photo',
    },
    2: {
      name: 'Question à choix multiple',
    },
    3: {
      name: 'Question à réponse libre',
    },
  };

  useEffect(() => {
    if (challenge && challenge.type) {
      switch (challenge.type) {
        case 'photo':
          setChallengeType('Prendre une photo');
          if ((challenge && pictureChallenge !== challenge) || challenge === undefined) {
            setPictureChallenge({ challenge });
          }
          break;
        case 'multipleChoice':
          setChallengeType('Question à choix multiple');
          if ((challenge && quizzChallenge !== challenge) || challenge === undefined) {
            setQuizzChallenge({ challenge });
          }
          break;
        case 'field':
          setChallengeType('Question à réponse libre');
          if ((challenge && questionChallenge !== challenge) || challenge === undefined) {
            setQuestionChallenge({ challenge });
          }
          break;
        default:
          break;
      }
    }
  }, [challenge]);
  useEffect(() => {
    if (pictureChallenge && Object.keys(pictureChallenge.challenge).length !== 0) {
      if (challenge && challenge.challenge) {
        Object.keys(challenge.challenge).forEach((chal) => {
          // eslint-disable-next-line
          delete challenge.challenge[chal];
        });
      }
      setChallenge(pictureChallenge);
    }
    if (questionChallenge && Object.keys(questionChallenge.challenge).length !== 0) {
      if (challenge && challenge.challenge) {
        Object.keys(challenge.challenge).forEach((chal) => {
          // eslint-disable-next-line
          delete challenge.challenge[chal];
        });
      }
      setChallenge(questionChallenge);
    }
    if ((quizzChallenge && Object.keys(quizzChallenge.challenge).length !== 0)) {
      if (challenge && challenge.challenge) {
        Object.keys(challenge.challenge).forEach((chal) => {
          // eslint-disable-next-line
          delete challenge.challenge[chal];
        });
      }
      setChallenge(quizzChallenge);
    }
  }, [pictureChallenge, questionChallenge, quizzChallenge]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60vw',
    }}
    >
      <Typography>Défi</Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <SelectStringProps
          label="Type de défi"
          width="50vw"
          minWidth="25vw"
          valueComponent={challengeType}
          setValueComponent={setChallengeType}
          dataSelectable={challengeTypeSelectable}
        />
        {
          challengeType && challengeType === 'Prendre une photo'
          && (
            <PictureChallenge
              setChallenge={
                (value) => setPictureChallenge({ ...pictureChallenge, challenge: value })
              }
              challenge={pictureChallenge && pictureChallenge.challenge}
            />
          )
        }
        {
          challengeType && challengeType === 'Question à choix multiple'
          && (
            <QuizzChallenge
              setChallenge={
                (value) => setQuizzChallenge({ ...quizzChallenge, challenge: value })
              }
              challenge={quizzChallenge && quizzChallenge.challenge}
            />
          )
        }
        {
          challengeType && challengeType === 'Question à réponse libre'
          && (
            <QuestionChallenge
              setChallenge={
                (value) => setQuestionChallenge({ ...questionChallenge, challenge: value })
              }
              challenge={questionChallenge && questionChallenge.challenge}
            />
          )
        }
      </Box>
    </Box>
  );
}

AddChallengePage.propTypes = {
  setChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.instanceOf(Object),
};

AddChallengePage.defaultProps = {
  challenge: undefined,
};

export default AddChallengePage;
