import React, { useState } from 'react'
import './Shop.css'
import ProductsList from '../../Components/ProductsList/ProductsList'
import Filterbar from '../../Components/Filterbar/Filterbar'

export default function Shop() {

  const [searchValue, setSearchValue] = useState("")
  const [filter, setFilter] = useState({
    category: "",
    brand: "",
    isPromotion: false,
    priceMin: "",
    priceMax: ""
  })

  return (
    <>
      <Filterbar
        searchValue={searchValue} setSearchValue={setSearchValue}
        filter={filter} setFilter={setFilter} 
      />
      <ProductsList
        searchValue={searchValue} setSearchValue={setSearchValue}
        filter={filter} setFilter={setFilter}
      />
    </>
  )
}
