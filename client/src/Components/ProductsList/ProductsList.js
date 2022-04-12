import React, { useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductsList.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../redux/products/productReducer'

export default function ProductsList() {

  const {products} = useSelector(state => ({
    ...state.productReducer
  }))

  const dispatch = useDispatch()

  useEffect(() => {

    if (products.length === 0) {
      dispatch(getProducts())
    }

  }, [])

  return (
    <div className="products-list">
      {products.map(item => {
        return (
          <ProductCard key={item._id} product={item} />
        )
      })}
    </div>
  )
}
