import React from 'react'
import style from './index.css'
import {hashHistory, Link} from 'react-router'
import {Button, Modal, Input} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getWalletMsg, getInAddress} from "../../actions/wallet";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getWalletMsg({}, () => {

        })


    }


    render() {
        if (!this.props.wallet.walletMsg) {
            return null
        }

        return (
            <div className={style.wlop}>
                <span className={style.title}>钱包信息</span>
                <div className={style.content}>
                    <div className={style.contentOne}>
                        <div className={style.contentOneP}>
                            <div className={style.contentOnePC1}>
                                <span className={style.contentOnePCT}>
                                    比特币
                                </span>
                                <a href="javascript:void (0)" className={style.contentOnePCB} onClick={() =>

                                    this.props.getInAddress({
                                        currency:'BTC'
                                    },()=>{
                                        Modal.info({
                                            iconType: '',
                                            okText: <CopyToClipboard text={this.props.wallet.inCoinAddress}
                                            >
                                                <button className={style.but} >复制地址并关闭
                                                </button>
                                            </CopyToClipboard>,
                                            content: (
                                                <div className={style.inputBox}>
                                                     <span className={style.inputBoxT}>
                                                         BTC转入地址
                                                     </span>
                                                    <Input defaultValue={this.props.wallet.inCoinAddress} disabled={true}
                                                           size="large"/>

                                                </div>
                                            ),
                                            onOk() {
                                                console.log(1)
                                            }
                                        })
                                    })


                                }>
                                    立即转入
                                </a>
                            </div>
                            <div className={style.contentOnePC2}>
                                <span className={style.contentOnePCT}>
                                    钱包余额 {this.props.wallet.walletMsg.list[0].notEnough === 0 ?
                                    <span className={style.contentOnePCTT}>余额不足</span> : ''}
                                </span>
                                <span className={style.contentOnePCB2}>
                                    {this.props.wallet.walletMsg.list[0].balance}
                                </span>
                            </div>
                            <div className={style.contentOnePC3}>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转入</span>
                                    <span className={style.contentOnePCBC} style={{color: '#f49193'}}>
                                        {this.props.wallet.walletMsg.list[0].todayCharge}
                                    </span>
                                </span>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转出</span>
                                    <span className={style.contentOnePCBC} style={{color: '#7fd5ac'}}>
                                        {this.props.wallet.walletMsg.list[0].todayWithdraw}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className={style.contentOneP}>
                            <div className={style.contentOnePC1}>
                                <span className={style.contentOnePCT}>
                                    以太坊
                                </span>
                                <a href="javascript:void (0)" className={style.contentOnePCB} onClick={() =>

                                    this.props.getInAddress({
                                        currency:'ETH'
                                    },()=>{
                                        Modal.info({
                                            iconType: '',
                                            okText: <CopyToClipboard text={this.props.wallet.inCoinAddress}
                                            >
                                                <button className={style.but}>复制地址并关闭
                                                </button>
                                            </CopyToClipboard>,
                                            content: (
                                                <div className={style.inputBox}>
                                                     <span className={style.inputBoxT}>
                                                         ETH转入地址
                                                     </span>
                                                    <Input defaultValue={this.props.wallet.inCoinAddress} disabled={true}
                                                           size="large"/>

                                                </div>
                                            ),
                                            onOk() {
                                                console.log(1)
                                            }
                                        })
                                    })


                                }>
                                    立即转入
                                </a>
                            </div>
                            <div className={style.contentOnePC2}>
                                <span className={style.contentOnePCT}>
                                    钱包余额 {this.props.wallet.walletMsg.list[1].notEnough === 0 ?
                                    <span className={style.contentOnePCTT}>余额不足</span> : ''}
                                </span>
                                <span className={style.contentOnePCB2}>
                                    {this.props.wallet.walletMsg.list[1].balance}
                                </span>
                            </div>
                            <div className={style.contentOnePC3}>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转入</span>
                                    <span className={style.contentOnePCBC} style={{color: '#f49193'}}>
                                        {this.props.wallet.walletMsg.list[1].todayCharge}
                                    </span>
                                </span>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转出</span>
                                    <span className={style.contentOnePCBC} style={{color: '#7fd5ac'}}>
                                        {this.props.wallet.walletMsg.list[1].todayWithdraw}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.contentTwo}>
                        <div className={style.contentTwoT}>
                            <span className={style.contentTwoTT}>
                                账单概括
                            </span>
                            <div className={style.contentTwoTC}>
                                <div className={style.contentTwoTCP}>
                                    <div className={style.contentTwoTCPT}>
                                        BTC
                                    </div>
                                    <div className={style.contentTwoTCPB}>
                                        <div className={style.contentTwoTCPBox}>
                                            <span className={style.contentTwoTCBP1}>
                                                昨日转入
                                            </span>
                                            <span className={style.contentTwoTCBP}>
                                                {this.props.wallet.walletMsg.list[0].yesterdayCharge}
                                            </span>
                                        </div>
                                        <div className={style.contentTwoTCPBox}>
                                            <span className={style.contentTwoTCBP1}>
                                                昨日转入
                                            </span>
                                            <span className={style.contentTwoTCBP}>
                                                {this.props.wallet.walletMsg.list[0].yesterdayWithdraw}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.contentTwoTCP}>
                                    <div className={style.contentTwoTCPT}>
                                        ETH
                                    </div>
                                    <div className={style.contentTwoTCPB}>
                                        <div className={style.contentTwoTCPBox}>
                                            <span className={style.contentTwoTCBP1}>
                                                昨日转入
                                            </span>
                                            <span className={style.contentTwoTCBP}>
                                                {this.props.wallet.walletMsg.list[1].yesterdayCharge}
                                            </span>
                                        </div>
                                        <div className={style.contentTwoTCPBox}>
                                            <span className={style.contentTwoTCBP1}>
                                                昨日转入
                                            </span>
                                            <span className={style.contentTwoTCBP}>
                                                {this.props.wallet.walletMsg.list[1].yesterdayWithdraw}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to={'/billRecord'} className={style.contentTwoB}>
                            → 转到钱包账单
                        </Link>
                    </div>
                    <div className={style.contentThree}>
                        <div className={style.contentThreeBox}>
                            <span className={style.contentThreeBoxT}>
                                今日BTC申请转出
                            </span>
                            <span className={style.contentThreeBoxC}>
                                申请数：{this.props.wallet.walletMsg.list[0].todayApplyCount}
                            </span>
                            <span className={style.contentThreeBoxC}>
                                转出金额：{this.props.wallet.walletMsg.list[0].todayApply}
                            </span>
                        </div>
                        <div className={style.contentThreeBox}>
                            <span className={style.contentThreeBoxT}>
                                今日ETH申请转出
                            </span>
                            <span className={style.contentThreeBoxC}>
                                申请数：{this.props.wallet.walletMsg.list[1].todayApplyCount}
                            </span>
                            <span className={style.contentThreeBoxC}>
                                转出金额：{this.props.wallet.walletMsg.list[1].todayApply}
                            </span>
                        </div>
                    </div>
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
        getWalletMsg: bindActionCreators(getWalletMsg, dispatch),
        getInAddress: bindActionCreators(getInAddress, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home