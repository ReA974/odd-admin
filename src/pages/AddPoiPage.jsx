import React, { useEffect, useState } from 'react';
import {
  Box, CircularProgress,
  Typography,
} from '@mui/material';
import { GeoPoint } from '@firebase/firestore';
import Compressor from 'compressorjs';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import TextFieldProps from '../components/inputs/TextFieldProps';
import TextAreaProps from '../components/inputs/TextAreaProps';
import ButtonProps from '../components/inputs/ButtonProps';
import SelectObjectProps from '../components/inputs/SelectObjectProps';
import {
  addPoi, getPOI, getPoiPicture, setPoiPicture, updatePoi,
} from '../services/POIQueries';
import getAllODD from '../services/ODDQueries';
import ImportImageFile from '../components/inputs/ImportImageFile';
import PoiQuestion from '../components/poi/PoiQuestion';
import AddChallengePage from './AddChallengePage';

function AddPoiPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [linkedOdd, setLinkedOdd] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [picture, setPicture] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [question, setQuestion] = useState();
  const [badAnswers] = useState([]);
  const [badAnswerOne, setBadAnswerOne] = useState();
  const [badAnswerTwo, setBadAnswerTwo] = useState();
  const [badAnswerThree, setBadAnswerThree] = useState();
  const [challenge, setChallenge] = useState();
  const [challengePicture, setChallengePicture] = useState();
  const [errorName, setErrorName] = useState(false);
  const [errorLatitude, setErrorLatitude] = useState(false);
  const [errorLongitude, setErrorLongitude] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ODDListData, setODDListData] = useState(undefined);
  const [update, setUpdate] = useState(false);
  const urlParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorName === true) {
      setErrorName(false);
    }
    if (errorLongitude === true) {
      setErrorLongitude(false);
    }
    if (errorLatitude === true) {
      setErrorLatitude(false);
    }
  }, [name, latitude, longitude]);

  useEffect(() => {
    async function fetchDataOdd() {
      const fetchedData = await getAllODD();
      if (fetchedData !== null) {
        setODDListData(fetchedData);
      } else {
        setODDListData(null);
      }
    }
    fetchDataOdd();
  }, []);

  useEffect(() => {
    async function fetchDataPoi() {
      const fetchedData = await getPOI(urlParams.id);
      if (fetchedData !== null) {
        setUpdate(true);
        fetchedData.imageURL = await getPoiPicture(urlParams.id);
        setPicture(`/POI/${urlParams.id}`);
        if (
          fetchedData.name && fetchedData.description
          && fetchedData.linkedODD && fetchedData.coordinates
          && fetchedData.question && fetchedData.challenge
        ) {
          setName(fetchedData.name);
          setDescription(fetchedData.description);
          setLinkedOdd(fetchedData.linkedODD);
          // eslint-disable-next-line dot-notation
          setLatitude(String(fetchedData.coordinates['_lat']));
          // eslint-disable-next-line dot-notation
          setLongitude(String(fetchedData.coordinates['_long']));
          setBadAnswerOne(fetchedData.question.badAnswers[0]);
          setBadAnswerTwo(fetchedData.question.badAnswers[1]);
          setBadAnswerThree(fetchedData.question.badAnswers[2]);
          setQuestion({
            ...question,
            title: fetchedData.question.title,
            goodAnswer: fetchedData.question.goodAnswer,
          });
          setChallenge({ ...challenge, ...fetchedData.challenge });
          if (fetchedData.challenge.image) {
            setChallengePicture(fetchedData.challenge.image);
          } else if (fetchedData.challenge.type === 'photo') {
            setChallengePicture(fetchedData.challenge.goodAnswer);
          }
        }
      }
    }
    if (urlParams.id) {
      fetchDataPoi();
    }
  }, []);

  const saveImg = (poiId, url, file) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.6,
      success: async (compressedResult) => {
        const response = await setPoiPicture(poiId, compressedResult, url);
        if (!response[0]) {
          setErrorMessage('Une erreur est survenue, réessayez');
        }
      },
    });
  };

  const handleAddPoi = async () => {
    setErrorMessage('');
    const regex = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    badAnswers.length = 0;
    if (badAnswerOne !== undefined) {
      badAnswers.push(badAnswerOne);
    }
    if (badAnswerTwo !== undefined) {
      badAnswers.push(badAnswerTwo);
    }
    if (badAnswerThree !== undefined) {
      badAnswers.push(badAnswerThree);
    }
    question.badAnswers = badAnswers;
    setQuestion({ ...question });
    if (name === '') {
      setErrorName(true);
      setErrorMessage('Veuillez renseigner un nom de POI');
    } else if (description === '') {
      setErrorMessage('Veuillez renseigner une description du POI');
    } else if (linkedOdd.length === 0) {
      setErrorMessage('Veuillez renseigner un ou plusieurs ODD lié(s) au POI');
    } else if (latitude === '') {
      setErrorLatitude(true);
      setErrorMessage('Veuillez renseigner la latitude du POI');
    } else if (longitude === '') {
      setErrorLongitude(true);
      setErrorMessage('Veuillez renseigner la longitude du POI');
    } else if (!regex.test(latitude)) {
      setErrorLatitude(true);
      setErrorMessage('Veuillez renseigner la latitude seulement avec des chiffres et un point');
    } else if (!regex.test(longitude)) {
      setErrorLongitude(true);
      setErrorMessage('Veuillez renseigner la longitude seulement avec des chiffres et un point');
    } else if (!question || Object.keys(question).length === 0) {
      setErrorMessage('Veuillez renseigner les champs associés à la question');
    } else if (!challenge
      || (challenge.challenge && Object.keys(challenge.challenge).length === 0)
      || (challenge && Object.keys(challenge).length === 0)
    ) {
      setErrorMessage('Veuillez renseigner les champs associés au défi');
    }
    if (question) {
      if (question.badAnswers.length !== 3) {
        setErrorMessage('Veuillez renseigner toutes les mauvaises réponses associés à une question');
      }
      if (!question.title || question.title === '') {
        setErrorMessage('Veuillez renseigner l\'intitulé associés à une question');
      }
      if (!question.goodAnswer || question.goodAnswer === '') {
        setErrorMessage('Veuillez renseigner la bonne réponse associés à une question');
      }
    }
    if (challenge) {
      if (Object.keys(challenge.challenge).length === 0) {
        setErrorMessage('Veuillez renseigner un type de défi');
      } else if (!challenge.challenge.type || challenge.challenge.type === '') {
        setErrorMessage('Veuillez renseigner un type de défi et les champs associés');
      }
      if (challenge.challenge.type && challenge.challenge.type === 'field') {
        if (!challenge.challenge.title && challenge.challenge.title === '') {
          setErrorMessage('Veuillez renseigner un intitulé de défi');
        }
        if (!challenge.challenge.goodAnswer || challenge.challenge.goodAnswer === '') {
          setErrorMessage('Veuillez renseigner la bonne réponse du défi');
        }
        if (challenge.challenge.image && challenge.challenge.image === '') {
          setErrorMessage('Veuillez renseigner l\'image du défi');
        }
      } else if (challenge.challenge.type && challenge.challenge.type === 'multipleChoice') {
        if (!challenge.challenge.title || challenge.challenge.title === '') {
          setErrorMessage('Veuillez renseigner un intitulé de défi');
        }
        if (!challenge.challenge.goodAnswer || challenge.challenge.goodAnswer === '') {
          setErrorMessage('Veuillez renseigner la bonne réponse du défi');
        }
        if (!challenge.challenge.image || challenge.challenge.image === '') {
          setErrorMessage('Veuillez renseigner l\'image du défi');
        }
        if (challenge.challenge.badAnswers.length !== 3) {
          setErrorMessage('Veuillez renseigner toutes les mauvaises réponses associés à un défi');
        }
      } else if (challenge.challenge.type && challenge.challenge.type === 'photo') {
        if (!challenge.challenge.title && challenge.challenge.title === '') {
          setErrorMessage('Veuillez renseigner un intitulé de défi');
        }
        if (!challenge.challenge.goodAnswer && challenge.challenge.goodAnswer === '') {
          setErrorMessage('Veuillez renseigner la bonne réponse du défi');
        }
      }
    }
    const geoPoint = new GeoPoint(Number(latitude), Number(longitude));
    let tempImg;
    let tempUuid;
    if (challenge && challenge.challenge) {
      if (challenge.challenge.type && challenge.challenge.type === 'photo' && challenge.challenge.goodAnswer) {
        if ((challengePicture && challenge.challenge.goodAnswer !== challengePicture)
          || !challengePicture
        ) {
          tempImg = challenge.challenge.goodAnswer;
          tempUuid = uuidv4();
          challenge.challenge.goodAnswer = `CHALLENGE/${tempUuid}`;
        }
      }
      if (challenge.challenge.image) {
        if ((challengePicture && challenge.challenge.image !== challengePicture)
          || !challengePicture
        ) {
          tempImg = challenge.challenge.image;
          tempUuid = uuidv4();
          challenge.challenge.image = `CHALLENGE/${tempUuid}`;
        }
      }
    }
    if (
      challenge
      && challenge.challenge
      && (challenge.challenge.image || challenge.challenge.type === 'photo')
      && tempImg
      && tempUuid
    ) {
      saveImg(tempUuid, 'CHALLENGE', tempImg);
    }
    let result;
    if (!update) {
      result = await addPoi(
        name,
        description,
        linkedOdd,
        geoPoint,
        question,
        challenge.challenge,
      );
      navigate('/poi');
    } else {
      result = await updatePoi(
        urlParams.id,
        name,
        description,
        linkedOdd,
        geoPoint,
        question,
        challenge.challenge,
      );
      navigate('/poi');
    }
    if (result && result.id) {
      saveImg(result.id, 'POI', imgFile);
    }
    setErrorLongitude(false);
    setErrorLatitude(false);
    setErrorName(false);
    setErrorMessage('');
  };

  if (ODDListData === undefined) {
    return (
      <CircularProgress />
    );
  }
  return (
    <Box>
      <Box
        component="form"
        flexWrap="wrap"
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{
          minWidth: '200px',
          marginRight: '50px',
          marginLeft: '50px',
        }}
        >
          <ImportImageFile
            labelId="poiImg"
            image={picture && picture}
            setImgFile={(file) => setImgFile(file)}
          />
        </Box>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '35vw',
            minWidth: '250px',
            maxWidth: '600px',
            '& .MuiTextField-root': {
              m: 1, width: '35vw', minWidth: '250px', maxWidth: '600px',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextFieldProps
            label="Nom"
            required
            value={name && name}
            error={errorName}
            maxLength="40"
            setValueComponent={setName}
          />
          <TextAreaProps
            placeholder="Description"
            minRows={3}
            value={description && description}
            setValueComponent={setDescription}
          />
          <SelectObjectProps
            dataSelectable={ODDListData}
            setValueComponent={setLinkedOdd}
            valueComponent={linkedOdd && linkedOdd}
            label="ODD liés"
            multiple
          />
          <TextFieldProps
            label="Latitude"
            required
            value={latitude && latitude}
            error={errorLatitude}
            setValueComponent={setLatitude}
          />
          <TextFieldProps
            label="Longitude"
            required
            value={longitude && longitude}
            error={errorLongitude}
            setValueComponent={setLongitude}
          />
        </Box>
      </Box>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px',
      }}
      >
        <Box sx={{
          width: '60vw',
          marginTop: '20px',
          border: '1px solid lightgrey',
          padding: '10px 0px',
          borderRadius: '15px',
        }}
        >
          <PoiQuestion
            setParentValues={setQuestion}
            parentValues={question && question}
            badAnswerOne={badAnswerOne && badAnswerOne}
            setBadAnswerOne={(value) => setBadAnswerOne(value)}
            badAnswerTwo={badAnswerTwo && badAnswerTwo}
            setBadAnswerTwo={(value) => setBadAnswerTwo(value)}
            badAnswerThree={badAnswerThree && badAnswerThree}
            setBadAnswerThree={(value) => setBadAnswerThree(value)}
          />
        </Box>
        <Box sx={{
          marginTop: '20px',
          border: '1px solid lightgrey',
          padding: '10px 0px',
          borderRadius: '15px',
        }}
        >
          <AddChallengePage challenge={challenge && challenge} setChallenge={setChallenge} />
        </Box>
        {
          errorMessage !== '' && <Typography color="error">{errorMessage}</Typography>
        }
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        {
          update
            ? (
              <ButtonProps text="Modifier le POI" type="submit" onClick={handleAddPoi} />
            )
            : (
              <ButtonProps text="Ajouter le POI" type="submit" onClick={handleAddPoi} />
            )
        }

      </Box>
    </Box>
  );
}

export default AddPoiPage;
