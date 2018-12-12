
export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    height: 200,
    marginTop: 100,
    display: 'flex',
    flexWrap: 'wrap'
  },
  div: {
    marginLeft: 'auto',
    marginRight: 'auto',
  } 
});