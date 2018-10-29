import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Line } from 'rc-progress'
import { withStyles,
         CardHeader,
         IconButton, 
         CardContent, 
         Typography} from '@material-ui/core';
import styles from '../Styles/cardHeader-style';

class CHeader extends React.Component {
 
  render () {
    const { classes, title, content, id, remove, progress, type} = this.props;

    return (
      <React.Fragment>
        <CardHeader
              action={
                <IconButton 
                id={id}
                onClick={(e)=> remove(e)}>
                  <DeleteIcon />
                </IconButton>
              }
              title={title}
        />
        <CardContent className={classes.content}>
              <Typography component="p">
                {content}
              </Typography>{ type === 'task' &&
              <Line className={classes.bar} percent={progress} strokeWidth="4" strokeColor='#3FC7FA'/>}
        </CardContent>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CHeader);