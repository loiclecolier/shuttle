import React, { useEffect, useState } from 'react'
import './ManageCategories.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, deleteCategory, updateCategory, addCategory } from '../../../../redux/categories/categoryReducer'
import Loader from '../../../../Components/Loader/Loader'

export default function ManageCategories() {

  const [categoryInput, setCategoryInput] = useState({
      name: ''
  })

  const {loadingCategories, categories} = useSelector(state => ({
    ...state.categoryReducer
  }))

  const dispatch = useDispatch()

  useEffect(() => {

    setTimeout(() => {
      if (categories.length === 0) {
        dispatch(getCategories())
      }
    }, 2000)

  }, [])

  const handleUpdate = async (e, category) => {
    if (e.target.value !== "") {
      category.name = e.target.value
      dispatch(updateCategory(category))
    }
  }

  const handleAdd = async () => {
    if (categoryInput) {
      dispatch(addCategory(categoryInput))
      setCategoryInput({ name: "" })
    }
  }

  const handleInput = e => {
    setCategoryInput({ name: e.target.value })
  }

  const handleDelete = async (id) => {
    dispatch(deleteCategory(id))
  }

  return <>
    <h1 className="dashboard-products-title">Liste des catégories</h1>
    {!loadingCategories ?
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
    : <div className="dashboard-product-loader"><Loader /></div>
    }
  </>
}
