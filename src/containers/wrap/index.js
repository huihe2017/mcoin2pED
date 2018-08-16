import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {getUserMsg, logout} from '../../actions/user'
import {setMenu} from '../../actions/menu'

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUserMsg({path: this.props.location.pathname}, () => {
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
                                defaultSelectedKeys={(() => {
                                    let num
                                    this.props.menu.level1.map((obj, index) => {
                                        if (obj.childPermission) {
                                            obj.childPermission.map((obj2, index2) => {
                                                if (this.props.location.pathname === obj2.url) {
                                                    num = obj2.parent
                                                }
                                            })
                                        }

                                    })
                                    if (num === undefined) {

                                        return this.props.menu.level1[0].id + ''
                                    }
                                    return [num + '']
                                })()}
                                style={{lineHeight: '64px'}}
                                onClick={(a, b) => {
                                    // console.log(this.props);
                                    // this.props.setMenu({
                                    //     list: this.props.user.userMsg.permissionList,
                                    //     id: a.key
                                    // })
                                    // console.log(a.key);
                                    this.props.setMenu({
                                        list: this.props.user.userMsg.permissionList,
                                        id: a.key
                                    })
                                    this.props.menu.level1.map((obj, index) => {
                                        if (a.key - 0 === obj.id) {
                                            hashHistory.push(obj.childPermission[0].url)
                                        }

                                        // if(obj.childPermission){
                                        //     obj.childPermission.map((obj2, index2)=>{
                                        //         if (a.key === obj2.url) {
                                        //             num = obj2.parent
                                        //         }
                                        //     })
                                        // }

                                    })


                                }}
                            >

                                {this.props.menu.level1.map((obj, index) => {
                                    return <Menu.Item onChange={() => {

                                    }} key={obj.id}>{obj.name}</Menu.Item>
                                })}
                            </Menu>
                            <div className={style.out} onClick={() => {
                                this.props.logout({}, () => {
                                    sessionStorage.removeItem('adminToken')
                                    hashHistory.push('/login')
                                })

                            }}>
                                退出
                            </div>
                        </Header>
                    </div>

                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={(() => {
                                    let num
                                    this.props.menu.level2.map((obj, index) => {
                                        if (this.props.location.pathname === obj.url) {
                                            num = index
                                        }
                                    })
                                    if (num === undefined) {

                                        return ['0']
                                    }
                                    return [num + '']
                                })()}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%', borderRight: 0}}
                            >

                                {this.props.menu.level2.map((obj, index) => {
                                    return <Menu.Item key={index}>
                                        <Link to={obj.url}>{obj.name}</Link>
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
        logout: bindActionCreators(logout, dispatch),
        setMenu: bindActionCreators(setMenu, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


export default Home;
