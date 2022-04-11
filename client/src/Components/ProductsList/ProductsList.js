import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductsList.css'

export default function ProductsList() {
  return (
    <div className="products-list">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
    </div>
  )
}
