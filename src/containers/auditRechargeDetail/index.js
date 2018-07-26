import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button, Modal, notification} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {auditRecharge} from "../../actions/wallet";
import {filter} from "../../common/util";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        let data = filter(this.props.wallet.auditRechargeList.list, this.props.params.id)
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
            status: data.status,
        })

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.props.auditRecharge({
            id: this.props.params.id,
            pass: 1
        }, () => {
            notification.open({
                message: '提示',
                description: '操作成功',
            });
            this.props.history.go(-1)
        })

    }
    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    }

    render() {
        // if (!this.props.log.logDetails) {
        //     return null
        // }

        return (
            <div className={style.wlop}>
                <span className={style.title}>充值审核</span>
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
                            {this.state.adminName}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            资产转出
                        </span>
                    </span>
                    <span className={style.contentC}>
                        充值付款（元）：
                        <span className={style.contentCC}>
                            {this.state.adminName}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        货币类型：
                        <span className={style.contentCC}>
                            {this.state.currency}
                        </span>
                    </span>

                    <span className={style.contentC}>
                        买入单价：
                        <span className={style.contentCC}>
                            {this.state.price}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        转入币额：
                        <span className={style.contentCC}>
                            {this.state.realMoney}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        操作人：
                        <span className={style.contentCC}>
                            {this.state.auditorName}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        备注：
                        <span className={style.contentCC}>
                            {this.state.remark}
                        </span>
                    </span>
                </div>
                <div className={style.button}>

                    <Button onClick={this.showModal} type="primary" size={'large'}>通过</Button>

                    <Button onClick={() => {
                        this.props.auditRecharge({
                            id: this.props.params.id,
                            pass: 0
                        }, () => {
                            notification.open({
                                message: '提示',
                                description: '操作成功',
                            });
                            this.props.history.go(-1)
                        })
                    }} size={'large'}>拒绝</Button>
                </div>
                <Modal
                    title="确认通过"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText={'再考虑一下'}
                    okText={'通过'}
                >
                     <span className={style.contentC1}>
                        充值付款（元）：
                        <span className={style.contentCC1}>
                            {this.state.price}
                        </span>
                    </span>
                    <span className={style.contentC1}>
                        转出币额：
                        <span className={style.contentCC1}>
                            {this.state.price}
                        </span>
                    </span>
                    <span className={style.contentC1}>
                        是否通过审核
                    </span>
                </Modal>
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
        auditRecharge: bindActionCreators(auditRecharge, dispatch)

    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home