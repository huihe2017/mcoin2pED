let initialState = {
    adminToken: sessionStorage.adminToken
}

export default function user(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_USER_MSG':
            state.userMsg = action.data.data
            return Object.assign({}, state, {})
        case 'LOGIN':
            state.adminToken = action.data.data.adminToken
            sessionStorage.setItem('adminToken', state.adminToken)
            return Object.assign({}, state, {})
        case 'SET_PIN_CODE':
            state.userMsg.userInfo.pinCode = true
            return Object.assign({}, state, {})
        case 'GET_ALL_USER':
            state.allUser = action.data.data
            return Object.assign({}, state, {})
        case 'CHECK_EXISTS_PINCODE':
            state.userMsg.userInfo.isExistsPincode = action.data.data.isExists
            return Object.assign({}, state, {})
        default:
            return state
    }

}
