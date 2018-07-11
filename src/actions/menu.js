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


