import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'
import {setMenu} from './menu'

export function getBannerList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'config/bannerlist',
            success:(response)=>{
                dispatch({type: 'GET_BANNER_LIST', data: response.data})
            }

        })
    }
}

export function createBanner(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'config/banner',
            success:(response)=>{
                //dispatch({type: 'CREATE', data: response.data})
            }

        })
    }
}

export function setBannerStatus(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'config/updatebannerstatus',
            success:(response)=>{
                dispatch({type: 'SET_BANNER_STATUS', data: data})
            }

        })
    }
}


