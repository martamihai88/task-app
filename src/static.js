import moment from 'moment'

let today = moment(new Date().toISOString().slice(0,10));;

const progress = (allCards) => {
  allCards && allCards.forEach( card => {
    let due = moment(card.dueDate);
    let dateDifference = due.diff(today, 'days');
    let precent = (dateDifference * 100) / card.dueDays; 
    if(card.dueDays > 0){
      card.progress = 100 - precent;
    } else {
      card.progress = 100;
    }
  });
  return allCards;
}

const cardFilter = (cards, id) => cards.filter((card) => card.id === id);
const indexFinder = (cards, id) => cards.findIndex( card => card.id === id)

export { today, progress, cardFilter, indexFinder} 



