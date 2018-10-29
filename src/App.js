import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Add from './Components/Add';
import Edit from './Components/Edit'
import { progress , cardFilter , indexFinder} from './static'
import './App.css';

class App extends Component {

  state = {
    cards: [
      {
        id: 'default',
        title: 'default',
        content: 'default',
        dueDays:'',
        createDate: '',
        dueDate: ''
      }
    ],
    open: false,
    openEdit: false,
    id:'',
    cardType:''
  }
  
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

  modifyCard = (id, state) => {
    let allCards = this.state.cards;  
    let editedCard = cardFilter(allCards, id);
    editedCard = {
      ...editedCard[0], 
      title: state.title, 
      content: state.content, 
      dueDate: state.dueDate, 
      dueDays: state.dueDays
    }
    const index = indexFinder(allCards, id)
    allCards.splice(index, 1, editedCard);  

    this.setState({cards : allCards});
    this.saveToLocalStorage();
    this.handleEditClose(); 
  }
  
  handleEditClose = () => this.setState({ openEdit: false })

  archiveCard = (id) => {
    let allCards = this.state.cards;
    let archivedCard = cardFilter(allCards, id);
    archivedCard = {...archivedCard[0], dueDays: 0, archived: true}
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
    const allCards = cardsRetreived.length > 0 ? cardsRetreived : this.state.cards ;
    this.setState({cards: allCards});
  } 
  
  render() {
    const { cards, open, openEdit, cardType, id } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() =>(
          <Header cards={cards.filter(card => card.archived !== true)} 
            addCard={this.drawAddNewCard} 
            editCard={this.editCard} 
            archiveCard={this.archiveCard} 
            remove={this.removeCard}/>)}
          />
          <Route exact path="/tasks" render={() =>(
          <Header cards={cards.filter(card => (card.type === 'task' && card.archived !== true))}
           addCard={this.drawAddNewCard} 
           editCard={this.editCard} 
           archiveCard={this.archiveCard} 
           remove={this.removeCard}/>)}
          />
          <Route exact path="/notes" render={() =>(
          <Header cards={cards.filter(card => (card.type === 'note' && card.archived !== true))} 
          addCard={this.drawAddNewCard} 
          editCard={this.editCard} 
          archiveCard={this.archiveCard} 
          remove={this.removeCard}/>)}
          />
          <Route exact path="/archive" render={() =>(
          <Header cards={cards.filter(card => card.archived)}
           editCard={this.editCard} 
           archiveCard={this.archiveCard} 
           remove={this.removeCard}/>)}
          />
          <Route render={() =>(<h1 style={{fontSize: 200, textAlign:'center', margin: '200px 0'}}>Page not found 404</h1>)}
          />
        </Switch>
        <Add open={open} close={this.handleModalClose} addCard={this.addCard}/>
        <Edit cards={cards} 
          id={id} 
          type={cardType} 
          open={openEdit} 
          close={this.handleEditClose} 
          modifyCard={this.modifyCard}/>
        <Footer />
      </div>
    )
  }
}

export default App;