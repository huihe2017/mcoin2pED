import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getLogDetails} from "../../actions/log";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getLogDetails({id: this.props.params.id}, () => {

        })

    }

    render() {
        if (!this.props.log.logDetails) {
            return null
        }

        return (
            <div className={style.wlop}>
                <span className={style.title}>日志详情</span>
                <div className={style.contentT}>
                    日志编号：{this.props.log.logDetails.id}
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        操作：{this.props.log.logDetails.content}
                    </span>
                    <span className={style.contentC}>
                        操作账号：{this.props.log.logDetails.account}
                    </span>
                    <span className={style.contentC}>
                        姓名：{this.props.log.logDetails.name}
                    </span>
                    <span className={style.contentC}>
                        设备IP：{this.props.log.logDetails.ip}
                    </span>
                    <span className={style.contentC}>
                        IP地区：{this.props.log.logDetails.ipLocation}
                    </span>
                    <span className={style.contentC}>
                        操作时间：{this.props.log.logDetails.time}
                    </span>
                    <span className={style.contentC}>
                        操作类型：{(() => {
                        if (this.props.log.logDetails.type === 1) {
                            return '登录'
                        }
                        if (this.props.log.logDetails.type === 2) {
                            return '新增'
                        }
                        if (this.props.log.logDetails.type === 3) {
                            return '修改'
                        }
                    })()}
                    </span>
                </div>
                <div className={style.button}>

                    <Button onClick={() => {
                        this.props.getLogDetails({id: --this.props.params.id}, () => {

                        })
                    }} type="primary" size={'large'}>下一条</Button>

                    <Button onClick={() => {
                        this.props.history.go(-1)
                    }} size={'large'}>返回</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        log: state.log
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLogDetails: bindActionCreators(getLogDetails, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home