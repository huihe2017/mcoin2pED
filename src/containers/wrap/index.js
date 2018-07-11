import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import { Layout, Menu, Breadcrumb, Icon,Button,Table,Dropdown,notification  } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const data = [{
    key: '1',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '2',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '3',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '4',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '5',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '6',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '7',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '8',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '9',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}, {
    key: '10',
    account:'name1@p95.com',
    name: 'John Brown',
    role:'基金组',
    telephone: 13488888888,
    state: '状态',
}];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const columns = [{
            title: '账号',
            dataIndex: 'account',
            key: 'account',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '员工姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        }, {
            title: '联系电话',
            dataIndex: 'telephone',
            key: 'telephone',
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Dropdown trigger={['click']} overlay={<Menu>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                            notification.open({
                                message: '提示',
                                description: '编辑成功',
                            });
                        }}>编辑</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                            notification.open({
                                message: '提示',
                                description: '重置密码成功',
                            });
                        }}>重置密码</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                            notification.open({
                                message: '提示',
                                description: '重置PIN码成功',
                            });
                        }}>重置PIN码</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                            notification.open({
                                message: '提示',
                                description: '停用成功',
                            });
                        }}>停用</a>
                    </Menu.Item>

                </Menu>}>
                    <a className="ant-dropdown-link" href="#">
                        管理 <Icon type="down" />
                    </a>
                </Dropdown>
            ),
        }];
        return (
            <div className={style.wlop}>
                <Layout>
                    <div className={style.header}>
                        <Header>
                            <div className={style.logo} />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">账号系统</Menu.Item>
                                <Menu.Item key="2">公告与资讯</Menu.Item>
                                <Menu.Item key="3">基金管理</Menu.Item>
                                <Menu.Item key="4">首页配置</Menu.Item>
                                <Menu.Item key="5">运营活动</Menu.Item>
                                <Menu.Item key="6">钱包管理</Menu.Item>
                                <Menu.Item key="7">审核管理</Menu.Item>
                            </Menu>
                        </Header>
                    </div>

                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="1">
                                    账号管理
                                </Menu.Item>
                                <Menu.Item key="2">
                                    角色管理
                                </Menu.Item>
                                <Menu.Item key="3">
                                    安全设置
                                </Menu.Item>
                                <Menu.Item key="4">
                                    操作日志
                                </Menu.Item>

                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '24px' }}>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>


                            </Content>

                            
                        </Layout>
                    </Layout>
                </Layout>
            </div>


        )
    }
}


export default Home