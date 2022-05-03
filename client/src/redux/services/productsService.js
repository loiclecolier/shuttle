import {
    getStart, getSuccess, getError,
    addStart, addSuccess, addError,
    updateStart, updateSuccess, updateError,
    deleteStart, deleteSuccess, deleteError
} from "../slices/productsSlice"

export const getProducts = (dispatch) => {
    dispatch(getStart())
    setTimeout(async () => {
        try {
            const res = await fetch("/api/products")
            const data = await res.json()
            dispatch(getSuccess(data))
        }
        catch (err) {
            dispatch(getError())
        }
    }, 2000)
}

export const addProduct = async (formData, dispatch) => {
    dispatch(addStart())
    try {
        const res = await fetch("/api/products", {
            method: 'POST', 
            body: formData
        })
        const data = await res.json()
        dispatch(addSuccess(data))
    }
    catch (err) {
        dispatch(addError())
    }    
}

export const updateProduct = async (_id, formData, dispatch) => {
    dispatch(updateStart())
    try {
        const res = await fetch(`/api/products/${_id}`, {
            method: 'PATCH',
            body: formData
        })
        const data = await res.json()
        dispatch(updateSuccess(data))
    }
    catch (err) {
        dispatch(updateError())
    }
}

export const deleteProduct = async (_id, dispatch) => {
    dispatch(deleteStart())
    try {
        await fetch(`/api/products/${_id}`, {
            method: 'DELETE'
        })
        dispatch(deleteSuccess(_id))
    }
    catch (err) {
        dispatch(deleteError())
    }
}