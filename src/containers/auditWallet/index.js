import React from 'react'
import style from './index.css'
import {hashHistory, Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getWalletAuditList} from '../../actions/wallet'
import {Table, Select} from 'antd';


const Option = Select.Option;

const data = [
    {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    }, {
        time: '2018-01-01',
        money: 1.235,
        coinType: 'BTC',
        data: 7,
        purchase: '1.000000',
        operator: '张三',
        type: '创建',
    },
]


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getWalletAuditList({
            page: 1
        })
    }


    render() {
        if (!this.props.wallet.auditList) {
            return null
        }
        const columns = [
            {
                title: '日期',
                dataIndex: 'postTime'
            }, {
                title: '转出金额',
                dataIndex: 'amount'
            }, {
                title: '货币类型',
                dataIndex: 'currency'

            }, {
                title: '转出类型',
                dataIndex: 'type'

            }, {
                title: '操作人',
                dataIndex: 'auditor'

            }, {
                title: '操作',
                render: (text, record) => {
                    return (

                        <Link to={'/auditWalletOut/' + record.id} className="ant-dropdown-link" href="#">
                            查看
                        </Link>

                    )
                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>钱包审核</span>
                <div className={style.contentT}>
                    筛选重置记录
                </div>
                <div className={style.content}>
                    <span className={style.inputBoxT}>
                        货币类型
                    </span>
                    <div className={style.inputBox}>
                        <Select onChange={(e) => {
                            this.props.getWalletAuditList({
                                page: 1,
                                currency: e
                            })
                            this.setState({currency:e})
                        }} placeholder="请选择" defaultValue="all">
                            <Option value="btc">BTC</Option>
                            <Option value="eth">ETH</Option>
                        </Select>
                    </div>
                </div>
                <div className={style.table}>
                    <Table onChange={(pagination) => {
                        this.props.getWalletAuditList({
                            page:pagination.current,
                            currency:this.state.currency
                        })
                    }} columns={columns} dataSource={this.props.wallet.auditList.list}/>
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
        getWalletAuditList: bindActionCreators(getWalletAuditList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home