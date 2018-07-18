let initialState = {
    token: sessionStorage.token
}

export default function user(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_USER_MSG':
            state.userMsg = action.data.data
            return Object.assign({}, state, {})
        case 'LOGIN':
            state.token = action.data.data.token
            sessionStorage.setItem('token', state.token)
            return Object.assign({}, state, {})
        case 'SET_PIN_CODE':
            state.userMsg.userInfo.pinCode = true
            return Object.assign({}, state, {})
        default:
            return state
    }

}
