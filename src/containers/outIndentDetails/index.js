import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal,Popconfirm,} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {outCoin,getConfirmOutMsg} from "../../actions/wallet";
import {filter} from "../../common/util";
import {notification} from "antd/lib/index";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1: false
        };
    }

    componentDidMount() {
        if (this.props.params.id !== 'null') {
            let data = filter(this.props.wallet.outOrderList.list,this.props.params.id)
            this.setState({
                toAddress: data.toAddress,
                remark: data.remark,
                postTime: data.postTime,
                fee: data.fee,
                type: data.type,
                currency: data.currency,
                auditStatus: data.auditStatus,
                auditor: data.auditor,
                applyUserName: data.applyUserName,
                amount: data.amount

            })
        }

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.props.outCoin({
            id: this.props.params.id
        }, () => {
            this.setState({
                visible: false,
            });
            notification.open({
                message: '提示',
                description: '操作成功',
            });
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
                <span className={style.title}>转出订单详情</span>
                <div className={style.contentT}>
                    系统单据：2018060102872087324
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        日期：
                        <span className={style.contentCC}>
                            {this.state.postTime}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        申请人：
                        <span className={style.contentCC}>
                            {this.state.auditor}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            {this.state.type}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        货币类型：
                        <span className={style.contentCC}>
                            {this.state.currency}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        申请转出金额：
                        <span className={style.contentCC}>
                            {this.state.amount}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        手续费：
                        <span className={style.contentCC}>
                            {this.state.fee}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        操作人：
                        <span className={style.contentCC}>
                            {this.state.auditor}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        备注：
                        <span className={style.contentCC}>
                            {this.state.remark}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        转出地址：
                        <span className={style.contentCC}>
                            {this.state.toAddress}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        审核人：
                        <span className={style.contentCC}>
                            {this.state.auditor}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        审核状态：
                        <span className={style.contentCC}>
                            {this.state.auditStatus}
                        </span>
                    </span>
                </div>
                <div className={style.button}>

                    <Button onClick={()=>{
                        this.props.getConfirmOutMsg({
                            id: this.props.params.id
                        }, () => {
                            this.showModal()

                        })
                    }} type="primary" size={'large'}>确认转出</Button>
                </div>
                <Modal
                    title="转出确认"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText={'放弃'}
                    okText={'确认转出'}
                >
                    <p className={style.contentP}>
                        <span className={style.contentS}>
                            转出
                        </span>
                        ：{this.props.wallet.outCoinConfirmMsg && this.props.wallet.outCoinConfirmMsg.withdrawAmount}
                    </p>
                    <p className={style.contentP}>
                        <span className={style.contentS}>
                            钱包余额
                        </span>
                        ：{this.props.wallet.outCoinConfirmMsg && this.props.wallet.outCoinConfirmMsg.walletBalance}
                    </p>
                    <p className={style.contentP}>
                        <span className={style.contentR}>
                        {this.props.wallet.outCoinConfirmMsg && this.props.wallet.outCoinConfirmMsg.warning}
                        </span>
                        {/*<span className={style.contentR}>*/}
                        {/*余额过低*/}
                        {/*</span>*/}
                        {/*<span className={style.contentR}>*/}
                        {/*余额不足*/}
                        {/*</span>*/}
                    </p>
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
        outCoin: bindActionCreators(outCoin, dispatch),
        getConfirmOutMsg: bindActionCreators(getConfirmOutMsg, dispatch)

}
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home