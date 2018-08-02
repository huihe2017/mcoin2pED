import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal,Popconfirm} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {notification} from "antd/lib/index";
import {auditCreateFund} from '../../../../actions/fund'


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
            <div className={style.content}>
                    <span className={style.contentC}>
                        销售服务费：
                        <span className={style.contentCC}>
                            {this.props.data.shoppingFeeRate}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        基金托管费：
                        <span className={style.contentCC}>
                            {this.props.data.trusteeFeeRate}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        赎回费率：
                        <span className={style.contentCC}>
                            {this.props.data.redeemFeeRate}
                        </span>
                    </span>
                <div className={style.button}>
                    <Popconfirm placement="top" title={'确认通过该步骤？'} onConfirm={ this.props.handle.bind(this,true)} okText="Yes" cancelText="No">
                        <Button type="primary" size={'large'}>通过</Button>
                    </Popconfirm>
                    <Popconfirm placement="top" title={'确认拒绝该步骤？'} onConfirm={() => {
                        this.props.auditCreateFund({
                            id:this.props.data.id,
                            pass:0
                        },()=>{
                            hashHistory.push('/auditFund')
                            notification.open({
                                message: '提示',
                                description: '操作成功',
                            });
                        })
                    }} okText="Yes" cancelText="No">
                        <Button size={'large'}>拒绝</Button>
                    </Popconfirm>

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
        auditCreateFund: bindActionCreators(auditCreateFund, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home