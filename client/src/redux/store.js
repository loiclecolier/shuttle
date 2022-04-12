import { createStore, applyMiddleware, combineReducers } from 'redux'
import productReducer from './products/productReducer'
import brandReducer from './brands/brandReducer'
import categoryReducer from './categories/categoryReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    productReducer,
    brandReducer,
    categoryReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store