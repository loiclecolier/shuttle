const INITIAL_STATE = {
    categories: []
}

function categoryReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case "LOADCATEGORIES": {
            return {
                ...state,
                categories: action.payload
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
            payload: data
        })
    })
}