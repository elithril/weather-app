import { Card } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Geocode from "react-geocode";
import {getWeather} from '../services/getWeather';
import CityFinder from './CityFinder';

const classes = {
  root: {
    width: '650px',
    height: '70vh',
    position: 'absolute',
    zIndex: 90,
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '2rem',
    borderRadius: '20px'
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
      <CityFinder
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
      />
      {currentCity.cityName}
    </Card>
  )
}

export default WeatherDisplayer;


// const mockData = {
//   "plus_code" : {
//      "compound_code" : "JF9C+9VV Toulouse, France",
//      "global_code" : "8FM3JF9C+9VV"
//   },
//   "results" : [
//      {
//         "address_components" : [
//            {
//               "long_name" : "8",
//               "short_name" : "8",
//               "types" : [ "street_number" ]
//            },
//            {
//               "long_name" : "Rue Arthur Legoust",
//               "short_name" : "Rue Arthur Legoust",
//               "types" : [ "route" ]
//            },
//            {
//               "long_name" : "Toulouse",
//               "short_name" : "Toulouse",
//               "types" : [ "locality", "political" ]
//            },
//            {
//               "long_name" : "Haute-Garonne",
//               "short_name" : "Haute-Garonne",
//               "types" : [ "administrative_area_level_2", "political" ]
//            },
//            {
//               "long_name" : "Occitanie",
//               "short_name" : "Occitanie",
//               "types" : [ "administrative_area_level_1", "political" ]
//            },
//            {
//               "long_name" : "France",
//               "short_name" : "FR",
//               "types" : [ "country", "political" ]
//            },
//            {
//               "long_name" : "31500",
//               "short_name" : "31500",
//               "types" : [ "postal_code" ]
//            }
//         ],
//         "formatted_address" : "8 Rue Arthur Legoust, 31500 Toulouse, France",
//         "geometry" : {
//            "bounds" : {
//               "northeast" : {
//                  "lat" : 43.6185009,
//                  "lng" : 1.472236
//               },
//               "southwest" : {
//                  "lat" : 43.6183848,
//                  "lng" : 1.4720752
//               }
//            },
//            "location" : {
//               "lat" : 43.6184307,
//               "lng" : 1.472154
//            },
//            "location_type" : "ROOFTOP",
//            "viewport" : {
//               "northeast" : {
//                  "lat" : 43.6197918302915,
//                  "lng" : 1.473504580291502
//               },
//               "southwest" : {
//                  "lat" : 43.6170938697085,
//                  "lng" : 1.470806619708498
//               }
//            }
//         },
//         "place_id" : "ChIJW84IVsW8rhIRfopeyuoJefM",
//         "types" : [ "premise" ]
//      },
//      {
//         "address_components" : [
//            {
//               "long_name" : "29",
//               "short_name" : "29",
//               "types" : [ "street_number" ]
//            },
//            {
//               "long_name" : "Chemin des Argoulets",
//               "short_name" : "Chem. des Argoulets",
//               "types" : [ "route" ]
//            },
//            {
//               "long_name" : "Toulouse",
//               "short_name" : "Toulouse",
//               "types" : [ "locality", "political" ]
//            },
//            {
//               "long_name" : "Haute-Garonne",
//               "short_name" : "Haute-Garonne",
//               "types" : [ "administrative_area_level_2", "political" ]
//            },
//            {
//               "long_name" : "Occitanie",
//               "short_name" : "Occitanie",
//               "types" : [ "administrative_area_level_1", "political" ]
//            },
//            {
//               "long_name" : "France",
//               "short_name" : "FR",
//               "types" : [ "country", "political" ]
//            },
//            {
//               "long_name" : "31500",
//               "short_name" : "31500",
//               "types" : [ "postal_code" ]
//            }
//         ],
//         "formatted_address" : "29 Chem. des Argoulets, 31500 Toulouse, France",
//         "geometry" : {
//            "location" : {
//               "lat" : 43.6182841,
//               "lng" : 1.4726168
//            },
//            "location_type" : "ROOFTOP",
//            "viewport" : {
//               "northeast" : {
//                  "lat" : 43.61963308029149,
//                  "lng" : 1.473965780291502
//               },
//               "southwest" : {
//                  "lat" : 43.6169351197085,
//                  "lng" : 1.471267819708498
//               }
//            }
//         },
//         "place_id" : "ChIJhQ2lq9q8rhIRFlAPUkdCWx0",
//         "plus_code" : {
//            "compound_code" : "JF9F+82 Toulouse, France",
//            "global_code" : "8FM3JF9F+82"
//         },
//         "types" : [ "establishment", "health", "point_of_interest" ]
//      },
//      {
//         "address_components" : [
//            {
//               "long_name" : "7",
//               "short_name" : "7",
//               "types" : [ "street_number" ]
//            },
//            {
//               "long_name" : "Rue Boileau",
//               "short_name" : "Rue Boileau",
//               "types" : [ "route" ]
//            },
//            {
//               "long_name" : "Toulouse",
//               "short_name" : "Toulouse",
//               "types" : [ "locality", "political" ]
//            },
//            {
//               "long_name" : "Haute-Garonne",
//               "short_name" : "Haute-Garonne",
//               "types" : [ "administrative_area_level_2", "political" ]
//            },
//            {
//               "long_name" : "Occitanie",
//               "short_name" : "Occitanie",
//               "types" : [ "administrative_area_level_1", "political" ]
//            },
//            {
//               "long_name" : "France",
//               "short_name" : "FR",
//               "types" : [ "country", "political" ]
//            },
//            {
//               "long_name" : "31500",
//               "short_name" : "31500",
//               "types" : [ "postal_code" ]
//            }
//         ],
//         "formatted_address" : "7 Rue Boileau, 31500 Toulouse, France",
//         "geometry" : {
//            "location" : {
//               "lat" : 43.6179916,
//               "lng" : 1.4721155
//            },
//            "location_type" : "ROOFTOP",
//            "viewport" : {
//               "northeast" : {
//                  "lat" : 43.6193405802915,
//                  "lng" : 1.473464480291502
//               },
//               "southwest" : {
//                  "lat" : 43.6166426197085,
//                  "lng" : 1.470766519708498
//               }
//            }
//         },
//         "place_id" : "ChIJmyuXUcW8rhIRYs3OOc3hkDk",
//         "plus_code" : {
//            "compound_code" : "JF9C+5R Toulouse, France",
//            "global_code" : "8FM3JF9C+5R"
//         },
//         "types" : [ "street_address" ]
//      }
//   ],
//   "status" : "OK"
// };