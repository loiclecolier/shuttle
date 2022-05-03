import { createSlice } from "@reduxjs/toolkit"

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
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
            state.categories = action.payload
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
            state.categories.push(action.payload)
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
            state.categories = state.categories.map(category => {
                if (category._id === action.payload._id) return action.payload
                else return category
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
            state.categories = state.categories.filter(category => {
                if (category._id === action.payload) return false
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
} = categoriesSlice.actions

export default categoriesSlice.reducer