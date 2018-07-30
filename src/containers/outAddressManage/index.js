import React from 'react'
import style from './index.css'
import {hashHistory, Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getOutAddressList} from '../../actions/wallet'
import {Table, Select, Button, Dropdown, Icon, Menu} from 'antd';
import {notification} from "antd/lib/index";

const Option = Select.Option;

const data = [
    {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    }, {
        coinType: 'BTC',
        address: '9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark: '张三',
        type: '创建',
    },
]


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getOutAddressList({
            page: 1,
            currecy: 'BTC'
        })
    }


    render() {
        if (!this.props.wallet.outCoinAddressList) {
            return null
        }
        const columns = [
            {
                title: '转出地址',
                dataIndex: 'address'
            }, {
                title: '备注',
                dataIndex: 'remark'
            }, {
                title: '货币类型',
                dataIndex: 'currency'

            }, {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <Link to={'/addOutAddress/'+record.id}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={'/out/'+record.id} >转出</Link>
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
                <span className={style.title}>转出地址管理</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addOutAddress/null')}>创建地址</Button>
                <div className={style.contentT}>
                    筛选账单列表
                </div>
                <div className={style.content}>
                    <span className={style.inputBoxT}>
                        货币类型
                    </span>
                    <div className={style.inputBox}>
                        <Select onChange={(e) => {

                            this.props.getOutAddressList({
                                page: 1,
                                currecy: e
                            })
                             this.setState({currecy: e})
                        }} placeholder="请选择" defaultValue="all">
                            <Option value="all">全部</Option>
                            <Option value="btc">BTC</Option>
                            <Option value="eth">ETH</Option>
                        </Select>
                    </div>
                </div>
                <div className={style.table}>
                    <Table onChange={(pagination) => {
                        this.props.getOutAddressList({
                            page: pagination.current,
                            currecy: this.state.currecy
                        })
                    }} columns={columns} dataSource={this.props.wallet.outCoinAddressList.list}/>
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOutAddressList: bindActionCreators(getOutAddressList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home