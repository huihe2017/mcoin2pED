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
        status:1,
        priority:10,
    },{
        time:'2018-02-01',
        name:'活动2介绍图',
        status:0,
        priority:12,
    },{
        time:'2018-01-05',
        name:'活动5介绍图',
        status:1,
        priority:40,
    },{
        time:'2018-12-01',
        name:'活动6介绍图',
        status:0,
        priority:12,
    },{
        time:'2018-11-05',
        name:'活动1介绍图',
        status:1,
        priority:40,
    },{
        time:'2018-05-01',
        name:'活动6介绍图',
        status:0,
        priority:12,
    },{
        time:'2018-07-05',
        name:'活动0介绍图',
        status:1,
        priority:40,
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
                title: '上传时间',
                dataIndex: 'time'
            },{
                title: 'banner名称',
                dataIndex: 'name'
            },{
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    return text === 1 ? '启用' : '禁用'
                }
            },{
                title: '优先级',
                dataIndex: 'priority'

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
                                }}>{record.status===0?'启用':'停用'}</a>
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
                <span className={style.title}>首页配置</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addHome')}>添加banner</Button>
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