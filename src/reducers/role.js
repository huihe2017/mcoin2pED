let initialState = {}

export default function role(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_ROLE_LIST':
            state.roleList = action.data.data
            return Object.assign({}, state, {})
        case 'SET_ROLE_STATUS':
            state.roleList.list.filter((item, index) => {
                if (item.id === action.data.roleId) {
                    state.roleList.list[index].status = state.roleList.list[index].status ? 0 : 1
                }
            })
            return Object.assign({}, state, {})
        case 'GET_PERMISSELIST_LIST':
            state.permisseList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_ROLE_MSG':
            state.editRoleMsg = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}
