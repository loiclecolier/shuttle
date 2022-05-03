import React, { useEffect } from 'react'
import './Filter.css'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands } from '../../../redux/services/brandsService'
import { getCategories } from '../../../redux/services/categoriesService'

export default function Filter({ filter, setFilter }) {

  const brands = useSelector(state => state.brands.brands)
  const brandsPending = useSelector(state => state.brands.getPending)
  const brandsError = useSelector(state => state.brands.getError)

  const categories = useSelector(state => state.categories.categories)
  const categoriesPending = useSelector(state => state.categories.getPending)
  const categoriesError = useSelector(state => state.categories.getError)

  const dispatch = useDispatch()

  useEffect(() => {

    if (brands.length === 0) {
      getBrands(dispatch)
    }

    if (categories.length === 0) {
      getCategories(dispatch)
    }

  }, [])

  const handleInputs = e => {
    setFilter({...filter, [e.target.name]: e.target.value})
    if (e.target.name === "isPromotion") {
      setFilter({...filter, isPromotion: !filter.isPromotion})
    }
  }

  return (
    <div className="product-filter">
      {(!brandsPending && !brandsError) &&
        <select name="category" id="category-select" onChange={handleInputs} value={filter.category}>
          <option value="">Catégorie</option>
          {categories.map(item => { return (
            <option value={item._id} key={item._id}>{item.name}</option>
          )})}
        </select>
      }
      {(!categoriesPending && !categoriesError) &&
        <select name="brand" id="brand-select" onChange={handleInputs} value={filter.brand}>
          <option value="">Marque</option>
          {brands.map(item => { return (
            <option value={item._id} key={item._id}>{item.name}</option>
          )})}
        </select>
      }
        <div>
            <input type="checkbox" id="isPromotion" name="isPromotion" onChange={handleInputs} checked={filter.isPromotion} />
            <label htmlFor="isPromotion" className="label-promo">En promotion</label>
        </div>
        <div>
          <label className="label-price">Prix</label>
          <input type="number" id="priceMin" name="priceMin" placeholder="min" onChange={handleInputs} value={filter.priceMin} min="0"/>
           - 
          <input type="number" id="priceMax" name="priceMax" placeholder="max" onChange={handleInputs} value={filter.priceMax} min="0"/>
        </div>
    </div>
  )
}
