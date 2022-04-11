import React from 'react'
import './Shop.css'
import Filter from '../../Components/Filter/Filter'
import Searchbar from '../../Components/Searchbar/Searchbar'
import ProductsList from '../../Components/ProductsList/ProductsList'

export default function Shop() {
  return (
    <>
      <div className="filter-bar">
        <Filter />
        <Searchbar />
      </div>
      <ProductsList />
    </>
  )
}
