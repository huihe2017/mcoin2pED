import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
import Header1 from '../../components/header'
import { Form, Icon, Input, Button, notification } from 'antd'
import config from '../../config'
import {checkPin} from '../../actions/user'
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
                this.props.checkPin({
                    pinCode:this.state.code
                },()=>{
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });

                    this.props.history.go(-1)
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
                        <span className={style.title}>
                            安全验证
                        </span>
                        <FormItem>
                            {getFieldDecorator('pin', {
                                rules: [{ required: true, message: '请输入账号!' }],
                            })(
                                <Input size={'large'} type="password" onChange={(e)=>{this.setState({code:e.target.value})}} prefix={<Icon type="info-circle-o" style={{ fontSize: 13 }} />} placeholder="输入PIN码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <span className={style.forget}>忘记PIN码,请联系管理员</span>
                            <div className={style.button}>
                                <Button type="primary" htmlType="submit" onClick={()=>{

                                }} className={style.button}>
                                    验证
                                </Button>
                            </div>

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
        checkPin: bindActionCreators(checkPin, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);

export default WrappedHome