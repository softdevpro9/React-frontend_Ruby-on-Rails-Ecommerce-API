const initialState = {
  singleProduct: null,
  singleCollection: null,
  searchString: '',
  sideDrawerOpen: false
};

export default function singleInstanceReducer(state = initialState, action) {
  switch(action.type){
    case 'SET_SINGLE_PRODUCT':
      return {
        ...state,
        singleProduct: action.value
      };
    case 'SET_SINGLE_COLLECTION':
      return {
        ...state,
        singleCollection: action.value
      };
    case 'SEARCH_FIELD_REQUEST':
      return {
        ...state,
        searchString: action.value
      };
    case 'TOGGLE_SIDEDRAWER':
      return{
        ...state,
        sideDrawerOpen: !state.sideDrawerOpen
      }
    default:
      return state;
  }
}

export const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
export const SET_SINGLE_COLLECTION = 'SET_SINGLE_COLLECTION';
export const SEARCH_FIELD_REQUEST = 'SEARCH_FIELD_REQUEST';