let initialState = {}

export default function wallet(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_WALLET_MSG':
            state.walletMsg = action.data.data
            return Object.assign({}, state, {})
        case 'GET_IN_ADDRESS':
            state.inCoinAddress = action.data.data.address
            return Object.assign({}, state, {})
        case 'GET_OUT_ADDRESS_LIST':
            state.outCoinAddressList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_IN_BILL_LIST':
            state.inCoinBilList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_OUT_ORDER_LIST':
            state.outOrderList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_CONFIRM_OUT_MSG':
            state.outCoinConfirmMsg = action.data.data
            return Object.assign({}, state, {})
        case 'GET_BILL_DETAILS':
            state.billDetails = action.data.data
            return Object.assign({}, state, {})
        case 'GET_WALLET_SET_DATA':
            state.walletSetData = action.data.data.setting
            return Object.assign({}, state, {})
        case 'GET_IN_DETAILS':
            state.inCoinDetails = action.data.data
            return Object.assign({}, state, {})
        case 'GET_PLA_BALANCE':
            state.plaBalance = action.data.data.balance
            return Object.assign({}, state, {})
        case 'GET_WALLET_BILL_LIST':
            state.walletBillList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_WALLET_IN_LIST':
            state.walletInList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_WALLET_AUDIT_LIST':
            state.auditList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_RECHARGE_AUDIT_LIST':
            state.auditRechargeList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_CURRENCY_PRICE':
            state[action.currency+'Price'] = action.data.data.price
            return Object.assign({}, state, {})
			case 'OUT_COIN':
            state.outOrderList.list.map((item,index)=>{
                if(item.id===action.id){
                    state.outOrderList.list[index].auditStatus = 3
                }
            })
            return Object.assign({}, state, {})
			case 'RETURN_FUND':
            state.outOrderList.list.map((item,index)=>{
                if(item.id===action.id){
                    state.outOrderList.list[index].auditStatus = 6
                }
            })
            return Object.assign({}, state, {})
        default:
            return state
    }

}
