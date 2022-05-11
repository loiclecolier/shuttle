import React, { useState } from 'react'
import './Disclaimer.css'

export default function Disclaimer() {

    const [toggle, setToggle] = useState(true)

    const toggleDisclaimer = () => {
        setToggle(!toggle)
    }

  return <>
    {toggle &&
        <>
        <div className="overlay-disclaimer" onClick={toggleDisclaimer}></div>
        <div className="disclaimer-prototype">
            <h1>🤖 - Site web prototype</h1>
            <p>Ce site web est un prototype fictif et a été créé dans un but d'apprentissage.</p>
            <p>Plus d'informations : <a href="https://github.com/loiclecolier/shuttle">https://github.com/loiclecolier/shuttle</a>.</p>
            <span className="close-disclaimer" onClick={toggleDisclaimer}>X</span>
        </div>
        </>
        }
    </>
}
