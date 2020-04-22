function getProvinces() {
  return  fetch("http://localhost:3000/provinces.json")
     .then(handleErrors)
     .then(response => response.json());
 }

 export function fetchProvinces() {
   return dispatch => {
     dispatch(fetchProvincesBegin());
     return getProvinces()
     .then(json => {
         dispatch(fetchProvincesSuccess(json));
         return json.provinces;
       })
       .catch(error =>
         dispatch(fetchProvincesFailure(error))
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

 export const FETCH_PROVINCES_BEGIN       = 'FETCH_PROVINCES_BEGIN';
 export const FETCH_PROVINCES_SUCCESS     = 'FETCH_PROVINCES_SUCCESS';
 export const FETCH_PROVINCES_FAILURE     = 'FETCH_PROVINCES_FAILURE';


 export const fetchProvincesBegin = () => ({
   type: FETCH_PROVINCES_BEGIN
 });

 export const fetchProvincesSuccess = provinces => ({
   type: FETCH_PROVINCES_SUCCESS,
   payload: { provinces }
 });

 export const fetchProvincesFailure = error => ({
   type: FETCH_PROVINCES_FAILURE,
   payload: { error }
 });
