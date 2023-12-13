export const LoginStart = () =>({   
    type: "LOGIN_START"
})

export const LOGINSUCCESS = (payload) => ({
    type: "LOGIN_SUCCESS",
    payload
})


export const LOGINFAILURE = () => ({
    type: "LOGIN_FAILURE",

})

export const LOGOUT = () => ({
    type: "LOGOUT",

})

export const UpdateStart = () =>({   
    type: "UPDATE_START"
})

export const UpdateSuccess = (payload) => ({
    type: "UPDATE_SUCCESS",
    payload
})


export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",

})