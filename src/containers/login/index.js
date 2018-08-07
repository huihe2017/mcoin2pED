import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import config from '../../config'
import {getUserMsg, login} from '../../actions/user'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import {setMenu} from "../../actions/menu";
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picImg: this.getPicImg(),
            userName:'',
            pwd:'',
            code:''
        };
    }

    getPicImg() {
        return <img onClick={(e) => {
            e.target.src = config.noauth_url + 'captcha/getcaptcha?tm=' + Math.random()
        }}
                    className={style.tuxing}
                    src={config.noauth_url + 'captcha/getcaptcha?tm=' + Math.random()}/>
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(this.state);
            if (!err) {
                this.props.login({
                    account	:this.state.userName,
                    password:this.state.pwd,
                    checkCode:this.state.code,
                },()=>{
                    hashHistory.push('/')
                })
                this.setState({picImg: this.getPicImg(),code:''},()=>{
                    this.props.form.setFieldsValue({
                        code: '',
                    });
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.wlop}>
                <div className={style.wlopContent}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        {/*<span className={style.title}>*/}
                            {/*后台登录*/}
                        {/*</span>*/}
                        <FormItem>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请输入账号!' }],
                            })(
                                <Input size={'large'} value={this.state.userName} onChange={(e)=>{this.setState({userName:e.target.value})}} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input size={'large'} value={this.state.pwd} onChange={(e)=>{this.setState({pwd:e.target.value})}} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                        <div className={style.tuxing}>
                            <FormItem>
                                {getFieldDecorator('code', {
                                    initialValue: this.state.code,
                                    rules: [{ required: true, message: '请输入图形验证码!' }],
                                })(
                                    <Input size={'large'}   onChange={(e)=>{this.setState({code:e.target.value})}} prefix={<Icon type="info-circle-o" style={{ fontSize: 13 }} />} placeholder="图形验证码" />
                                )}
                            </FormItem>
                            {/*<img src={require('./images/code.jpg')} alt=""/>*/}
                            {this.state.picImg}
                        </div>



                            <Button type="primary" htmlType="submit" className={style.button}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>

            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user

    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);

export default WrappedHome