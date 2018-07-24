import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {addAccount, editAccountMsg} from '../../actions/account'
import {getRoleList} from '../../actions/role'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input, Select, Form} from 'antd';

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (value) => {
        this.setState({roles: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {


                let params = {
                    password: this.state.password,
                    account: this.state.account,
                    name: this.state.name,
                    mobile: this.state.mobile,
                    roles: this.state.roles,
                }

                this.props.addAccount(params, () => {
                    this.props.history.go(-1)
                })
            }
        });
    }

    componentDidMount() {
        if (this.props.params.id) {
            let filterData = this.props.account.userList.list.filter((item) => {
                return item.id === this.props.params.id
            })

            this.setState(...filterData)
            //this.props.editAccountMsg(filterData)
        }

        this.props.getRoleList({
            status: 2
        })
    }

    render() {
        if (!this.props.role.roleList) {
            return null
        }
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wlop}>
                <span className={style.title}>充值管理</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     用户手机号码账号
                                 </span>
                                {getFieldDecorator('account', {
                                    rules: [{required: true, message: '请填写用户的手机号码!'}],
                                    initialValue: this.state.account
                                })(
                                    <Input
                                        disabled={this.state.account?true:false}
                                        onChange={(e) => {
                                            this.setState({account: e.target.value})
                                        }} size="large" placeholder="请填写用户的手机号码"/>)}
                            </FormItem>
                        </div>

                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                货币类型
                            </span>
                                {getFieldDecorator('selectRole', {
                                    rules: [
                                        {required: true, message: '请选择货币类型!'},
                                    ],
                                })(<Select
                                    size={'large'}
                                    placeholder="请选择"


                                    onChange={this.handleChange}
                                    style={{width: '100%'}}
                                >
                                    <Option key={'btc'}>BTC</Option>
                                    <Option key={'etc'}>ETC</Option>
                                    <Option key={'utc'}>UTC</Option>
                                </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    付款金额（元）
                                </span>
                                {getFieldDecorator('payMoney', {
                                    rules: [{required: true, message: '请填写付款金额!'}],
                                    initialValue: this.state.name
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({payMoney: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBBox}>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        买入单价（元）
                                    </span>
                                    {getFieldDecorator('buyMoney', {
                                        rules: [{required: true, message: '请填入买入单价!'}],
                                        initialValue: this.state.password
                                    })(
                                        <Input
                                            onChange={(e) => {
                                                this.setState({buyMoney: e.target.value},()=>{
                                                    this.setState({
                                                        inMoney:this.state.payMoney/this.state.buyMoney
                                                    })
                                                })
                                            }} size="large" placeholder=""/>)}
                                </FormItem>
                            </div>
                            <a className={style.inputBBoxA} href="javascript:void (0)">
                                查询最新单价
                            </a>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    转入金额
                                </span>
                                {getFieldDecorator('inMoney', {
                                    rules: [{required: true, message: '请填写转入金额!'}],
                                    initialValue: this.state.inMoney
                                })(
                                    <Input disabled={true} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    备注
                                </span>
                                {getFieldDecorator('remark', {
                                    initialValue: this.state.mobile
                                })(
                                    <Input
                                        value={this.state.mobile || ''}
                                        onChange={(e) => {
                                            this.setState({mobile: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>

                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>充值</Button>
                        </FormItem>
                        <Button onClick={() => {
                            this.props.history.go(-1)
                        }} size={'large'}>取消</Button>
                    </div>

                </Form>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        role: state.role,
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAccount: bindActionCreators(addAccount, dispatch),
        editAccountMsg: bindActionCreators(editAccountMsg, dispatch),
        getRoleList: bindActionCreators(getRoleList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);


export default WrappedHome