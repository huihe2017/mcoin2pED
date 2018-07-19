import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function createNotic(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'notice/create',
            success:(response)=>{
                //dispatch({type: 'CREATE_NOTIC', data: response.data})
            }

        })
    }
}

export function getNoticeList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'notice/list',
            success:(response)=>{
                dispatch({type: 'GET_NOTICE_LIST', data: response.data})
            }

        })
    }
}

export function setNoticeStatus(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'notice/updatestatus',
            success:(response)=>{
                dispatch({type: 'SET_NOTICE_STATUS', data: data})
            }

        })
    }
}


