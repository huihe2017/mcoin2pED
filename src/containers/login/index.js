import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                                <Input size={'large'} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
                            )}
                        </FormItem>
                        <div className={style.tuxing}>
                            <FormItem>
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: '请输入图形验证码!' }],
                                })(
                                    <Input size={'large'} prefix={<Icon type="info-circle-o" style={{ fontSize: 13 }} />} placeholder="图形验证码" />
                                )}
                            </FormItem>
                            <img src={require('./images/code.jpg')} alt=""/>
                        </div>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input size={'large'} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>

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
const WrappedHome = Form.create()(Home);

export default WrappedHome