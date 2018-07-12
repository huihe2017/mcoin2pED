import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {getUserMsg} from '../../actions/user'
import {setMenu} from '../../actions/menu'

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUserMsg({}, () => {
        })
    }

    render() {

        if (!this.props.user.userMsg) {
            return null
        }

        return (
            <div className={style.wlop}>
                <Layout>
                    <div className={style.header}>
                        <Header>
                            <div className={style.logo}/>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{lineHeight: '64px'}}
                                onClick={(a,b)=>{
                                    console.log(this.props);
                                    this.props.setMenu({
                                        list:this.props.user.userMsg.permissionList,
                                        id:a.key
                                    })
                                    console.log(a.key);
                                }}
                            >

                                {this.props.menu.level1.map((obj, index) => {
                                    return <Menu.Item onChange={()=>{alert(11)}} key={obj.id}>{obj.name}</Menu.Item>
                                })}
                            </Menu>
                        </Header>
                    </div>

                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%', borderRight: 0}}
                            >

                                {this.props.menu.level2.map((obj, index) => {
                                    return <Menu.Item key={index}>
                                        <Link to={obj.url} >{obj.name}</Link>
                                    </Menu.Item>
                                })}


                            </Menu>
                        </Sider>
                        <Layout style={{padding: '24px'}}>
                            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>

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
        user: state.user,
        menu: state.menu

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserMsg: bindActionCreators(getUserMsg, dispatch),
        setMenu: bindActionCreators(setMenu, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


export default Home;
