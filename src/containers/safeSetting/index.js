import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';
import {connect} from 'react-redux'
import {getUserList, resetPin, resetPwd, setAccountStatus} from "../../actions/account";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={style.wlop}>
                <span className={style.title}>安全设置</span>
                <div className={style.setBox}>
                    <span className={style.setBoxT}>
                        PIN码设置 <span
                        className={style.setBoxTT}>{this.props.user.userMsg.userInfo.pinCode ? '' : '未设置'} </span>
                    </span>
                    <span className={style.setBoxC}>
                        访问后台某些重要业务模块时需要用到的验证模式，请您尽快设置。
                    </span>
                    <a href="javascript:void (0)" className={style.setBoxA}
                       onClick={() => {
                           if(this.props.user.userMsg.userInfo.pinCode){
                               hashHistory.push('/pinAmend')

                           }else {
                               hashHistory.push('/pinSetting')
                           }

                       }}>
                        {this.props.user.userMsg.userInfo.pinCode ? '修改PIN码' : '前往设置'} <i
                        className={style.iconfont}> &#xe639;</i>

                    </a>
                </div>
                <div className={style.setBox}>
                    <span className={style.setBoxT}>
                        修改密码
                    </span>
                    <span className={style.setBoxC}>
                        修改您的后台密码，如果忘记密码，请联系管理员。
                    </span>
                    <a href="javascript:void (0)" className={style.setBoxA}
                       onClick={() => hashHistory.push('/passwordAmend')}>
                        前往修改 <i className={style.iconfont}> &#xe639;</i>

                    </a>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home