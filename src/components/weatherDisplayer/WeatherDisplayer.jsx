import React, { useState, useEffect } from 'react';

import { Box, Card, CircularProgress, IconButton, Typography, Button, Paper } from '@mui/material';
import Geocode from "react-geocode";
import { getWeather } from '../../services/getWeather';
import CityFinder from '../cityFinder/CityFinder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { weatherCode } from '../../helpers/weatherParser';
import AirIcon from '@mui/icons-material/Air';
import RainIcon from '../../assets/rainIcon.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DailyWeatherCard from '../dailyWeatherCard/DailyWeatherCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { isCityInFavorite, modifyFavoriteInLocalStorage } from '../../helpers/localStorageManager';
import FavoritesDisplayer from '../favoritesDisplayer/FavoritesDisplayer';
import {classes} from './weatherDisplayerClassnames';

const WeatherDisplayer = (props) => {
  const [currentCity, setCurrentCity] = useState({
    cityName: '',
    pos: [],
    timezone: null,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);

  useEffect(() => {
    setIsFetchingWeather(true);
    if (currentCity.cityName.length > 0 && currentCity.pos.length === 2) {
      setIsFavorite(isCityInFavorite(currentCity.cityName))
      getWeather(currentCity)
        .then(res => {
          setWeatherData(res);
          setTimeout(() => setIsFetchingWeather(false), 500);
        })
        .catch(err => {
          props.setToastStatus({message: 'Echec de la récupération des données', status: 'error'})
          setIsFetchingWeather(false);
        })
    }
  }, [currentCity])

  useEffect(() => {
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (props.geolocAuthorization) {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
      Geocode.setLanguage("fr");
      Geocode.setLocationType("ROOFTOP");
      navigator.geolocation.getCurrentPosition(pos => {
        Geocode.fromLatLng(pos.coords.latitude, pos.coords.longitude).then(
          (response) => {
            const index = response.results[0].address_components.findIndex(item => item.types.includes('locality'));
            if (index !== -1)
              setCurrentCity(
                {
                  cityName: response.results[0].address_components[index].long_name, 
                  pos: [pos.coords.latitude, pos.coords.longitude],
                  timezone: currentTimezone,
                })
          },
          (error) => {
            props.setToastStatus({message: 'Echec de la récupération des données', status: 'error'})
            console.error(error);
          }
        );
      })
    } else {
      if (!currentCity.timezone)
        setCurrentCity({ ...currentCity, timezone: currentTimezone })
    }
  }, [props.geolocAuthorization])

  const handleManageCityInFavorite = (city) => {
    const isDelete = modifyFavoriteInLocalStorage(city);
    props.setToastStatus({message: isDelete ? 'Favoris supprimé !' : 'Favoris ajouté !', status: 'success'})
    setIsFavorite(isCityInFavorite(city.cityName))
  }

  return (
    <Card sx={classes.root}>
      <FavoritesDisplayer
        open={openFavorite}
        onClose={() => setOpenFavorite(false)}
        keepMounted
        setCurrentCity={setCurrentCity}
        handleManageCityInFavorite={handleManageCityInFavorite}
        setIsFetchingWeather={setIsFetchingWeather}
        displayToast={props.setToastStatus}
      />
      <Box sx={classes.topBarContainer}>
        <CityFinder
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          setIsFetchingWeather={setIsFetchingWeather}
          displayToast={props.setToastStatus}
        />
        <Button
          variant="contained"
          onClick={() => setOpenFavorite(true)}
          sx={classes.favoriteButton}
        >
          Mes favoris
        </Button>
      </Box>
      {!props.geolocAuthorization && currentCity.cityName.length === 0 ?
        <Box sx={classes.fetchingContainer}>
          <Typography variant="body1">
            Entrer un nom de ville pour rechercher la météo correspondante
          </Typography>
        </Box>
      :
        isFetchingWeather ?
        <Box sx={classes.fetchingContainer}>
          <CircularProgress size={50} sx={classes.loader} />
          <Typography variant="body1">
            Récupération des données en cours...
          </Typography>
        </Box>
        :
        <>
          <Box sx={classes.cityNameContainer}>
            <Typography variant="h5" sx={classes.cityName}>
              {currentCity.cityName}
            </Typography>
            <Box sx={classes.favoriteButtonContainer}>
              <IconButton
                sx={classes.likeIconButton}
                onClick={() => handleManageCityInFavorite(currentCity)}
              >
                {isFavorite ?
                  <FavoriteIcon sx={classes.likeButton} />
                  :
                  <FavoriteBorderIcon sx={classes.likeButton} />
                }
              </IconButton>
            </Box>
          </Box>
          <Box sx={classes.currentWeatherContainer}>
            <Box sx={classes.leftPartContainer}>
              <Typography variant="h1">
                {Math.round(weatherData?.current_weather?.temperature)}°
              </Typography>
              <Typography variant="h5" sx={classes.weatherText}>
                {weatherCode[weatherData?.daily?.weathercode[0]]}
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
              <Box sx={classes.iconAndTextWindContainer}>
                <AirIcon sx={classes.specialIconSize} />
                <Typography variant="body1" sx={classes.textAlignment}>
                  {weatherData?.current_weather?.windspeed} Km/h
                </Typography>
              </Box>
              <Box sx={classes.iconAndTextRainContainer}>
                <img src={RainIcon} id="custom-icon-size" alt="weather rain icon" />
                <Typography variant="body1" sx={classes.textAlignment}>
                  {weatherData?.daily?.precipitation_sum[0]} mm
                </Typography>
              </Box>
            </Box>
          </Box>
          <Paper elevation={4} sx={classes.dailyContainer}>
            <Typography variant="h5" sx={classes.dailyTitle}>Ma semaine</Typography>
            <Box sx={classes.dailyCardsContainer}>
              {weatherData && weatherData?.daily?.time?.map((date, index) => (
                <DailyWeatherCard
                  key={`weather-card-${index + 1}`}
                  index={index}
                  date={date}
                  weatherCode={weatherData?.daily?.weathercode ? weatherData?.daily?.weathercode[index] : null}
                  tempMax={weatherData?.daily?.temperature_2m_max[index] ? weatherData?.daily?.temperature_2m_max[index] : null}
                  tempMin={weatherData?.daily?.temperature_2m_min[index] ? weatherData?.daily?.temperature_2m_min[index] : null}
                />
              ))}
            </Box>
          </Paper>
        </>
      }
    </Card>
  )
}

export default WeatherDisplayer;