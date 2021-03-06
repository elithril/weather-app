import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { daysName, weatherCode, getWeatherIconFromWeathercode } from '../../helpers/weatherParser';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {classes} from './dailyWeatherCardClassnames';

const DailyWeatherCard = (props) => {
  const getDayOfTheWeek = (date) => {
    const tmpDate = new Date(date);
    return tmpDate.getDay();
  }

  return (
    <Card sx={classes.cardContainer}>
      <Typography variant="body1">
        {props.index === 0 ? "Aujourd'hui" : daysName[getDayOfTheWeek(props.date)]}
      </Typography>
      <img
        src={getWeatherIconFromWeathercode(props.weatherCode)}
        alt="weather icon"
        id="daily-weather-icon"
      />
      <Typography variant="body2">
        {weatherCode[props.weatherCode]}
      </Typography>
      <Box sx={classes.maxMinTemperatureContainer}>
        <Typography variant="body1">
          <ArrowUpwardIcon sx={classes.arrowTransform} />
          {Math.round(props.tempMax)}°C
        </Typography>
        <Typography variant="body1">
          <ArrowDownwardIcon sx={classes.arrowTransform} />
          {Math.round(props.tempMin)}°C
        </Typography>
      </Box>
    </Card>
  )
}

export default DailyWeatherCard;