import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function getLogList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'log/loglist',
            success:(response)=>{
                dispatch({type: 'GET_LOG_LIST', data: response.data})
            }

        })
    }
}

export function getLogDetails(data, callback) {
    return dispatch => {
        // http({
        //     type:'post',
        //     data,
        //     callback,
        //     url:'log/logdetail  ',
        //     success:(response)=>{
        //         dispatch({type: 'GET_LOG_DETAILS', data: response.data})
        //     }
        //
        // })
        dispatch({type: 'GET_LOG_DETAILS', data: data})
    }
}



