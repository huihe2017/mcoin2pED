import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal,Input} from 'antd';
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
                <span className={style.title}>钱包信息</span>
                <div className={style.content}>
                    <div className={style.contentOne}>
                        <div className={style.contentOneP}>
                            <div className={style.contentOnePC1}>
                                <span className={style.contentOnePCT}>
                                    比特币
                                </span>
                                <a href="javascript:void (0)" className={style.contentOnePCB}                               onClick={ ()=>
                                    Modal.info({
                                        iconType:'',
                                        okText:'复制地址并关闭',
                                        content: (
                                            <div className={style.inputBox}>
                                                     <span className={style.inputBoxT}>
                                                         BTC转入地址
                                                     </span>
                                                <Input defaultValue={'1qw6e1qw3e156qwe516qw5e166'} disabled={ true } size="large" />

                                            </div>
                                        ),
                                        onOk() {
                                            console.log(1)
                                        }
                                    })
                                }>
                                    立即转入
                                </a>
                            </div>
                            <div className={style.contentOnePC2}>
                                <span className={style.contentOnePCT}>
                                    钱包余额    <span className={style.contentOnePCTT}>余额不足</span>
                                </span>
                                <span className={style.contentOnePCB2}>
                                    100.12345678
                                </span>
                            </div>
                            <div className={style.contentOnePC3}>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转入</span>
                                    <span className={style.contentOnePCBC} style={{color:'#f49193'}}>
                                        +0.12345678
                                    </span>
                                </span>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转出</span>
                                    <span className={style.contentOnePCBC} style={{color:'#7fd5ac'}}>
                                        -100.12345678
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className={style.contentOneP}>
                            <div className={style.contentOnePC1}>
                                <span className={style.contentOnePCT}>
                                    比特币
                                </span>
                                <a href="javascript:void (0)"
                                   onClick={ ()=>
                                        Modal.info({
                                            iconType:'',
                                            okText:'复制地址并关闭',
                                            content: (
                                                <div className={style.inputBox}>
                                                     <span className={style.inputBoxT}>
                                                         BTC转入地址
                                                     </span>
                                                    <Input defaultValue={'1qw6e1qw3e156qwe516qw5e166'} disabled={ true } size="large" />

                                                </div>
                                            ),
                                            onOk() {
                                                console.log(1)
                                            }
                                        })
                                    }
                                className={style.contentOnePCB}>
                                    立即转入
                                </a>
                            </div>
                            <div className={style.contentOnePC2}>
                                <span className={style.contentOnePCT}>
                                    钱包余额    <span className={style.contentOnePCTT}>余额不足</span>
                                </span>
                                <span className={style.contentOnePCB2}>
                                    100.12345678
                                </span>
                            </div>
                            <div className={style.contentOnePC3}>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转入</span>
                                    <span className={style.contentOnePCBC} style={{color:'#f49193'}}>
                                        +0.12345678
                                    </span>
                                </span>
                                <span className={style.contentOnePCB1}>
                                    <span className={style.contentOnePCBCT}>今日转出</span>
                                    <span className={style.contentOnePCBC} style={{color:'#7fd5ac'}}>
                                        -100.12345678
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
                                                23.56846
                                            </span>
                                        </div>
                                        <div className={style.contentTwoTCPBox}>
                                            <span className={style.contentTwoTCBP1}>
                                                昨日转入
                                            </span>
                                            <span className={style.contentTwoTCBP}>
                                                23.56846
                                            </span>
                                        </div>
                                    </div>
                                </div>
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
                                                23.56846
                                            </span>
                                        </div>
                                        <div className={style.contentTwoTCPBox}>
                                            <span className={style.contentTwoTCBP1}>
                                                昨日转入
                                            </span>
                                            <span className={style.contentTwoTCBP}>
                                                23.56846
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:void (0)" className={style.contentTwoB}>
                            → 转到钱包账单
                        </a>
                    </div>
                    <div className={style.contentThree}>
                        <div className={style.contentThreeBox}>
                            <span className={style.contentThreeBoxT}>
                                今日ETH申请转出
                            </span>
                            <span className={style.contentThreeBoxC}>
                                申请数：30
                            </span>
                            <span className={style.contentThreeBoxC}>
                                转出金额：100.12345678
                            </span>
                        </div>
                        <div className={style.contentThreeBox}>
                            <span className={style.contentThreeBoxT}>
                                今日ETH申请转出
                            </span>
                            <span className={style.contentThreeBoxC}>
                                申请数：30
                            </span>
                            <span className={style.contentThreeBoxC}>
                                转出金额：100.12345678
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