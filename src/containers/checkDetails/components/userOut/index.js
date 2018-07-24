import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button, Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


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
            <div className={style.content}>
                <span className={style.contentC}>
                    运营活动：
                    <span className={style.contentCC}>
                        xxxxxx
                    </span>
                </span>
                <div className={style.button}>
                    <Button type="primary" size={'large'}>通过</Button>
                    <Button size={'large'}>拒绝</Button>
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