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
            <div className={style.wlop}>
                <span className={style.title}>账单记录详情</span>
                <div className={style.contentT}>
                    系统单据：2018060102872087324
                </div>
                {/*<MoneyIn/>*/}
                {/*<MoneyOut/>*/}
                {/*<UserIn/>*/}
                {/*<UserOut/>*/}
                <UserRecharge/>
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
        getLogDetails: bindActionCreators(getLogDetails, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home