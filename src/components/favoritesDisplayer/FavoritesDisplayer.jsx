import React, {useState, useEffect} from 'react';
import { getAllFavorites } from '../../helpers/localStorageManager';
import {
  Typography,
  Box,
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {classes} from './favoritesDisplayerClassnames';

const FavoritesDisplayer = (props) => {
  const { onClose, open } = props;
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    if (open)
      setFavorites(getAllFavorites())
  }, [open])

  const handleRemoveFavorite = (fav) => {
    const tmp = [...favorites];
    const index = tmp.findIndex(elem => elem.cityName === fav.cityName);
    tmp.splice(index, 1);
    setFavorites(tmp);
    props.displayToast({message: "Favoris supprimé !", success: 'success'})
    props.handleManageCityInFavorite(fav);
  }

  const handleSwitchCurrentCity = (fav) => {
    // call loader before changing data to avoid blink
    props.setIsFetchingWeather(true)
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
      <DialogTitle sx={classes.dialogTopBar}>
        <Typography sx={classes.dialogTitle}>
          Mes Favoris
        </Typography>
        <IconButton
          sx={classes.closeModalButton}
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {favorites?.length === 0 ?
          <Box sx={classes.noFavoriteContainer}>
            <Typography variant="body1" sx={classes.textSpacing}>
              Vous n'avez pas encore ajouté de favoris !
            </Typography>
          </Box>
        :
          favorites?.map((fav, index) => (
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
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFavorite(fav);
              }}
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