const initialState = {
  singleProduct: null
};

export default function singleProductReducer(state = initialState, action) {
  switch(action.type){
    case 'SET_SINGLE_PRODUCT':
      return {
        singleProduct: action.value
      }
    default:
      return state;
  }
}