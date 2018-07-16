import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function getRoleList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/rolelist',
            success:(response)=>{
                dispatch({type: 'GET_ROLE_LIST', data: response.data})
            }

        })
    }
}

export function setRoleStatus(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/rolestatus',
            success:(response)=>{
                dispatch({type: 'SET_ROLE_STATUS', data: data})
            }

        })
    }
}

export function getPermisseList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/permissionlist',
            success:(response)=>{
                dispatch({type: 'GET_PERMISSELIST_LIST', data: response.data})
            }

        })
    }
}

export function getRoleMsg(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/roledetail',
            success:(response)=>{
                dispatch({type: 'GET_ROLE_MSG', data: response.data})
            }

        })
    }
}


