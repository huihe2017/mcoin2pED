import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'


export function setMenu(data, callback) {
    return dispatch => {

        dispatch({type: 'SET_MENU', data:data})
    }
}

