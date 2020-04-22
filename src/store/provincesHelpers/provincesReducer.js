import {
  FETCH_PROVINCES_BEGIN,
  FETCH_PROVINCES_SUCCESS,
  FETCH_PROVINCES_FAILURE
} from './provincesActions';

const initialState = {
  items: [],
  loading: false,
  finished: false,
  error: null
};

export default function productsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PROVINCES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PROVINCES_SUCCESS:
      return {
        ...state,
        loading: false,
        finished: true,
        items: action.payload.provinces
      };

    case FETCH_PROVINCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}