import {
    getStart, getSuccess, getError,
    addStart, addSuccess, addError,
    updateStart, updateSuccess, updateError,
    deleteStart, deleteSuccess, deleteError
} from "../slices/categoriesSlice"

export const getCategories = async (dispatch) => {
    dispatch(getStart())
    setTimeout(async () => {
        try {
            const res = await fetch("/api/categories")
            const data = await res.json()
            dispatch(getSuccess(data))
        }
        catch (err) {
            dispatch(getError())
        }
    }, 2000)
}

export const addCategory = async (category, dispatch) => {
    dispatch(addStart())
    try {
        const res = await fetch("/api/categories", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            method: 'POST', 
            body: JSON.stringify(category)
        })
        const data = await res.json()
        dispatch(addSuccess(data))
    }
    catch (err) {
        dispatch(addError())
    }    
}

export const updateCategory = async (category, dispatch) => {
    dispatch(updateStart())
    try {
        const res = await fetch(`/api/categories/${category._id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            method: 'PATCH', 
            body: JSON.stringify(category)
        })
        const data = await res.json()
        dispatch(updateSuccess(data))
    } catch (err) {
        dispatch(updateError())
    }
}

export const deleteCategory = async (_id, dispatch) => {
    dispatch(deleteStart())
    try {
        await fetch(`/api/categories/${_id}`, {
            method: 'DELETE'
        })
        dispatch(deleteSuccess(_id))
    }
    catch (err) {
        dispatch(deleteError())
    }
}