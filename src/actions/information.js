import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function getInfoList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'info/list',
            success:(response)=>{
                dispatch({type: 'GET_INFO_LIST', data: response.data})
            }

        })
    }
}

export function setInfoStatus(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'info/updatestatus',
            success:(response)=>{
                dispatch({type: 'SET_INFO_STATUS', data:data})
            }

        })
    }
}

export function createInfoType(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'info/createtype',
            success:(response)=>{
                //dispatch({type: 'CREATE_INFO', data:data})
            }

        })
    }
}
export function createInfo(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'info/create',
            success:(response)=>{
                //dispatch({type: 'CREATE_INFO', data:data})
            }

        })
    }
}
export function getInfoTypeList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'info/typelist',
            success:(response)=>{
                dispatch({type: 'GET_INFO_TYPE_LIST', data:response.data})
            }

        })
    }
}
export function getUpLoadUrl(callback) {
    return dispatch => {
        http({
            type: 'post',
            data: {type: 0},
            callback,
            url: 'oss/getpolicy',
            success: (response) => {
                console.log('地址获取1');
                console.log(response);
                dispatch({type: 'UP_IMG_URL', data: response.data})
            }

        })
    }
}


