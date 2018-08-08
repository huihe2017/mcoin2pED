import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button, Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MoneyIn from "./components/moneyIn";
import MoneyOut from "./components/moneyOut";
import UserIn from "./components/userIn";
import UserOut from "./components/userOut";
import {getFundDetails} from "../../actions/fund";
import {Steps} from "antd/lib/index";
import {filter} from "../../common/util";

const Step = Steps.Step;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    componentDidMount() {
        this.props.getFundDetails({
            id:this.props.params.id
        })

    }

    handle = (flag) => {
        this.setState({current: ++this.state.current}, () => {
            if (this.state.current > 3) {
                hashHistory.push('/fund')
            }
        })

    }
    renderTab = () => {
        // let data = filter(this.props.fund.auditList.list, this.props.params.id)
        let data = this.props.fund.editFundData
        if (this.state.current === 0) {
            return <MoneyIn data={data} handle={this.handle.bind(this)}/>
        }
        if (this.state.current === 1) {
            return <MoneyOut data={data} handle={(flag) => {
                this.handle(flag)
            }
            }/>
        }
        if (this.state.current === 2) {
            return <UserIn data={data} handle={(flag) => {
                this.handle(flag)
            }
            }/>
        }
        if (this.state.current === 3) {
            return <UserOut data={data} handle={(flag) => {
                this.handle(flag)
            }
            }/>
        }
    }
    renderFoot = () => {

        if (this.state.current === 0) {
            return <div className={style.button}>
                <Button type="primary" size={'large'}>下一步</Button>
            </div>
        }
        else if (this.state.current === 3) {
            <div className={style.button}>
                <Button type="primary" size={'large'}>上一步</Button>
                <Button type="primary" size={'large'}>下一步</Button>
            </div>
        } else {
            <div className={style.button}>
                <Button type="primary" size={'large'}>上一步</Button>
                <Button type="primary" size={'large'}>提交</Button>
            </div>
        }
    }

    render() {
        if (!this.props.fund.editFundData) {
            return null
        }

        return (
            <div className={style.wlop}>
                <div className={style.contentT}>
                    系统单据：{this.props.params.id}
                </div>
                <div className={style.stepBox}>
                    <Steps current={this.state.current}>
                        <Step title="基础信息"/>
                        <Step title="基金参数"/>
                        <Step title="手续费"/>
                        <Step title="运营活动"/>
                    </Steps>
                </div>

                <div>
                    {this.renderTab()}
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
        getFundDetails: bindActionCreators(getFundDetails, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home