import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Layout, Menu, Breadcrumb, Icon,Button,Table,Dropdown,notification  } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const data = [{
    key: '1',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '2',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '3',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '4',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '5',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '6',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '7',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '8',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '9',
    role:'基金组',
    power: '包含15个权限',
}, {
    key: '10',
    role:'基金组',
    power: '包含15个权限',
}];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const columns = [
             {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },{
            title: '权限',
            dataIndex: 'power',
            key: 'power',
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
                <span className={style.title}>角色管理</span>
                <Button type="primary" size='large' onClick={()=>hashHistory.push('/addRole')}>创建角色</Button>
                <div className={style.table}>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>


        )
    }
}


export default Home