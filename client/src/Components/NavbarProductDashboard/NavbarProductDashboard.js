import React from 'react'
import './NavbarProductDashboard.css'
import { Link } from 'react-router-dom'

export default function NavbarProductDashboard() {
  return (
    <div className="dashboard-products-actions">
      <Link to="/dashboard/products" className="action-product">Voir les produits</Link>
      <Link to="/dashboard/products/add" className="action-product">Ajouter un produit</Link>
      <Link to="/dashboard/products/categories" className="action-product">Gérer les catégories</Link>
      <Link to="/dashboard/products/brands" className="action-product">Gérer les marques</Link>
    </div>
  )
}
