import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { 
  Drawer, 
  List, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemIcon, 
  ListItemText,} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Home, Build, Note, History, Add } from '@material-ui/icons';
import { openAddCardRedux, handleDrawer } from '../Actions/appSideActions';
import { connect } from 'react-redux';

class MyDrawer extends Component {
    
  openAddCardRedux = () => this.props.openAddCardRedux(true);

  handleDrawer = () => {
    this.props.header.open === true ? 
      this.props.handleDrawer({ open: false }) : this.props.handleDrawer({ open: true });
  };
  
  render() {     
    const { classes } = this.props;
    const { anchor, open } =  this.props.header
    const listItems = [ {icon: Home, text: 'Home', route: '/'},
                        {icon: Build, text: 'Tasks', route: '/tasks'}, 
                        {icon: Note, text: 'Notes', route: '/notes'},
                        {icon: Add, text: 'Add'},
                        {icon: History, text: 'Archive', route: '/archive'}
                      ]; 
    
  return (
    <Drawer
      variant="persistent"
      anchor={anchor}
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={this.handleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {listItems.map( item => (
          <Link style={{textDecoration: 'none'}} key={item.text} to={item.route ? item.route : ''}>
            <ListItem 
            onClick={ item.text === 'Add' ? this.openAddCardRedux : undefined} 
            button
            >
            <ListItemIcon>
            <item.icon className={classes.icon} />
            </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link> )
        )}
      </List>
      <Divider />
    </Drawer>
  )
  }
}  

MyDrawer.propTypes = {
  open: PropTypes.bool,
  anchor: PropTypes.string,
  classes: PropTypes.object
}

const mapStateToProps = state => {
  return {
    header: state.appSide.header
  };
}
const mapDispatchToProps = ({
  openAddCardRedux,
  handleDrawer
})


export default connect (mapStateToProps, mapDispatchToProps)(MyDrawer);