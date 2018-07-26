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
                        封闭期：
                        <span className={style.contentCC}>
                            {this.props.data.period}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        起购币额：
                        <span className={style.contentCC}>
                            {this.props.data.limitLowAmount} {this.props.data.currency}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        最小递增单位：
                        <span className={style.contentCC}>
                            {this.props.data.price} {this.props.data.currency}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        最大购买金额：
                        <span className={style.contentCC}>
                            {this.props.data.limitHighAmount} {this.props.data.currency}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        基金有效期：
                        <span className={style.contentCC}>
                            {this.props.data.period}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        限购次数：
                        <span className={style.contentCC}>
                            {this.props.data.limitSoppingTimes}
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
        log: state.log
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auditCreateFund: bindActionCreators(auditCreateFund, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home