import React, { useEffect, useState } from 'react'
import './Home.css'
import StripeCheckout from 'react-stripe-checkout'
import Logo from '../../assets/favicon.svg'

const AMOUNT = 20
const KEY_STRIPE = "pk_test_51KsTIpHRlauV3p6ssXFKNQmtJDsKFisX2No8sOq6hEfwwhg4tZCM1VmjTONEtt79fLHZAAtwDnrkBrsWURF8kfKW00q4TLWsqj"

export default function Home() {

    const [stripeToken, setStripeToken] = useState(null)

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await fetch("/api/checkout/payment", {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json' 
                    },
                    method: 'POST', 
                    body: JSON.stringify({
                        tokenId: stripeToken.id,
                        amount: AMOUNT * 100
                    })
                })
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (stripeToken) {
            makeRequest()
        }
    }, [stripeToken])

    const onToken = (token) => {
        setStripeToken(token)
    }

    return ( <>
        <h1>Home</h1> 
        <StripeCheckout
            name="Shuttle Shop"
            image={Logo}
            billingAddress
            shippingAddress
            description={"Total : " + AMOUNT + "€"}
            amount={AMOUNT * 100}
            token={onToken}
            stripeKey={KEY_STRIPE}
        >
            <button>Payer</button>
        </StripeCheckout>
    </>)
}
