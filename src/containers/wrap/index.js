import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import { Layout, Menu, Breadcrumb, Icon,Button,Table,Dropdown,notification  } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserMsg} from '../../actions/user'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){
        this.props.getUserMsg({

        })
    }

    render() {

        if(!this.props.user.userMsg){
            return null
        }

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

                                {this.props.children}
                            </Content>

                            
                        </Layout>
                    </Layout>
                </Layout>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserMsg:bindActionCreators(getUserMsg,dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


export default Home;
