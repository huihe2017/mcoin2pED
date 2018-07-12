import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function getUserMsg(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/privilege',
            success:(response)=>{
                let index;
                let flag = false
                let name
                response.data.data.permissionList.map((obj) => {
                    if (obj.level === 0 && flag === false) {
                        index = obj.id
                        flag = true
                    }
                })
                dispatch({type: 'SET_MENU', data: {
                        list: response.data.data.permissionList,
                        id: index
                    }})
                dispatch({type: 'GET_USER_MSG', data: response.data})
            }

        })
    }
}

export function login(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/login',
            success:(response)=>{
                dispatch({type: 'LOGIN', data: response.data})
            }

        })
    }
}


