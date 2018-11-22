import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Add from './Components/Add';
import Edit from './Components/Edit';
import { progress } from './static';
import './App.css';
import { connect } from 'react-redux';
import { refreshCards, archiveCard} from './Actions/appActions';
class App extends Component {

  componentWillMount() {
    const { cards , archiveCard, refreshCards } = this.props;
    refreshCards(progress(cards));

    if(cards.length > 0){
        cards.map(card => {
          if(card.dueDays < 0){
            archiveCard(card) 
          }
          return undefined;
        });
    }
  }

  render() {
    const { cards , archive } = this.props;
  
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() =>(
            <Header cards={cards}/>)}
          />
          <Route exact path="/tasks" render={() =>(
            <Header cards={cards.filter(card => (card.type === 'task'))}/>)}
          />
          <Route exact path="/notes" render={() =>(
            <Header cards={cards.filter(card => (card.type === 'note'))}/>)}
          />
          <Route exact path="/archive" render={() =>(
            <Header cards={archive}
          />)}
          />
          <Route render={() =>(<h1 style={{fontSize: 200, textAlign:'center', margin: '200px 0'}}>Page not found 404</h1>)}
          />
        </Switch>
        <Add />
        <Edit />
        <Footer/>
      </div>
    )
  }
}

App.propTypes = {
  cards:  PropTypes.arrayOf(PropTypes.object),
  archive: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = state => {
  return {
    open: state.app.open,
    cards: state.app.cards,
    archive: state.app.archive
  };
}

const mapDispatchToProps = ({
  refreshCards,
  archiveCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));