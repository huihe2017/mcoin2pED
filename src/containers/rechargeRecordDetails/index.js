import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getLogDetails} from "../../actions/log";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        // this.props.getLogDetails({id: this.props.params.id}, () => {
        //
        // })

    }

    render() {
        // if (!this.props.log.logDetails) {
        //     return null
        // }

        return (
            <div className={style.wlop}>
                <span className={style.title}>充值记录详情</span>
                <div className={style.contentT}>
                    系统单据：2018060102872087324
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        日期：
                        <span className={style.contentCC}>
                            2018-6-1 16:00:00
                        </span>
                    </span>
                    <span className={style.contentC}>
                        用户账号：
                        <span className={style.contentCC}>
                            16416356346160323416
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            用户充值
                        </span>
                    </span>
                    <span className={style.contentC}>
                        充值付款（元）：
                        <span className={style.contentCC}>
                            10000.00
                        </span>
                    </span>
                    <span className={style.contentC}>
                        货币类型：
                        <span className={style.contentCC}>
                            BTC
                        </span>
                    </span>
                    <span className={style.contentC}>
                        买入单价（元）：
                        <span className={style.contentCC}>
                            37134135.12
                        </span>
                    </span>
                    <span className={style.contentC}>
                        转入金额：
                        <span className={style.contentCC}>
                            +2.007654600
                        </span>
                    </span>
                    <span className={style.contentC}>
                        操作人：
                        <span className={style.contentCC}>
                            张三
                        </span>
                    </span>
                    <span className={style.contentC}>
                        备注：
                        <span className={style.contentCC}>
                            转出xxx
                        </span>
                    </span>
                    <span className={style.contentC}>
                        审核人：
                        <span className={style.contentCC}>
                            李四
                        </span>
                    </span>
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