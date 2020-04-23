import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import currencyFormat from '../../util/currencyFormat';

const GST_RATE = 0.07;

const Checkout = props => {
  //console.log('checkoutprops');console.log(props);console.log("checkoutprops");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const customer = useSelector(state => state.authentication.customer);
  const province = useSelector(state => state.provinces.items.find(
    p => p.id === state.authentication.customer.address.province_id));
  const cartItems = useSelector(state => state.cart.products);
  let price = 0;
  cartItems.forEach(product => {
    price += (product.item.price * product.quantity);
  });
  price = price.toFixed(2);
  let priceWithTax = 0;


  if(province && price !== 0){
    priceWithTax = (Number(price) + (Number(price) * (Number(GST_RATE) + Number(province.pst_rate) + Number(province.hst_rate))));
    priceWithTax = Number(priceWithTax).toFixed(2);
  }

  const stripe = useStripe();
  const elements = useElements();


  const handleCardDetailsChange = async event => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async event => {
    event.preventDefault();


    const orderBillingDetails = {
      status: 'Unpaid',
      price: priceWithTax,
      customer_id: customer.id,
      gst: GST_RATE,
      pst: Number(province.pst_rate),
      hst: Number(province.hst_rate)
    };

    const billingDetails = {
      name: customer.first_name + ' ' + customer.last_name,
      email: customer.email,
      address: {
        city: customer.address.city,
        line1: customer.address.line_1,
        state: province.name,
        postal_code: customer.address.postal_code,
      }
    };

  setIsProcessing(true);

  try {
    const response = await fetch('http://localhost:3000/orders.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(orderBillingDetails)
    })
    const responseJson = await response.json();
    await orderProductFetch(response, responseJson);
    console.log('billingDetails');console.log(billingDetails);console.log('billingDetails');
    let cardElement = elements.getElement(CardElement);
    const confirmation = await stripePayer(billingDetails, cardElement);

    await runTestHandler();
    // const updateFetch = await fetch(`http://localhost:3000/orders/${responseJson.id}.json`, {
    //   method: 'PATCH',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({status: 'Paid', stripe_id: confirmation.paymentIntent.id})
    // });

  } catch (error) {
    alert(error);
  }
};

const orderProductFetch = async(response, responseJson) => {
  if(response.ok){

    let createArray = [];
    await cartItems.forEach(product => {
      const orderProductDetails = {
        price: Number(product.item.price),
        order_id: responseJson.id,
        product_id: product.item.id,
        quantity: product.quantity
      };
      createArray.push(orderProductDetails);

    })
    console.log(createArray);
    fetch('http://localhost:3000/mass_create.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(createArray)
    })

  }
};

const stripePayer = async(billingDetails, cardElement) => {
  try {
    console.log("test");
    let sendPrice = Number(priceWithTax).toFixed(2);
    sendPrice = sendPrice * 100;
    const { data: clientSecretion } = await axios.post("http://localhost:4567/secretpost/?", {
    "amount": sendPrice.toString()
    });

    const clientSecret = await clientSecretion.data;
    console.log(clientSecret);
    console.log("test1");

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails
    });
    console.log("test2");
    if(paymentMethodReq.error) {
      setCheckoutError(paymentMethodReq.error.message);
      setIsProcessing(false);
      console.log(paymentMethodReq.error);
      return;
    }
    const confirmation = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id
    });

    console.log("test3");
    if(confirmation.error) {
      setCheckoutError(confirmation.error.message);
      setIsProcessing(false);

      return;
    }
    setIsProcessing(false);
    console.log('confirmation');console.log(confirmation.paymentIntent.id);console.log("confirmation");

    return confirmation;
  } catch (error) {
    setCheckoutError(error);
  }
};

const runTestHandler = async () => {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Content-Type", "text/plain");

var raw = "{ \"status\": \"Paid\", \"stripe_id\": \"aanaewdtdsfhdfhhoixdfdsfghsdrghosrgis\"}";

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch("http://localhost:3000/orders/48.json", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

};

const cardElementOptions = {
  hidePostalCode: true
}
  return(
    <>
    <div>
      <h2>Customer Information</h2>
      <div>
        <p>{`${customer.first_name} ${customer.last_name}`}</p>
        <p>email: {customer.email}</p>
        <p>username: {customer.username}</p>
      </div>
      <h2>Address</h2>
      <div>
        <p>{customer.address.line_1}</p>
        <p>{customer.address.line_2}</p>
        <p>{customer.address.city}</p>
        <p>{province && province.name}</p>
        <p>{customer.address.postal_code}</p>
      </div>
    </div>
    <div>
      <h2>Order Details</h2>
      <ul>
        {cartItems.map(product => {
          return (
            <li key={product.item.id}>
              {product.quantity} - {product.item.title}
              <span style={{float:"right", paddingRight:"20rem"}}>{(product.item.price * product.quantity).toFixed(2) }</span>
            </li>
          )
        })}
        {province &&
          <>
          <li key="gst_li"> gst: {GST_RATE}
            <span style={{float:"right", paddingRight:"20rem"}}>{(price *  GST_RATE).toFixed(2)}</span>
          </li>
          <li key="pst_li">
            pst: {Number(province.pst_rate).toFixed(2)}
              <span style={{float:"right", paddingRight:"20rem"}}>{(price * province.pst_rate).toFixed(2)}</span>
            </li>
          <li key="hst_li">hst: {(Number(province.hst_rate)).toFixed(2)}
            <span style={{float:"right", paddingRight:"20rem"}}>{(price * province.hst_rate).toFixed(2)}</span>
          </li>
          <li>Total:
            <span style={{float:"right", paddingRight:"20rem"}}>{currencyFormat(priceWithTax)}</span>
          </li>
          </>}
      </ul>
    </div>
    <form onSubmit={handleFormSubmit}>
     {/* <div>
       <input
          name="name"
          label="Name"
          type="text"
          value={customer.first_name + ' ' + customer.last_name}
          readOnly
          required
        />
        <input
          name="email"
          label="Email"
          type="email"
          value={customer.email}
          readOnly
          required
        />
        <input
          name="line1"
          label="Address"
          type="text"
          value={customer.address.line_1}
          readOnly
          required
        />
        <input
          name="city"
          label="City"
          type="text"
          value={customer.address.city}
          readOnly
          required
        />
        <input
          name="province"
          label="Province"
          type="text"
          value={province && province.name}
          readOnly
          required
        />
        <input
          name="postal_code"
          label="Postal Code"
          type="text"
          value={customer.address.postal_code}
          readOnly
          required
        />
      </div> */}
      <div>
          <CardElement
            onChange={handleCardDetailsChange}
            options={cardElementOptions}
          />
      </div>

      <div>
        {/* {checkoutError && <div><h1>{checkoutError}</h1></div>} */}
        <button disabled={ isProcessing || !stripe }>
          {isProcessing ? "Processing" : `Pay $${priceWithTax}`}
        </button>
      </div>

    </form>
    <div>
        <button onClick={runTestHandler}>
          Test Button
        </button>
      </div>
    </>

  );
};

export default Checkout;


// const handleFormSubmit = async event => {
//   event.preventDefault();

//   // const billingDetails = {
//   //   name: event.target.name.value,
//   //   email: event.target.email.value,
//   //   address: {
//   //     city: event.target.city.value,
//   //     line1: event.target.line1.value,
//   //     state: event.target.province.value,
//   //     postal_code: event.target.postal_code.value,
//   //   }
//   // };
//   const orderBillingDetails = {
//     status: 'Unpaid',
//     customer_id: customer.id,
//     gst: GST_RATE,
//     pst: province.pst_rate,
//     hst: province.hst_rate,
//     customer_id: ''
//   };

// setIsProcessing(true);
// //const CardElement = elements.getElement('card');

// try {
//   const { data: clientSecretion } = await axios.post("http://localhost:4567/secretpost/?", {
//   "amount": (price * 100).toString()
//   });
//   //const { data: clientSecretion } = await axios.get(`http://localhost:4567/secret/${(price*100).toFixed(0)}`);
//   const clientSecret = await clientSecretion.data;

//   const paymentMethodReq = await stripe.createPaymentMethod({
//     type: 'card',
//     card: CardElement,
//     billing_details: billingDetails
//   });

//   if(paymentMethodReq.error) {
//     setCheckoutError(paymentMethodReq.error.message);
//     setIsProcessing(false);
//     return;
//   }

//   const { error } = await stripe.confirmCardPayment(clientSecret, {
//     payment_method: paymentMethodReq.paymentMethod.id
//   });

//   if(error) {
//     setCheckoutError(error.message);
//     setIsProcessing(false);
//     return;
//   }
//   //OnSuccessfulCheckout();
// } catch (error) {
//   setCheckoutError(error);
// }
// };