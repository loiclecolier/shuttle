import React from 'react'
import './Shop.css'
import ProductsList from '../../Components/ProductsList/ProductsList'
import Filterbar from '../../Components/Filterbar/Filterbar'

export default function Shop() {
  return (
    <>
      <Filterbar />
      <ProductsList />
    </>
  )
}
