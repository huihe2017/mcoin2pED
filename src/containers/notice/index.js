import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getNoticeList,setNoticeStatus} from '../../actions/notice'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data = [
    {
        title: '公告标题限定二十个字',
        priority: '99',
        state: '启用',
    }, {
        title: '二十个字二十个字二十个字二十个字二十个字',
        priority: '11',
        state: '停用',
    }, {
        title: '公告标题限定二十个字',
        priority: '9',
        state: '停用',
    }, {
        title: '公告标题限定二十个字',
        priority: '29',
        state: '启用',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getNoticeList({
            page: 1
        })
    }

    render() {
        if (!this.props.notice.noticeList) {
            return null
        }
        const columns = [
            {
                title: '公告标题',
                dataIndex: 'title'
            }, {
                title: '优先级',
                dataIndex: 'showOrder'
            }, {
                title: '状态',
                dataIndex: 'status',
                render: (text, record) => {
                    if (text === '1') {
                        return '展示'
                    }
                    if (text === '0') {
                        return '停用'
                    }
                }
            }, {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <Link to={'/addNotice/'+record.id} onClick={() => {

                                }}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                {
                                    record.status === '1' ?
                                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)"
                                           onClick={() => {
                                               this.props.setNoticeStatus({
                                                   id:record.id,
                                                   status:'0'
                                               },()=>{
                                                   notification.open({
                                                       message: '提示',
                                                       description: '操作成功',
                                                   });
                                               })

                                           }

                                           }>停用</a> :
                                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)"
                                           onClick={() => {
                                               this.props.setNoticeStatus({
                                                   id:record.id,
                                                   status:'1'
                                               },()=>{
                                                   notification.open({
                                                       message: '提示',
                                                       description: '操作成功',
                                                   });
                                               })
                                           }

                                           }>展示</a>
                                }

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
                <span className={style.title}>公告</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addNotice/null')}>创建公告</Button>
                <div className={style.table}>
                    <Table columns={columns} dataSource={this.props.notice.noticeList.list}/>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        notice: state.notice
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNoticeList: bindActionCreators(getNoticeList, dispatch),
        setNoticeStatus: bindActionCreators(setNoticeStatus, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home