import { createSlice } from "@reduxjs/toolkit"

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        getPending: null,
        getError: false,
        addPending: null,
        addError: false,
        updatePending: null,
        updateError: false,
        deletePending: null,
        deleteError: false,
    },
    reducers: {
        getStart: (state) => {
            state.getPending = true
        },
        getSuccess: (state, action) => {
            state.getPending = false
            state.getError = false
            state.products = action.payload
        },
        getError: (state) => {
            state.getError = true
            state.getPending = false
        },
        addStart: (state) => {
            state.addPending = true
        },
        addSuccess: (state, action) => {
            state.addPending = false
            state.addError = false
            state.products.push(action.payload)
        },
        addError: (state) => {
            state.addError = true
            state.addPending = false
        },
        updateStart: (state) => {
            state.updatePending = true
        },
        updateSuccess: (state, action) => {
            state.updatePending = false
            state.updateError = false
            state.products = state.products.map(product => {
                if (product._id === action.payload._id) return action.payload
                else return product
            })
        },
        updateError: (state) => {
            state.updateError = true
            state.updatePending = false
        },
        deleteStart: (state) => {
            state.deletePending = true
        },
        deleteSuccess: (state, action) => {
            state.deletePending = false
            state.deleteError = false
            state.products = state.products.filter(product => {
                if (product._id === action.payload) return false
                return true
            })
        },
        deleteError: (state) => {
            state.deleteError = true
            state.deletePending = false
        }
    }
})

export const {
    getStart, getSuccess, getError,
    addStart, addSuccess, addError,
    updateStart, updateSuccess, updateError,
    deleteStart, deleteSuccess, deleteError
} = productsSlice.actions

export default productsSlice.reducer