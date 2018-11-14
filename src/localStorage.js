export const loadState = () => {
  try {
    if(localStorage.getItem('state') !== null ){
      return JSON.parse(localStorage.getItem('state'));
    }
  } catch (error) {
    return {};
  }
}

export const saveState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (error) {
    //
  }
} 