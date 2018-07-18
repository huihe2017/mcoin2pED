import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input,Select,Form,Tag, Tooltip,Upload} from 'antd';

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
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     销售服务费率%
                                 </span>
                                {getFieldDecorator('server', {
                                    rules: [{ required: true, message: '请填写销售服务费率!' }],
                                })(
                                    <Input size="large" placeholder="请填写销售服务费率"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     基金托管费率%
                                 </span>
                                {getFieldDecorator('trusteeship', {
                                    rules: [{ required: true, message: '请填写基金托管费率!' }],
                                })(
                                    <Input size="large" placeholder="请填写基金托管费率"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     赎回费率%
                                 </span>
                                {getFieldDecorator('redeem', {
                                    rules: [{ required: true, message: '请填写赎回费率!' }],
                                })(
                                    <Input size="large" placeholder="请填写赎回费率"/>)}
                            </FormItem>
                        </div>
                    </div>

                    <div className={style.button}>
                        <Button type="primary" size={'large'}>上一步</Button>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>下一步</Button>
                        </FormItem>
                    </div>

                </Form>
            </div>


        )
    }
}

const WrappedHome = Form.create()(Home);
export default WrappedHome