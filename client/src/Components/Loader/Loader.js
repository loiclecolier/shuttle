import React from 'react'
import './Loader.css'
import ShuttleLoader from './shuttle-loader.svg'
import RacketLoader from './racket-loader.svg'

export default function Loader() {

  return (
    <div className="loader">
        <img className='racket-loader left' src={RacketLoader} alt="" />
        <img className='shuttle-loader' src={ShuttleLoader} alt="" />
        <img className='racket-loader right' src={RacketLoader} alt="" />
    </div>
  )
}
