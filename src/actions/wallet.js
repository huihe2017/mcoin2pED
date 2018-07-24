import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function getWalletMsg(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/info',
            success:(response)=>{
                dispatch({type: 'GET_WALLET_MSG', data: response.data})
            }

        })
    }
}

export function getBillList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/info',
            success:(response)=>{
                dispatch({type: 'GET_BILL_LIST', data: response.data})
            }

        })
    }
}


export function getOutOrderList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/withdrawlist  ',
            success:(response)=>{
                dispatch({type: 'GET_OUT_ORDER_LIST', data: response.data})
            }

        })
    }
}

export function getInBillList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/userchargelist',
            success:(response)=>{
                dispatch({type: 'GET_IN_BILL_LIST', data: response.data})
            }

        })
    }
}
export function getInAddress(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/chargeaddress    ',
            success:(response)=>{
                dispatch({type: 'GET_IN_ADDRESS', data: response.data})
            }

        })
    }
}

export function getOutAddressList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/addresslist',
            success:(response)=>{
                dispatch({type: 'GET_OUT_ADDRESS_LIST', data: response.data})
            }

        })
    }
}

export function createOutAddress(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/address',
            success:(response)=>{
                dispatch({type: 'CREATE_OUT_ADDRESS', data: response.data})
            }

        })
    }
}

export function getConfirmOutMsg(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/prewithdraw',
            success:(response)=>{
                dispatch({type: 'GET_CONFIRM_OUT_MSG', data: response.data})
            }

        })
    }
}

export function outCoin(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/withdraw',
            success:(response)=>{
                dispatch({type: 'OUT_COIN', data: response.data})
            }

        })
    }
}
export function InCoin(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/usercharge',
            success:(response)=>{
                dispatch({type: 'IN_COIN', data: response.data})
            }

        })
    }
}

export function getBillDetails(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/balancedetail',
            success:(response)=>{
                dispatch({type: 'GET_BILL_DETAILS', data: response.data})
            }

        })
    }
}

export function getWalletSetData(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/getsetting',
            success:(response)=>{
                dispatch({type: 'GET_WALLET_SET_DATA', data: response.data})
            }

        })
    }
}

export function setWallet(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/setting',
            success:(response)=>{
                dispatch({type: 'SET_WALLET', data: response.data})
            }

        })
    }
}

export function returnFund(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/refund',
            success:(response)=>{
                dispatch({type: 'RETURN_FUND', data: response.data})
            }

        })
    }
}

export function adminOutCoin(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/withdrawapply',
            success:(response)=>{
                dispatch({type: 'ADMIN_OUT_COIN', data: response.data})
            }

        })
    }
}

export function getOutDetails(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/withdrawapply',
            success:(response)=>{
                dispatch({type: 'GET_OUT_DETAILS', data: response.data})
            }

        })
    }
}

export function getInDetails(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/userchargedetail',
            success:(response)=>{
                dispatch({type: 'GET_IN_DETAILS', data: response.data})
            }

        })
    }
}

export function getInList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/withdrawapply',
            success:(response)=>{
                dispatch({type: 'GET_OUT_DETAILS', data: response.data})
            }

        })
    }
}

export function getPlaBalance(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/balance',
            success:(response)=>{
                dispatch({type: 'GET_PLA_BALANCE', data: response.data})
            }

        })
    }
}

export function getWalletBillList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/balancelist',
            success:(response)=>{
                dispatch({type: 'GET_WALLET_BILL_LIST', data: response.data})
            }

        })
    }
}