import {
    loginStart, loginSuccess, loginFailure,
    registerStart, registerSuccess, registerFailure
} from "../slices/userSlice"

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try {
        const res = await fetch("/api/auth/login", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            method: 'POST', 
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (data === "Wrong credentials")
            dispatch(loginFailure())
        else
            dispatch(loginSuccess(data))

    } catch (err) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart())

    try {
        const res = await fetch("/api/auth/register", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            method: 'POST', 
            body: JSON.stringify(user)
        })
        const data = await res.json()
        dispatch(registerSuccess(data))

    } catch (err) {
        dispatch(registerFailure())
    }
}