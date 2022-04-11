import React from 'react'
import './ProductCard.css'
import Placeholder from './placeholder-product.png'

export default function ProductCard() {
  return (
    <div className="product-card">
        <div className="product-image">
          <img src={Placeholder} alt="Produit" />
        </div>
        <div className="product-informations">
          <div className="product-name">Yonex Aerosensa 50</div>
          <div className="product-price">59.99€</div>
        </div>
        <button className="product-add">
            Ajouter au panier
          </button>
    </div>
  )
}
