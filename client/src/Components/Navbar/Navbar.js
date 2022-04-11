import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="header">
        <Link to="/" className="logo">
            <img src={Logo} alt="Shuttle Logo" />
        </Link>
        <ul className="navbar-menu">
            <li className="navbar-menu-item">
                <NavLink to="/shop" className={({isActive}) => {
                    return isActive ? "active-link" : ""
                }}>
                    Boutique
                </NavLink>
            </li>
            <li className="navbar-menu-item">
                <NavLink to="/guide" className={({isActive}) => {
                    return isActive ? "active-link" : ""
                }}>
                    Guide
                </NavLink>
            </li>
            <li className="navbar-menu-item">
                <NavLink to="/about" className={({isActive}) => {
                    return isActive ? "active-link" : ""
                }}>
                    À propos
                </NavLink>
            </li>
            <li className="navbar-menu-item">
                <NavLink to="/contact" className={({isActive}) => {
                    return isActive ? "active-link" : ""
                }}>
                    Contact
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}
