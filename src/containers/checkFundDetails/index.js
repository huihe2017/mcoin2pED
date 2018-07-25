import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal,Popconfirm} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


import {Steps} from "antd/lib/index";

const Step = Steps.Step;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
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
                <div className={style.contentT}>
                    审核：启用基金名称0001
                </div>

                <div className={style.content}>
                <span className={style.contentC}>
                    基金名称：
                    <span className={style.contentCC}>
                        基金名称0001
                    </span>
                </span>
                <span className={style.contentC}>
                    基金经理：
                    <span className={style.contentCC}>
                        张三
                    </span>
                </span>
                <span className={style.contentC}>
                    类型：
                    <span className={style.contentCC}>
                        启用基金
                    </span>
                </span>
                    <div className={style.button}>
                        <Popconfirm placement="top" title={'确认通过该步骤？'} onConfirm={ ()=>hashHistory.push('/fund')} okText="Yes" cancelText="No">
                            <Button type="primary" size={'large'}>通过</Button>
                        </Popconfirm>
                        <Popconfirm placement="top" title={'确认拒绝该步骤？'} onConfirm={ ()=>hashHistory.push('/fund')} okText="Yes" cancelText="No">
                            <Button size={'large'}>拒绝</Button>
                        </Popconfirm>

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

    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home