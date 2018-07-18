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
        time:'90天',
        name:'活动名称1',
        status:1,
        type:'申购、赎回',
    },{
        time:'永久',
        name:'活动名称2',
        status:0,
        type:'申购、赎回、拉近返利',
    },{
        time:'30天',
        name:'活动名称3',
        status:0,
        type:'收益率',
    },{
        time:'10天',
        name:'活动名称4',
        status:1,
        type:'申购、赎回',
    },{
        time:'30天',
        name:'活动名称3',
        status:0,
        type:'收益率',
    },{
        time:'10天',
        name:'活动名称4',
        status:1,
        type:'申购、赎回',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUserList({
            page: 1
        })
    }

    render() {
        // if (!this.props.account.userList) {
        //     return null
        // }
        const columns = [
            {
                title: '活动名称',
                dataIndex: 'name'
            },{
                title: '有效期',
                dataIndex: 'time'
            },{
                title: '活动类型',
                dataIndex: 'type'

            },{
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    return text === 1 ? '启用中' : '暂停'
                }
            },{
                title: '操作',
                render: (text, record) => {
                   return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <Link to={'/addHome'}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    this.props.setAccountStatus({
                                        userId:record.id,
                                        status:record.status
                                    },()=>{
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    })
                                }}>{record.status===0?'启用':'暂停'}</a>
                            </Menu.Item>
                        </Menu>}>
                            <a className="ant-dropdown-link" href="#">
                                管理 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    )
                },
            }];
        debugger
        return (
            <div className={style.wlop}>
                <span className={style.title}>运营活动</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addOperation')}>创建活动</Button>
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