import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getRechargeAuditList} from '../../actions/wallet'
import { Table, Select} from 'antd';



const Option = Select.Option;

const data=[
    {
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        payment:10000,
        account:13400000000,
        operator:'张三',
        state:'待审核'
    },
]


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
       this.props.getRechargeAuditList({
           page:1
       })
    }


    render() {
        if (!this.props.wallet.auditRechargeList) {
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
                dataIndex: 'realMoney'

            },{
                title: '转出类型',
                dataIndex: 'remark'

            },{
                title: '操作人',
                dataIndex: 'adminName'

            },{
                title: '状态',
                dataIndex: 'status'

            },{
                title: '操作',
                render: (text, record) => {
                   return (

                       <Link to={'/auditRechargeDetail/'+record.id} className="ant-dropdown-link" href="#">
                           查看
                       </Link>

                    )
                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>充值审核</span>
                <div className={style.contentT}>
                    筛选充值记录
                </div>
                <div className={style.content}>
                    <span className={style.inputBoxT}>
                        货币类型
                    </span>
                    <div className={style.inputBox}>
                        <Select onChange={(e)=>{
                            this.props.getRechargeAuditList({
                                page:1,
                                currency:e
                            })
                        }} placeholder="请选择" defaultValue="all">
                            <Option value="btc">BTC</Option>
                            <Option value="eth">ETH</Option>
                        </Select>
                    </div>
                </div>
                <div className={style.table}>
                    <Table columns={columns} dataSource={this.props.wallet.auditRechargeList.list}/>
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
        getRechargeAuditList: bindActionCreators(getRechargeAuditList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home