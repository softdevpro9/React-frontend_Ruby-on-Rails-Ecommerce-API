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
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COLLECTIONS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the collections with the ones from the server
      return {
        ...state,
        loading: false,
        finished: true,
        items: action.payload.collections
      };

    case FETCH_COLLECTIONS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have collections to display anymore, so set `collections` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the collections around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}