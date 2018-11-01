import React from 'react';
import { withStyles, Paper} from '@material-ui/core';
import { today }from '../static';
import styles from './Styles/footer-style';
import { Build, Note, HourglassEmpty } from '@material-ui/icons';

export default withStyles(styles)((props) => {

  const { paper, para, container} = props.classes
  const { cards } = props;
  const taskNum = cards.filter(card => card.type === 'task').length;
  const noteNum = cards.filter(card => card.type === 'note').length;
  const taskInProgress = cards.filter(
    card => card.dueDate === today._i && card.archived !== true &&  card.type === 'task').length;
    
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
})

