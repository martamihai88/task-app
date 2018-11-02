import { REMOVE_CARD } from './types';

export const  removeCard = e => dispatch =>{
  dispatch({
    type: REMOVE_CARD,
    payload: e.target.value
  })
}