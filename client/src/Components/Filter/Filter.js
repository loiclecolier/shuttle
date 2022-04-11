import React from 'react'
import './Filter.css'

export default function Filter() {
  return (
    <div className="product-filter">
        <select name="category" id="category-select">
            <option value="" selected>Catégorie</option>
        </select>
        <select name="brand" id="brand-select">
            <option value="" selected>Marque</option>
        </select>
        <div>
            <input type="checkbox" id="is-promotion" name="promotion" />
            <label for="is-promotion">En promotion</label>
        </div>
        <div>
        <label for="price">Prix</label>
        <input type="range" id="price" name="price" />
        </div>
    </div>
  )
}
