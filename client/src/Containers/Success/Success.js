import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import './Success.css'

export default function Success() {

    const location = useLocation()

    console.log(location)

  return <div class="success-page">
    <h1>Merci pour votre commande !</h1>
    <Link to="/"><button>Retour au shop</button></Link>
  </div>
}
