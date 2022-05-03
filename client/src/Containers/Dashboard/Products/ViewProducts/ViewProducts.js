import React, { useEffect, useState } from 'react'
import './ViewProducts.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, getProducts } from '../../../../redux/services/productsService'
import { getBrands } from '../../../../redux/services/brandsService'
import { getCategories } from '../../../../redux/services/categoriesService'
import { useNavigate } from 'react-router-dom';
import Filterbar from '../../../../Components/Filterbar/Filterbar'
import Loader from '../../../../Components/Loader/Loader'

export default function ViewProducts() {

  const [searchValue, setSearchValue] = useState("")
  const [filter, setFilter] = useState({
    category: "",
    brand: "",
    isPromotion: false,
    priceMin: "",
    priceMax: ""
  })

  const products = useSelector(state => state.products.products)
  const productsPending = useSelector(state => state.products.getPending)
  const productsError = useSelector(state => state.products.getError)

  const brands = useSelector(state => state.brands.brands)
  const brandsPending = useSelector(state => state.brands.getPending)
  const brandsError = useSelector(state => state.brands.getError)

  const categories = useSelector(state => state.categories.categories)
  const categoriesPending = useSelector(state => state.categories.getPending)
  const categoriesError = useSelector(state => state.categories.getError)

  const dispatch = useDispatch()

  const navigate = useNavigate();

  useEffect(() => {

    if (products.length === 0) {
      getProducts(dispatch)
    }

    if (brands.length === 0) {
      getBrands(dispatch)
    }

    if (categories.length === 0) {
      getCategories(dispatch)
    }

  }, [])

  function goToProduct(item) {
    navigate('/' + item.slug, {state: item});
  }

  function goToUpdateProduct(item) {
    navigate('/dashboard/products/update/' + item.slug, {state: item});
  }

  const handleDelete = async (_id) => {
    deleteProduct(_id, dispatch)
  }

  const searchedProducts = products.filter((product) => {
    if (searchValue === '') {
        return products
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
    <h1 className="dashboard-products-title">Liste des produits</h1>
    <Filterbar
      searchValue={searchValue} setSearchValue={setSearchValue}
      filter={filter} setFilter={setFilter}
    />
    {(!productsPending && !brandsPending && !categoriesPending
    && !productsError && !brandsError && !categoriesError) ?
      filteredProducts.length > 0 ?
        <table className="dashboard-products-list">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Marque</th>
                  <th>Catégorie</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                  <th>Fiche Produit</th>
              </tr>
          </thead>
          <tbody>
            {filteredProducts.map(item => {
              return (
                <tr className="product-item" key={item._id}>
                  <td className="slug">{item.slug}</td>
                  <td className="name">{item.name}</td>
                  <td className="brand">
                    {(brands
                      .filter(brand => brand._id === item.brand)
                      .map(brand => brand.name)).length > 0
                      ? brands
                        .filter(brand => brand._id === item.brand)
                        .map(brand => brand.name)
                      : "/"
                    }
                  </td>
                  <td className="category">
                    {(categories
                      .filter(category => category._id === item.category)
                      .map(category => category.name)).length > 0
                      ? categories
                      .filter(category => category._id === item.category)
                      .map(category => category.name)
                      : "/"
                    }
                  </td>
                  <td className="edit" onClick={() => goToUpdateProduct(item)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </td>
                  <td className="delete" onClick={() => handleDelete(item._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                  </td>
                  <td className="view" onClick={() => goToProduct(item)}>
                    Voir
                  </td>
              </tr>
            )})}
          </tbody>
        </table>
      : searchValue === "" ?
        <p className="dashboard-empty-list">Aucun produit ne correspond aux filtres.</p>
        : <p className="dashboard-empty-list">Aucun produit ne correspond à : {searchValue}</p>
    : (productsError || brandsError || categoriesError) ?
      <p className="dashboard-empty-list">Une erreur est survenue, veuillez réessayer.</p>
      : <div className="dashboard-product-loader"><Loader /></div>
    }
  </>
}
