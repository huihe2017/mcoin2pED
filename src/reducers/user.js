let initialState = {}

export default function user(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_USER_MSG':
            state.userMsg = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}
