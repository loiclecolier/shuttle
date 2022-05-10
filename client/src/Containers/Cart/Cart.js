import React, { useEffect, useState } from 'react'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import Logo from '../../assets/favicon.svg'

const DELIVERY_PRICE = 10 // in euro
const KEY_STRIPE = process.env.REACT_APP_STRIPE

export default function Cart() {

    const cart = useSelector(state => state.cart)
    const total = cart.total >= 5000 ? (cart.total / 100) : (cart.total / 100 + DELIVERY_PRICE)

    const [stripeToken, setStripeToken] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        console.log(cart)
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
                        amount: total * 100
                    })
                })
                navigate('/success', {data: res.data})
            } catch (err) {
                console.log(err)
            }
        }
        if (stripeToken && total >= 0.01) {
            makeRequest()
        }
    }, [stripeToken, total, navigate])

    const onToken = (token) => {
        setStripeToken(token)
    }


  return (
      <>
    <div className="banner-promotion">
        Livraison offerte pour tout achat de plus de 50€ !
    </div>
    <div className="cart-page">
        <h1 className="cart-title">Mon panier</h1>
        <div className="cart-actions-btn">
            <Link to='/'>
                <button className="cart-btn-shop">Retour vers le shop</button>
            </Link>
            <button className="cart-btn-pay">Payer</button>
        </div>
        <div className="cart-content">
            <div className="cart-products">
                {cart.products.map(product => (
                    <div className="cart-product" key={product._id}>
                        <img src={product.image} alt="Nom du produit" />
                        <div className="cart-product-informations">
                            <div className="cart-product-name">
                                {product.name}
                            </div>
                            <div className="cart-product-quantity">
                                <button className="cart-action-quantity">+</button>
                                <span>{product.quantity}</span>
                                <button className="cart-action-quantity">-</button>
                            </div>
                            <div className="cart-product-price">
                                {((product.price * product.quantity) / 100).toFixed(2)}€
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-order-summary">
                <h2>Résumé de la commande</h2>
                <div className="cart-order-line">
                    <div className="cart-order-label">Sous-total</div>
                    <div className="cart-order-price">{(cart.total / 100).toFixed(2)}€</div>
                </div>
                <div className="cart-order-line">
                    <div className="cart-order-label">Frais de livraison</div>
                    {/* Livraison gratuite si subtotal >= 50€ */}
                    <div className="cart-order-price">{cart.total >= 5000 ? <span>0€</span> : <span>10.00€</span>}</div>
                </div>
                <div className="cart-order-line cart-order-total">
                    <div className="cart-order-total-label">Total</div>
                    <div className="cart-order-total-price">{total.toFixed(2)}€</div>
                </div>
                <StripeCheckout
                    name="Shuttle Shop"
                    image={Logo}
                    billingAddress
                    shippingAddress
                    description={"Total : " + total.toFixed(2) + "€"}
                    amount={total * 100}
                    token={onToken}
                    stripeKey={KEY_STRIPE}
                >
                    <button className="cart-btn-checkout">Payer</button>
                </StripeCheckout>
            </div>
        </div>
    </div>
    </>
  )
}
