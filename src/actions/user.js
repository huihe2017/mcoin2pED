import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function getUserMsg(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/privilege',
            success: (response) => {
                let index;
                response.data.data.permissionList.map((obj) => {
                    debugger
                    if(data.path==='/'){

                        data.path = '/account'
                    }
                    if (obj.childPermission) {
                        obj.childPermission.map((h) => {
                            if (h.url === data.path) {
                                index = obj.id
                            }
                        })
                    }
                    // if (obj.level === 0 && flag === false) {
                    //     index = obj.id
                    //     flag = true
                    // }
                })
                dispatch({
                    type: 'SET_MENU', data: {
                        list: response.data.data.permissionList,
                        id: index
                    }
                })
                dispatch({type: 'GET_USER_MSG', data: response.data})
            }

        })
    }
}

export function login(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/login',
            success: (response) => {
                dispatch({type: 'LOGIN', data: response.data})
            }

        })
    }
}

export function setPinCode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/setpincode ',
            success: (response) => {
                dispatch({type: 'SET_PIN_CODE'})
            }

        })
    }
}

export function modifyPinCode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/updatepincode  ',
            success: (response) => {
                //dispatch({type: 'MODIFY_PIN_CODE'})
            }

        })
    }
}

export function modifyPwd(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/updatepassword',
            success: (response) => {
                //dispatch({type: 'MODIFY_PIN_CODE'})
            }

        })
    }
}

export function checkPin(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/checkpin',
            success: (response) => {
                dispatch({type: 'MODIFY_PIN_CODE'})
            }

        })
    }
}

export function getAllUser(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/alluser',
            success: (response) => {
                dispatch({type: 'GET_ALL_USER', data: response.data})
            }

        })
    }
}

export function logout(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/logout',
            success: (response) => {

            }

        })
    }
}

export function checkExistsPincode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'adm/isexists',
            success: (response) => {
                dispatch({type: 'CHECK_EXISTS_PINCODE', data: response.data})
            }

        })
    }
}

