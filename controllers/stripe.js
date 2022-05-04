import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const KEY = process.env.STRIPE_KEY
const stripe = new Stripe(KEY)

export const payment = async (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "eur"
    },
    (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes)
        }
    })
}