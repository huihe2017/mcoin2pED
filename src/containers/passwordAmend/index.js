import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Button, Input} from 'antd';
import {modifyPwd} from "../../actions/user";
import {notification} from "antd/lib/index";

const FormItem = Form.Item;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitLoading:false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    submitLoading:true
                })
                this.props.modifyPwd({
                    password:	this.state.password,
                    oldPassword:this.state.oldPassword,
                    confirmPassword: this.state.confirmPassword,
                },()=>{
                    this.setState({
                        submitLoading:false
                    })
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
            }
        });
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wlop}>
                <span className={style.title}>修改密码</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox1}>
                            <div className={style.inputBox}>
                                <FormItem>
                                <span className={style.inputBoxT}>
                                    输入旧的密码
                                </span>
                                    {getFieldDecorator('oldPassword', {
                                        rules: [{required: true, message: '密码错误!'}],
                                    })(
                                        <Input type="password" onChange={(e)=>{this.setState({oldPassword:e.target.value})}} size="large" placeholder="请输入旧密码"/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.tip}>
                                如果您忘记了密码，请联系管理员。
                            </div>
                        </div>
                        <div className={style.inputBox1}>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        输入新的密码
                                    </span>
                                    {getFieldDecorator('newPassword', {
                                        rules: [{required: true, message: '密码格式错误!'}],
                                    })(
                                        <Input type="password" onChange={(e)=>{this.setState({password:e.target.value})}} size="large" placeholder="长度必须6-8位"/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.tip}>
                                <ul className={style.tipUl}>
                                    <li>
                                        必须包含数字、字母、特殊符号
                                    </li>
                                    <li>
                                        至少一个大写字母
                                    </li>
                                    <li>
                                        长度必须8-20位
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    确认新的密码
                                </span>
                                {getFieldDecorator('reNewPassword', {
                                    rules: [{required: true, message: '两次密码不一致!'}],
                                })(
                                    <Input type="password" onChange={(e)=>{this.setState({confirmPassword:e.target.value})}} size="large" placeholder="请再次确认新密码"/>
                                )}
                            </FormItem>
                        </div>

                    </div>
                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size={'large'} loading={this.state.submitLoading}>修改</Button>
                        <Button size={'large'}>取消</Button>
                    </div>
                </Form>

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
        modifyPwd: bindActionCreators(modifyPwd, dispatch)

    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome