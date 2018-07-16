import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification,Modal,Input,DatePicker} from 'antd';
import {Form} from "antd/lib/index";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const FormItem = Form.Item;

const data=[
        {
            title:'基金名称aaa',
            close:'3',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'99',
            state:'启用',
        },{
            title:'基金名称aba',
            close:'7',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'11',
            state:'停用',
        },{
            title:'基金名称bba',
            close:'130',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'9',
            state:'停用',
        },{
            title:'基金名称abb',
            close:'31',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'29',
            state:'启用',
        },
    ]
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }


    componentDidMount() {
        // this.props.getUserList({
        //     page: 1
        // })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    visible: false,
                });
            }else {
                console.log(1);

            }
        });


    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }



    render() {

        const columns = [
            {
                title: '基金名称',
                dataIndex: 'title'
            },{
                title: '封闭期',
                dataIndex: 'close',
                render: (record) => {
                    return (record+'天')
                }
            },{
                title: '货币类型',
                dataIndex: 'coin'
            },{
                title: '昨日年化',
                dataIndex: 'year'
            },{
                title: '状态',
                dataIndex: 'state'
            },{
                title: '是否推荐',
                dataIndex: 'recommend',
                render: (record) => {
                    return (record?'是':'否')
                }
            },{
                title: '优先级',
                dataIndex: 'priority'
            },{
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

                                }>收益配置</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={()=>this.showModal()}>设置推荐
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={()=>{
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    }

                                }>取消推荐</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={()=>{
                                        notification.open({
                                            message: '提示',
                                            description: '操作成功',
                                        });
                                    }

                                }>暂停</a>
                            </Menu.Item>
                        </Menu>}>
                            <a className="ant-dropdown-link" href="#">
                                管理 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    )
                },
            }];
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.wlop}>
                <span className={style.title}>基金管理</span>
                <Button type="primary" size='large' onClick={() => hashHistory.push('/addAccount')}>创建基金</Button>
                <div className={style.table}>
                    <Table columns={columns} dataSource={data}/>
                </div>
                <Modal
                    title="设置推荐参数"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Form onSubmit={this.handleOk.bind(this)} className="login-form">
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    结束日期
                                </span>
                                {getFieldDecorator('data', {
                                    rules: [{ type: 'object', required: true, message: '请选择结束日期!' }],
                                })(<DatePicker />)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    优先级
                                </span>
                                {getFieldDecorator('priority', {
                                    rules: [{ required: true, message: '请填写优先级!' }],
                                })(<Input size="large" placeholder="请填写优先级"/>)}
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
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
const WrappedHome = Form.create()(Home);
export default WrappedHome