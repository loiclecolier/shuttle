import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import Logo from '../../assets/favicon.svg'

export default function Footer() {
  return <>
    <div className="footer">
        <Link to="/" className="footer-logo">
            <img src={Logo} alt="Shuttle Logo" />
        </Link>
        <div className="footer-author">
            Créé par <a href="https://www.linkedin.com/in/loic-lecolier/" target="_blank">Loïc Lécolier</a>
        </div>
        <nav className="footer-nav">
            <ul>
                <li>Conditions générales de vente</li>
                <li>Politique de confidentalité</li>
                <Link to="/dashboard/home">
                    <li>Tableau de bord</li>
                </Link>
            </ul>
        </nav>
    </div>
    <div className="footer-copyright">
            © Shuttle - 2022
        </div>
    <div className="disclaimer">
        Shuttle est un site web fictif créé dans un but d'apprentissage. Plus d'informations : <a href="https://github.com/loiclecolier/shuttle" target="_blank">https://github.com/loiclecolier/shuttle</a>.
    </div>
  </>
}
