import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';



const Checkout = props => {
  //console.log('checkoutprops');console.log(props);console.log("checkoutprops");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState()
  const cartItems = useSelector(state => state.cart.products);
  let price = 0;
  cartItems.forEach(product => {
    price += (product.item.price * product.quantity);
  });
  price = price.toFixed(2);
  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = event => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const billingDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      address: {
        city: event.target.city.value,
        line1: event.target.line1.value,
        state: event.target.province.value,
        postal_code: event.target.postal_code.value,
      }
    };

  setIsProcessing(true);
  const CardElement = elements.getElement('card');

  try {
    const { data: clientSecretion } = await axios.post("http://localhost:4567/secretpost/?", {
    "amount": (price * 100).toString()
    });
    //const { data: clientSecretion } = await axios.get(`http://localhost:4567/secret/${(price*100).toFixed(0)}`);
    const clientSecret = await clientSecretion.data;

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: CardElement,
      billing_details: billingDetails
    });

    if(paymentMethodReq.error) {
      setCheckoutError(paymentMethodReq.error.message);
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id
    });

    if(error) {
      setCheckoutError(error.message);
      setIsProcessing(false);
      return;
    }
    //OnSuccessfulCheckout();
  } catch (error) {
    setCheckoutError(error);
  }
};

const cardElementOptions = {
  hidePostalCode: true
}

  return(
    <form onSubmit={handleFormSubmit}>
      <div>
      <input
          name="name"
          label="Name"
          type="text"
          placeholder="Joe Blow"
          required
        />
        <input
          name="email"
          label="Email"
          type="email"
          placeholder="joe.blow@example.com"
          required
        />
        <input
          name="line1"
          label="Address"
          type="text"
          placeholder="165 Any St."
          required
        />
        <input
          name="city"
          label="City"
          type="text"
          placeholder="Winnipeg"
          required
        />
        <input
          name="province"
          label="Province"
          type="text"
          placeholder="Manitoba"
          required
        />
        <input
          name="postal_code"
          label="Postal Code"
          type="text"
          placeholder="T2T2P4"
          required
        />
      </div>
      <div>
        <CardElement
          onChange={handleCardDetailsChange}
          options={cardElementOptions}
        />
      </div>
      <div>
        {checkoutError && <div><h1>{checkoutError}</h1></div>}
        <button disabled={ isProcessing || !stripe }>
          {isProcessing ? "Processing" : `Pay $${price}`}
        </button>
      </div>
    </form>


  );
};

export default Checkout;
