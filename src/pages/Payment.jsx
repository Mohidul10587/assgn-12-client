import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm'
const stripePromise =
    loadStripe('pk_test_51MSFzbGk3QfbJiMcAMdawDS9s63H0pHuUBObNkwMUVVB87OtENGrkvFKz5R4hqW5rsdUXYQ6afb95srcz0AsMImM00j8ivRv40');

const Payment = () => {
    const query = useParams()
    const id = query.id;


    const { isLoading, data: price, refetch } = useQuery(['users'], () =>
        fetch(`http://localhost:5000/orderPayment/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()))
    if (isLoading) {
        return <p>loading</p>
    }
  console.log(price.quantity)
    return (

        <div className='pt-24 min-h-screen flex justify-center'>

            <div className='w-96 border-2 p-4 border-black h-44'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm quantity={price.quantity}/>
                </Elements>

            </div>
        </div>
    )
}

export default Payment