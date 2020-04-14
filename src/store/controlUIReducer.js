const initialState = {
  pageSelected: 1
};

export default function controlUIReducer(state = initialState, action) {
  switch(action.type){
    case 'SET_PAGINATE_INDEX':
      return {
        ...state,
        pageSelected: action.value
      }
    default:
      return state;
  }
}