import React, { useEffect, useState } from 'react'
import './AddProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands } from '../../../../redux/brands/brandReducer'
import { getCategories } from '../../../../redux/categories/categoryReducer'
import { addProduct } from '../../../../redux/products/productReducer'

export default function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    isPromo: false,
    percentagePromo: ""
  })

  const [toggle, setToggle] = useState(false)

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

  const toggleModal = () => {
    setToggle(!toggle)
  }

  const handleForm = async e => {
    e.preventDefault()

    dispatch(addProduct(product))

    toggleModal()

    setProduct({
      name: "",
      slug: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      stock: "",
      isPromo: false,
      percentagePromo: ""
    })
  }

  const handleInputs = e => {
    if(e.target.name === 'name') setProduct({...product, name: e.target.value})
    if(e.target.name === 'slug') setProduct({...product, slug: e.target.value})
    if(e.target.name === 'description') setProduct({...product, description: e.target.value})
    if(e.target.name === 'category') setProduct({...product, category: e.target.value})
    if(e.target.name === 'brand') setProduct({...product, brand: e.target.value})
    if(e.target.name === 'price') setProduct({...product, price: e.target.value})
    if(e.target.name === 'stock') setProduct({...product, stock: e.target.value})
    if(e.target.name === 'promo-yes') setProduct({...product, isPromo: true})
    if(e.target.name === 'promo-no') setProduct({...product, isPromo: false})
    if(e.target.name === 'percent-promo') setProduct({...product, percentagePromo: e.target.value})
  }

  return (
    <div className="add-product-page">

      <h1 className="add-product-title">Ajouter un produit</h1>

      <form onSubmit={handleForm} className="add-product-form">
        <div className="column">
          <div className="product-name"> 
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" onChange={handleInputs} value={product.name}/>
          </div>

          <div className="product-slug"> 
            <label htmlFor="slug">Slug (ID)</label>
            <input type="text" name="slug" id="slug" onChange={handleInputs} value={product.slug} />
          </div>

          <div className="product-category"> 
            <label htmlFor="category">Catégorie</label>
            <select name="category" id="category" onChange={handleInputs} value={product.category}>
              <option value="" disabled>Sélectionner une catégorie</option>
              {categories.map(item => { return (
                <option value={item._id} key={item._id}>{item.name}</option>
              )})}
            </select>
          </div>

          <div className="product-brand"> 
            <label htmlFor="brand">Marque</label>
            <select name="brand" id="brand" onChange={handleInputs} value={product.brand}> 
              <option value="" disabled>Sélectionner une marque</option>
              {brands.map(item => { return (
                <option value={item._id} key={item._id}>{item.name}</option>
              )})}
            </select>
          </div>

          <div className="product-description">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" onChange={handleInputs} value={product.description}></textarea>
          </div>
        </div>

        <div className="column">
          <div className="product-price">
            <label htmlFor="price">Prix (€)</label>
            <input type="number" name="price" id="price" min="0" onChange={handleInputs} value={product.price} />
          </div>

          <div className="product-price">
            <label htmlFor="stock">Stock</label>
            <input type="number" name="stock" id="stock" min="0" onChange={handleInputs} value={product.stock} />
          </div>

          <div className="product-promo">
            <div>
              <p className="promo">En promotion ?</p>
              <div>
                <input type="radio" name="promo-yes" id="promo-yes" onChange={handleInputs} checked={product.isPromo} /> 
                <label htmlFor="promo-yes">Oui</label>
              </div>
              <div>
                <input type="radio" name="promo-no" id="promo-no" onChange={handleInputs} checked={!product.isPromo} /> 
                <label htmlFor="promo-no">Non</label>
              </div>
            </div>

            {product.isPromo && (
              <div className="product-percent-promo">
                <label htmlFor="percent-promo">Pourcentage de la promotion (%)</label>
                <input type="number" name="percent-promo" id="percent-promo" max="100" min="0" onChange={handleInputs} value={product.percentagePromo} />
              </div>
            )}
          </div>
        </div>
        
        <div className="btn-add-product-container">
          <button className="btn-add-product">Ajouter le produit</button>
        </div>

        {toggle && ( <>
          <div className="overlay-modal" onClick={toggleModal}></div>

          <div className="modal">
            <svg width="1em" height="1em" viewBox="0 0 1024 1024" className="modal-icon"><path fill="#30967E" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></svg>
            <p className="modal-content">Produit ajouté avec succès</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="modal-cross" onClick={toggleModal}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        </> )}

      </form>
    </div>
  )
}
