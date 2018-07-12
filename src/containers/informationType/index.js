import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data=[
        {
            type:'区块链',
        },{
            type:'比特币',
        },{
            type:'以太坊',
        },{
            type:'区块链',
        },{
            type:'比特币',
        },{
            type:'以太坊',
        },{
            type:'区块链',
        },
    ]
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.props.getUserList({
        //     page: 1
        // })
    }

    render() {

        const columns = [
             {
                title: '类型名称',
                dataIndex: 'type'
            },  {
                title: '操作',
                render: (text, record) => {
                   return (
                       <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                           notification.open({
                               message: '提示',
                               description: '操作成功',
                           });
                       }}>编辑</a>
                    )
                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>资讯类型</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addAccount')}>创建类型</Button>
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