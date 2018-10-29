import React from 'react';
import Build from '@material-ui/icons/Build';
import Note from '@material-ui/icons/Note';
import {  BottomNavigation, BottomNavigationAction } from '@material-ui/core';

class Footer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="Tasks" icon={<Build />} />
        <BottomNavigationAction label="Notes" icon={<Note />} />
      </BottomNavigation>
    );
  }
}

export default Footer;