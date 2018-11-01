import React from 'react';
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
import { today } from '../../static';

class CardFooter extends React.Component {
    
    state = {
      anchorEl: null,
      open: false,
      placement: null,
    };
  
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
    const { classes, cardType, editCard, id, archiveCard, dueDate, progress  } = this.props
    const { anchorEl, open, placement  } = this.state;
    const popperId = open ? 'simple-popper' : null;

    return (
      <CardActions className={classes.actions}>
        <Button variant="fab" 
          mini color="primary" 
          id={id} 
          card={cardType} 
          className={classes.button} 
          onClick={(e) => editCard(e.currentTarget.attributes.card.value, e.currentTarget.id)}
        >
          <Icon>edit_icon</Icon>
        </Button>
        {dueDate === today._i && cardType === 'task' && progress < 100 && 
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
          onClick={(e) =>archiveCard(e.currentTarget.id)}
        >
          {cardType === 'task' ? 'Done' : 'Archive'}
          {cardType === 'task' ? (<Done className={classes.rightIcon} />) : (<Archive className={classes.rightIcon} />)}
        </Button>
      </CardActions>
    );
  }
}

export default withStyles(styles)(CardFooter)
