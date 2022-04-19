const INITIAL_STATE = {
    brands: [],
    loadingBrands: true
}

function brandReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case "LOADBRANDS": {
            return {
                ...state,
                brands: action.payload,
                loadingBrands: false
            }
        }
        case "DELETEBRAND": {
            const oldBrands = [...state.brands]
            const newBrands = oldBrands.filter(brand => {
                return brand._id !== action.payload
            })
            return {
                ...state,
                brands: newBrands
            }
        }
        case "UPDATEBRAND": {
            const oldBrands = [...state.brands]
            const newBrands = oldBrands.map(item => {
                if (item._id === action.payload.id) {
                    return action.payload
                }
                return item
            })
            return {
                ...state,
                products: newBrands
            }
        }
        default:
            return state
    }
}

export default brandReducer



export const getBrands = () => dispatch => {
    fetch("/api/brands/")
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'LOADBRANDS',
            payload: data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    })
}

export const addBrand = (brand) => dispatch => {
    fetch("/api/brands", {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        method: 'POST', 
        body: JSON.stringify(brand)
    })
    .then(() => {
        fetch("/api/brands")
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'LOADBRANDS',
                payload: data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            })
        })
    })
}

export const updateBrand = (brand) => dispatch => {
    fetch("/api/brands/" + brand._id, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        method: 'PATCH',
        body: JSON.stringify(brand)
    })
    .then(() => {
        dispatch({
            type: 'UPDATEBRAND',
            payload: brand
        })
    })
}

export const deleteBrand = (id) => dispatch => {
    fetch(`/api/brands/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        dispatch({
            type: 'DELETEBRAND',
            payload: id
        })
    })
}