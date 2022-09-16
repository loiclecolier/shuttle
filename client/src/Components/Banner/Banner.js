import React from 'react'
import './Banner.css'
import { Link } from "react-scroll/modules"

export default function Banner() {

  return (
    <div className="banner-products">
        <Link to="container-products" spy={true} smooth={true} offset={-75}>
            <button>Voir les produits</button>
        </Link>
    </div>
  )
}
