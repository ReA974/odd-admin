import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TextFieldProps from './inputs/TextFieldProps';

function PoiQuestion({
  setParentValues, badAnswerOne, badAnswerTwo, badAnswerThree,
  setBadAnswerOne, setBadAnswerTwo, setBadAnswerThree,
}) {
  const [question, setQuestion] = useState();

  useEffect(() => {
    setParentValues({ ...question });
  }, [question]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center',
    }}
    >
      <Typography>Question</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '15px',
      }}
      >
        <TextFieldProps
          label="Intitulé"
          value={question && question.title}
          setValueComponent={(value) => setQuestion({ ...question, title: value })}
          maxWidth="300px"
          width="100%"
          required
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '20vw',
            marginRight: '10px',
            marginLeft: '10px',
            minWidth: '250px',
            maxWidth: '600px',
          }}
          >
            <TextFieldProps
              label="Bonne réponse"
              setValueComponent={(value) => setQuestion({ ...question, goodAnswer: value })}
              value={question && question.goodAnswer}
              marginTop="10px"
              marginRight="10px"
              marginLeft="10px"
              color="success"
              required
            />
            <TextFieldProps
              label="Mauvaise réponse 1"
              setValueComponent={(value) => setBadAnswerOne(value)}
              value={badAnswerOne}
              marginTop="10px"
              marginRight="10px"
              marginLeft="10px"
              color="error"
              required
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '20vw',
            marginRight: '10px',
            marginLeft: '10px',
            minWidth: '250px',
            maxWidth: '600px',
          }}
          >
            <TextFieldProps
              label="Mauvaise réponse 2"
              setValueComponent={(value) => setBadAnswerTwo(value)}
              value={badAnswerTwo}
              marginTop="10px"
              marginRight="10px"
              marginLeft="10px"
              color="error"
              required
            />
            <TextFieldProps
              label="Mauvaise réponse 3"
              setValueComponent={(value) => setBadAnswerThree(value)}
              value={badAnswerThree}
              marginTop="10px"
              marginRight="10px"
              marginLeft="10px"
              color="error"
              required
            />
          </Box>
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
};

PoiQuestion.defaultProps = {
  badAnswerOne: '',
  badAnswerTwo: '',
  badAnswerThree: '',
};

export default PoiQuestion;
