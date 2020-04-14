import {
  FETCH_COLLECTIONS_BEGIN,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE
} from './collectionsActions';

const initialState = {
  items: [],
  loading: false,
  finished: false,
  error: null
};

export default function collectionReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_COLLECTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        finished: true,
        items: action.payload.collections
      };

    case FETCH_COLLECTIONS_FAILURE:
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