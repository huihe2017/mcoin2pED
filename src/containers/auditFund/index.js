import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data=[
    {
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
        coinType:'BTC',
        data:7,
        purchase:'1.000000',
        operator:'张三',
        type:'创建',
    },{
        time:'2018-01-01',
        name:'活动1介绍图',
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
                title: '基金名称',
                dataIndex: 'name'
            },{
                title: '货币类型',
                dataIndex: 'coinType'

            },{
                title: '封闭期（天）',
                dataIndex: 'data'

            },{
                title: '起购价',
                dataIndex: 'purchase'

            },{
                title: '操作人',
                dataIndex: 'operator'

            },{
                title: '类型',
                dataIndex: 'type',
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
                <span className={style.title}>基金审核</span>
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