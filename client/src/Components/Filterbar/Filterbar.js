import React from 'react'
import './Filterbar.css'
import Filter from './Filter/Filter'
import Searchbar from './Searchbar/Searchbar'

export default function Filterbar() {
  return (
    <div className="filter-bar">
        <Filter />
        <Searchbar />
    </div>
  )
}
