import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import  { styles } from '../../Styles/textfield-style';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class TextFields extends React.Component {

  render() {
    const { classes, formData, handleUserData, handleSubmit, error, message } = this.props;

    return (
      <React.Fragment>
      <ValidatorForm  name="plm" className={classes.container} onSubmit={()=> {}} autoComplete="on" >
        <TextValidator
          error={error}
          required
          name="email"
          id="standard-email-input"
          label={error ? message: "Emali"}
          value={formData.email}
          onChange={handleUserData}
          className={classes.textField}
          type="email"
          autoComplete="current-email"
          margin="normal"
          validators={['required']}
        />
        <TextValidator
          error={error}
          required
          name="password"
          id="standard-password-input"
          label="Password"
          value={formData.password}
          onChange={handleUserData}
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          validators={['required']}
        />
        </ValidatorForm>
        <Button 
          name="login"
          variant="contained" 
          color="primary" 
          className={classes.button} 
          onClick={e => handleSubmit(e)}>
        Login
        </Button>
        <Button
          name="signup" 
          variant="contained" 
          color="secondary" 
          className={classes.button} 
          onClick={e => handleSubmit(e)}>
        Signup
        </Button>
      </React.Fragment>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);