import { customerConstants } from '../_constants';

let customer = JSON.parse(localStorage.getItem('customer'));
const initialState = customer ? { loggedIn: true, customer } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case customerConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        customer: action.customer
      };
    case customerConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        customer: action.customer
      };
    case customerConstants.LOGIN_FAILURE:
      return {};
    case customerConstants.LOGOUT:
      return {};
    default:
      return state
  }
}