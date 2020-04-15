const initialState = {
  pageSelected: 1,
  selectListSelected: 0,
  searchBarValue: ''
};

export default function controlUIReducer(state = initialState, action) {
  switch(action.type){
    case 'SET_PAGINATE_INDEX':
      return {
        ...state,
        pageSelected: action.value
      }
    case 'SET_SELECTLIST_INDEX':
      return {
        ...state,
        selectListSelected: action.value
    }
    case 'SET_SEARCHBAR_VALUE':
    return {
      ...state,
      searchBarValue: action.value
    }
    default:
      return state;
  }
}

export const SET_PAGINATE_INDEX = 'SET_PAGINATE_INDEX';
export const SET_SELECTLIST_INDEX = 'SET_SELECTLIST_INDEX';
export const SET_SEARCHBAR_VALUE = 'SET_SEARCHBAR_VALUE';