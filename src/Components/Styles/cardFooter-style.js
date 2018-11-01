
export default theme => ({
  actions: {
    height:50,
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight:0
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 0
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
});