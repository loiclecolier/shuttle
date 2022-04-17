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
        case "ADDPRODUCT": {
            getProducts()
            return state
        }
        case "DELETEPRODUCT": {
            const newProducts = [...state.products]
            console.log(state.products)
            newProducts.filter(product => {
                return product._id !== action.payload
            })
            console.log(newProducts)
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
            "price": product.price * 100 // convert cent
        })
    })
    .then(() => {
        dispatch({
            type: 'ADDPRODUCT'
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