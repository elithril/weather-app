import { Box, Card, CircularProgress, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Geocode from "react-geocode";
import {getWeather} from '../services/getWeather';
import CityFinder from './CityFinder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { weatherCode } from '../helpers/weatherParser';
import AirIcon from '@mui/icons-material/Air';
import RainIcon from '../assets/rainIcon.svg';

const classes = {
  root: {
    width: '650px',
    minHeight: '30vh',
    // height: '70vh',
    position: 'absolute',
    zIndex: 90,
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '2rem',
    borderRadius: '20px'
  },
  topBarContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  fetchingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
  },
  loader: {
    marginBottom: '1rem'
  },
  currentWeatherContainer: {
    marginTop: '1rem',
    width: '100%',
    textAlign: 'left',
    display: 'flex'
  },
  leftPartContainer: {
    width: '60%',
  },
  rightPartContainer: {
    width: '40%',
    padding: '1rem 0 0 0'
  },
  cityName: {
    margin: '2rem 0 0 0',
    textAlign: 'left'
  },
  weatherText: {
    position: 'relative',
    top: '-12px',
    left: '0px',
  },
  temperatureMax: {
    marginRight: '1rem',
  },
  temperatureMin: {
    marginRight: '0.5rem',
  },
  maxMinTemperatureContainer: {
    display: 'flex',
    position: 'relative',
    top: '-10px',
    left: '0px',
  },
  arrowTransform: {
    transform: 'translateY(5px)'
  },
  dailyContainer: {
    marginTop: '1rem',
    backgroundColor: 'rgba(26, 115, 232, 0.5)',
    minHeight: '100px'
  },
  iconAndTextContainer: {
    display: 'flex',
    marginBottom: '1rem'
  },
  specialIconSize: {
    width: '30px',
    height: '30px'
  },
  textAlignment: {
    marginLeft: '0.5rem',
    transform: 'translateY(5px)'
  }
}

const WeatherDisplayer = (props) => {
  const [currentCity, setCurrentCity] = useState({
    cityName: '',
    pos: [],
    timezone: null,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);

  useEffect(() => {
    console.log("weatherData =>", weatherData);
  }, [weatherData])

  useEffect(() => {
    console.log("currentCity =>", currentCity)
    if (currentCity.cityName.length > 0 && currentCity.pos.length === 2) {
      getWeather(currentCity)
      .then(res => {
        setWeatherData(res);
        setIsFetchingWeather(false);
      })
      .catch(err => {
        setIsFetchingWeather(false);
        //toast failed to fetch
      })
    }
  }, [currentCity])

  useEffect(() => {
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("currentTimezone", currentTimezone);
    if (props.geolocAuthorization) {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
        Geocode.setLanguage("fr");
        Geocode.setLocationType("ROOFTOP");
        navigator.geolocation.getCurrentPosition(pos => {
  
        console.log("api disabled pour garder des crédits !", pos)
        // Geocode.fromLatLng(pos.coords.latitude, pos.coords.longitude).then(
        //   (response) => {
        //     const index = response.results[0].address_components.findIndex(item => item.types.includes('locality'));
        //     if (index !== -1)
        //       setCurrentCity(
        //         {
        //           cityName: response.results[0].address_components[index].long_name, 
        //           pos: [pos.coords.latitude, pos.coords.longitude],
        //           timezone: currentTimezone,
        //         })
        //   },
        //   (error) => {
        //     console.error(error);
        //   }
        // );
        /////////////////////////////////////////////////////
        setCurrentCity({cityName: 'Toulouse', pos: [pos.coords.latitude, pos.coords.longitude], timezone: currentTimezone})
        ////////////////////////////////////////////////////
      })
    } else {
      if (!currentCity.timezone)
        setCurrentCity({...currentCity, timezone: currentTimezone})
    }
  }, [props.geolocAuthorization])

  return (
    <Card sx={classes.root}>
      <Box sx={classes.topBarContainer}>
        <CityFinder
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
        />
        les favoris
      </Box>
      {isFetchingWeather ?
        <Box sx={classes.fetchingContainer}>
          <CircularProgress size={50} sx={classes.loader} />
          <Typography variant="body1">
            Récupération des données en cours...
          </Typography>
        </Box>
      :
        <>
        <Typography variant="h4" sx={classes.cityName}>
          {currentCity.cityName}
        </Typography>
      <Box sx={classes.currentWeatherContainer}>
        <Box sx={classes.leftPartContainer}>
          <Typography variant="h1">
            {Math.round(weatherData?.current_weather?.temperature)}°
          </Typography>
          <Typography variant="h4" sx={classes.weatherText}>
            {weatherCode[weatherData?.current_weather?.weathercode]}
          </Typography>
          <Box sx={classes.maxMinTemperatureContainer}>
            <Typography variant="h6" sx={classes.temperatureMax}>
              <ArrowUpwardIcon sx={classes.arrowTransform} />
              {Math.round(weatherData?.daily?.temperature_2m_max[0])}°C
            </Typography>
            <Typography variant="h6" sx={classes.temperatureMin}>
              <ArrowDownwardIcon sx={classes.arrowTransform} />
              {Math.round(weatherData?.daily?.temperature_2m_min[0])}°C
            </Typography>
          </Box>
        </Box>
        <Box sx={classes.rightPartContainer}>
          <Box sx={classes.iconAndTextContainer}>
            <AirIcon sx={classes.specialIconSize} />
            <Typography variant="body1" sx={classes.textAlignment}>
              {weatherData?.current_weather?.windspeed} Km/h
            </Typography>
          </Box>
          <Box sx={classes.iconAndTextContainer}>
            <img src={RainIcon} id="custom-icon-size" />
            <Typography variant="body1" sx={classes.textAlignment}>
              {weatherData?.daily?.precipitation_sum[0]} mm
            </Typography>
          </Box>
        </Box>
      </Box>
      <Card sx={classes.dailyContainer}>
        test daily
      </Card>
        </>
      }
    </Card>
  )
}

export default WeatherDisplayer;