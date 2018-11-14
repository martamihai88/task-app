import React from 'react';
import { withStyles, Card } from '@material-ui/core';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter'

const styles = {
  card: {
    width: 300,
    height: 400,
    margin: 10
  }
};

export default withStyles(styles)(props => {
  const { classes, type, title, content, id, progress, dueDate } = props;

  return (
    <Card className={classes.card}>
      <CardHeader 
        id={id}
        title={title}
        type={type}
        progress={progress}
        content={content}
        />
        <CardFooter 
        cardType={type} 
        id={id} 
        progress={progress}
        dueDate={dueDate}
        />
    </Card>
  );
})

