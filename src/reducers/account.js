let initialState = {}

export default function account(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_USER_LIST':
            debugger
            state.userList = action.data.data
            return Object.assign({}, state, {})
        case 'SET_ACCOUNT_STATUS':
            let indexArr
            state.userList.list.filter((item, index) => {
                if(action.data.userId == item.id){
                    indexArr = index
                }
            })
            state.userList.list[indexArr].status = (state.userList.list[indexArr].status === 0 ? 1 : 0)
            return Object.assign({}, state, {})
        case 'EDIT_ACCOUNT_MSG':
            state.editAccountMsg = action.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}
