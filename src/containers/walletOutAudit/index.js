import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Button,Modal} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getLogDetails} from "../../actions/log";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        // this.props.getLogDetails({id: this.props.params.id}, () => {
        //
        // })

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        alert(1)
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    }

    render() {
        // if (!this.props.log.logDetails) {
        //     return null
        // }

        return (
            <div className={style.wlop}>
                <span className={style.title}>钱包转出审核</span>
                <div className={style.contentT}>
                    系统单据：2018060102872087324
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        日期：
                        <span className={style.contentCC}>
                            2018-6-1 16:00:00
                        </span>
                    </span>
                    <span className={style.contentC}>
                        申请人：
                        <span className={style.contentCC}>
                            张三
                        </span>
                    </span>
                    <span className={style.contentC}>
                        类型：
                        <span className={style.contentCC}>
                            资产转出
                        </span>
                    </span>
                    <span className={style.contentC}>
                        货币类型：
                        <span className={style.contentCC}>
                            BTC
                        </span>
                    </span>
                    <span className={style.contentC}>
                        申请转出金额：
                        <span className={style.contentCC}>
                            -100.00000
                        </span>
                    </span>
                    <span className={style.contentC}>
                        手续费：
                        <span className={style.contentCC}>
                            0
                        </span>
                    </span>
                    <span className={style.contentC}>
                        备注：
                        <span className={style.contentCC}>
                            转出xxx
                        </span>
                    </span>
                    <span className={style.contentC}>
                        转出地址：
                        <span className={style.contentCC}>
                            asdbasjdbkasjdbkjbasd123b123i1v23uljgyc4i1;
                        </span>
                    </span>
                </div>
                <div className={style.button}>

                    <Button onClick={this.showModal} type="primary" size={'large'}>通过</Button>

                    <Button onClick={() => {alert(2)}}  size={'large'}>拒绝</Button>
                </div>
                <Modal
                    title="确认通过"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText={'再考虑一下'}
                    okText={'通过'}
                >
                     <span className={style.contentC1}>
                        申请人：
                        <span className={style.contentCC1}>
                            张三
                        </span>
                    </span>
                    <span className={style.contentC1}>
                        转出金额：
                        <span className={style.contentCC1}>
                            -100.00000
                        </span>
                    </span>
                    <span className={style.contentC1}>
                        是否通过审核
                    </span>
                </Modal>
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