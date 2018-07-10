import React from 'react';
import style from './index.css';
import {hashHistory} from 'react-router'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Hheader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render(){
        return(
            <Layout>
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
            </Layout>
        )
    }

}

export default Hheader