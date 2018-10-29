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

class MyCard extends React.Component {

  
  render(){
    const { classes, type, title, content, remove, id, progress, dueDays, editCard, archiveCard } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader 
          id={id}
          title={title}
          type={type}
          content={content}
          progress={progress}
          dueDays={dueDays}
          remove={(e) => remove(e)}
         />
         <CardFooter cardType={type} id={id} editCard={editCard} archiveCard={archiveCard}
         />
      </Card>
    );
  }
}

export default withStyles(styles)(MyCard);