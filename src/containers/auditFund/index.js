import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getLogDetails} from "../../actions/log";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                    审核：启动基金名称001
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        基金名称：
                        <span className={style.contentCC}>
                            基金名称001
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
                            启动基金
                        </span>
                    </span>

                </div>
                <div className={style.button}>

                    <Button onClick={() => {alert(1)}} type="primary" size={'large'}>通过</Button>

                    <Button onClick={() => {alert(2)}}  size={'large'}>拒绝</Button>
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
        getLogDetails: bindActionCreators(getLogDetails, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home