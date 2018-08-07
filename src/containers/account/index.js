import React from 'react'
import style from './index.css'
import {hashHistory, Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList, resetPwd, resetPin, setAccountStatus} from '../../actions/account'
import {toChartData} from '../../common/util'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


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
        if (!this.props.account.userList) {
            return null
        }
        const columns = [
            {
                title: '账号',
                dataIndex: 'account'
            }, {
                title: '员工姓名',
                dataIndex: 'name'
            }, {
                title: '角色',
                dataIndex: 'roles',
                render: (arr) => {
                    return (()=>{
                        let nums =[]
                        arr.map((obj)=>{
                            nums.push(obj.name)
                        })
                        return nums.join(',')
                    })()
                }
            }, {
                title: '联系电话',
                dataIndex: 'mobile'
            }, {
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    return text === 1 ? '正常' : '停用'
                }
            }, {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <Link to={'/addAccount/' + record.id}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    this.props.resetPwd({
                                        userId: record.id
                                    }, () => {
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    })

                                }}>重置密码</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {

                                    this.props.resetPin({
                                        userId: record.id
                                    }, () => {
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    })


                                }}>重置PIN码</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    this.props.setAccountStatus({
                                        userId: record.id,
                                        status: record.status===1?0:1
                                    }, () => {
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    })
                                }}>{record.status === 0 ? '启用' : '停用'}</a>
                            </Menu.Item>
                        </Menu>}>
                            <a className="ant-dropdown-link" href="#">
                                管理 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    )
                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>账号管理</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addAccount/null')}>创建账号</Button>
                <div className={style.table}>
                    <Table pagination={{total:this.props.account.userList.pager.total,pageSize:this.props.account.userList.pager.pageSize}} columns={columns} onChange={(pagination) => {
                        this.props.getUserList({
                            page: pagination.current
                        })
                    }} dataSource={this.props.account.userList.list}/>
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