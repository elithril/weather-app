export const classes = {
    root: {
      width: '650px',
      minHeight: '30vh',
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
      padding: '1rem 0 0 0',
      position: 'relative',
    },
    cityNameContainer: {
      display: 'flex'
    },
    cityName: {
      margin: '2rem 0 0 0',
      textAlign: 'left',
      width: '75%',
    },
    favoriteButtonContainer: {
      width: '25%',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    likeIconButton: {
      width: '45px',
      height: '45px',
      marginTop: '2rem',
      transform: 'translateY(-5px)'
    },
    likeButton: {
      width: '35px',
      height: '35px',
      color: '#1976D2',
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
      transform: 'translateY(5px)',
      color: '#1976D2',
    },
    dailyContainer: {
      marginTop: '1rem',
      backgroundColor: 'rgba(26, 115, 232, 0.1)',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
    },
    dailyTitle: {
      textAlign: 'left',
      marginLeft: '1rem',
      marginTop: '0.5rem'
    },
    dailyCardsContainer: {
      display: 'flex',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(26, 115, 232, 0.8)',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgb(26 115 232 / 30%)',
        bordeRadius: '10px',
      },
    },
    iconAndTextWindContainer: {
      display: 'flex',
      justifyContent: "space-between",
      marginBottom: '1rem',
      position: 'absolute',
      width: '115px',
      right: '0.5rem'
    },
    iconAndTextRainContainer: {
      display: 'flex',
      justifyContent: "space-between",
      marginBottom: '1rem',
      position: 'absolute',
      width: '115px',
      top: '4rem',
      right: 'calc(0.5rem)'
    },
    specialIconSize: {
      width: '30px',
      height: '30px',
    },
    textAlignment: {
      marginLeft: '0.5rem',
      transform: 'translateY(5px)'
    },
    favoriteButton: {
      height: '35px',
      transform: 'translateY(10px)',
    },
  }