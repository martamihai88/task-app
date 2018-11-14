import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, 
         Modal,Button, 
         FormControl, 
         AppBar, 
         Tabs, 
         Tab, 
         TextField  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import styles from './Styles/add-style';
import { today , key } from '../static'
import { connect } from 'react-redux';
import * as appActions from '../Actions/appActions';
import * as appSideActions from '../Actions/appSideActions';       
         
class AddCard extends Component {

  addCardRedux = () => {
    let type = this.props.appBarValue === 0 ? 'task' : 'note';
    if(type === 'task'){ 
      this.props.addCardToCards({...this.props.card, id: key(), type: type, progress: 0, createDate: today._i});
    } else {
      this.props.addCardToCards({...this.props.card, id: key(), type: type, createDate: today._i , dueDays: '', dueDate: ''});
    }
    this.props.resetAddCardRedux();
    this.props.closeAddCardRedux(false);
  }

  handleAddBarChangeRedux = (event, value) => {
    this.props.handleAddBarChangeRedux({value: value})
  };

  handleTitleRedux = event => this.props.handleTitleRedux({title: event.target.value});

  handleContentRedux = event => this.props.handleContentRedux({content: event.target.value});

  setDueDateRedux = event => {
    if(this.props.appBarValue === 0){
      const end = moment(event.target.value);
      const date = end.diff(today, 'days');
      this.props.setDueDateRedux({dueDays: date, dueDate: end._i});
    }
  };

  closeAddCardRedux = () => this.props.openAddCardRedux(false);

  render() {
    const { classes, open, appBarValue } = this.props;

    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={this.closeAddCardRedux}
        >
          <div className={classes.paper}>
            <AppBar position="static" className={classes.bar}>
              <Tabs value={appBarValue} onChange={this.handleAddBarChangeRedux}>
                <Tab label="Task" />
                <Tab label="Note" />
              </Tabs>
            </AppBar>
            <FormControl style={{height: '67px', marginTop: 0}} className={classes.input_2}>
              <TextField
                  maxLength={16}
                  id="outlined-required"
                required
                placeholder={appBarValue === 0 ? 'Task Name' : 'Note Title'}
                onChange={this.handleTitleRedux}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.input_2}>
              <TextField
              id="outlined-multiline-static"
              required
              multiline
              rows="8"
              placeholder={appBarValue === 0 ? 'Task Content' : 'Note Content'}
              onChange={this.handleContentRedux}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              /> 
            </FormControl>
            <form className={classes.container} noValidate>
                {appBarValue === 0 && <TextField
                  id={this.props.card.id}
                  label="Due Date"
                  type="date"
                  required
                  defaultValue={today._i}
                  onChange={this.setDueDateRedux}
                  classes={{
                    root: classes.formControl
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
            </form>
            <Button variant="fab" mini color="primary" className={classes.button}  onClick={this.addCardRedux}>
                <AddIcon />
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

AddCard.propTypes = {
  card:  PropTypes.object,
  appBarValue: PropTypes.number,
  open: PropTypes.bool,
  classes: PropTypes.object
}

const mapStateToProps = state => {
  return {
    card: state.app.card,
    appBarValue: state.appSide.appBarValue,
    open: state.appSide.open
  };
}
const mapDispatchToProps = ({
  addCardRedux: appActions.addCardRedux,
  handleTitleRedux: appActions.handleTitleRedux,
  handleContentRedux: appActions.handleContentRedux,
  setDueDateRedux: appActions.setDueDateRedux,
  handleAddBarChangeRedux: appSideActions.handleAddBarChangeRedux,
  closeAddCardRedux: appSideActions.closeAddCardRedux,
  addCardToCards: appActions.addCardToCards,
  openAddCardRedux: appSideActions.openAddCardRedux,
  resetAddCardRedux: appActions.resetAddCardRedux
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCard))