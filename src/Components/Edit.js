import React from 'react';
import { withStyles, 
         Modal,Button, 
         InputBase, FormControl, 
         AppBar,  
         Tab, 
         TextField,
         Icon  } from '@material-ui/core';
import styles from './Styles/add-style';
import moment from 'moment'

class EditCard extends React.Component {

  state = {
    title: '',
    content: '',
    dueDate: '',
    dueDays: ''
  }

  handleTitle = event => this.setState({title : event.target.value}); 
 
  handleContent = event => this.setState({content: event.target.value});

  handleDate = event => {
    const editedCard = this.props.cards.filter(card => card.id === this.props.id);
    const start =  moment(editedCard.createDate);
    const end = moment(event.target.value);
    const days = end.diff(start, 'days');
    this.setState({dueDate: event.target.value, dueDays: days + 1});
  }

  clearValues = () => {
    console.log(this.state)
    this.props.modifyCard(this.props.id, this.state);
    this.setState({title: '', content: '', dueDate: '', dueDays: ''}); 
  }

  render() {
    const { open , close , classes, type, id, cards } = this.props;
    let editedCard = [];
    editedCard = cards.filter(card => card.id === id);
    const { title, content, dueDate } = this.state;

    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={close}
        >
          <div className={classes.paper}>
            <AppBar position="static" className={classes.bar}>
                {type === 'task'? 
                 <Tab style={{ margin: 'auto'}} label="Task" /> : <Tab  style={{ margin: 'auto'}} label="Note" />}
            </AppBar>
            <FormControl className={classes.input_1}>
                <InputBase
                  inputProps={{maxLength: 16, }}
                  required
                  maxLength={5}
                  id="bootstrap-input"
                  defaultValue={editedCard.length > 0 ? editedCard[0].title : title }
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
                defaultValue={editedCard.length > 0 ? editedCard[0].content : content}
                onChange={this.handleContent}
                className={classes.textField}
                margin="normal"
              />
            </FormControl>
            <form className={classes.container} noValidate>
                {type === 'task' && <TextField
                  id={id}
                  label="Due Date"
                  type="date"
                  required
                  defaultValue={editedCard.length > 0 ? editedCard[0].dueDate : dueDate}
                  onChange={this.handleDate}
                  classes={{
                    root: classes.formControl
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
            </form>
            <Button variant="fab" mini color="primary" className={classes.button}  onClick={this.clearValues}>
                <Icon>edit_icon</Icon>
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(EditCard);