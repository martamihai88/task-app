import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper} from '@material-ui/core';
import { today }from '../static';
import styles from './Styles/footer-style';
import { Build, Note, HourglassEmpty } from '@material-ui/icons';
import { connect } from 'react-redux';

const Footer = props => {
  const { paper, para, container } = props.classes
  const { cards } = props;
  const taskNum = cards.filter(card => card.type === 'task').length;
  const noteNum = cards.filter(card => card.type === 'note').length;
  const taskInProgress = cards.filter(
    card => card.dueDate === today._i &&  card.type === 'task').length;
    
  return ( 
    <React.Fragment>
      <div className={container}>
      <Paper className={paper}>
        <HourglassEmpty  />
        <p className={para}>
          {taskInProgress}
          </p>
      </Paper>
        <Paper className={paper}>
          <Build  />
          <p className={para}>
            {taskNum}
          </p>
          </Paper>    
        <Paper className={paper}>
          <Note  />
          <p className={para}>
          {noteNum}
          </p>
        </Paper>
      </div>
    </React.Fragment>
  );
}

Footer.propTypes = {
  cards:  PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object
}

const mapStateToProps = state => {
  return {
    cards: state.app.cards
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Footer))
