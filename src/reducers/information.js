let initialState = {}

export default function information(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_INFO_LIST':
            state.infoList = action.data.data
            return Object.assign({}, state, {})
        case 'SET_INFO_STATUS':
            state.infoList.list.map((item,index)=>{
                if(item.id === action.data.id){
                    state.infoList.list[index].status = action.data.status
                }
            })
            return Object.assign({}, state, {})
        case 'CREATE_INFO':
            // state.infoList.list.map((item,index)=>{
            //     if(item.id === action.data.id){
            //         state.infoList.list[index].status?0:1
            //     }
            // })
            return Object.assign({}, state, {})
        case 'GET_INFO_TYPE_LIST':
            state.infoTypeList = action.data.data
            return Object.assign({}, state, {})

        case 'UP_IMG_URL':
            console.log(action.data)
            state.upImgUrl = action.data.data.policy.host+action.data.data.policy.dir
            return Object.assign({}, state, {})

        default:
            return state
    }

}
