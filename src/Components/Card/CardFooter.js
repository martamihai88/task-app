import React from 'react';
import Archive from '@material-ui/icons/Archive';
import Done from '@material-ui/icons/Done'
import { withStyles, CardActions, Button, Icon } from '@material-ui/core'
import styles from '../Styles/cardFooter-style';

class CFooter extends React.Component {
  
  render(){
    const { classes, cardType, editCard, id, archiveCard  } = this.props;

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

export default withStyles(styles)(CFooter);