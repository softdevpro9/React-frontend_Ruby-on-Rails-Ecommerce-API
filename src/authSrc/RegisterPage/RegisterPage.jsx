import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import { customerActions } from '../_actions';

function RegisterPage() {
    const [customer, setCustomer] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password_digest: ''
    });
    const [address, setAddress] = useState({
        line_1: '',
        line_2: '',
        city: '',
        postal_code: '',
        province_id: '',
        customer_id: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    const provinces = useSelector(state => state.provinces.items);
    // reset login status
    useEffect(() => {
        dispatch(customerActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setCustomer(customer => ({ ...customer, [name]: value }));
    }
    function handleAddressFieldChange(e) {
        const { name, value } = e.target;
        setAddress(address => ({...address, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        let tempAddress = address;
        tempAddress.customer_id = "17";
        setAddress(tempAddress);

        setSubmitted(true);
        if (customer.first_name && customer.last_name && customer.email && customer.username && customer.password_digest &&
            address.line_1 && address.postal_code && address.province_id) {
            dispatch(customerActions.register(customer, address));
        }


        // console.log(address);
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
                    <label>Email</label>
                    <input type="email" name="email" value={customer.email} onChange={handleChange} className={'form-control' + (submitted && !customer.email ? ' is-invalid' : '')} />
                    {submitted && !customer.email &&
                        <div className="invalid-feedback">Email is required</div>
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
                    <input type="password" name="password_digest" value={customer.password_digest} onChange={handleChange} className={'form-control' + (submitted && !customer.password_digest ? ' is-invalid' : '')} />
                    {submitted && !customer.password_digest &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div>Address</div>
                <div className="form-group">
                    <label>Line 1</label>
                    <input type="text" name="line_1" value={address.line_1} onChange={handleAddressFieldChange} className={'form-control' + (submitted && !address.line_1 ? ' is-invalid' : '')} />
                    {submitted && !address.line_1 &&
                        <div className="invalid-feedback">Line 1 is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={address.city} onChange={handleAddressFieldChange} className={'form-control' + (submitted && !address.city ? ' is-invalid' : '')} />
                    {submitted && !address.city &&
                        <div className="invalid-feedback">City is required</div>
                    }
                </div>
                <div className="form-group">
                    {/* <label htmlFor="province_id">Province</label> */}
                    <select name="province_id" value={address.province_id} onChange={handleAddressFieldChange} className={'form-control' + (submitted && !address.province_id ? ' is-invalid' : '')}>
                    <option value="">Select Province</option>
                    { provinces.map(province => {
                        return(
                            <option key={province.id} value={province.id}>{province.name}</option>
                        )
                    })}
                    </select>
                    {submitted && !address.province_id &&
                        <div className="invalid-feedback">Province is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" name="postal_code" value={address.postal_code} onChange={handleAddressFieldChange} className={'form-control' + (submitted && !address.postal_code ? ' is-invalid' : '')} />
                    {submitted && !address.postal_code &&
                        <div className="invalid-feedback">Postal Code is required</div>
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