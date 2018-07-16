import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'

export function getUserList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/userlist',
            success:(response)=>{
                dispatch({type: 'GET_USER_LIST', data: response.data})
            }

        })
    }
}

export function resetPwd(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/resetpassword',
            success:(response)=>{
            }

        })
    }
}
export function resetPin(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/resetpin',
            success:(response)=>{
            }

        })
    }
}

export function setAccountStatus(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/userstatus',
            success:(response)=>{
                debugger
                dispatch({type: 'SET_ACCOUNT_STATUS', data: data})
            }

        })
    }
}

export function addAccount(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/create',
            success:(response)=>{

            }

        })
    }
}

export function editAccountMsg(data, callback) {
    return dispatch => {
        dispatch({type: 'EDIT_ACCOUNT_MSG', data: data})

    }
}