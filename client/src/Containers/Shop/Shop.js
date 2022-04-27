import React, { useState } from 'react'
import './Shop.css'
import ProductsList from '../../Components/ProductsList/ProductsList'
import Filterbar from '../../Components/Filterbar/Filterbar'
import Banner from '../../Components/Banner/Banner'

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
      <div className="banner-promotion">
          Livraison offerte pour tout achat de plus de 50€ !
      </div>
      <Banner />
      <div id="container-products">
        <Filterbar
          searchValue={searchValue} setSearchValue={setSearchValue}
          filter={filter} setFilter={setFilter} 
        />
        <ProductsList
          searchValue={searchValue} setSearchValue={setSearchValue}
          filter={filter} setFilter={setFilter}
        />
      </div>
    </>
  )
}
