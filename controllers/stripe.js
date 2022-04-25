import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_KEY)
const stripe = new Stripe("sk_test_51KsTIpHRlauV3p6slTlN4q6QGG0LI2KV5ZpYvtUPQZPuZUAzrYSnCN4wN2kmtQrHs0uXJdXZJ7QceCkp63QZ5Nak00b7Ae2BA7") // WARNING !!!!

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