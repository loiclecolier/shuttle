import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/userSlice'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import './Navbar.css'

export default function Navbar() {

    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(logout())
    }

  return (
    <nav className="header">
        <Link to="/" className="logo">
            <img src={Logo} alt="Shuttle Logo" />
        </Link>
        <ul className="navbar-menu">
            {!user && <>
                <li className="navbar-menu-item">
                    <NavLink to="/login" className={({isActive}) => {
                        return isActive ? "active-link" : ""
                    }}>
                        Se connecter
                    </NavLink>
                </li>
                <li className="navbar-menu-item">
                    <NavLink to="/register" className={({isActive}) => {
                        return isActive ? "active-link" : ""
                    }}>
                    S'inscrire
                    </NavLink>
                </li>
            </>}
            {user && <>
                <li className="navbar-menu-item" onClick={logoutUser}>
                    Se déconnecter
                </li>
            </>}
            <li className="navbar-menu-item-cart">
                <NavLink to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    {quantity > 0 && <div className="badge-cart">{quantity}</div>}
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}
