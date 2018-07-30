import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getInList} from '../../actions/wallet'
import { Table, Select,Button,Dropdown,Icon,Menu} from 'antd';
import {notification} from "antd/lib/index";

const Option = Select.Option;

const data=[
    {
        data:'2018-01-01',
        account:'13400000000',
        money:'10000.00',
        coinType:'BTC',
        inMoney:'2.7894919',
        operator:'张三',
        state:'待审核',
    },{
        data:'2018-02-01',
        account:'13400000000',
        money:'10000.00',
        coinType:'BTC',
        inMoney:'2.7894919',
        operator:'张三',
        state:'审核不通过',
    },{
        data:'2018-04-05',
        account:'13400000000',
        money:'10000.00',
        coinType:'BTC',
        inMoney:'2.7894919',
        operator:'张三',
        state:'待审核',
    },{
        data:'2018-02-01',
        account:'13400000000',
        money:'10000.00',
        coinType:'BTC',
        inMoney:'2.7894919',
        operator:'张三',
        state:'审核不通过',
    },{
        data:'2018-04-05',
        account:'13400000000',
        money:'10000.00',
        coinType:'BTC',
        inMoney:'2.7894919',
        operator:'张三',
        state:'充值成功',
    },{
        data:'2018-02-01',
        account:'13400000000',
        money:'10000.00',
        coinType:'BTC',
        inMoney:'2.7894919',
        operator:'张三',
        state:'审核不通过',
    },{
        data:'2018-04-05',
        account:'13400000000',
        money:'10000.00',
        coinType:'BTC',
        inMoney:'2.7894919',
        operator:'张三',
        state:'充值成功',
    },
]


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getInList({
            page:1,
            currency:'btc'

        })
    }


    render() {
        if (!this.props.wallet.walletInList) {
            return null
        }
        const columns = [
            {
                title: '日期',
                dataIndex: 'createTime'
            },{
                title: '用户账号',
                dataIndex: 'mobile'
            },{
                title: '付款金额（元）',
                price: 'money'
            },{
                title: '货币类型',
                dataIndex: 'currency'

            },{
                title: '转入金额',
                dataIndex: 'realMoney'
            },{
                title: '操作人',
                dataIndex: 'operator'
            },{
                title: '状态',
                dataIndex: 'status'
            },{
                title: '操作',
                render: (text, record) => {
                   return (
                           <Link to={'/rechargeRecordDetails/'+record.id}>
                               查看
                           </Link>
                    )
                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>充值管理</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/userRecharge')}>用户充值</Button>
                <div className={style.contentT}>
                    筛选充值记录
                </div>
                <div className={style.content}>
                    <span className={style.inputBoxT}>
                        货币类型
                    </span>
                    <div className={style.inputBox}>
                        <Select onChange={(e)=>{
                            this.props.getInList({
                                page:1,
                                currency:e

                            })
                            this.setState({currency:e})
                        }} value={'btc'} placeholder="请选择" defaultValue="all">
                            <Option value="btc">BTC</Option>
                            <Option value="eth">ETH</Option>
                        </Select>
                    </div>
                </div>
                <div className={style.table}>
                    <Table onChange={(pagination) => {
                        this.props.getInList({
                            page:pagination.current,
                            currency:this.state.currency

                        })
                    }} columns={columns} dataSource={this.props.wallet.walletInList.list}/>
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
        getInList: bindActionCreators(getInList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home