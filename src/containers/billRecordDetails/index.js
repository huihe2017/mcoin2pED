import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getLogDetails} from "../../actions/log";
import MoneyIn from "./components/moneyIn";
import MoneyOut from "./components/moneyOut";
import UserIn from "./components/userIn";
import UserOut from "./components/userOut";
import UserRecharge from "./components/userRecharge";
import {filter} from "../../common/util";
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
    renderType= ()=>{
        let data = filter(this.props.wallet.walletBillList.list,this.props.params.id)
        let type = data.type-0
        if(type===0){
            return <UserIn data={data} />
        }
        if(type===1){
            return <UserRecharge data={data} />
        }
        if(type===2){
            return <UserOut data={data} />
        }
        if(type===3){
            return <MoneyIn data={data} />
        }
        if(type===4){
            return <MoneyOut data={data} />
        }
    }
    render() {
        // if (!this.props.log.logDetails) {
        //     return null
        // }

        return (
            <div className={style.wlop}>
                <span className={style.title}>账单记录详情</span>
                <div className={style.contentT}>
                    系统单据：{this.props.params.id}
                </div>
                {
                    this.renderType()
                }
                {/*<MoneyIn/>*/}
                {/*<MoneyOut/>*/}
                {/*<UserIn/>*/}
                {/*<UserOut/>*/}
                {/*<UserRecharge/>*/}
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