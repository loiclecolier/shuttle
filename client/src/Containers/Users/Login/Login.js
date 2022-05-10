import React, { useState } from 'react'
import './Login.css'
import Shuttle from '../../../assets/shuttle.svg'
import { login } from '../../../redux/services/userService'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validation, setValidation] = useState({})

  const dispatch = useDispatch()

  const { isFetching, error } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(handleValidation()) {
      login(dispatch, { email, password })
    }
  }

  const handleValidation = () => {
    let isValidForm = true

    if (!email) {
      setValidation(validation => ({...validation, email: true}))
      isValidForm = false
    }
    else setValidation(validation => ({...validation, email: false}))

    if (!password) {
      setValidation(validation => ({...validation, password: true}))
      isValidForm = false
    }
    else setValidation(validation => ({...validation, password: false}))
    
    return isValidForm
  }

  return (
    <div className="page-login">
      <form className="form-login">

        <img src={Shuttle} alt="" />

        <h2>Se connecter</h2>

        <div className="input-email">
          <label htmlFor="loginEmail">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            id="loginEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
          {validation.email && <p className="error">Ce champ est requis</p>}
        </div>

        <div className="input-password">
          <label htmlFor="loginPassword">Mot de passe</label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            id="loginPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
          {validation.password && <p className="error">Ce champ est requis</p>}
        </div>

        <p className="no-account">Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p>

        <div>
          <button type="submit" onClick={handleSubmit} disabled={isFetching}>Se connecter</button>
          {error && <p className="error">Adresse email et/ou mot de passe incorrect</p>}
        </div>

      </form>
    </div>
  )
}
