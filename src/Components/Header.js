import React from 'react';
import classNames from 'classnames';
import MyCard from './Card/MyCard';
import { Menu } from '@material-ui/icons'
import { withStyles, 
          AppBar, 
          Toolbar, 
          Typography, 
          IconButton} from '@material-ui/core';
import styles from './Styles/header-style';
import AppDrawer from './Drawer';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class Header extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };

  handleDrawerOpen = () => this.setState({ open: true });

  handleDrawerClose = () => this.setState({ open: false });

  render() {
    const { classes , cards, addCard, editCard, archiveCard } = this.props;
    const { anchor, open } = this.state;
    
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Tasks & Notes
              </Typography>
            </Toolbar>
          </AppBar>
          <AppDrawer anchor={anchor} open={open} addCard={addCard} handleDrawerClose={this.handleDrawerClose} classes={classes}/>
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            {cards.map( card => (
              <MyCard 
                key={card.id}
                id={card.id}
                type={card.type}
                title={card.title}
                content={card.content}
                dueDays={card.dueDays}
                progress={card.progress}
                editCard={editCard}
                archiveCard={archiveCard}
                remove={(e) =>this.props.remove(e)}
              />
            ))}
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);