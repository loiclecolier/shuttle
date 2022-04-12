import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavbarDashboard.css'

export default function NavbarDashboard() {
  return (
    <nav className="navbar-dashboard">
        <h1>Tableau de bord</h1>
        <ul className="navbar-links">
            <NavLink to="/dashboard/products" className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Produits</li>
            </NavLink>
            <NavLink to="/dashboard/home" className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Commandes</li>
            </NavLink>
            <NavLink to="/dashboard/home" className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Utilisateurs</li>
            </NavLink>
            <NavLink to="/dashboard/home" className={({isActive}) => {
                    return isActive ? "active-link" : ""
            }}>
                <li>Statistiques</li>
            </NavLink>
        </ul>
    </nav>
  )
}
