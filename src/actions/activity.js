import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function createActivity(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'activity/create',
            success:(response)=>{
                //dispatch({type: 'CREATE_NOTIC', data: response.data})
            }

        })
    }
}

export function getActivityList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'activity/list',
            success:(response)=>{
                dispatch({type: 'GET_ACTIVITY_LIST', data: response.data})
            }

        })
    }
}

export function setActivityStatus(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'activity/editstatus',
            success:(response)=>{
                dispatch({type: 'SET_ACTIVITY_STATUS', data: data})
            }

        })
    }
}

export function getAllActivityList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'activity/all',
            success:(response)=>{
                dispatch({type: 'GET_All_ACTIVITY_LIST', data: response.data})
            }

        })
    }
}