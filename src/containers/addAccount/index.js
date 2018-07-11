import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import { Layout, Menu, Breadcrumb, Icon,Button,Table,Dropdown,notification,Steps,Input  } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Step = Steps.Step;


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
                        <Layout style={{ padding: '24px' }}>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                <span className={style.title}>创建账号</span>
                                <div className={style.step}>
                                    <Steps current={0}>
                                        <Step title="账号信息" />
                                        <Step title="权限"  />
                                    </Steps>
                                </div>
                                <div className={style.content}>
                                    <div className={style.inputBox}>
                                        <span className={style.inputBoxT}>
                                            账号
                                        </span>
                                        <Input size="large" placeholder="使用P95公司邮箱" />
                                    </div>
                                    <div className={style.inputBBox}>
                                        <div className={style.inputBox}>
                                        <span className={style.inputBoxT}>
                                            初始密码
                                        </span>
                                            <Input size="large" placeholder="至少6位，数字+字母"/>
                                        </div>
                                        <a className={style.inputBBoxA} href="javascript:void (0)">
                                            随机生成
                                        </a>
                                    </div>
                                    <div className={style.inputBox}>
                                        <span className={style.inputBoxT}>
                                            员工姓名
                                        </span>
                                        <Input size="large" placeholder="" />
                                    </div>
                                    <div className={style.inputBox}>
                                        <span className={style.inputBoxT}>
                                            联系电话
                                        </span>
                                        <Input size="large" placeholder="" />
                                    </div>
                                </div>
                                <div className={style.button}>
                                    <Button type="primary" size={'large'}>下一步</Button>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>


        )
    }
}


export default Home