
import React, { useState } from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useEffect } from 'react';
;


const CheckoutForm = ({ singleOrder }) => {

  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const price = singleOrder.item.price*singleOrder.orderQuantity;
  console.log(singleOrder)


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://tools-house.onrender.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);




  console.log(clientSecret)


  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
    }
    else {
      setCardError('')
    }
    setSuccess('');
    setProcessing(true);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Customer',
            email: 'abc@gmail.com'
          },
        },
      },
    );
    // 789@Afif@10587
    // afrojha78956421
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log('card info', card);
      // store payment info in the database
      const payment = {
        myPrice: price,
        orderId: singleOrder._id,
        transactionId: paymentIntent.id,
        status:'Pending'

      }
      fetch('https://tools-house.onrender.com/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.insertedId) {
            setSuccess('Congrats! your payment completed');
            setTransactionId(paymentIntent.id);
          }
        })
    }
    setProcessing(false);

  }







  return (
    <>
      <form onSubmit={handleSubmit}>

       
        <CardElement
          options={{
            style: {
              base: {
             
                fontSize: '16px',
                color: 'black',
                '::placeholder': {
                  color: 'black',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
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