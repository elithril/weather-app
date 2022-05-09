import React, {useState, useEffect} from 'react';
import {getItemFromLocalStorage} from '../../helpers/localStorageManager';
import GeolocAuthorization from '../../components/geolocAuthorization/GeolocAuthorization';
import cloudy from '../../assets/movingClouds.mp4';
import { Box, Fade, IconButton, Typography } from '@mui/material';
import WeatherDisplayer from '../../components/weatherDisplayer/WeatherDisplayer';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {classes} from './homepageClassnames';

const HomePage = () => {
  const [geolocAuthorization, setGeolocAuthorization] = useState(false);
  const [toastStatus, setToastStatus] = useState(null);
  
  useEffect(() => {
    setGeolocAuthorization(getItemFromLocalStorage('geolocalisationAuthorized'));
  }, [])

  return (
    <Box sx={classes.root}>
      <Snackbar
        open={toastStatus ? true : false}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        autoHideDuration={3000}
        onClose={() => setToastStatus(null)}
        message={
          <Box sx={classes.toastContentContainer}>
            <CheckIcon />
            <Typography variant="body1" sx={classes.toastMessage}>
              {toastStatus?.message}
            </Typography>
          </Box>
        }
        action={<IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setToastStatus(null)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>}
        sx={toastStatus?.status === 'error' ? classes.toastError : classes.toastSuccess}
      />
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
            setToastStatus={setToastStatus}
          />
        </div>
      </Fade>
    </Box>
  )
}

export default HomePage;