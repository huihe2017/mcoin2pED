let initialState = {}

export default function account(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_USER_LIST':
            state.userList = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}
