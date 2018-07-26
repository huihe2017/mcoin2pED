import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button, Modal, Popconfirm, notification} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {auditCreateFund} from '../../../../actions/fund'
import {filter} from "../../../../common/util";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {


    }


    render() {
        // if (!this.props.log.logDetails) {
        //     return null
        // }

        return (
            <div className={style.content}>
                    <span className={style.contentC}>
                        基金名称：
                        <span className={style.contentCC}>
                            {this.props.data.title}
                        </span>
                    </span>
                <span className={style.contentC}>
                        基金经理：
                        <span className={style.contentCC}>
                            {this.props.data.adminName}
                        </span>
                    </span>
                <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            启用基金
                        </span>
                    </span>
                <div className={style.button}>
                    <Popconfirm placement="top" title={'确认通过该步骤？'} onConfirm={this.props.handle.bind(this, true)}
                                okText="Yes" cancelText="No">
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
                    }}
                                okText="Yes" cancelText="No">
                        <Button size={'large'}>拒绝</Button>
                    </Popconfirm>

                </div>
            </div>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        fund: state.fund
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auditCreateFund: bindActionCreators(auditCreateFund, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home