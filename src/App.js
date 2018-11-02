import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Add from './Components/Add';
import Edit from './Components/Edit'
import { progress , cardFilter , indexFinder} from './static'
import './App.css';

import { openAddCardRedux, closeAddCardRedux} from './Actions/appActions';
import { connect } from 'react-redux';
class App extends Component {

  state = {
    cards: [],
    open: false,
    openEdit: false,
    id:'',
    cardType:''
  }
  
/* Transtition to Redux */

  openAddCardRedux = () => this.props.openAddCardRedux(true);

  closeAddCardRedux = () => this.props.openAddCardRedux(false);

  /* Transtition to Redux */


  drawAddNewCard = () => this.setState({ open: true });

  handleModalClose = () => this.setState({ open: false });

  addCard = (card) => {
    let cards = [...this.state.cards,card];
    this.setState({cards: cards}, () => {
      this.saveToLocalStorage();
    });
  }

  saveToLocalStorage = () => {
    const cards = this.state.cards;
    localStorage.setItem('cards', JSON.stringify(cards));
  };
  
  editCard = (cardtype, id) => this.setState({ openEdit: true , cardType: cardtype, id: id});

  modifyCard = (id, card) => {
    let allCards = this.state.cards;  
    const index = indexFinder(allCards, id)
    allCards.splice(index, 1, card);  

    this.setState({cards : allCards});
    this.saveToLocalStorage();
    this.handleEditClose(); 
  }
  
  handleEditClose = () => this.setState({ openEdit: false })

  archiveCard = (id) => {
    let allCards = this.state.cards;
    let archivedCard = cardFilter(allCards, id);
    archivedCard = {...archivedCard[0], dueDays: 0, archived: true, progress: 100};
    const index = indexFinder(allCards, id);
    allCards.splice(index, 1, archivedCard);

    this.setState({cards : allCards});
    this.saveToLocalStorage();
  }
  
  removeCard = (e) => {
    const cards = this.state.cards.filter((card) => card.id !== e.currentTarget.id);
    this.setState({cards: cards}, () => {
      localStorage.clear();
      this.saveToLocalStorage();
    })
  }

  componentDidMount()  {
    const cardsRetreived = progress(JSON.parse(localStorage.getItem('cards')));
    const allCards = cardsRetreived ? cardsRetreived : this.state.cards ;
    this.setState({cards: allCards}, () => {
      localStorage.clear();
      this.saveToLocalStorage();
    });
  } 
  
  render() {
    const { cards, openEdit, cardType, id } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() =>(
          <Header cards={cards.filter(card => card.archived !== true)} 
            addCard={this.openAddCardRedux} 
            editCard={this.editCard} 
            archiveCard={this.archiveCard} 
            remove={this.removeCard}/>)}
          />
          <Route exact path="/tasks" render={() =>(
          <Header cards={cards.filter(card => (card.type === 'task' && card.archived !== true))}
           addCard={this.openAddCardRedux} 
           editCard={this.editCard} 
           archiveCard={this.archiveCard} 
           remove={this.removeCard}/>)}
          />
          <Route exact path="/notes" render={() =>(
          <Header cards={cards.filter(card => (card.type === 'note' && card.archived !== true))} 
          addCard={this.openAddCardRedux} 
          editCard={this.editCard} 
          archiveCard={this.archiveCard} 
          remove={this.removeCard}/>)}
          />
          <Route exact path="/archive" render={() =>(
          <Header cards={cards.filter(card => card.archived)}
           addCard={this.openAddCardRedux}
           editCard={this.editCard} 
           archiveCard={this.archiveCard} 
           remove={this.removeCard}/>)}
          />
          <Route render={() =>(<h1 style={{fontSize: 200, textAlign:'center', margin: '200px 0'}}>Page not found 404</h1>)}
          />
        </Switch>
        <Add open={this.props.open} close={this.closeAddCardRedux} addCard={this.addCard}/>
        <Edit cards={cards} 
          id={id} 
          type={cardType} 
          open={openEdit} 
          close={this.handleEditClose} 
          modifyCard={this.modifyCard}/>
        <Footer  cards={cards}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    open: state.app.open
  };
}
const mapDispatchToProps = ({
  openAddCardRedux, closeAddCardRedux
})

export default connect(mapStateToProps, mapDispatchToProps)(App);