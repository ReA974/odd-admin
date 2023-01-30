import React, { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import SelectStringProps from '../inputs/SelectStringProps';
import TextFieldProps from '../inputs/TextFieldProps';
import ImportImageFile from '../inputs/ImportImageFile';

function QuestionChallenge({ setChallenge, challenge }) {
  const [titleType, setTitleType] = useState();
  const titleSelectable = {
    1: {
      name: 'Image',
    },
    2: {
      name: 'Texte',
    },
    3: {
      name: 'Les deux',
    },
  };
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center',
    }}
    >
      <SelectStringProps
        label="Intitulé"
        width="100%"
        valueComponent={titleType}
        setValueComponent={(value) => setTitleType(value)}
        dataSelectable={titleSelectable}
      />

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '15px',
      }}
      >
        {
          (titleType === 'Texte' || titleType === '')
          && (
            <TextFieldProps
              label="Intitulé"
              value={challenge && challenge.title}
              setValueComponent={(value) => setChallenge({ ...challenge, title: value })}
              maxWidth="300px"
              width="100%"
              required
            />
          )
        }
        {
          titleType === 'Image'
          && (
            <ImportImageFile
              setImgFile={(value) => setChallenge({ ...challenge, image: value })}
              labelId="QuizzChallenge"
            />
          )
        }
        {
          titleType === 'Les deux'
          && (
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <ImportImageFile
                setImgFile={(value) => setChallenge({ ...challenge, image: value })}
                labelId="QuizzChallenge"
              />
              <TextFieldProps
                label="Intitulé"
                value={challenge && challenge.title}
                setValueComponent={(value) => setChallenge({ ...challenge, title: value })}
                maxWidth="300px"
                width="100%"
                required
              />
            </Box>
          )
        }
        <TextFieldProps
          label="Bonne réponse"
          setValueComponent={(value) => setChallenge({ ...challenge, goodAnswer: value, type: 'field' })}
          value={challenge && challenge.goodAnswer}
          marginTop="10px"
          marginRight="10px"
          color="success"
          required
        />
      </Box>
    </Box>
  );
}

QuestionChallenge.propTypes = {
  setChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.instanceOf(Object),
};

QuestionChallenge.defaultProps = {
  challenge: undefined,
};

export default QuestionChallenge;
