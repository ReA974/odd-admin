import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import PoiDetails from '../components/PoiDetails';
import { getImageByPOI, getPOI } from '../services/POIQueries';

function PoiDetailsPage() {
  const [POIDetailsData, setPOIDetails] = useState(undefined);
  const urlParams = useParams();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getPOI(urlParams.id);
      if (fetchedData !== null) {
        fetchedData.imageURL = await getImageByPOI(urlParams.id);
        setPOIDetails(fetchedData);
      } else {
        setPOIDetails(null);
      }
    }
    fetchData();
  }, []);

  if (!POIDetailsData) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" justifyContent="center">
      <PoiDetails
        image={POIDetailsData.imageURL}
        name={POIDetailsData.name}
        description={POIDetailsData.description}
        linkedOdds={POIDetailsData.linkedODD}
        coordinates={POIDetailsData.coordinates}
        question={POIDetailsData.question}
        challenge={POIDetailsData.challenge}
      />
    </Box>
  );
}

export default PoiDetailsPage;
