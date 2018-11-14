import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { Line } from 'rc-progress'
import { withStyles,
         CardHeader,
         IconButton, 
         CardContent, 
         Typography} from '@material-ui/core';
import styles from '../Styles/cardHeader-style';

import { removeCardRedux } from '../../Actions/appActions';
import { connect } from 'react-redux';

class MyCardHeader extends Component {

  removeCardRedux = (e) => {
    this.props.removeCardRedux(e.currentTarget.id);
  }

  render() {
    const { classes, title, content, id, progress, type} = this.props;
 
    return (
      <React.Fragment>
        <CardHeader
              action={
                <IconButton 
                id={id}
                onClick={e => this.removeCardRedux(e)}>
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
  }
}

MyCardHeader.propTypes = {
  title:  PropTypes.string,
  content:  PropTypes.string,
  id: PropTypes.string.isRequired,
  progress: PropTypes.number,
  type: PropTypes.oneOf(['task', 'note']),
  classes: PropTypes.object
}

const mapStateToProps = state => {
  return {
    state
  };
}

const mapDispatchToProps = ({
  removeCardRedux
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyCardHeader))