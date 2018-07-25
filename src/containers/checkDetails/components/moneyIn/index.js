import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal,Popconfirm,message} from 'antd';
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