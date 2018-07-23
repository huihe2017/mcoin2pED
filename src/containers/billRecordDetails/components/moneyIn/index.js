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
                            2018-6-1 16:00:00
                        </span>
                    </span>
                    <span className={style.contentC}>
                        区块链交易号：
                        <span className={style.contentCC}>
                            16416356346160323416
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            资产转入
                        </span>
                    </span>
                    <span className={style.contentC}>
                        货币类型：
                        <span className={style.contentCC}>
                            BTC
                        </span>
                    </span>
                    <span className={style.contentC}>
                        转入金额：
                        <span className={style.contentCC}>
                            +100.0000000
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
        // getLogDetails: bindActionCreators(getLogDetails, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home