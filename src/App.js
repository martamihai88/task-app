import React, { Component } from 'react';
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
    if(this.props.cards.length > 0){
        this.props.cards.map(card => {
          if(card.dueDays < 0){
            this.props.archiveCard(card) 
          }
          return undefined;
        });
      this.props.refreshCards(progress(this.props.cards));
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