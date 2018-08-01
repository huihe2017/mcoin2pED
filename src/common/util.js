import {Toast} from 'antd-mobile';
import axios from "./axiosConf";
import config from "../config";
import {hashHistory} from "react-router";
import {notification} from 'antd';

export function checkPhone() {
    if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.state.phone)) {
        Toast.fail('请输入正确的手机格式', 3, null, false)
        return false
    }
    if (!this.state.picCode) {
        Toast.fail('请输入验证码', 3, null, false)
        return false
    }
    return true
}

export function changeJson(json, label, value) {
    json.map((obj) => {
        for (var key in obj) {
            if (key === label) {
                obj['label'] = obj[key]
                delete obj[key]
            }
            if (key === value) {
                obj['value'] = obj[key]
                delete obj[key]
            }
        }
    })
    return [json]
}

export function setUrlK(ojson) {
    var s = '', name, key;
    for (var p in ojson) {
        if (ojson[p] !== undefined && ojson[p] !== null) {
            if (ojson.hasOwnProperty(p)) {
                name = p
            }
            ;
            key = ojson[p];
            s += "&" + name + "=" + encodeURIComponent(key);
        }

    }
    ;
    return s.substring(1, s.length);
};


export function http(option) {
    let url
    if (option.url === 'login/userlogin' || option.url === 'reg/findpassword' || option.url === 'reg/reguser' || option.url === 'fund/getmorefund' || option.url === 'fund/getdetail' || option.url === 'fund/index' || option.url === 'profit/getrate' || option.url === 'info/infos' || option.url === 'info/type' || option.url === 'info/infodetail' || option.url === 'info/noticedetail') {
        url = config.noauth_url + option.url
    } else {
        url = config.api_url + option.url
    }
    // let params = new URLSearchParams();
    axios.defaults.headers.common['adminToken'] = sessionStorage.adminToken;
    axios({
        url,
        data: setUrlK(option.data),
        method: option.type
    })
        .then(function (response) {
            if (response.data.code === 0) {


                try {
                    option.success(response)
                    option.callback && option.callback()
                }
                catch (err) {
                    console.log('回调错误', err);
                }

            } else if (response.data.code === 501) {
                hashHistory.push('/login')
            } else if (response.data.code === 1009) {
                hashHistory.push('/PIN')
            } else {
                notification.open({
                    message: '提示',
                    description: response.data.msg,
                });
            }
        })
        .catch(function (error) {
            debugger
            notification.open({
                message: '提示',
                description: '网络错误，请稍后再试',
            });
        });
}

export function toChartData(e) {
    let arr1 = [];
    let dataArr = new Array(e.length);
    for (var key in e[1]) {
        if (e[1].hasOwnProperty(key))
            arr1.push(key);
    }
    console.log(arr1);
    let obj1 = new Object();
    for (let i = 0; i < dataArr.length; i++) {
        dataArr[i] = new Array();
        e.map(function (val, ind) {
            let obj = new Object();
            dataArr[i].push(val[arr1[i]])
        })
    }
    arr1.map(function (v, i) {
        obj1[arr1[i]] = dataArr[i]
    })
    return obj1
}

export function filter(list, id) {
    let data
    list.filter((item, index) => {
        if (id - 0 === item.id - 0) {
            data = item
        }
    })
    debugger
    return data
}