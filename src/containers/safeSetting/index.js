import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Layout, Menu, Breadcrumb, Icon,Button,Table,Dropdown,notification  } from 'antd';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <div className={style.wlop}>
                <span className={style.title}>安全设置</span>
                <div className={style.setBox}>
                    <span className={style.setBoxT}>
                        PIN码设置 <span className={style.setBoxTT}> 未设置</span>
                    </span>
                    <span className={style.setBoxC}>
                        访问后台某些重要业务模块时需要用到的验证模式，请您尽快设置。
                    </span>
                    <a href="javascript:void (0)"  className={style.setBoxA} onClick={()=>hashHistory.push('/pinAmend')}>
                        前往设置 <i className={style.iconfont}> &#xe639;</i>

                    </a>
                </div>
                <div className={style.setBox}>
                    <span className={style.setBoxT}>
                        修改密码
                    </span>
                    <span className={style.setBoxC}>
                        修改您的后台密码，如果忘记密码，请联系管理员。
                    </span>
                    <a href="javascript:void (0)"  className={style.setBoxA} onClick={()=>hashHistory.push('/passwordAmend')}>
                        前往修改 <i className={style.iconfont}> &#xe639;</i>

                    </a>
                </div>
            </div>


        )
    }
}


export default Home