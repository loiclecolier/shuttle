import React, { useEffect } from 'react'
import './AddProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../../../redux/products/productReducer'
import { getBrands } from '../../../../redux/brands/brandReducer'
import { getCategories } from '../../../../redux/categories/categoryReducer'

export default function AddProduct() {

  const {products, brands, categories} = useSelector(state => ({
    ...state.productReducer,
    ...state.brandReducer,
    ...state.categoryReducer
  }))

  const dispatch = useDispatch()

  useEffect(() => {

    if (products.length === 0) {
      dispatch(getProducts())
    }

    if (brands.length === 0) {
      dispatch(getBrands())
    }

    if (categories.length === 0) {
      dispatch(getCategories())
    }

  }, [])

  return (
    <div className="add-product-page">

      <h1 className="add-product-title">Ajouter un produit</h1>

      <form className="add-product-form">
        <div className="column">
          <div className="product-name"> 
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="product-slug"> 
            <label htmlFor="slug">Slug (ID)</label>
            <input type="text" name="slug" id="slug" />
          </div>

          <div className="product-category"> 
            <label htmlFor="category">Catégorie</label>
            <select name="category" defaultValue="" id="category">
              <option value="" disabled>Sélectionner une catégorie</option>
              {categories.map(item => { return (
                <option value={item._id} key={item._id}>{item.name}</option>
              )})}
            </select>
          </div>

          <div className="product-brand"> 
            <label htmlFor="brand">Marque</label>
            <select name="brand" defaultValue="" id="brand">
              <option value="" disabled>Sélectionner une marque</option>
              {brands.map(item => { return (
                <option value={item._id} key={item._id}>{item.name}</option>
              )})}
            </select>
          </div>

          <div className="product-description">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description"></textarea>
          </div>
        </div>

        <div className="column">
          <div className="product-price">
            <label htmlFor="price">Prix (€)</label>
            <input type="number" name="price" id="price" min="0" />
          </div>

          <div className="product-price">
            <label htmlFor="stock">Stock</label>
            <input type="number" name="stock" id="stock" min="0" />
          </div>

          <div className="product-promo">
            <div>
              <p className="promo">En promotion ?</p>
              <div>
                <input type="radio" name="promo-yes" id="promo-yes" /> 
                <label htmlFor="promo-yes">Oui</label>
              </div>
              <div>
                <input type="radio" name="promo-no" id="promo-no" /> 
                <label htmlFor="promo-no">Non</label>
              </div>
            </div>

            <div className="product-percent-promo">
              {/* Si en promo (OUI) */}
              <label htmlFor="percent-promo">Pourcentage de la promotion (%)</label>
              <input type="number" name="percent-promo" id="percent-promo" max="100" min="0"/>
            </div>
          </div>
        </div>
        
        <div className="btn-add-product-container">
          <button className="btn-add-product">Ajouter le produit</button>
        </div>

      </form>
    </div>
  )
}
