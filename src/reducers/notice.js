let initialState = {}

export default function log(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_NOTICE_LIST':
            state.noticeList = action.data.data
            return Object.assign({}, state, {})
        case 'SET_NOTICE_STATUS':
            state.noticeList.list.map((item,index)=>{
                if(item.id===(action.data.id-0)){
                    state.noticeList.list[index].status=action.data.status
                }
            })
            return Object.assign({}, state, {})
        default:
            return state
    }

}
