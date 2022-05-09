export const classes = {
    root: {
      position: 'fixed',
      width: '100%',
      height: '100vh',
    },
    toastError: {
      '& > div': {
        backgroundColor: '#D32F2F',
      }
    },
    toastSuccess: {
      '& > div': {
        backgroundColor: '#1976D2',
      }
    },
    toastContentContainer: {
      display: 'flex'
    },
    toastMessage: {
      margin: '0 0 0 1rem'
    }
  }