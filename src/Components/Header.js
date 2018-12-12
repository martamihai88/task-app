import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MyCard from './Card/MyCard';
import { Menu } from '@material-ui/icons'
import { withStyles, 
          AppBar, 
          Toolbar, 
          Typography, 
          IconButton,
          Button } from '@material-ui/core';
import styles from './Styles/header-style';
import AppDrawer from './Drawer';
import Login from './Login/Login';
import { handleDrawer, openAddCardRedux } from '../Actions/appSideActions';
import { userLogout } from '../Actions/loginActions';
import { connect } from 'react-redux';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
class Header extends Component {

  handleDrawer = () => {
    this.props.header.open === true ? 
      this.props.handleDrawer({ open: false }) : this.props.handleDrawer({ open: true });
  };

  userLogout = () => this.props.userLogout();

  render() {
    const { classes , cards, loggedIn, user } = this.props;
    const { anchor, open } = this.props.header;
    
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
                onClick={loggedIn ? this.handleDrawer : undefined}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <Menu />
              </IconButton>
              <Typography style={{width: 1350}}variant="h6" color="inherit" noWrap>
                Tasks & Notes
              </Typography>
              {loggedIn && 
                <div style={{display: 'flex', flexWrap: 'wrap'}}> 
                  <p className={classes.user}>{user.email.split('@')[0]}</p>
                  <Button onClick={() => this.userLogout()} style={{marginLeft: 'auto', marginRight: 'auto'}} color="inherit">Logout</Button>
                </div>}
            </Toolbar>
          </AppBar>
          { loggedIn ? 
            <React.Fragment>
            <AppDrawer anchor={anchor} open={open} classes={classes}/>
            <main
              className={classNames(classes.content, classes[`content-${anchor}`], {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open,
              })}
            >
              {cards.map(card => ( 
                <MyCard 
                  key={card.id}
                  id={card.id}
                  type={card.type}
                  archived={card.archived}
                  title={card.title}
                  content={card.content}
                  dueDays={card.dueDays}
                  progress={card.progress}
                  dueDate={card.dueDate}
                />
              ))}
            </main>
          </React.Fragment> : 
          <Login/>
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  cards:  PropTypes.arrayOf(PropTypes.object),
  header: PropTypes.object
}

const mapStateToProps = state => {
  return {
    header: state.appSide.header,
    loggedIn: state.login.loggedIn,
    user: state.login.user
  };
}
const mapDispatchToProps = ({
  handleDrawer,
  openAddCardRedux,
  userLogout
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Header));

