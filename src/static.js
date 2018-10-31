import moment from 'moment'

const today = moment(new Date().toISOString().slice(0,10));;

const progress = (allCards) => {
  allCards && allCards.forEach( card => {
    const due = moment(card.dueDate);
    const dateDifference = due.diff(today, 'days');
    const precent = (dateDifference * 100) / card.dueDays; 
    if(card.dueDays > 0){
      card.progress = 100 - precent;
    } else {
      card.progress = 100;
      card.archive = true;
    }
  });
  return allCards;
}

const key = () => (`_${Math.random().toString(36).substr(2, 9)}`);

const cardFilter = (cards, id) => cards.filter((card) => card.id === id);

const indexFinder = (cards, id) => cards.findIndex( card => card.id === id);

export { today, progress, cardFilter, indexFinder, key } 



