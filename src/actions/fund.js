import {http} from '../common/util'

export function getFundList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/fundlist',
            success:(response)=>{
                dispatch({type: 'GET_FUND_LIST', data: response.data})
            }

        })
    }
}
export function setRecommend(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/recommend',
            success:(response)=>{
                dispatch({type: 'SET_RECOMMEND', data:data})
            }

        })
    }
}

export function cancelRecommend(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/cancelrecommend  ',
            success:(response)=>{
                dispatch({type: 'CANCEL_RECOMMEND', data:data})
            }

        })
    }
}

export function applyStop(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/applystop  ',
            success:(response)=>{
                dispatch({type: 'APPLY_STOP', data:data})
            }

        })
    }
}

export function applyUse(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/applyuse  ',
            success:(response)=>{
                dispatch({type: 'APPLY_USE', data:data})
            }

        })
    }
}

export function removeFund(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/remove',
            success:(response)=>{
                dispatch({type: 'REMOVE_FUND', data:data})
            }

        })
    }
}
export function createFund(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/createfund',
            success:(response)=>{
            }

        })
    }
}

export function getIncomeCfgData(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/profit',
            success:(response)=>{
                dispatch({type: 'GET_INCOME_CFG_DATA', data:response.data})
            }
        })
    }
}

export function setProfit(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/setprofit',
            success:(response)=>{
                //dispatch({type: 'SET_PROFIT', data:data})
            }
        })
    }
}

export function getProfitList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/profitstatlist',
            success:(response)=>{
                dispatch({type: 'GET_PROFIT_LIST', data:response.data})
            }
        })
    }
}

export function setFundEditData(data, callback) {
    return dispatch => {
        dispatch({type: 'SET_FUND_EDIT_DATA', data:data})
    }
}

export function exportProfit(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/exportprofit',
            success:(response)=>{
                //dispatch({type: 'GET_PROFIT_LIST', data:response.data})
            }
        })
    }
}