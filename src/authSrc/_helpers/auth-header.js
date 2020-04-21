export function authHeader() {
  // return authorization header with jwt token
  let customer = JSON.parse(localStorage.getItem('customer'));

  if (customer && customer.token) {
      return { 'Authorization': 'Bearer ' + customer.token };
  } else {
      return {};
  }
}