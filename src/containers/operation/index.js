import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getActivityList,setActivityStatus} from '../../actions/activity'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data=[
    {
        time:'90天',
        name:'活动名称1',
        status:1,
        type:'申购、赎回',
    },{
        time:'永久',
        name:'活动名称2',
        status:0,
        type:'申购、赎回、拉近返利',
    },{
        time:'30天',
        name:'活动名称3',
        status:0,
        type:'收益率',
    },{
        time:'10天',
        name:'活动名称4',
        status:1,
        type:'申购、赎回',
    },{
        time:'30天',
        name:'活动名称3',
        status:0,
        type:'收益率',
    },{
        time:'10天',
        name:'活动名称4',
        status:1,
        type:'申购、赎回',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getActivityList({
            status:2,
            page: 1
        })
    }

    render() {
        if (!this.props.activity.activityList) {
            return null
        }
        const columns = [
            {
                title: '活动名称',
                dataIndex: 'name'
            },{
                title: '有效期',
                dataIndex: 'days'
            },{
                title: '活动类型',
                render: (a) => {
                    return a.name
                }

            },{
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    return text === 1 ? '启用' : '暂停'
                }
            },{
                title: '操作',
                render: (text, record) => {
                   return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <Link to={'/addOperation/'+record.id}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    this.props.setActivityStatus({
                                        id:record.id,
                                        status:record.status===0?1:0
                                    },()=>{
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    })
                                }}>{record.status===0?'启用':'暂停'}</a>
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
                <span className={style.title}>运营活动</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addOperation/null')}>创建活动</Button>
                <div className={style.table}>
                    <Table onChange={(pagination) => {
                        this.props.getActivityList({
                            status:2,
                            page: pagination.current
                        })
                    }} columns={columns} dataSource={this.props.activity.activityList.list}/>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        activity: state.activity
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getActivityList: bindActionCreators(getActivityList, dispatch),
        setActivityStatus: bindActionCreators(setActivityStatus, dispatch)
}
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home