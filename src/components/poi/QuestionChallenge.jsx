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
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <SelectStringProps
        label="Intitulé"
        width="50vw"
        valueComponent={titleType}
        setValueComponent={(value) => setTitleType(value)}
        dataSelectable={titleSelectable}
      />

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
              width="50vw"
              minWidth="25vw"
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
            <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="center">
              <ImportImageFile
                setImgFile={(value) => setChallenge({ ...challenge, image: value })}
                labelId="QuizzChallenge"
              />
              <TextFieldProps
                label="Intitulé"
                value={challenge && challenge.title}
                setValueComponent={(value) => setChallenge({ ...challenge, title: value })}
                width="50vw"
                minWidth="25vw"
                marginTop="10px"
                marginBottom="10px"
                required
              />
            </Box>
          )
        }
        {
          titleType
          && (
            <TextFieldProps
              label="Bonne réponse"
              setValueComponent={
                (value) => setChallenge({ ...challenge, goodAnswer: value, type: 'field' })
              }
              value={challenge && challenge.goodAnswer}
              marginTop="10px"
              width="40vw"
              color="success"
              required
            />
          )
        }
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
