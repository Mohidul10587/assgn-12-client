import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutForm from '../components/CheckoutForm'
const stripePromise = 
loadStripe('pk_test_51MSFzbGk3QfbJiMcAMdawDS9s63H0pHuUBObNkwMUVVB87OtENGrkvFKz5R4hqW5rsdUXYQ6afb95srcz0AsMImM00j8ivRv40');
console.log(stripePromise)
const Payment = () => {
    return (
        <div className='pt-24 min-h-screen'>

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>

        </div>
    )
}

export default Payment