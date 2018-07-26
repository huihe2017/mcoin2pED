import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {filter} from "../../common/util";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        if (this.props.params.id !== 'null') {

            let data = filter(this.props.wallet.walletInList.list,this.props.params.id)
            this.setState({
                mobile: data.mobile,
                currency: data.currency,
                realMoney: data.realMoney,
                price: data.price,
                remark: data.remark,
                createTime: data.createTime,
                chargeTime: data.chargeTime,
                adminName: data.adminName,
                auditorName: data.auditorName,
                status: data.status
            })
        }

    }

    render() {
        // if (!this.props.log.logDetails) {
        //     return null
        // }

        return (
            <div className={style.wlop}>
                <span className={style.title}>充值记录详情</span>
                <div className={style.contentT}>
                    系统单据：{this.props.params.id}
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        日期：
                        <span className={style.contentCC}>
                            {this.state.createTime}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        用户账号：
                        <span className={style.contentCC}>
                            {this.state.mobile}
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
                            {this.state.currency}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        货币类型：
                        <span className={style.contentCC}>
                            {this.state.currency}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        买入单价（元）：
                        <span className={style.contentCC}>
                            {this.state.price}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        转入金额：
                        <span className={style.contentCC}>
                            {this.state.price}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        操作人：
                        <span className={style.contentCC}>
                            {this.state.adminName}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        备注：
                        <span className={style.contentCC}>
                            {this.state.remark}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        审核人：
                        <span className={style.contentCC}>
                            {this.state.auditorName}
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home