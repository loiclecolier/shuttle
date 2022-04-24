import React, { useEffect } from 'react'
import './Filter.css'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands } from '../../../redux/brands/brandReducer'
import { getCategories } from '../../../redux/categories/categoryReducer'

export default function Filter({ filter, setFilter }) {

  const {brands, categories} = useSelector(state => ({
    ...state.brandReducer,
    ...state.categoryReducer
  }))

  const dispatch = useDispatch()

  useEffect(() => {

    if (brands.length === 0) {
      dispatch(getBrands())
    }

    if (categories.length === 0) {
      dispatch(getCategories())
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
        <select name="category" id="category-select" onChange={handleInputs} value={filter.category}>
          <option value="">Catégorie</option>
          {categories.map(item => { return (
            <option value={item._id} key={item._id}>{item.name}</option>
          )})}
        </select>
        <select name="brand" id="brand-select" onChange={handleInputs} value={filter.brand}>
          <option value="">Marque</option>
          {brands.map(item => { return (
            <option value={item._id} key={item._id}>{item.name}</option>
          )})}
        </select>
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
