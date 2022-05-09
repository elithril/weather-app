import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {useDebounce} from '../../helpers/useDebounce';
import {fetchPlace} from '../../services/fetchPlace';
import tzlookup from 'tz-lookup';
import Geocode from "react-geocode";

export default function CityFinder(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [cityName, setCityName] = useState('');
  const debouncedSearch = useDebounce(cityName, 300);

  React.useMemo(() => {
    if (cityName.length > 0) {
      setIsFetching(true);
      fetchPlace(cityName)
      .then((res) => {
        const tmp = res.features.map(place => (
          {name: place.place_name, coordinates: place.geometry.coordinates}
        ))
        setOptions(tmp);
        setIsFetching(false);
      })
      .catch(err => {
        props.displayToast({message: 'Echec de la récupération des données', status: 'error'})
        props.setCurrentCity({...props.currentCity, cityName: '', error: 'Echec de la récupération des données'})
        setIsFetching(false);
        setCityName('');
      })
    }
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleNewCitySelected = (v) => {
    if (v?.coordinates.length > 0) {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
      Geocode.setLanguage("fr");
      Geocode.setLocationType("ROOFTOP");
      Geocode.fromAddress(v.name).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const newTimezone = tzlookup(lat, lng);
          props.setIsFetchingWeather(true);
          props.setCurrentCity({
            pos: [lat, lng],
            cityName: v.name.split(',')[0],
            timezone: newTimezone,
          })
        },
        (error) => {
          props.displayToast({message: 'Echec de la récupération des données', status: 'error'})
          props.setCurrentCity({...props.currentCity, cityName: '', error: 'Echec de la récupération des données'})
        }
      );
    }
  }

  return (
    <Autocomplete
      id="asynchronous-city-finder"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      noOptionsText={"Pas de résultats"}
      loadingText={"Récupération..."}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={isFetching}
      onChange={(e, v) => handleNewCitySelected(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Rechercher une ville"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}