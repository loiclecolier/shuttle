import React, { useState } from 'react'
import './Register.css'
import Shuttle from '../../../assets/shuttle.svg'
import { register } from '../../../redux/services/userService'
import { useDispatch, useSelector } from 'react-redux'

export default function Register() {

  const [user, setUser] = useState({
    name: "",
    firstname: "",
    email: "",
    password: ""
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState(false)

  const [validation, setValidation] = useState({})

  const dispatch = useDispatch()

  const { isFetching, error } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(handleValidation()) {
      await register(dispatch, user)
      if(error) setErrorLogin(true)
    }
  }

  const handleValidation = () => {

    let isValidForm = true

    // eslint-disable-next-line no-useless-escape
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    // Name validation
    if (!user.name) {
      setValidation(validation => ({...validation, name: "Le nom est requis"}))
      isValidForm = false
    } else setValidation(validation => ({...validation, name: ""}))

    // Firstname validation
    if (!user.firstname) {
      setValidation(validation => ({...validation, firstname: "Le prénom est requis"}))
      isValidForm = false
    } else setValidation(validation => ({...validation, firstname: ""}))

    // Email validation
    if (!user.email) {
      setValidation(validation => ({...validation, email: "L'email est requise"}))
      isValidForm = false
    }
    else if (!regexEmail.test(user.email)) {
      setValidation(validation => ({...validation, email: "Le format de l'email est incorrect"}))
    } else setValidation(validation => ({...validation, email: ""}))

    // Password Validation
    if (!user.password) {
      setValidation(validation => ({...validation, password: "Le mot de passe est requis"}))
      isValidForm = false
    } else setValidation(validation => ({...validation, password: ""}))

    // Confirm Password Validation
    if (!confirmPassword) {
      setValidation(validation => ({...validation, confirmPassword: "La confirmation du mot de passe est requise"}))
      isValidForm = false
    }
    else if (confirmPassword !== user.password) {
      setValidation(validation => ({...validation, confirmPassword: "Les mots de passe ne correspondent pas"}))
      isValidForm = false
    } else setValidation(validation => ({...validation, confirmPassword: ""}))

    return isValidForm

  }

  return (
    <div className="page-register">
      <form className="form-register">

        <img src={Shuttle} alt="" />

        <h2>S'inscrire</h2>

        <div className="input-name">
          <label htmlFor="registerName">Nom</label>
          <input
            name="name"
            type="text"
            autoComplete="family-name"
            id="registerName"
            onChange={(e) => setUser(user => ({...user, name: e.target.value }))}
          />
          {validation.name && <p className="error">{validation.name}</p>}
        </div>

        <div className="input-firstname">
          <label htmlFor="registerFirstname">Prénom</label>
          <input
            name="firstname"
            type="text"
            autoComplete="given-name"
            id="registerFirstname"
            onChange={(e) => setUser(user => ({...user, firstname: e.target.value }))}
          />
          {validation.firstname && <p className="error">{validation.firstname}</p>}
        </div>

        <div className="input-email">
          <label htmlFor="registerEmail">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            id="registerEmail"
            onChange={(e) => setUser(user => ({...user, email: e.target.value }))}
          />
          {validation.email && <p className="error">{validation.email}</p>}
        </div>

        <div className="input-password">
          <label htmlFor="registerPassword">Mot de passe</label>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            id="registerPassword"
            onChange={(e) => setUser(user => ({...user, password: e.target.value }))}
          />
          {validation.password && <p className="error">{validation.password}</p>}
        </div>

        <div className="input-confirm-password">
          <label htmlFor="registerConfirmPassword">Confirmer le mot de passe</label>
          <input
            name="confirm-password"
            type="password"
            id="registerConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {validation.confirmPassword && <p className="error">{validation.confirmPassword}</p>}
        </div>

        <div>
          <button type="submit" onClick={handleSubmit} disabled={isFetching}>S'inscrire</button>
          {errorLogin && <p className="error">Une erreur est survenue, veuillez réessayer.</p>}
        </div>

      </form>
    </div>
  )
}
