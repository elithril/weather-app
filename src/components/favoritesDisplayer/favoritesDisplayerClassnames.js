export const classes = {
    dialogTopBar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    dialogTitle: {
      fontSize: '20px',
      transform: 'translateY(5px)'
    },
    textSpacing: {
      margin: '1rem 0',
    },
    noFavoriteContainer: {
      textAlign: 'center'
    },
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
    },
    closeModalButton: {
      marginRight: '0.4rem',
    }
  }