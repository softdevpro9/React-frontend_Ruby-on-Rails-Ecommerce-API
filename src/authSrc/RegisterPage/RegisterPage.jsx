import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { customerActions } from '../_actions';

function RegisterPage() {
    const [customer, setCustomer] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password_digest: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(customerActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(customer => ({ ...customer, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (customer.first_name && customer.last_name && customer.username && customer.password) {
            dispatch(customerActions.register(customer));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first_name" value={customer.first_name} onChange={handleChange} className={'form-control' + (submitted && !customer.first_name ? ' is-invalid' : '')} />
                    {submitted && !customer.first_name &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={customer.last_name} onChange={handleChange} className={'form-control' + (submitted && !customer.last_name ? ' is-invalid' : '')} />
                    {submitted && !customer.last_name &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={customer.username} onChange={handleChange} className={'form-control' + (submitted && !customer.username ? ' is-invalid' : '')} />
                    {submitted && !customer.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={customer.password} onChange={handleChange} className={'form-control' + (submitted && !customer.password ? ' is-invalid' : '')} />
                    {submitted && !customer.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };