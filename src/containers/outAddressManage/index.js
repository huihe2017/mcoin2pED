import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
import { Table, Select,Button,Dropdown,Icon,Menu} from 'antd';
import {notification} from "antd/lib/index";

const Option = Select.Option;

const data=[
    {
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },{
        coinType:'BTC',
        address:'9asdga9sd9asfdvaosdf9asfd9asfda9sfd9',
        remark:'张三',
        type:'创建',
    },
]


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //
    }


    render() {
        // if (!this.props.account.userList) {
        //     return null
        // }
        const columns = [
            {
                title: '转出地址',
                dataIndex: 'address'
            },{
                title: '备注',
                dataIndex: 'remark'
            },{
                title: '货币类型',
                dataIndex: 'coinType'

            },{
                title: '操作',
                render: (text, record) => {
                   return (
                       <Dropdown trigger={['click']} overlay={<Menu>
                           <Menu.Item>
                               <Link to={'/addHome'}>编辑</Link>
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
                               }}>转出</a>
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
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addFund')}>创建地址</Button>
                <div className={style.contentT}>
                    筛选账单列表
                </div>
                <div className={style.content}>
                    <span className={style.inputBoxT}>
                        货币类型
                    </span>
                    <div className={style.inputBox}>
                        <Select placeholder="请选择" defaultValue="all">
                            <Option value="all">全部</Option>
                            <Option value="btc">BTC</Option>
                        </Select>
                    </div>
                </div>
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