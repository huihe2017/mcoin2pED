import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getInfoList, setInfoStatus} from '../../actions/information'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getInfoList({
            page: 1
        })
    }

    render() {
        if (!this.props.info.infoList) {
            return null
        }

        const columns = [
            {
                title: '资讯标题',
                dataIndex: 'title'
            }, {
                title: '资讯类型',
                dataIndex: 'typeName'
            }, {
                title: '状态',
                dataIndex: 'status',
                render: (text, record) => {
                    if (text === '0') {
                        return '下线'
                    }
                    if (text === '1') {
                        return '上线'
                    }
                }
            }, {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <Link to={'/addInformation/'+record.id} onClick={() => {

                                }}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>

                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    this.props.setInfoStatus({
                                        id:record.id,
                                        status:record.status === '1'?'0':'1'
                                    }, () => {
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    })
                                }

                                }>{record.status === '1' ? '停用' : '启用'}</a>
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
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addInformation/null')}>创建资讯</Button>
                <div className={style.table}>
                    <Table columns={columns} dataSource={this.props.info.infoList.list}/>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        info: state.information
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getInfoList: bindActionCreators(getInfoList, dispatch),
        setInfoStatus: bindActionCreators(setInfoStatus, dispatch)

    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home