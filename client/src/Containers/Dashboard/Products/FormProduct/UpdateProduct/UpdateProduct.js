import React, { useEffect, useState } from 'react'
import '../FormsProduct.css'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands } from '../../../../../redux/brands/brandReducer'
import { getCategories } from '../../../../../redux/categories/categoryReducer'
import { getProducts, updateProduct } from '../../../../../redux/products/productReducer'

export default function UpdateProduct() {

    const location = useLocation()

    const [product, setProduct] = useState({
        id: location.state._id,
        name: location.state.name,
        slug: location.state.slug,
        description: location.state.description,
        category: location.state.category,
        brand: location.state.brand,
        price: location.state.price / 100,
        stock: location.state.stock,
        isPromo: location.state.isPromo,
        percentagePromo: location.state.percentagePromo
    })

    const [errors, setErrors] = useState({})

    const [toggle, setToggle] = useState(false)

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

    const toggleModal = () => {
        setToggle(!toggle)
    }

    const handleForm = async e => {
        e.preventDefault()

        if (handleValidation()) {
            dispatch(updateProduct(product))

            toggleModal()
            
            setProduct({...product, price: product.price})
        }
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

    const handleValidation = () => {

        let isValidForm = true
        const regexSlug = /^[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/gm

        // Name validation
        if (!product.name) {
            setErrors(errors => ({...errors, name: "Le nom est requis"}))
            isValidForm = false
        }
        else if (product.name.length > 50) {
            setErrors(errors => ({...errors, name: "Le nom ne peut pas dépasser 50 caractères"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, name: ""}))

        // Slug validation
        if (!product.slug) {
            setErrors(errors => ({...errors, slug: "Le slug est requis"}))
            isValidForm = false
        }
        else if (product.slug.length > 50) {
            setErrors(errors => ({...errors, slug: "Le slug ne peut pas dépasser 50 caractères"}))
            isValidForm = false
        }
        else if (!regexSlug.test(product.slug)) {
            setErrors(errors => ({...errors, slug: "Le format du slug est incorrect"}))
            isValidForm = false
        }
        else if (uniqueSlug()) {
            setErrors(errors => ({...errors, slug: "Le slug n'est pas disponible"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, slug: ""}))

        // Category validation
        if (!product.category) {
            setErrors(errors => ({...errors, category: "La catégorie est requise"}))
            isValidForm = false
        }
        else if (!categoryValidation()) {
            setErrors(errors => ({...errors, category: "La catégorie n'existe pas"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, category: ""}))
        
        // Brand validation
        if (!product.brand) {
            setErrors(errors => ({...errors, brand: "La marque est requise"}))
            isValidForm = false
        }
        else if (!brandValidation()) {
            setErrors(errors => ({...errors, brand: "La marque n'existe pas"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, brand: ""}))

        // Description validation
        if (product.description.length > 300) {
            setErrors(errors => ({...errors, description: "La description ne peut pas dépasser 300 caractères"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, description: ""}))

        // Price validation
        if (!product.price) {
            setErrors(errors => ({...errors, price: "Le prix est requis"}))
            isValidForm = false
        }
        else if (product.price <= 0) {
            setErrors(errors => ({...errors, price: "Le prix doit être supérieur à 0"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, price: ""}))

        // Stock validation
        if (!product.stock) {
            setErrors(errors => ({...errors, stock: "Le stock est requis"}))
            isValidForm = false
        }
        else if (product.stock < 0) {
            setErrors(errors => ({...errors, stock: "Le stock ne peut pas être négatif"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, stock: ""}))

        // Percent promo validation
        if (product.isPromo && !product.percentagePromo) {
            setErrors(errors => ({...errors, percentagePromo: "Le % de promotion est requis"}))
            isValidForm = false
        }
        else if (product.isPromo && product.percentagePromo <= 0) {
            setErrors(errors => ({...errors, percentagePromo: "Le % de promotion doit être supérieur à 0"}))
            isValidForm = false
        }
        else if (product.isPromo && product.percentagePromo > 100) {
            setErrors(errors => ({...errors, percentagePromo: "Le % de promotion doit être inférieur ou égal à 100"}))
            isValidForm = false
        } else setErrors(errors => ({...errors, percentagePromo: ""}))

        return isValidForm
    }

    const uniqueSlug = () => {
        for (const item of products) {
            // if slug doesn't change
            if(location.state.slug === product.slug) return false
            // if slug already exist
            if(item.slug === product.slug) return true
        }
        return false
    }

    const categoryValidation = () => {
        for (const item of categories) {
        // category exist ?
            if (item._id === product.category) return true
        }
        return false
    }

    const brandValidation = () => {
        for (const item of brands) {
        // brand exist ?
            if (item._id === product.brand) return true
        }
        return false
    }

  return (
    <div className="product-page-form">

      <h1 className="form-product-title">Modifier un produit</h1>
      <form onSubmit={handleForm} className="product-form">
        <div className="column">
          <div className="product-name"> 
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" onChange={handleInputs} value={product.name}/>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="product-slug">
            <label htmlFor="slug">Slug (ID)</label>
            <input type="text" name="slug" id="slug" onChange={handleInputs} value={product.slug} />
            {errors.slug && <p className="error">{errors.slug}</p>}
          </div>

          <div className="product-category"> 
            <label htmlFor="category">Catégorie</label>
            <select name="category" id="category" onChange={handleInputs} value={product.category}>
              <option value="" disabled>Sélectionner une catégorie</option>
              {categories.map(item => { return (
                <option value={item._id} key={item._id}>{item.name}</option>
              )})}
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>

          <div className="product-brand"> 
            <label htmlFor="brand">Marque</label>
            <select name="brand" id="brand" onChange={handleInputs} value={product.brand}> 
              <option value="" disabled>Sélectionner une marque</option>
              {brands.map(item => { return (
                <option value={item._id} key={item._id}>{item.name}</option>
              )})}
            </select>
            {errors.brand && <p className="error">{errors.brand}</p>}
          </div>

          <div className="product-description">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" onChange={handleInputs} value={product.description}></textarea>
            {errors.description && <p className="error">{errors.description}</p>}
          </div>
        </div>

        <div className="column">
          <div className="product-price">
            <label htmlFor="price">Prix (€)</label>
            <input type="number" name="price" id="price" step="0.01" min="0" onChange={handleInputs} value={product.price} />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>

          <div className="product-stock">
            <label htmlFor="stock">Stock</label>
            <input type="number" name="stock" id="stock" min="0" onChange={handleInputs} value={product.stock} />
            {errors.stock && <p className="error">{errors.stock}</p>}
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
                <input type="number" name="percent-promo" id="percent-promo" step="0.01" min="0" max="100" onChange={handleInputs} value={product.percentagePromo} />
                {errors.percentagePromo && <p className="error">{errors.percentagePromo}</p>}
              </div>
            )}
          </div>
        </div>
        
        <div className="btn-form-product-container">
          <button className="btn-form-product">Modifier le produit</button>
        </div>

        {toggle && ( <>
          <div className="overlay-modal" onClick={toggleModal}></div>

          <div className="modal" onClick={toggleModal}>
            <svg width="1em" height="1em" viewBox="0 0 1024 1024" className="modal-icon"><path fill="#30967E" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></svg>
            <p className="modal-content">Produit modifié avec succès</p>
          </div>
        </> )}

      </form>
    </div>
  )
}