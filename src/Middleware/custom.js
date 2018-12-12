import { cardFilter, indexFinder } from '../static';
import * as types from '../Actions/types';
 
export const customMiddleWare = store => dispatch => action => {
  console.log("Custom middleware triggered:", action);
  const cards = store.getState().app.cards;
  const archivedCards = store.getState().app.archive;

  if(action.type === types.EDIT_CARD) {
    const editedCard = cardFilter(cards, action.payload)[0];
    console.log(editedCard);
    dispatch({...action, payload: editedCard });

  } else if(action.type === types.ARCHIVE_CARD) {
      if(indexFinder(archivedCards, action.payload.id) < 0 ){
        const remainingCards = cards.filter((card) => card.id !== action.payload.id);
        dispatch({type: types.ARCHIVE_CARD_SUBMIT, payload: { cards: remainingCards, archive: action.payload , id: action.payload.id}});
      }
  } else {
    dispatch(action);
  }
}

