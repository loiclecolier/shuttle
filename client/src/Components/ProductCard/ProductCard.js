import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {

  const { slug, name, price, image, isPromo, percentagePromo } = product

  return (
    <Link to={'/' + slug} state={product} className="link-product-card">
      <div className="product-card">
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
          <button className="product-add">
            Ajouter au panier
          </button>
      </div>
    </Link>
  )
}