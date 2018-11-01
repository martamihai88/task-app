import moment from 'moment'

const today = moment(new Date().toISOString().slice(0,10));;

const progress = (allCards) => {
  allCards && allCards.map( card => {
    const due = moment(card.dueDate);
    const dateDifference = due.diff(today, 'days');
    const precent = (dateDifference * 100) / card.dueDays; 
    if(card.dueDays > 0){
      card.progress = 100 - precent;
      card.dueDays = dateDifference;
    } else if (card.dueDays === 0 && card.archived !== true){
      card.progress = 99;
      card.dueDays = dateDifference;
    } else {
      card.progress = 100;
      card.archived = true;
    }
    return card;
  });
  return allCards;
}

const key = () => (`_${Math.random().toString(36).substr(2, 9)}`);

const cardFilter = (cards, id) => cards.filter((card) => card.id === id);

const indexFinder = (cards, id) => cards.findIndex( card => card.id === id);

export { today, progress, cardFilter, indexFinder, key } 





