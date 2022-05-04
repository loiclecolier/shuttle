import React from 'react'
import './ProductCard.css'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {

  const quantity = 1

  const { slug, name, price, image, isPromo, percentagePromo } = product

  const dispatch = useDispatch()

  const addProductInCart = () => {
      dispatch(addProduct({ ...product, quantity }))
  }

  return (
      <div className="product-card">
        <Link to={'/' + slug} state={product} className="link-product-card">
          {isPromo &&
            <div className="product-promo">
              {percentagePromo}%
            </div>
          }
          <div className="product-image">
            <img src={image} alt="Produit" />
          </div>
          <div className="product-name">{name}</div>
          <div className="product-price">
            <span className={isPromo ? "promo" : ""}>{(price / 100).toFixed(2)}€</span>
            {isPromo && <span className="promo-value">
              {((price / 100) - ((price / 10000 * percentagePromo))).toFixed(2)}€
            </span>}
          </div>
        </Link>
        <button className="product-add" onClick={addProductInCart}>
          Ajouter au panier
        </button>
      </div>
  )
}