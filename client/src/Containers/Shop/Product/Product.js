import React, { useEffect, useState } from 'react'
import './Product.css'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands } from '../../../redux/services/brandsService'
import { getCategories } from '../../../redux/services/categoriesService'

export default function Product() {

  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState("")

  const location = useLocation()
  const { name, price, description, image, isPromo, percentagePromo, stock } = location.state

  const brands = useSelector(state => state.brands.brands)
  const categories = useSelector(state => state.categories.categories)

  const dispatch = useDispatch()

  useEffect(() => {

    if (brands.length === 0) {
      getBrands(dispatch)
    }

    if (categories.length === 0) {
      getCategories(dispatch)
    }

  }, [])

  const addProductInCart = () => {
    if (handleValidation()) {
      console.log("Ajouté au panier")
    }
  }

  const handleQuantity = e => {
    setQuantity(e.target.value)
  }

  const handleValidation = () => {
    let isValidForm = true

    // Quantity validation
    if (!quantity) {
      setError("La quantité est requise")
      isValidForm = false
    }
    else if (quantity > stock) {
      setError("Il ne reste que " + stock + " exemplaires de ce produit")
      isValidForm = false
    } else setError("")

    return isValidForm
  }

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

          <div className="product-price">
            <span className={isPromo ? "promo" : ""}>{(price / 100).toFixed(2)}€</span>
            {isPromo && <span className="promo-value">
              {((price / 100) - ((price / 10000 * percentagePromo))).toFixed(2)}€
            </span>}
          </div>

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
          <input type="number" name="quantity" id="quantity" value={quantity} onChange={handleQuantity} min="1" />
        </div>
        <button className="product-add" onClick={addProductInCart}>
            Ajouter au panier
        </button>
        {error &&
          <p className="stock-empty-verif">{error}</p>
        }
      </div>
    </div>
  )
}
