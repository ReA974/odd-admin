import React, { useEffect, useState } from 'react';
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

  return (
    <div>
      <PoiDetails id={urlParams.id} data={POIDetailsData} />
    </div>
  );
}

export default PoiDetailsPage;
