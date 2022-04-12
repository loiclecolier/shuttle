import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'
import Placeholder from './placeholder-product.png'

export default function ProductCard({product}) {

  const { slug, name, price } = product

  return (
    <Link to={'/shop/' + slug} state={product} className="link-product-card">
      <div className="product-card">
          <div className="product-image">
            <img src={Placeholder} alt="Produit" />
          </div>
          <div className="product-informations">
            <div className="product-name">{name}</div>
            <div className="product-price">{(price / 100).toFixed(2)}€</div>
          </div>
          <button className="product-add">
            Ajouter au panier
          </button>
      </div>
    </Link>
  )
}