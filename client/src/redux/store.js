import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import brandsReducer from './slices/brandsSlice'
import categoriesReducer from './slices/categoriesSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        brands: brandsReducer,
        categories: categoriesReducer
    }
})

export default store