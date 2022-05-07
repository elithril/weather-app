import React, {useState, useEffect} from 'react';
import {getItemFromLocalStorage} from '../helpers/localStorageManager';
import GeolocAuthorization from '../components/GeolocAuthorization';
import sample from '../assets/movingClouds.mp4';
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
    setGeolocAuthorization(getItemFromLocalStorage('weather-app'));
  }, [])

  useEffect(() => {
    console.log("geolocAuthorization =>", geolocAuthorization)
  }, [geolocAuthorization])

  // const getLocation = () => {
  //   console.log("test =>", process.env.REACT_APP_GOOGLE_API_KEY)
  //   Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  //   navigator.geolocation.getCurrentPosition(pos => {
  //     console.log("api disabled pour garder des crédits !")
  //     // Geocode.fromLatLng(pos.coords.latitude, pos.coords.longitude).then(
  //     //   (response) => {
  //     //     const address = response.results[0].formatted_address;
  //     //     console.log(address);
  //     //   },
  //     //   (error) => {
  //     //     console.error(error);
  //     //   }
  //     // );
  //   })
  // }

  return (
    <Box sx={classes.root}>

      {/* <Container
        maxWidth="lg"
        sx={classes.root}
      > */}
        <video className='videoTag' autoPlay loop muted id="background-video">
          <source src={sample} type='video/mp4' />
        </video>
        <Fade in={!geolocAuthorization ? true : false} timeout={750}>
          <div style={{
            display: geolocAuthorization ? 'none' : 'inherit'
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
        {/* <button onClick={() => getLocation()}>get location</button> */}
      {/* </Container> */}
    </Box>
  )
}

export default HomePage;