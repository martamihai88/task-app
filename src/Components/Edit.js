import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';
import * as appActions from '../Actions/appActions'

class MyEditCard extends Component {

  openEditCardRedux = (open, id) => {
    this.props.resetAddCardRedux();
    this.props.openEditCardRedux(open, id);
  }

  handleTitleRedux = event => {
    if(event){
      this.props.handleTitleRedux({title: event.target.value})
    }
  }; 
 
  handleContentRedux = event => {
    if(event){
      this.props.handleContentRedux({content: event.target.value})
    }
  }

  setDueDateRedux = event => {
    if(event){
      let editedCard = this.props.card;
      const start =  moment(editedCard.createDate);
      const end = moment(event.target.value);
      const days = end.diff(start, 'days');
      this.props.setDueDateRedux({dueDays: days, dueDate: end._i})
    }
  }

  submitCardRedux = () => {
    const { cards, card } = this.props;
    const editedCards = cards.map(c => {
      if(c.id === card.id){
        return card;
      }
      return c;
    });
    this.props.submitCardRedux(card, editedCards);
    this.props.resetAddCardRedux();
    this.props.openEditCardRedux(false, '', '');
  }

  render() {

    const { openEdit , classes, editedCardId, cards } = this.props;
    console.log(editedCardId);
    const editedCard = cardFilter(cards, editedCardId);

    return (
      <React.Fragment>
        <Modal
          open={openEdit}
          onClose={() => this.openEditCardRedux(false, '')}
        >
          <div className={classes.paper}>
            <AppBar position="static" className={classes.bar}>
                {editedCard.length > 0 && editedCard[0].type === 'task' ? 
                 <Tab style={{ margin: 'auto'}} label="Task" /> : <Tab  style={{ margin: 'auto'}} label="Note" />}
            </AppBar>
            <FormControl style={{height: '67px', marginTop: 0}} className={classes.input_2}>
              <TextField
                required
                maxLength={16}
                id="outlined-required"
                defaultValue={editedCard[0] ? editedCard[0].title : ''}
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
                defaultValue={editedCard[0] ? editedCard[0].content : ''}
                onChange={this.handleContentRedux}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </FormControl>
            <form className={classes.container} noValidate>
                {editedCard.length > 0 && editedCard[0].type === 'task' && <TextField
                  id={editedCardId}
                  label="Due Date"
                  type="date"
                  required
                  defaultValue={editedCard[0] ? editedCard[0].dueDate : ''}
                  onChange={this.setDueDateRedux}
                  classes={{
                    root: classes.formControl
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
            </form>
            <Button variant="fab" mini color="primary" className={classes.button} onClick={this.submitCardRedux}>
                <Icon>edit_icon</Icon>
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

MyEditCard.propTypes = {
  cards:  PropTypes.arrayOf(PropTypes.object),
  editedCardId: PropTypes.string.isRequired,
  openEdit: PropTypes.bool,
  card: PropTypes.object,
  classes: PropTypes.object
}

const mapStateToProps = state => {
  return {
    openEdit: state.app.openEdit,
    cards: state.app.cards,
    editedCardId: state.app.editedCardId,
    card: state.app.card
  };
}

const mapDispatchToProps = ({
  openEditCardRedux: appActions.openEditCardRedux,
  handleTitleRedux: appActions.handleTitleRedux, 
  handleContentRedux: appActions.handleContentRedux, 
  setDueDateRedux: appActions.setDueDateRedux,
  submitCardRedux: appActions.submitCardRedux,
  resetAddCardRedux: appActions.resetAddCardRedux
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MyEditCard))