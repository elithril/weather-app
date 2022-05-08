import React, {useState, useEffect} from 'react';
import { getAllFavorites } from '../helpers/localStorageManager';
import {
  Typography,
  Box,
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const classes = {
  favoriteContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(26, 115, 232, 0.1)',
    }
  },
  textAlignment: {
    width: '80%',
    margin: 'auto auto'
  },
  removeFavoriteButton: {
    width: '50px'
  }
}

const FavoritesDisplayer = (props) => {
  const { onClose, value: valueProp, open, ...other } = props;
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    console.log("favorites =>", favorites)
  }, [favorites])

  useEffect(() => {
    if (open)
      setFavorites(getAllFavorites())
  }, [open])

  const handleRemoveFavorite = (fav) => {
    const tmp = [...favorites];
    const index = tmp.findIndex(elem => elem.cityName === fav.cityName);
    tmp.splice(index, 1);
    setFavorites(tmp);
    props.handleManageCityInFavorite(fav);
  }

  const handleSwitchCurrentCity = (fav) => {
    props.setCurrentCity(fav);
    onClose();
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle>Mes Favoris</DialogTitle>
      <DialogContent dividers>
        {favorites?.map((fav, index) => (
          <Box
            sx={classes.favoriteContainer}
            key={`favorite-container-${index + 1}`}
            onClick={() => handleSwitchCurrentCity(fav)}
          >
            <Typography variant="body1" sx={classes.textAlignment}>
              {fav.cityName}
            </Typography>
            <IconButton
              sx={classes.removeFavoriteButton}
              onClick={() => handleRemoveFavorite(fav)}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default FavoritesDisplayer;