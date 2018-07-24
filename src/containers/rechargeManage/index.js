import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
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
        //
    }


    render() {
        // if (!this.props.account.userList) {
        //     return null
        // }
        const columns = [
            {
                title: '日期',
                dataIndex: 'data'
            },{
                title: '用户账号',
                dataIndex: 'account'
            },{
                title: '付款金额（元）',
                dataIndex: 'money'
            },{
                title: '货币类型',
                dataIndex: 'coinType'

            },{
                title: '转入金额',
                dataIndex: 'inMoney'
            },{
                title: '操作人',
                dataIndex: 'operator'
            },{
                title: '状态',
                dataIndex: 'state'
            },{
                title: '操作',
                render: (text, record) => {
                   return (
                           <Link to={'/outIndentDetails'}>
                               查看
                           </Link>

                    )
                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>充值管理</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addFund')}>用户充值</Button>
                <div className={style.contentT}>
                    筛选充值记录
                </div>
                <div className={style.content}>
                    <span className={style.inputBoxT}>
                        货币类型
                    </span>
                    <div className={style.inputBox}>
                        <Select placeholder="请选择" defaultValue="all">
                            <Option value="all">全部</Option>
                            <Option value="btc">BTC</Option>
                        </Select>
                    </div>
                </div>
                <div className={style.table}>
                    <Table columns={columns} dataSource={data}/>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserList: bindActionCreators(getUserList, dispatch),
        resetPin: bindActionCreators(resetPin, dispatch),
        setAccountStatus: bindActionCreators(setAccountStatus, dispatch),
        resetPwd: bindActionCreators(resetPwd, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home