const INITIAL_STATE = {
    categories: [],
    loadingCategories: true
}

function categoryReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case "LOADCATEGORIES": {
            return {
                ...state,
                categories: action.payload,
                loadingCategories: false
            }
        }
        case "DELETECATEGORY": {
            const oldCategories = [...state.categories]
            const newCategories = oldCategories.filter(category => {
                return category._id !== action.payload
            })
            return {
                ...state,
                categories: newCategories
            }
        }
        case "UPDATECATEGORY": {
            const oldCategories = [...state.categories]
            const newCategories = oldCategories.map(item => {
                if (item._id === action.payload.id) {
                    return action.payload
                }
                return item
            })
            return {
                ...state,
                products: newCategories
            }
        }
        default:
            return state
    }
}

export default categoryReducer



export const getCategories = () => dispatch => {
    fetch("/api/categories")
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'LOADCATEGORIES',
            payload: data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    })
}

export const addCategory = (category) => dispatch => {
    fetch("/api/categories", {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        method: 'POST', 
        body: JSON.stringify(category)
    })
    .then(() => {
        fetch("/api/categories")
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'LOADCATEGORIES',
                payload: data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            })
        })
    })
}

export const updateCategory = (category) => dispatch => {
    fetch("/api/categories/" + category._id, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        method: 'PATCH',
        body: JSON.stringify(category)
    })
    .then(() => {
        dispatch({
            type: 'UPDATECATEGORY',
            payload: category
        })
    })
}

export const deleteCategory = (id) => dispatch => {
    fetch(`/api/categories/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        dispatch({
            type: 'DELETECATEGORY',
            payload: id
        })
    })
}