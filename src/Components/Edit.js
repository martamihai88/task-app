import React from 'react';
import { withStyles, 
         Modal,Button, 
         FormControl, 
         AppBar,  
         Tab, 
         TextField,
         Icon  } from '@material-ui/core';
import styles from './Styles/add-style';
import moment from 'moment';
import { cardFilter } from'../static';

class EditCard extends React.Component {

  state = {
    card:{
      id: 'default',
      title: 'default',
      content: 'default',
      dueDays:'',
      createDate: '',
      dueDate: ''
    }
  }

  componentDidUpdate(prevProps) {
   if(prevProps.id !== this.props.id){
     let card = cardFilter(this.props.cards, this.props.id)
     this.setState({card : card[0]})
   }
  }  
  
  handleTitle = event => {
    if(event){
      let card = {...this.state.card, title: event.target.value}
      this.setState({card})
      }
  }; 
 
  handleContent = event => {
    if(event){
      let card = this.state.card;
      card.content = event.target.value;
      this.setState({card})
      }
  }

  handleDate = event => {
    if(event){
      let editedCard = this.state.card;
      const start =  moment(editedCard.createDate);
      const end = moment(event.target.value);
      const days = end.diff(start, 'days');
      editedCard.dueDate =  event.target.value;
      editedCard.dueDays =  days;
      this.setState({card: editedCard});
    }
  }

  clearValues = () => {
    this.props.modifyCard(this.props.id, this.state.card);
  }

  render() {

    const { open , close , classes, type, id } = this.props;
    const { title, content, dueDate } = this.state.card;

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
            <FormControl style={{height: '67px', marginTop: 0}} className={classes.input_2}>
              <TextField
                required
                maxLength={16}
                id="outlined-required"
                defaultValue={title}
                onChange={this.handleTitle}
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
                defaultValue={content}
                onChange={this.handleContent}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </FormControl>
            <form className={classes.container} noValidate>
                {type === 'task' && <TextField
                  id={id}
                  label="Due Date"
                  type="date"
                  required
                  defaultValue={dueDate}
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