import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBannerList,setBannerStatus} from '../../actions/homePageCfg'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data=[
    {
        time:'2018-01-01',
        name:'活动1介绍图',
        status:1,
        priority:10,
    },{
        time:'2018-02-01',
        name:'活动2介绍图',
        status:0,
        priority:12,
    },{
        time:'2018-01-05',
        name:'活动5介绍图',
        status:1,
        priority:40,
    },{
        time:'2018-12-01',
        name:'活动6介绍图',
        status:0,
        priority:12,
    },{
        time:'2018-11-05',
        name:'活动1介绍图',
        status:1,
        priority:40,
    },{
        time:'2018-05-01',
        name:'活动6介绍图',
        status:0,
        priority:12,
    },{
        time:'2018-07-05',
        name:'活动0介绍图',
        status:1,
        priority:40,
    },
]


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getBannerList({
            page: 1
        })
    }

    render() {
        if (!this.props.homePageCfg.bannerList) {
            return null
        }
        const columns = [
            {
                title: '上传时间',
                dataIndex: 'createTime'
            },{
                title: 'banner名称',
                dataIndex: 'title'
            },{
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    return text === 1 ? '可用' : '停用'
                }
            },{
                title: '优先级',
                dataIndex: 'showOrder'

            },{
                title: '操作',
                render: (text, record) => {
                   return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <Link to={'/addHome/'+record.id}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    debugger
                                    this.props.setBannerStatus({
                                        id:record.id,
                                        status:record.status===1?0:1
                                    },()=>{
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    })
                                }}>{record.status===0?'启用':'停用'}</a>
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
                <span className={style.title}>首页配置</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addHome/null')}>添加banner</Button>
                <div className={style.table}>
                    <Table pagination={false} columns={columns} dataSource={this.props.homePageCfg.bannerList.list}/>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        homePageCfg: state.homePageCfg
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBannerList: bindActionCreators(getBannerList, dispatch),
        setBannerStatus: bindActionCreators(setBannerStatus, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home