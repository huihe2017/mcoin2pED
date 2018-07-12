import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'

import {Form, Button, Input} from 'antd';

const FormItem = Form.Item;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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

        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wlop}>
                <span className={style.title}>修改PIN码</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox1}>
                            <div className={style.inputBox}>
                                <FormItem>
                                <span className={style.inputBoxT}>
                                    输入旧的PIN码
                                </span>
                                    {getFieldDecorator('oldPin', {
                                        rules: [{required: true, message: '请输入旧PIN码!'}],
                                    })(
                                        <Input size="large" placeholder="请输入旧PIN码"/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.tip}>
                                如果您忘记了PIN码，请联系管理员。
                            </div>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    输入新的PIN码
                                </span>
                                {getFieldDecorator('newPin', {
                                    rules: [{required: true, message: '请输入新PIN码!'}],
                                })(
                                    <Input size="large" placeholder="长度必须6-8位"/>
                                )}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    确认新的PIN码
                                </span>
                                {getFieldDecorator('reNewPin', {
                                    rules: [{required: true, message: '请再次输入新PIN码!'}],
                                })(
                                    <Input size="large" placeholder="请再次确认新PIN码"/>
                                )}
                            </FormItem>
                        </div>

                    </div>
                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size={'large'}>提交</Button>
                        <Button size={'large'}>取消</Button>
                    </div>
                </Form>

            </div>


        )
    }
}

const WrappedHome = Form.create()(Home);
export default WrappedHome