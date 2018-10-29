        
import React from 'react';
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
import { Home, Build, Note, History, Add} from '@material-ui/icons';
    
export default props => {
  const { anchor, open, addCard, classes , handleDrawerClose} = props;
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
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {listItems.map( item => (
          <Link style={{textDecoration: 'none'}} key={item.text} to={item.route ? item.route : ''}>
            <ListItem 
            onClick={ item.text === 'Add' ? addCard : undefined} 
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