import React from 'react';
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
import { addCardRedux, 
         handleTitleRedux ,
         handleContentRedux,
         setDueDateRedux,
         handleAddBarChangeRedux,
         resetAddCardRedux } from '../Actions/addCardActions';
import { closeAddCardRedux} from '../Actions/appActions';
         
class AddCard extends React.Component {

/* Transtition to Redux */
  addCardRedux = () => {
    let type = this.props.value === 0 ? 'task' : 'note';
    this.props.addCardRedux({ id: key(), type: type});
    this.props.resetAddCardRedux();
    this.props.closeAddCardRedux(false);
  }

  handleTitleRedux = event => this.props.handleTitleRedux({title: event.target.value});

  handleContentRedux = event => this.props.handleContentRedux({content: event.target.value});

  handleAddBarChangeRedux = (event, value) => {
    this.props.handleAddBarChangeRedux({value: value})
    this.props.resetAddCardRedux();
  };
  
  setDueDateRedux = event => {
    if(this.props.value === 0){
      const end = moment(event.target.value);
      const date = end.diff(today, 'days');
      this.props.setDueDateRedux({dueDays: date, createDate: today._i, dueDate: end._i});
    }
  };

  /* Transtition to Redux */

  /* componentDidMount() {
    this.setState({createDate: today._i, dueDate: today._i })
  }

  handleChange = (event, value) => {
    console.log(event.value);
    this.setState({ value })
  };

  submitCard = () => { 
    const { value, title , content, dueDays, createDate, dueDate} = this.state;
    let type = value === 0 ? 'task' : 'note';
    const card = {id: key(), type: type, title: title, content: content , dueDays: dueDays, createDate: createDate, dueDate:  dueDate, progress: 0};

    this.props.addCard(card);
    this.setState({dueDays: ''});
    this.props.close();
  }

  handleTitle = event => this.setState({title: event.target.value});

  handleContent = event => this.setState({content: event.target.value});

  setDueDate = event => {
    if(this.state.value === 0){
      const end = moment(event.target.value);
      const date = end.diff(today, 'days');
      this.setState({dueDays: date, createDate: today._i, dueDate: end._i});
    }
  }; */

  render() {
    const { classes, open, close, value } = this.props;

    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={close}
        >
          <div className={classes.paper}>
            <AppBar position="static" className={classes.bar}>
              <Tabs value={value} onChange={this.handleAddBarChangeRedux}>
                <Tab label="Task" />
                <Tab label="Note" />
              </Tabs>
            </AppBar>
            <FormControl style={{height: '67px', marginTop: 0}} className={classes.input_2}>
              <TextField
                  maxLength={16}
                  id="outlined-required"
                required
                placeholder={value === 0 ? 'Task Name' : 'Note Title'}
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
              placeholder={value === 0 ? 'Task Content' : 'Note Content'}
              onChange={this.handleContentRedux}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              /> 
            </FormControl>
            <form className={classes.container} noValidate>
                {value === 0 && <TextField
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

const mapStateToProps = state => {
  return {
    card: state.addCard.card,
    value: state.addCard.appBarValue
  };
}
const mapDispatchToProps = ({
  addCardRedux,
  handleTitleRedux,
  handleContentRedux,
  setDueDateRedux,
  handleAddBarChangeRedux,
  resetAddCardRedux,
  closeAddCardRedux
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCard))