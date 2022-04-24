import React from 'react'
import './Searchbar.css'

export default function Searchbar({ searchValue, setSearchValue }) {

  const searchProduct = e => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="product-search">
        <input type="search" value={searchValue} onChange={searchProduct} placeholder="Rechercher un produit..." />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </div>
  )
}
