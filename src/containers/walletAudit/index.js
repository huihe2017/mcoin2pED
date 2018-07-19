import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
import { Table, Select} from 'antd';



const Option = Select.Option;

const data=[
    {
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        money:1.235,
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
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
                dataIndex: 'time'
            },{
                title: '转出金额',
                dataIndex: 'money'
            },{
                title: '货币类型',
                dataIndex: 'coinType'

            },{
                title: '转出类型',
                dataIndex: 'data'

            },{
                title: '钱包余额',
                dataIndex: 'purchase'

            },{
                title: '操作人',
                dataIndex: 'operator'

            },{
                title: '操作',
                render: (text, record) => {
                   return (

                       <a className="ant-dropdown-link" href="#">
                           查看
                       </a>

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