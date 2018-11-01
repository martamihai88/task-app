import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Line } from 'rc-progress'
import { withStyles,
         CardHeader,
         IconButton, 
         CardContent, 
         Typography} from '@material-ui/core';
import styles from '../Styles/cardHeader-style';

export default withStyles(styles)((props) => {
  const { classes, title, content, id, remove, progress, type} = props;

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
            <Typography component="p" className={classes.typography}>
              {content}
            </Typography>{ type === 'task' && 
              <React.Fragment>
                <Line className={classes.bar} percent={progress} strokeWidth="4" strokeColor='#3FC7FA'/>
                <p style={{margin:0 , paddingTop: 10}}>{`${Math.round(progress)}%`}</p>
              </React.Fragment>
            }   
      </CardContent>
    </React.Fragment>
  );
})
