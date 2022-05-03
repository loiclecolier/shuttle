import React, { useEffect, useState } from 'react'
import './ManageCategories.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, deleteCategory, updateCategory, addCategory } from '../../../../redux/services/categoriesService'
import Loader from '../../../../Components/Loader/Loader'

export default function ManageCategories() {

  const [categoryInput, setCategoryInput] = useState({
      name: ''
  })

  const categories = useSelector(state => state.categories.categories)
  const pending = useSelector(state => state.categories.getPending)
  const error = useSelector(state => state.categories.getError)

  const dispatch = useDispatch()

  useEffect(() => {

    if (categories.length === 0) {
      getCategories(dispatch)
    }

  }, [])

  const handleUpdate = async (e, category) => {
    if (e.target.value !== "") {
      const categoryUpdated = {...category, name: e.target.value}
      updateCategory(categoryUpdated, dispatch)
    }
  }

  const handleAdd = async () => {
    if (categoryInput) {
      addCategory(categoryInput, dispatch)
      setCategoryInput({ name: "" })
    }
  }

  const handleInput = e => {
    setCategoryInput({ name: e.target.value })
  }

  const handleDelete = async (_id) => {
    deleteCategory(_id, dispatch)
  }

  return <>
    <h1 className="dashboard-products-title">Liste des catégories</h1>
    {(!pending && !error) ?
      categories.length > 0 ?
        <table className="dashboard-brands-list">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            <tr className="brand-item">
              <td className="id"></td>
              <td className="name"><input name="name" type="text" value={categoryInput.name} onChange={handleInput} /></td>
              <td className="add" alt="Ajouter" onClick={handleAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </td>
            </tr>
            {categories.map(item => {
              return (
                <tr className="brand-item" key={item._id}>
                  <td className="id">{item._id}</td>
                  <td className="name"><input name="name" type="text" onChange={(e) => handleUpdate(e, item)} defaultValue={item.name} /></td>
                  <td className="delete" onClick={() => handleDelete(item._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                  </td>
              </tr>
            )})}
          </tbody>
        </table>
      : <p className="dashboard-empty-list">La liste des catégories est vide.</p>
    : error ?
      <p className="dashboard-empty-list">Une erreur est survenue, veuillez réessayer.</p>
      : <div className="dashboard-product-loader"><Loader /></div>
    }
  </>
}
