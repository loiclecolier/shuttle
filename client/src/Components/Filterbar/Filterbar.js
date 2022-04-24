import React from 'react'
import './Filterbar.css'
import Filter from './Filter/Filter'
import Searchbar from './Searchbar/Searchbar'

export default function Filterbar({ searchValue, setSearchValue, filter, setFilter } ) {

  return (
    <div className="filter-bar">
        <Filter filter={filter} setFilter={setFilter} />
        <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  )
}
