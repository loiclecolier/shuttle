import React, { useEffect } from 'react'
import './Product.css'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands } from '../../../redux/brands/brandReducer'
import { getCategories } from '../../../redux/categories/categoryReducer'

export default function Product() {

  const location = useLocation()
  const { name, price, description, image } = location.state

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

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-informations">
        <div className="product-txt">

          <h1 className="product-name-brand">{name} <span>{brands.filter(
              brand => brand._id === location.state.brand
              ).map(brand => brand.name)}</span>
          </h1>

          <div className="product-price">{(price / 100).toFixed(2)}€</div>

          {(categories.filter(category => category._id === location.state.category).map(category => category.name)).length > 0 &&
            <div className="product-category">
              <span>Catégorie</span><p>{categories.filter(
                category => category._id === location.state.category
                ).map(category => category.name)}</p>
            </div>
          }

          {description && <div className="product-description"><span>Description</span><p>{description}</p></div> }
          
        </div>
        <div className="product-quantity">
          <label htmlFor="quantity">Quantité</label>
          <input type="number" name="quantity" id="quantity" value="1" />
        </div>
        <button className="product-add">
            Ajouter au panier
        </button>
      </div>
    </div>
  )
}
