import React, { useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductsList.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../redux/services/productsService'
import Loader from '../Loader/Loader'

export default function ProductsList({ searchValue, filter }) {

  const products = useSelector(state => state.products.products)
  const pending = useSelector(state => state.products.getPending)
  const error = useSelector(state => state.products.getError)

  const dispatch = useDispatch()

  useEffect(() => {
    
      if (products.length === 0) {
        getProducts(dispatch)
      }

  }, [dispatch, products.length])

  const searchedProducts = products.filter(product => {
    if (searchValue === '') {
        return product
    }
    else {
        return product.name.toLowerCase().includes(searchValue.toLowerCase())
    }
  })

  const filteredProducts = searchedProducts.filter(product => {

    if (filter.brand !== "" && filter.brand !== product.brand)
      return false

    if (filter.category !== "" && filter.category !== product.category)
      return false

    if (filter.isPromotion && filter.isPromotion !== product.isPromo)
      return false

    if (product.isPromo) {
      if (filter.priceMin !== "" && (product.price - ((product.price / 100 * product.percentagePromo))) < (filter.priceMin * 100)) {
        return false
      }
    }
    else {
      if (filter.priceMin !== "" && product.price < (filter.priceMin * 100))
        return false
    }

    if (product.isPromo) {
      if (filter.priceMax !== "" && (product.price - ((product.price / 100 * product.percentagePromo))) > (filter.priceMax * 100)) {
        return false
      }
    }
    else {
      if (filter.priceMax !== "" && product.price > (filter.priceMax * 100))
        return false
    }

    return product
  })

  return <>
    {(!pending && !error) ?
      filteredProducts.length > 0 ?
        <div className="products-list">
          {filteredProducts.map(item => {
            return (
              <ProductCard key={item._id} product={item} />
            )
          })}
        </div>
          : searchValue === "" ?
            <p className="shop-empty-list">Aucun produit ne correspond aux filtres.</p>
            : <p className="shop-empty-list">Aucun produit ne correspond à : {searchValue}</p>
    : error ? <p className="shop-empty-list">Une erreur est survenue, veuillez réessayer.</p> : <div className="products-loader"><Loader /></div>}
  </>
}
