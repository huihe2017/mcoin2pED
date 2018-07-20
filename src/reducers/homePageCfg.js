let initialState = {}

export default function log(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_BANNER_LIST':
            state.bannerList = action.data.data
            return Object.assign({}, state, {})
        case 'SET_BANNER_STATUS':
            state.bannerList.list.map((item,index)=>{
                debugger
                if(item.id===action.data.id){
                    state.bannerList.list[index].status = action.data.status
                }
            })
            return Object.assign({}, state, {})
        default:
            return state
    }

}
