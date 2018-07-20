import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getRoleList,setRoleStatus} from "../../actions/role";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data = [{
    key: '1',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '2',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '3',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '4',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '5',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '6',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '7',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '8',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '9',
    role: '基金组',
    power: '包含15个权限',
}, {
    key: '10',
    role: '基金组',
    power: '包含15个权限',
}];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getRoleList({
            status:2
        })
    }

    render() {
        if(!this.props.role.roleList){
            return null
        }
        const columns = [
            {
                title: '角色',
                dataIndex: 'name'
            }, {
                title: '权限',
                dataIndex: 'permissionCount',
                render:(text)=>{
                    return '包含'+text+'个权限'
                }
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Dropdown trigger={['click']} overlay={<Menu>
                        <Menu.Item>
                            <Link to={'/addRole/'+record.id} onClick={() => {

                            }}>编辑</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                this.props.setRoleStatus({
                                    roleId:record.id,
                                    status:record.status
                                },()=>{
                                    notification.open({
                                        message: '提示',
                                        description: '操作成功',
                                    });
                                })

                            }}>{record.status===0?'停用':'启用'}</a>
                        </Menu.Item>

                    </Menu>}>
                        <a className="ant-dropdown-link" href="#">
                            管理 <Icon type="down"/>
                        </a>
                    </Dropdown>
                ),
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>角色管理</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addRole')}><Link to={'/addRole/null'} >创建角色</Link></Button>
                <div className={style.table}>
                    <Table columns={columns} pagination={false} dataSource={this.props.role.roleList.list}/>
                </div>
            </div>


        )
    }
}


function mapStateToProps(state, props) {
    return {
        role: state.role
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRoleList: bindActionCreators(getRoleList, dispatch),
        setRoleStatus: bindActionCreators(setRoleStatus, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home