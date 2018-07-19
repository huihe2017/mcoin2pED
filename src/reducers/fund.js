let initialState = {}

export default function fund(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_FUND_LIST':
            state.fundList = action.data.data
            return Object.assign({}, state, {})
        case 'SET_RECOMMEND':
            debugger
            state.fundList.list.map((item,index)=>{
                if(item.id===action.data.id){
                    state.fundList.list[index].recommend = state.fundList.list[index].recommend?0:1
                    state.fundList.list[index].showOrder =action.data.showOrder
                }
            })
            return Object.assign({}, state, {})
        case 'CANCEL_RECOMMEND':
            state.fundList.list.map((item,index)=>{
                if(item.id===action.data.id){
                    state.fundList.list[index].recommend = state.fundList.list[index].recommend?0:1
                }
            })
            return Object.assign({}, state, {})
        case 'APPLY_STOP':
            state.fundList.list.map((item,index)=>{
                if(item.id===action.data.id){
                    state.fundList.list[index].status = '2'
                }
            })
            return Object.assign({}, state, {})
        case 'APPLY_USE':
            state.fundList.list.map((item,index)=>{
                if(item.id===action.data.id){
                    state.fundList.list[index].status = '0'
                }
            })
            return Object.assign({}, state, {})
        case 'REMOVE_FUND':
            state.fundList.list.map((item,index)=>{
                if(item.id===action.data.id){
                    state.fundList.list[index].status = '5'
                }
            })
            return Object.assign({}, state, {})
        case 'GET_INCOME_CFG_DATA':
            state.income = action.data.data
            return Object.assign({}, state, {})
        case 'SET_FUND_EDIT_DATA':
            state.editFundData =  Object.assign({}, state.editFundData, action.data)
            return Object.assign({}, state, {})
        case 'GET_PROFIT_LIST':
            state.income.statList =  action.data.data.statList
            return Object.assign({}, state, {})
        default:
            return state
    }

}
