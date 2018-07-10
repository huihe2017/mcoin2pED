import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={style.wlop}>
                <Layout>
                    <div className={style.header}>
                        <Header1/>
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
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                Content
                            </Content>

                            
                        </Layout>
                    </Layout>
                </Layout>
            </div>


        )
    }
}


export default Home