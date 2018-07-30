let initialState = {}

export default function log(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_ACTIVITY_LIST':
            state.activityList = action.data.data
            return Object.assign({}, state, {})
        case 'SET_ACTIVITY_STATUS':
            state.activityList.list.map((item,index)=>{
                if(item.id===(action.data.id-0)){
                    state.activityList.list[index].status=action.data.status
                }
            })
            return Object.assign({}, state, {})
        case 'GET_All_ACTIVITY_LIST':
            state.allActivityList = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}
