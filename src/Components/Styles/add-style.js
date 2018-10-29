export default theme => ({
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: 300,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    borderRadius: 4,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: 340,
    left: 240,
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
    height: '100%',
    padding: 5
  },
  bootstrapInput: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  bar: {
    borderRadius: '3px 3px 0 0',
  },
  input_1: {
    margin: '15px auto 30px auto',
    width: 220,
    height: 30,
    display: 'flex'
  },
  input_2: {
    margin: '10px auto 0 auto',
    width: 250,
    height: 180,
    display: 'flex',
    alignItems: 'center'
  },
  input_2_text: {
    height: 100
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 240,
    height: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 200,
    margin: '0 20px 0 20px'
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    lineHeight: 1,
    marginTop: 20
  },
});
