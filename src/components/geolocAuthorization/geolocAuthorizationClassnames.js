export const classes = {
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