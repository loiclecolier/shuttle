import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import brandsReducer from './slices/brandsSlice'
import categoriesReducer from './slices/categoriesSlice'
import cartReducer from './slices/cartSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        brands: brandsReducer,
        categories: categoriesReducer,
        cart: cartReducer
    }
})

export default store