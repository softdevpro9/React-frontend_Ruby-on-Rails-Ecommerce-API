function getCollections() {
 return  fetch("http://localhost:3000/collections.json")
    .then(handleErrors)
    .then(response => response.json());
}

export function fetchCollections() {
  return dispatch => {
    dispatch(fetchCollectionsBegin());
    return getCollections()
    .then(json => {
        dispatch(fetchCollectionsSuccess(json));
        return json.collections;
      })
      .catch(error =>
        dispatch(fetchCollectionsFailure(error))
      );
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_COLLECTIONS_BEGIN   = 'FETCH_COLLECTIONS_BEGIN';
export const FETCH_COLLECTIONS_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTIONS_FAILURE = 'FETCH_COLLECTIONS_FAILURE';

export const fetchCollectionsBegin = () => ({
  type: FETCH_COLLECTIONS_BEGIN
});

export const fetchCollectionsSuccess = collections => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: { collections }
});

export const fetchCollectionsFailure = error => ({
  type: FETCH_COLLECTIONS_FAILURE,
  payload: { error }
});