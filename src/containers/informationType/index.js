import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getInfoTypeList} from '../../actions/information'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const data = [
    {
        type: '区块链',
    }, {
        type: '比特币',
    }, {
        type: '以太坊',
    }, {
        type: '区块链',
    }, {
        type: '比特币',
    }, {
        type: '以太坊',
    }, {
        type: '区块链',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getInfoTypeList()
    }

    render() {
        if (!this.props.info.infoTypeList) {
            return null
        }
        const columns = [
            {
                title: '类型名称',
                dataIndex: 'name'
            }, {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Link to={'/addType/'+record.id} onClick={() => {

                        }}>编辑</Link>
                    )
                },
            }];
        return (
            <div className={style.wlop}>
                <span className={style.title}>资讯类型</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addType/null')}>创建类型</Button>
                <div className={style.table}>
                    <Table  columns={columns} dataSource={this.props.info.infoTypeList.list}/>
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
        getInfoTypeList: bindActionCreators(getInfoTypeList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home