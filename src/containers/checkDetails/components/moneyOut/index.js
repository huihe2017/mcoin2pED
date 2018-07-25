import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal,Popconfirm} from 'antd';
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
                        封闭期：
                        <span className={style.contentCC}>
                            30天
                        </span>
                    </span>
                    <span className={style.contentC}>
                        起购币额：
                        <span className={style.contentCC}>
                            1 BTC
                        </span>
                    </span>
                    <span className={style.contentC}>
                        最小递增单位：
                        <span className={style.contentCC}>
                            0.000001 BTC
                        </span>
                    </span>
                    <span className={style.contentC}>
                        最大购买金额：
                        <span className={style.contentCC}>
                            2 BTC
                        </span>
                    </span>
                    <span className={style.contentC}>
                        基金有效期：
                        <span className={style.contentCC}>
                            0
                        </span>
                    </span>
                    <span className={style.contentC}>
                        限购次数：
                        <span className={style.contentCC}>
                            0
                        </span>
                    </span>
                    <span className={style.contentC}>
                        年化图表：
                        <span className={style.contentCC}>
                            已上传 <a href="javascript:void (0)">查看</a>
                        </span>
                    </span>
                <div className={style.button}>
                    <Popconfirm placement="top" title={'确认通过该步骤？'} onConfirm={ this.props.handle.bind(this,true)} okText="Yes" cancelText="No">
                        <Button type="primary" size={'large'}>通过</Button>
                    </Popconfirm>
                    <Popconfirm placement="top" title={'确认拒绝该步骤？'} onConfirm={ ()=>hashHistory.push('/fund')} okText="Yes" cancelText="No">
                        <Button size={'large'}>拒绝</Button>
                    </Popconfirm>

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
        // getLogDetails: bindActionCreators(getLogDetails, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home