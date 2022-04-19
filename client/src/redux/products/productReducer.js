const INITIAL_STATE = {
    products: [],
    loadingProducts: true
}

function productReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case "LOADPRODUCTS": {
            return {
                ...state,
                products: action.payload,
                loadingProducts: false
            }
        }
        case "DELETEPRODUCT": {
            const oldProducts = [...state.products]
            const newProducts = oldProducts.filter(product => {
                return product._id !== action.payload
            })
            return {
                ...state,
                products: newProducts
            }
        }
        case "UPDATEPRODUCT": {
            const oldProducts = [...state.products]
            const newProducts = oldProducts.map(item => {
                if (item._id === action.payload.id) {
                    action.payload.price *= 100
                    return action.payload
                }
                return item
            })
            return {
                ...state,
                products: newProducts
            }
        }
        default:
            return state
    }
}

export default productReducer



export const getProducts = () => dispatch => {
    fetch("/api/products")
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'LOADPRODUCTS',
            payload: data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    })
}

export const addProduct = (product) => dispatch => {
    fetch("/api/products", {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        method: 'POST', 
        body: JSON.stringify({
            ...product,
            "category": product.category === "" ? null : product.category,
            "brand": product.brand === "" ? null : product.brand,
            "price": product.price * 100 // convert cent
        })
    })
    .then(() => {
        fetch("/api/products")
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'LOADPRODUCTS',
                payload: data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            })
        })
    })
}

export const updateProduct = (product) => dispatch => {
    fetch("/api/products/" + product.id, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        method: 'PATCH', 
        body: JSON.stringify({
            ...product,
            "category": product.category === "" ? null : product.category,
            "brand": product.brand === "" ? null : product.brand,
            "price": product.price * 100 // convert cent
        })
    })
    .then(() => {
        dispatch({
            type: 'UPDATEPRODUCT',
            payload: product
        })
    })
}

export const deleteProduct = (id) => dispatch => {
    fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        dispatch({
            type: 'DELETEPRODUCT',
            payload: id
        })
    })
}