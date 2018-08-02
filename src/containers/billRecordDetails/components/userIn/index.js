import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


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
                        日期：
                        <span className={style.contentCC}>
                            {this.props.data.postTime}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        区块链交易号：
                        <span className={style.contentCC}>
                            {this.props.data.txid}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            用户转入
                        </span>
                    </span>
                    <span className={style.contentC}>
                        货币类型：
                        <span className={style.contentCC}>
                            {this.props.data.currency}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        转入金额：
                        <span className={style.contentCC}>
                            {this.props.data.amount}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        操作人：
                        <span className={style.contentCC}>
                            {this.props.data.withdrawAdmin}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        备注：
                        <span className={style.contentCC}>
                            {this.props.data.remark}
                        </span>
                    </span>

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
        // getLogDetails: bindActionCreators(getLogDetails, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home