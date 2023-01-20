
import React from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useState } from 'react';


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const price = 5000

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://doctors-portal-server-rust.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement/>
        <button
          className='btn btn-sm mt-4 btn-primary'
          type="submit"
          disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {
        success && <div>
          <p className='text-green-500'>{success}</p>
          <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
        </div>
      }
    </>
  );
};
export default CheckoutForm