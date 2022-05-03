import {
    getStart, getSuccess, getError,
    addStart, addSuccess, addError,
    updateStart, updateSuccess, updateError,
    deleteStart, deleteSuccess, deleteError
} from "../slices/brandsSlice"

export const getBrands = async (dispatch) => {
    dispatch(getStart())
    setTimeout(async () => {
        try {
            const res = await fetch("/api/brands")
            const data = await res.json()
            dispatch(getSuccess(data))
        }
        catch (err) {
            dispatch(getError())
        }
    }, 2000)
}

export const addBrand = async (brand, dispatch) => {
    dispatch(addStart())
    try {
        const res = await fetch("/api/brands", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            method: 'POST', 
            body: JSON.stringify(brand)
        })
        const data = await res.json()
        dispatch(addSuccess(data))
    }
    catch (err) {
        dispatch(addError())
    }    
}

export const updateBrand = async (brand, dispatch) => {
    dispatch(updateStart())
    try {
        const res = await fetch(`/api/brands/${brand._id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            method: 'PATCH', 
            body: JSON.stringify(brand)
        })
        const data = await res.json()
        dispatch(updateSuccess(data))
    } catch (err) {
        dispatch(updateError())
    }
}

export const deleteBrand = async (_id, dispatch) => {
    dispatch(deleteStart())
    try {
        await fetch(`/api/brands/${_id}`, {
            method: 'DELETE'
        })
        dispatch(deleteSuccess(_id))
    }
    catch (err) {
        dispatch(deleteError())
    }
}