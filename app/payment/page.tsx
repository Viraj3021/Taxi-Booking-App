'use client'

import CheckOutForm from '@/components/Payment/CheckOutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const page = () => {

    const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any)
   const options:any = {
    mode: 'payment',
    amount: 1099,
    currency:'usd'
   }
  return (
   <Elements stripe={stripePromise} options={options}>
      <CheckOutForm/>
   </Elements>
  )
}

export default page
