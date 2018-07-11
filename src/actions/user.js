import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'

export function getUserMsg(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'adm/privilege',
            success:(response)=>{
                dispatch({type: 'GET_USER_MSG', data: response.data})
            }

        })
    }
}


