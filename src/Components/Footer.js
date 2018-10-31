import React from 'react';
import { withStyles, Paper} from '@material-ui/core';
import { today }from '../static';
import styles from './Styles/footer-style';
import { Build, Note, HourglassEmpty } from '@material-ui/icons';

export default withStyles(styles)((props) => {

  const { paper, para, container} = props.classes
  let taskNum = props.cards.filter(card => card.type === 'task');
      taskNum = taskNum.length;
  let noteNum = props.cards.filter(card => card.type === 'note');
      noteNum = noteNum.length;
  let taskInProgress = props.cards.filter(card => card.dueDate === today._i);
      taskInProgress = taskInProgress.length;

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

