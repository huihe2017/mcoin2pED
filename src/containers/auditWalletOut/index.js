import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal,notification} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {auditWallet} from "../../actions/wallet";
import {filter} from "../../common/util";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
            let data = filter(this.props.wallet.auditList.list,this.props.params.id)
            this.setState({
                toAddress: data.toAddress,
                remark: data.remark,
                postTime: data.postTime,
                fee: data.fee,
                currency: data.currency,
                auditStatus: data.auditStatus,
                auditor: data.auditor,
                applyUserName: data.applyUserName,
                amount: data.amount
            })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.props.auditWallet({
            id:this.props.params.id,
            pass:1
        },()=>{
            this.props.history.go(-1)
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
                <span className={style.title}>钱包转出审核</span>
                <div className={style.contentT}>
                    系统单据：{this.props.params.id}
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
                            {this.state.applyUserName}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            资产转出
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
                </div>
                <div className={style.button}>

                    <Button onClick={this.showModal} type="primary" size={'large'}>通过</Button>

                    <Button onClick={()=>{
                        this.props.auditWallet({
                            id:this.props.params.id,
                            pass:0
                        },()=>{
                            this.props.history.go(-1)
                            notification.open({
                                message: '提示',
                                description: '操作成功',
                            });
                        })
                    }}  size={'large'}>拒绝</Button>
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
                        申请人：
                        <span className={style.contentCC1}>
                            {this.state.auditor}
                        </span>
                    </span>
                    <span className={style.contentC1}>
                        转出金额：
                        <span className={style.contentCC1}>
                            {this.state.amount}
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
        auditWallet: bindActionCreators(auditWallet, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home