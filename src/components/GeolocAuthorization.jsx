import { Button, Typography, Card } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { setItemInLocalStorage } from '../helpers/localStorageManager';

const classes = {
    root: {
      width: '650px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'left',
      padding: '2rem',
      borderColor: '1976d2',
      borderRadius: '20px',
    },
    welcomeText: {
      position: 'relative',
      zIndex: '90',
      marginBottom: "3rem",
      color: '#303030',
    },
    explanationText: {
      position: 'relative',
      zIndex: '90',
    },
    actionsButtonContainer: {
      marginTop: '2rem',
      padding: '0 2.5rem',
      display: 'flex',
      justifyContent: 'end'
    },
    actionButton: {
      marginLeft: '3rem',
      '&:hover': {
        backgroundColor: '#1976D2',
        color: "#fff"
      }
    },
}

const GeolocAuthorization = (props) => {

  const isGeolocAuthorized = (value) => {
    setItemInLocalStorage('weather-app', {geolocalisationAuthorized: value});
    props.setGeolocAuthorization(value);
  }

  return (
    <Card sx={classes.root}>
      <Box sx={classes.circle} />
      <Typography variant="h3" sx={classes.welcomeText}>
        Bienvenue
      </Typography>
      <Typography variant="body1" sx={classes.explanationText}>
        Afin de favoriser une expérience utilisateur optimale, autorisez-vous l'application à récupérer votre emplacement ?
      </Typography>
      <Box sx={classes.actionsButtonContainer}>
        <Button
          variant="outlined"
          sx={classes.actionButton}
          onClick={() => isGeolocAuthorized(false)}
        >
          Je refuse
        </Button>
        <Button
          variant="outlined"
          sx={classes.actionButton}
          onClick={() => isGeolocAuthorized(true)}
        >
          J'accepte
        </Button>
      </Box>
    </Card>
  )
}

export default GeolocAuthorization;