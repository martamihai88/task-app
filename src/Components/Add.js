import React from 'react';
import { withStyles, 
         Modal,Button, 
         InputBase, FormControl, 
         AppBar, 
         Tabs, 
         Tab, 
         TextField  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import styles from './Styles/add-style';
import { today } from '../static'

class AddCard extends React.Component {

  state = {
    id: null,
    title: '',
    content: '',
    value: 0,
    number: 0,
    dueDays:'',
    createDate: '',
    dueDate: ''
  };

  handleChange = (event, value) => this.setState({ value });

  submitCard = () => { 
    const { value, title , content, dueDays, createDate, dueDate} = this.state;
    let type = value === 0 ? 'task' : 'note';
    let key =  `_${Math.random().toString(36).substr(2, 9)}`;

    const card = {id: key, type: type, title: title, content: content , dueDays: dueDays, createDate: createDate, dueDate:  dueDate};

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
  };

  render() {
    const { classes, open, close } = this.props;
    const { value , id} = this.state;
   
    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={close}
        >
          <div className={classes.paper}>
            <AppBar position="static" className={classes.bar}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Task" />
                <Tab label="Note" />
              </Tabs>
            </AppBar>
            <FormControl className={classes.input_1}>
                <InputBase
                  inputProps={{maxLength: 16}}
                  id="bootstrap-input"
                  required
                  placeholder={value === 0 ? 'Task Name' : 'Note Title'}
                  onChange={this.handleTitle}
                  classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput,
                  }}
                />
            </FormControl>
            <FormControl className={classes.input_2}>
                <TextField
                id="standard-multiline-static"
                required
                multiline
                rows="8"
                placeholder={value === 0 ? 'Task Content' : 'Note Content'}
                onChange={this.handleContent}
                className={classes.textField}
                margin="normal"
              />
            </FormControl>
            <form className={classes.container} noValidate>
                {value === 0 && <TextField
                  id={id}
                  label="Due Date"
                  type="date"
                  required
                  defaultValue={today._i}
                  onChange={this.setDueDate}
                  classes={{
                    root: classes.formControl
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
            </form>
            <Button variant="fab" mini color="primary" className={classes.button}  onClick={this.submitCard}>
                <AddIcon />
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddCard);