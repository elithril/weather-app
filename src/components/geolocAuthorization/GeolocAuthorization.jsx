import { Button, Typography, Card } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { setItemInLocalStorage } from '../../helpers/localStorageManager';
import {classes} from './geolocAuthorizationClassnames';

const GeolocAuthorization = (props) => {

  const isGeolocAuthorized = (value) => {
    setItemInLocalStorage({geolocalisationAuthorized: value, favorites: []});
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