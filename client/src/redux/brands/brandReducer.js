const INITIAL_STATE = {
    brands: []
}

function brandReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case "LOADBRANDS": {
            return {
                ...state,
                brands: action.payload
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
            payload: data
        })
    })
}