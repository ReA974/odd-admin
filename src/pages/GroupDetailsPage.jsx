import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography, Box, CircularProgress, IconButton, Card,
} from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import {
  doc, onSnapshot, getDoc, query, collection, getDocs, orderBy,
} from '@firebase/firestore';
import { db } from '../services/firestore.service';
import ChallengeAnswerCard from '../components/group/ChallengeAnswerCard';
import ODDAnswerCard from '../components/group/ODDAnswerCard';

function arrayEquals(a, b) {
  return Array.isArray(a)
      && Array.isArray(b)
      && a.length === b.length
      && a.every((val, index) => val === b[index]);
}

function GroupDetailsPage() {
  const { id } = useParams();
  const [group, setGroup] = useState(undefined);
  const [formattedPois, setFormattedPois] = useState(undefined);
  const [visitedPois, setVisitedPois] = useState(0);
  const [discoveredOdds, setDiscoveredOdds] = useState(0);
  const [goodAnswerRate, setGoodAnswerRate] = useState(0);

  const formatData = async () => {
    let visited = 0;
    const odds = new Set();
    const pois = [];
    let goodAnswersCount = 0;
    let answersCount = 0;

    const q = query(collection(db, `GROUP/${id}/VISIT`), orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(q);

    await Promise.all(querySnapshot.docs.map(async (visit) => {
      visited += 1;
      const visitData = visit.data();
      const poiRef = doc(db, 'POI', visit.id);
      const docSnap = await getDoc(poiRef);

      if (docSnap.exists()) {
        const poiData = docSnap.data();
        if (poiData.linkedODD) {
          poiData.linkedODD.map((odd) => odds.add(odd));
        }
        let formattedPoi = {
          name: poiData.name, linkedODD: poiData.linkedODD.sort((a, b) => a - b), id: docSnap.id,
        };
        if (visitData.questionAnswer) {
          formattedPoi = {
            ...formattedPoi,
            question: { ...poiData.question, groupAnswer: visitData.questionAnswer },
          };
          answersCount += 1;
          if (poiData.question.goodAnswer === visitData.questionAnswer) {
            goodAnswersCount += 1;
          }
        }
        if (visitData.challengeAnswer) {
          formattedPoi = {
            ...formattedPoi,
            challenge: {
              ...poiData.challenge,
              groupAnswer: visitData.challengeAnswer,
              groupPhoto: visitData.challengePhoto ? visitData.challengePhoto : undefined,
            },
          };
          answersCount += 1;
          if (poiData.challenge.type === 'photo' && visitData.challengeAnswer === true) {
            goodAnswersCount += 1;
          } else if (
            poiData.challenge.goodAnswer.toUpperCase() === visitData.challengeAnswer.toUpperCase()
          ) {
            goodAnswersCount += 1;
          }
        }
        if (visitData.choosedODD) {
          formattedPoi = {
            ...formattedPoi, choosedODD: visitData.choosedODD.sort((a, b) => a - b),
          };
          answersCount += 1;
          if (arrayEquals(formattedPoi.linkedODD, formattedPoi.choosedODD)) {
            goodAnswersCount += 1;
          }
        }
        pois.push(formattedPoi);
      }
    }));

    setDiscoveredOdds(odds.size);
    setVisitedPois(visited);
    setFormattedPois(pois);
    setGoodAnswerRate(answersCount > 0 ? Math.round((goodAnswersCount / answersCount) * 100) : 0);
  };

  // retrieve data and listen for changes
  useEffect(() => {
    // First check if doc exists
    const docRef = doc(db, 'GROUP', id);
    let unsuscribe;

    async function fetchData() {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setGroup(null);
      } else {
        unsuscribe = onSnapshot(docRef, (document) => {
          setVisitedPois(0);
          formatData();
          setGroup({ ...document.data() });
        });
      }
    }
    fetchData();

    return () => {
      if (unsuscribe) {
        unsuscribe();
      }
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
      { group === undefined
        && <CircularProgress />}
      { group === null
        && <Typography>Ce groupe n&apos;existe pas</Typography>}
      { group && (
        <>
          <IconButton sx={{ position: 'fixed', left: '10px', top: '80px' }} component={Link} to="/group">
            <ArrowBackIos sx={{ marginLeft: '7px' }} />
          </IconButton>
          <Typography variant="h4" sx={{ margin: '20px 0' }}>{group.name}</Typography>
          <Typography>{`${goodAnswerRate}% bonnes réponses`}</Typography>
          <Typography>{`${visitedPois} point${visitedPois > 1 ? 's' : ''} d'intérêt visité${visitedPois > 1 ? 's' : ''}`}</Typography>
          <Typography>{`${discoveredOdds} ODD découvert${discoveredOdds > 1 ? 's' : ''}`}</Typography>

          {
            formattedPois && formattedPois.map((poi) => (
              <Box
                key={poi.id}
                sx={{ margin: '20px 0' }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Card sx={{ padding: '5px 30px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{`Visite de "${poi.name}"`}</Typography>
                </Card>
                {
                  poi.question
                  && (
                    <ChallengeAnswerCard
                      type="multipleChoice"
                      title={poi.question.title}
                      groupAnswer={poi.question.groupAnswer}
                      badAnswers={poi.question.badAnswers}
                      goodAnswer={poi.question.goodAnswer}
                    />
                  )
                }
                {
                  poi.choosedODD
                  && (
                    <ODDAnswerCard choosedOdds={poi.choosedODD} poiOdds={poi.linkedODD} />
                  )
                }
                {
                  poi.challenge
                  && (
                    <ChallengeAnswerCard
                      type={poi.challenge.type}
                      imageTitle={poi.challenge.image}
                      title={poi.challenge.title ? poi.challenge.title : undefined}
                      groupAnswer={poi.challenge.groupAnswer}
                      badAnswers={poi.challenge.badAnswers ? poi.challenge.badAnswers : undefined}
                      goodAnswer={poi.challenge.goodAnswer}
                      photoAnswer={poi.challenge.groupPhoto}
                    />
                  )
                }
              </Box>
            ))
          }
        </>
      )}
    </Box>
  );
}

export default GroupDetailsPage;
