import React, { useEffect } from 'react'
import './Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, getProducts } from '../../../redux/products/productReducer'
import { getBrands } from '../../../redux/brands/brandReducer'
import { getCategories } from '../../../redux/categories/categoryReducer'
import { Link, useNavigate } from 'react-router-dom';
import Filterbar from '../../../Components/Filterbar/Filterbar'
import Loader from '../../../Components/Loader/Loader'

export default function Products() {

  const {products, loadingProducts, brands, categories} = useSelector(state => ({
    ...state.productReducer,
    ...state.brandReducer,
    ...state.categoryReducer
  }))

  const dispatch = useDispatch()

  const navigate = useNavigate();

  useEffect(() => {

    setTimeout(() => {
      if (products.length === 0) {
        dispatch(getProducts())
      }
    }, 2000)

    if (brands.length === 0) {
      dispatch(getBrands())
    }

    if (categories.length === 0) {
      dispatch(getCategories())
    }

  }, [])

  function goToProduct(item) {
    navigate('/shop/' + item.slug, {state: item});
  }

  function goToUpdateProduct(item) {
    navigate('/dashboard/products/update/' + item.slug, {state: item});
  }

  const handleDelete = async (id) => {
    dispatch(deleteProduct(id))
  }

  return <>
    <div className="dashboard-products-actions">
      <Link to="/dashboard/products/add" className="action-product">Ajouter un produit</Link>
      <Link to="/dashboard/products/add" className="action-product">Gérer les catégories</Link>
      <Link to="/dashboard/products/add" className="action-product">Gérer les marques</Link>
    </div>
    <h1 className="dashboard-products-title">Liste des produits</h1>
    <Filterbar />
    {!loadingProducts ?
      products.length > 0 ?
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
            {products.map(item => {
              return (
                <tr className="product-item" key={item._id}>
                  <td className="slug">{item.slug}</td>
                  <td className="name">{item.name}</td>
                  <td className="brand">
                    {brands
                      .filter(brand => brand._id === item.brand)
                      .map(brand => brand.name)}
                  </td>
                  <td className="category">
                    {categories
                      .filter(category => category._id === item.category)
                      .map(category => category.name)}
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
      : <p className="dashboard-empty-list">La liste des produits est vide.</p>
    : <div className="dashboard-product-loader"><Loader /></div>
    }
  </>
}
