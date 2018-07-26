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
                return item.id === (this.props.params.id-0)
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

        let children = this.props.role.roleList.list.map((obj) => {
            return <Option key={obj.id}>{obj.name}</Option>
        })

        return (
            <div className={style.wlop}>
                <span className={style.title}>{this.props.params.id !=='null'? '修改账号' : '创建账号'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     账号
                                 </span>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: '请填写你的邮箱!'}],
                                    initialValue: this.state.account
                                })(
                                    <Input
                                        disabled={this.props.params.id !=='null'?true:false}
                                        onChange={(e) => {
                                            this.setState({account: e.target.value})
                                        }} size="large" placeholder="使用P95公司邮箱"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBBox} hidden={this.props.params.id !=='null'}>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        初始密码
                                    </span>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '密码不得为空!'}],
                                        initialValue: this.state.password
                                    })(
                                        <Input
                                            type="password"
                                            onChange={(e) => {
                                                this.setState({password: e.target.value})
                                            }} size="large" placeholder="至少6位，数字+字母"/>)}
                                </FormItem>
                            </div>
                            <a className={style.inputBBoxA} href="javascript:void (0)">
                                随机生成
                            </a>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    员工姓名
                                </span>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请填写你的姓名!'}],
                                    initialValue: this.state.name
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({name: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    联系电话
                                </span>
                                {getFieldDecorator('phone', {
                                    rules: [{required: true, message: '请填写你的电话!'}],
                                    initialValue: this.state.mobile
                                })(
                                    <Input
                                        value={this.state.mobile || ''}
                                        onChange={(e) => {
                                            this.setState({mobile: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                角色
                            </span>
                                {getFieldDecorator('selectRole', {
                                    initialValue: (() => {
                                        let arr = [];
                                        this.state.roles && this.state.roles.map((obj) => {
                                            arr.push(obj.id)
                                        })
                                        return arr
                                    })(),
                                    rules: [
                                        {required: true, message: '请选择你的角色!'},
                                    ],
                                })(<Select
                                    mode="tags"
                                    size={'large'}
                                    placeholder="请选择"


                                    onChange={this.handleChange}
                                    style={{width: '100%'}}
                                >
                                    {children}
                                </Select>)}
                            </FormItem>
                        </div>
                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>提交</Button>
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