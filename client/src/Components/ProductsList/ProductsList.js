import React, { useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductsList.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../redux/products/productReducer'
import Loader from '../Loader/Loader'

export default function ProductsList() {

  const {products, loadingProducts} = useSelector(state => ({
    ...state.productReducer
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    
    setTimeout(() => {
      if (products.length === 0) {
        dispatch(getProducts())
      }
    }, 2000)

  }, [])

  return <>
    {!loadingProducts ?
      products.length > 0 ?
        <div className="products-list">
          {products.map(item => {
            return (
              <ProductCard key={item._id} product={item} />
            )
          })}
        </div>
      : <p className="shop-empty-list">Aucun produit en vente actuellement.</p>
    : <div className="products-loader"><Loader /></div>}
  </>
}
