let initialState = {}

export default function log(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_LOG_LIST':
            state.logList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_LOG_DETAILS':
            let filterDetails =state.logList.list.filter((item)=>{return item.id===(action.data.id-0)})
            state.logDetails = filterDetails[0]
            return Object.assign({}, state, {})
        default:
            return state
    }

}
