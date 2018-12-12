import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { styles } from '../Styles/login-style';
import TextFields from '../Login/Textfield/Textfield';
import { userSignUp , clearUserFieldError, handleUserData, userLogin } from '../../Actions/loginActions'

class Login extends React.Component {

  handleUserData = (event) => {
    this.props.clearUserFieldError();
    const { formData } = this.props
    formData[event.currentTarget.name] = event.target.value;
    this.props.handleUserData(formData);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(event.currentTarget.name === "signup"){
      this.props.userSignUp(this.props.formData);
    } else {
      this.props.userLogin(this.props.formData);
    }
  }

  render() {
    const { classes, signUp, formData } = this.props;
    const { singedUp } = signUp;

    if(!singedUp) {
      return (
        <div className={classes.div}>
          <Paper className={classes.root} elevation={1}>
          <TextFields 
            formData={formData}
            error={signUp.userAlreadyExists}
            message={signUp.message} 
            handleSubmit={this.handleSubmit} 
            handleLogin={this.userLogin}
            handleUserData={(e) =>this.handleUserData(e)}/>
          </Paper>
        </div>
      );
    } else {
      return(
        <div className={classes.div}>
          <Paper className={classes.root} elevation={1}>
            <h1 style={{textAlign: "center"}}>SUCCESS, <br/>please login now</h1>
          </Paper>
        </div>
        )
    }
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
    signUp: state.login.signUp,
    formData: state.login.formData
  };
}

const mapDispatchToProps = ({
  userSignUp,
  clearUserFieldError,
  handleUserData,
  userLogin
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Login));