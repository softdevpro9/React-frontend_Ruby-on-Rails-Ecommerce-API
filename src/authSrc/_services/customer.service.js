//import config from 'config';
import { authHeader } from '../_helpers';

export const customerService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

const config = { apiUrl: 'http://localhost:3000' };

async function login(username, password_digest) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password_digest })
    };

    return await fetch(`${config.apiUrl}/authenticate.json`, requestOptions)
        .then(handleResponse)
        .then(customer => {
            // store customer details and jwt token in local storage to keep customer logged in between page refreshes
            localStorage.setItem('customer', JSON.stringify(customer));
                return customer;
            });

}

function logout() {
    // remove customer from local storage to log customer out
    localStorage.removeItem('customer');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/customers.json`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/customers/${id}.json`, requestOptions).then(handleResponse);
}

async function register(customer, address = null) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    };

    let response = await fetch(`${config.apiUrl}/customers.json`, requestOptions)

    if(!!address){
        let json = await handleResponseJson(response);
        let newAddress = await fetch(`${config.apiUrl}/addresses.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...address, customer_id: json.id} )
        });
    }
}

function update(customer) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    };

    return fetch(`${config.apiUrl}/customers/${customer.id}.json`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/customers/${id}.json`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

async function handleResponseJson(response) {
    let json = await response.json();
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            window.location.reload(true);
        }
        const data = await json && JSON.parse(json);
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return json;
}