import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import SelectStringProps from '../inputs/SelectStringProps';
import PoiQuestion from './PoiQuestion';

function QuizzChallenge({ setChallenge, challenge }) {
  const [titleType, setTitleType] = useState();
  const [badAnswerOne, setBadAnswerOne] = useState();
  const [badAnswerTwo, setBadAnswerTwo] = useState();
  const [badAnswerThree, setBadAnswerThree] = useState();
  const [badAnswers] = useState([]);

  useEffect(() => {
    if (badAnswerOne) {
      badAnswers[0] = badAnswerOne;
    }
    if (badAnswerTwo) {
      badAnswers[1] = badAnswerTwo;
    }
    if (badAnswerThree) {
      badAnswers[2] = badAnswerThree;
    }
    if (badAnswers.length !== 3) {
      setChallenge({
        ...challenge, badAnswers, type: 'question',
      });
    }
  }, [badAnswerOne, badAnswerTwo, badAnswerThree]);

  console.log(challenge);

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
      <Box>
        {
          !!titleType
          && (
            <PoiQuestion
              setParentValues={setChallenge}
              badAnswerOne={badAnswerOne}
              setBadAnswerOne={(value) => setBadAnswerOne(value)}
              badAnswerTwo={badAnswerTwo}
              setBadAnswerTwo={(value) => setBadAnswerTwo(value)}
              badAnswerThree={badAnswerThree}
              setBadAnswerThree={(value) => setBadAnswerThree(value)}
              typeTitle={titleType}
            />
          )
        }
      </Box>
    </Box>
  );
}

QuizzChallenge.propTypes = {
  setChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.instanceOf(Object),
};

QuizzChallenge.defaultProps = {
  challenge: undefined,
};

export default QuizzChallenge;
