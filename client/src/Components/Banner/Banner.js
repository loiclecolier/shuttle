import React from 'react'
import './Banner.css'
import { Link } from "react-scroll/modules"
import Logo from '../../assets/logo.svg'

export default function Banner() {

  return (
    <div className="banner-products">
        <img src={Logo} alt="Logo Shuttle" />
        <div className="promo">
            Promo !<br/>- 50 %
        </div>
        <Link to="container-products" spy={true} smooth={true}>
            <button>Voir les produits</button>
        </Link>
    </div>
  )
}
