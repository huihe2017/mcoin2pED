import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data=[
        {
            title:'公告标题限定二十个字',
            priority:'99',
            state:'启用',
        },{
            title:'二十个字二十个字二十个字二十个字二十个字',
            priority:'11',
            state:'停用',
        },{
            title:'公告标题限定二十个字',
            priority:'9',
            state:'停用',
        },{
            title:'公告标题限定二十个字',
            priority:'29',
            state:'启用',
        },{
            title:'公告标题限定二十个字',
            priority:'99',
            state:'启用',
        },{
            title:'二十个字二十个字二十个字二十个字二十个字',
            priority:'11',
            state:'停用',
        },{
            title:'公告标题限定二十个字',
            priority:'9',
            state:'停用',
        },{
            title:'公告标题限定二十个字',
            priority:'29',
            state:'启用',
        },{
            title:'公告标题限定二十个字',
            priority:'9',
            state:'停用',
        },{
            title:'公告标题限定二十个字',
            priority:'29',
            state:'启用',
        },
    ]
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.props.getUserList({
        //     page: 1
        // })
    }

    render() {

        const columns = [
            {
                title: '资讯标题',
                dataIndex: 'title'
            }, {
                title: '资讯类型',
                dataIndex: 'priority'
            }, {
                title: '状态',
                dataIndex: 'state'
            }, {
                title: '操作',
                render: (text, record) => {
                   return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    notification.open({
                                        message: '提示',
                                        description: '操作成功',
                                    });
                                }}>编辑</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={()=>{
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    }

                                }>停用</a>
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
                <span className={style.title}>资讯</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addAccount')}>创建资讯</Button>
                <div className={style.table}>
                    <Table columns={columns} dataSource={data}/>
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