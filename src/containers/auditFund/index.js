import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAuditFundList} from '../../actions/fund'
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
        this.props.getAuditFundList({

        })
    }


    render() {
        if (!this.props.fund.auditList) {
            return null
        }
        const columns = [
            {
                title: '日期',
                dataIndex: 'modifyTime'
            },{
                title: '基金名称',
                dataIndex: 'name'
            },{
                title: '货币类型',
                dataIndex: 'currency'

            },{
                title: '封闭期（天）',
                dataIndex: 'period'

            },{
                title: '起购价',
                dataIndex: 'limitLowAmount'

            },{
                title: '操作人',
                dataIndex: 'adminName'

            },{
                title: '类型',
                dataIndex: 'status',
            },{
                title: '操作',
                render: (text, record) => {

                    if(record.status==='1'){
                        return (

                            <Link to={'/auditFundDetails/'+record.id} className="ant-dropdown-link" href="#">
                                查看
                            </Link>

                        )
                    }
                    if(record.status==='4'){
                        return (

                            <Link to={'/checkDetails/'+record.id} className="ant-dropdown-link" href="#">
                                查看
                            </Link>

                        )
                    }


                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>基金审核</span>
                <div className={style.table}>
                    <Table columns={columns} dataSource={this.props.fund.auditList.list}/>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        fund: state.fund
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAuditFundList: bindActionCreators(getAuditFundList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home