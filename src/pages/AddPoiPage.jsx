import React, { useEffect, useState } from 'react';
import {
  Box, CircularProgress,
  Typography,
} from '@mui/material';
import { GeoPoint } from '@firebase/firestore';
import Compressor from 'compressorjs';
import { v4 as uuidv4 } from 'uuid';
import TextFieldProps from '../components/inputs/TextFieldProps';
import TextAreaProps from '../components/inputs/TextAreaProps';
import ButtonProps from '../components/inputs/ButtonProps';
import SelectObjectProps from '../components/inputs/SelectObjectProps';
import { addPoi, setPoiPicture } from '../services/POIQueries';
import getAllODD from '../services/ODDQueries';
import ImportImageFile from '../components/inputs/ImportImageFile';
import PoiQuestion from '../components/poi/PoiQuestion';
import AddChallengePage from './AddChallengePage';

function AddPoiPage() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [linkedOdd, setLinkedOdd] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [picture, setPicture] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [question, setQuestion] = useState();
  const [badAnswers] = useState([]);
  const [badAnswerOne, setBadAnswerOne] = useState();
  const [badAnswerTwo, setBadAnswerTwo] = useState();
  const [badAnswerThree, setBadAnswerThree] = useState();
  const [challenge, setChallenge] = useState();
  const [errorName, setErrorName] = useState(false);
  const [errorLatitude, setErrorLatitude] = useState(false);
  const [errorLongitude, setErrorLongitude] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ODDListData, setODDListData] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getAllODD();
      if (fetchedData !== null) {
        setODDListData(fetchedData);
      } else {
        setODDListData(null);
      }
    }
    fetchData();
  }, []);
  const saveImg = (poiId, url, file) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.6,
      success: async (compressedResult) => {
        const response = await setPoiPicture(poiId, compressedResult, url);
        if (response[0]) {
          setPicture(URL.createObjectURL(compressedResult));
          console.log(picture);
        } else {
          setErrorMessage('Une erreur est survenue, réessayez');
        }
      },
    });
  };

  console.log(challenge);
  const handleAddPoi = async () => {
    const regex = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    if (name === '') {
      setErrorName(true);
      setErrorMessage('Veuillez renseigner un nom de POI');
    } else if (description === '') {
      setErrorMessage('Veuillez renseigner une description du POI');
    } else if (linkedOdd === []) {
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
      setErrorMessage('Veuillez renseigner la longitude seulement avec des chiffres et une virgule');
    } else {
      const geoPoint = new GeoPoint(Number(latitude), Number(longitude));
      badAnswers.push(badAnswerOne);
      badAnswers.push(badAnswerTwo);
      badAnswers.push(badAnswerThree);
      question.badAnswers = badAnswers;
      setQuestion({ ...question });
      let tempImg;
      let tempUuid;
      if (challenge && challenge.challenge) {
        if (challenge.challenge.type && challenge.challenge.type === 'photo' && challenge.challenge.goodAnswer) {
          tempImg = challenge.challenge.goodAnswer;
          tempUuid = uuidv4();
          challenge.challenge.goodAnswer = `CHALLENGE/${tempUuid}`;
        }
        if (challenge.challenge.image) {
          tempImg = challenge.challenge.image;
          tempUuid = uuidv4();
          challenge.challenge.image = `CHALLENGE/${tempUuid}`;
        }
      }
      const result = await addPoi(
        name,
        description,
        linkedOdd,
        geoPoint,
        question,
        challenge.challenge,
      );
      saveImg(result.id, 'POI', imgFile);
      if (challenge && challenge.challenge && (challenge.challenge.image || challenge.challenge.type === 'photo')) {
        saveImg(tempUuid, 'CHALLENGE', tempImg);
      }
      setErrorLongitude(false);
      setErrorLatitude(false);
      setErrorName(false);
      setErrorMessage('');
    }
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
            value={name}
            error={errorName}
            maxLength="40"
            setValueComponent={setName}
          />
          <TextAreaProps
            placeholder="Description"
            minRows={3}
            value={description}
            setValueComponent={setDescription}
          />
          <SelectObjectProps
            dataSelectable={ODDListData}
            setValueComponent={setLinkedOdd}
            valueComponent={linkedOdd}
            label="ODD liés"
            multiple
          />
          <TextFieldProps
            label="Latitude"
            required
            value={latitude}
            error={errorLatitude}
            setValueComponent={setLatitude}
          />
          <TextFieldProps
            label="Longitude"
            required
            value={longitude}
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
            badAnswerOne={badAnswerOne}
            setBadAnswerOne={(value) => setBadAnswerOne(value)}
            badAnswerTwo={badAnswerTwo}
            setBadAnswerTwo={(value) => setBadAnswerTwo(value)}
            badAnswerThree={badAnswerThree}
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
          <AddChallengePage challenge={challenge} setChallenge={setChallenge} />
        </Box>
        {
          errorMessage !== '' && <Typography color="error">{errorMessage}</Typography>
        }
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <ButtonProps text="Ajouter le POI" type="submit" onClick={handleAddPoi} />
      </Box>
    </Box>
  );
}

export default AddPoiPage;
