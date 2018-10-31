export default theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
     display: 'flex',
     width: '100%', 
     backgroundColor: '#fff', 
     justifyContent: 'center', 
     height: '60px',
     position: 'fixed',
     zIndex: 999,
     bottom: 0

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    borderRadius: 0,
    borderTop: 'none',
    minWidth: '8,33%',
    fontSize: '24px',
    boxShadow: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    color: '#3f51b5'
  },
  para: {
    display: 'block', 
    paddingLeft: '15px',
    margin: 0
  },

});