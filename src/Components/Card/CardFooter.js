import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Archive from '@material-ui/icons/Archive';
import Done from '@material-ui/icons/Done'
import { withStyles, 
         CardActions, 
         Button, 
         Icon, 
         IconButton,
         Popper,
         Typography,
         Fade,
         Paper,
         ClickAwayListener} from '@material-ui/core';
import styles from '../Styles/cardFooter-style';
import { today, cardFilter } from '../../static';

import { connect } from 'react-redux';
import { openEditCardRedux, editCard, archiveCard } from  '../../Actions/appActions';
import { handleOpenPopperRedux, clickAwayPopperRedux } from  '../../Actions/appSideActions';
class CardFooter extends Component {

  state = {
    anchorEl: null,
    open: false,
    placement: null,
  };
    
  openEditCardRedux = (open, id) => {
    this.props.openEditCardRedux(open, id);
    this.props.editCard(id);
  }

  archiveCard = (id) => {
    if(this.props.cards.findIndex(card => card.id === id) > -1){
      let archivedCard = cardFilter(this.props.cards, id);
      archivedCard = {...archivedCard[0], dueDays: 0, progress: 100};
      this.props.archiveCard(archivedCard);
    } 
  }
  
  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes, cardType, id, dueDate, archived  } = this.props
    const { anchorEl, open, placement  } = this.state
    const popperId = open ? 'simple-popper' : null;

    return (
      <CardActions className={classes.actions}>
        <Button variant="fab" 
          mini color="primary" 
          id={id} 
          className={classes.button} 
          onClick={() => this.openEditCardRedux(true, id)}
        >
          <Icon>edit_icon</Icon>
        </Button>
        {dueDate === today._i && archived === false && cardType === 'task' && 
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
              <IconButton color="secondary" className={classes.button} onClick={this.handleClick('top')}>
                <Icon>alarm</Icon>
              </IconButton>
              <Popper id={popperId} 
                open={open} 
                anchorEl={anchorEl}
                placement={placement} 
                transition 
                disablePortal
              >
              {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography className={classes.typography}>Due Today!!</Typography>
                    </Paper>
                  </Fade>
              )}
              </Popper>
            </div>
          </ClickAwayListener>
        }
        <Button variant="contained" 
          size="small" 
          color="secondary" 
          id={id} 
          card={cardType} 
          className={classes.button} 
          onClick={(e) => this.archiveCard(e.currentTarget.id)}
        >
          {cardType === 'task' ? 'Done' : 'Archive'}
          {cardType === 'task' ? (<Done className={classes.rightIcon} />) : (<Archive className={classes.rightIcon} />)}
        </Button>
      </CardActions>
    );
  }
}

CardFooter.propTypes = {
  dueDate:  PropTypes.string,
  id: PropTypes.string.isRequired,
  anchorEl: PropTypes.element,
  open: PropTypes.bool,
  cardType: PropTypes.oneOf(['task', 'note']),
  classes: PropTypes.object,
  placement: PropTypes.string,
  archived: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    footer: state.appSide.footer,
    cards: state.app.cards,
    archive: state.app.archive
  };
}
const mapDispatchToProps = ({
  openEditCardRedux,
  editCard,
  handleOpenPopperRedux,
  clickAwayPopperRedux,
  archiveCard
})

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CardFooter))
