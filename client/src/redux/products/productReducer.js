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

export const addProduct = (formData) => dispatch => {
    fetch("/api/products", {
        method: 'POST', 
        body: formData
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

export const updateProduct = (product, formData) => dispatch => {
    fetch("/api/products/" + product.id, {
        method: 'PATCH', 
        body: formData
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