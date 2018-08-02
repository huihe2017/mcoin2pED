import plupload from 'plupload';
import config from '../../config/index';
import {http} from '../../common/util'


let accessid = ''
let accesskey = ''
let host = ''
let policyBase64 = ''
let signature = ''
let callbackbody = ''
let filename = ''
let key = ''
let expire = 0
let g_object_name = ''
let g_object_name_type = 'random_name'
let timestamp = Date.parse(new Date()) / 1000;
let now = timestamp
let type;
function send_request() {

    // http({
    //     type: 'post',
    //     data: {type: 1},
    //     url: 'oss/getpolicy',
    //     success: (response) => {
    //         //dispatch({type: 'CREATE_NOTIC', data: response.data})
    //     }
    //
    // })

    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        // let xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp != null) {

        let serverUrl = config.api_url + 'oss/getpolicy'
        xmlhttp.open("post", serverUrl, false);
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        if(type==='img'){
            xmlhttp.send("type=0");
        }
        if(type==='file'){
            xmlhttp.send("type=2");
        }
        return xmlhttp.responseText
    }
    else {
        alert("Your browser does not support XMLHTTP.");
    }
};

function check_object_radio() {
    var tt = document.getElementsByName('myradio');
    for (var i = 0; i < tt.length; i++) {
        if (tt[i].checked) {
            g_object_name_type = tt[i].value;
            break;
        }
    }
}

function get_signature() {
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3) {
        let body = send_request()

        var obj = eval("(" + body + ")");
        obj = obj.data.policy

        // obj = {
        //     "accessId": "LTAIUrx9XW3oidfK",
        //     "signature": "T57sg5vpheL3Z4IOwfjRJuoYIEc=",
        //     "expire": "1532596444",
        //     "host": "https://img.coin2p.com/",
        //     "dir": "info/2018072615/",
        //     "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wNy0yNlQwOToxNDowNC4zNjdaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJpbmZvLzIwMTgwNzI2MTUvIl1dfQ=="
        // }


        host = obj['host']
        policyBase64 = obj['policy']
        accessid = obj['accessId']
        signature = obj['signature']
        expire = parseInt(obj['expire'])
        callbackbody = obj['callback']
        key = obj['dir']
        return true;
    }
    return false;
};

function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename) {
    if (g_object_name_type == 'local_name') {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name') {
        let suffix = get_suffix(filename)
        g_object_name = key + random_string(10) + suffix
    }
    return ''
}

function get_uploaded_object_name(filename) {
    if (g_object_name_type == 'local_name') {
        let tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if (g_object_name_type == 'random_name') {
        return g_object_name
    }
}

function set_upload_param(up, filename, ret) {
    if (ret == false) {
        ret = get_signature()
    }
    g_object_name = key;
    if (filename != '') {
        let suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    let new_multipart_params = {
        'key': g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'callback': callbackbody,
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}


function renderOk(typeParam, callback) {
    type = typeParam
    let mime_types
    if (type === 'img') {
        mime_types = [
            {title: "Image files", extensions: "jpg,gif,png,bmp"}
        ]
    }
    if (type === 'file') {
        mime_types = [
            {title: "excel files", extensions: "xls,xlsx,doc,docx"}
        ]
    }
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'selectfiles',
        //multi_selection: false,
        container: document.getElementById('container'),
        flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
        url: 'http://oss.aliyuncs.com',

        filters: {
            mime_types: mime_types,
            max_file_size: '10mb', //最大只能上传10mb的文件
            prevent_duplicates: true //不允许选取重复文件
        },

        init: {
            PostInit: function () {
                document.getElementById('ossfile').innerHTML = '';
                document.getElementById('postfiles').onclick = function () {
                    set_upload_param(uploader, '', false);
                    return false;
                };
            },

            FilesAdded: function (up, files) {
                plupload.each(files, function (file) {
                    document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                        + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                        + '</div>';
                });
            },

            BeforeUpload: function (up, file) {
                check_object_radio();
                set_upload_param(up, file.name, true);
            },

            UploadProgress: function (up, file) {
                var d = document.getElementById(file.id);
                d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                var prog = d.getElementsByTagName('div')[0];
                var progBar = prog.getElementsByTagName('div')[0]
                progBar.style.width = 2 * file.percent + 'px';
                progBar.setAttribute('aria-valuenow', file.percent);
            },

            FileUploaded: function (up, file, info) {

                callback(get_uploaded_object_name(file.name))
                if (info.status == 200) {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
                }
                else {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                }
            },

            Error: function (up, err) {
                if (err.code == -600) {
                    document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
                }
                else if (err.code == -601) {
                    document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
                }
                else if (err.code == -602) {
                    document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
                }
                else {
                    document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                }
            }
        }
    });
    uploader.init();
}

export default renderOk