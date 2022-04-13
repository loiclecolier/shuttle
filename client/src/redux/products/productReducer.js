const INITIAL_STATE = {
    products: []
}

function productReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case "LOADPRODUCTS": {
            return {
                ...state,
                products: action.payload
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