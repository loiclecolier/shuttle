import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './NavbarDashboard.css'

export default function NavbarDashboard() {

    const navigate = useNavigate()

  return (
    <nav className="navbar-dashboard">
        <h1>Tableau de bord</h1>
        <ul className="navbar-links">
            <NavLink to="/dashboard/products" onClick={() => navigate('/dashboard/products/view', { replace: true }) } className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Produits</li>
            </NavLink>
            <NavLink to="/dashboard/commands" className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Commandes</li>
            </NavLink>
            <NavLink to="/dashboard/users" className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Utilisateurs</li>
            </NavLink>
            <NavLink to="/dashboard/statistics" className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Statistiques</li>
            </NavLink>
        </ul>
    </nav>
  )
}
