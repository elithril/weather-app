import React, {useState, useEffect} from 'react';
import {getItemFromLocalStorage} from '../helpers/localStorageManager';
import GeolocAuthorization from '../components/GeolocAuthorization';
import cloudy from '../assets/movingClouds.mp4';
import { Box, Fade } from '@mui/material';
import WeatherDisplayer from '../components/WeatherDisplayer';

const classes = {
  root: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
  }
}

const HomePage = () => {
  const [geolocAuthorization, setGeolocAuthorization] = useState(false);
  
  useEffect(() => {
    setGeolocAuthorization(getItemFromLocalStorage('geolocalisationAuthorized'));
  }, [])

  return (
    <Box sx={classes.root}>
      <video className='videoTag' autoPlay loop muted id="background-video">
        <source src={cloudy} type='video/mp4' />
      </video>
      <Fade in={!geolocAuthorization ? true : false} timeout={750}>
        <div style={{
          display: geolocAuthorization !== null ? 'none' : 'inherit'
        }}>
        <GeolocAuthorization
          setGeolocAuthorization={setGeolocAuthorization}
        />
        </div>
      </Fade>
      <Fade in={geolocAuthorization !== null} timeout={1500}>
        <div style={{
          display: geolocAuthorization === null ? 'none' : 'inherit'
        }}>
          <WeatherDisplayer
            geolocAuthorization={geolocAuthorization}
          />
        </div>
      </Fade>
    </Box>
  )
}

export default HomePage;