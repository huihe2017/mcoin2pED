import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,notification} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {auditReuseFund,auditStopFund} from "../../actions/fund";
import {filter} from "../../common/util";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let data = filter(this.props.fund.auditList.list, this.props.params.id)
        this.setState({
            title: data.title,
            adminName: data.adminName,
            status: data.status
        })
    }

    render() {
        // if (!this.props.log.logDetails) {
        //     return null
        // }

        return (
            <div className={style.wlop}>
                <div className={style.contentT}>
                    审核：启动基金名称001
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        基金名称：
                        <span className={style.contentCC}>
                            {this.state.title}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        基金经理：
                        <span className={style.contentCC}>
                            {this.state.adminName}
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            启动基金
                        </span>
                    </span>

                </div>
                <div className={style.button}>

                    <Button onClick={() => {

                        if(this.state.status==='2'){
                            this.props.auditStopFund({
                                id:this.props.params.id,
                                pass:1
                            },()=>{
                                notification.open({
                                    message: '提示',
                                    description: '操作成功',
                                });
                                this.props.history.go(-1)
                            })
                        }
                        if(this.state.status==='5'){
                            this.props.auditReuseFund({
                                id:this.props.params.id,
                                pass:1
                            },()=>{
                                notification.open({
                                    message: '提示',
                                    description: '操作成功',
                                });
                                this.props.history.go(-1)
                            })
                        }


                    }} type="primary" size={'large'}>通过</Button>

                    <Button onClick={() => {
                        if(this.state.status==='2'){
                            this.props.auditStopFund({
                                id:this.props.params.id,
                                pass:0
                            },()=>{
                                notification.open({
                                    message: '提示',
                                    description: '操作成功',
                                });
                                this.props.history.go(-1)
                            })
                        }
                        if(this.state.status==='5'){
                            this.props.auditReuseFund({
                                id:this.props.params.id,
                                pass:0
                            },()=>{
                                notification.open({
                                    message: '提示',
                                    description: '操作成功',
                                });
                                this.props.history.go(-1)
                            })
                        }
                    }} size={'large'}>拒绝</Button>
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
        auditReuseFund: bindActionCreators(auditReuseFund, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home