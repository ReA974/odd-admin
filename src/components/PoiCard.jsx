/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card, CardActionArea, CardContent, CardMedia, Box,
} from '@mui/material';
import { getPoiPicture } from '../services/POIQueries';

function PoiCard({
  id, title, description,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [image, setImage] = useState(undefined);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    async function dlImage() {
      const img = await getPoiPicture(id);
      setImage(img);
    }
    dlImage();
  }, []);

  return (
    <Card sx={{ height: width < 900 ? '300px' : '175px' }}>
      <CardActionArea sx={{ height: '100%' }}>
        <Box
          display="flex"
          flexDirection={width < 900 ? 'column' : 'row'}
          alignItems={width < 900 ? 'center' : 'flex-start'}
          sx={{ height: '100%', width: '100%' }}
        >
          { image
          && (
            <CardMedia
              component="img"
              sx={{ height: 175, width: width < 900 ? '100%' : 250 }}
              image={image}
              alt="POI image"
            />
          )}
          <CardContent sx={{ width: width < 900 ? '100%' : '50%', maxHeight: width < 900 ? '40%' : '100%' }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '5',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

PoiCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PoiCard;
