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
        case 'GET_OUT_BILL_LIST':
            state.outCoinBillList = action.data.data
            return Object.assign({}, state, {})
        case 'GET_CONFIRM_OUT_MSG':
            state.outCoinConfirmMsg = action.data.data
            return Object.assign({}, state, {})
        case 'GET_BILL_DETAILS':
            state.billDetails = action.data.data
            return Object.assign({}, state, {})
        case 'GET_WALLET_SET_DATA':
            state.walletSetData = action.data.data
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
        default:
            return state
    }

}
