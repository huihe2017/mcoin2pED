import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'

import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input,Select,Form} from 'antd';

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

    handleChange(value) {
        console.log(`Selected: ${value}`);
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

        const children = [<Option key={1}>基金组</Option>,<Option key={2}>基金组</Option>,<Option key={3}>基金组</Option>,<Option key={4}>基金组</Option>,<Option key={5}>基金组</Option>,<Option key={6}>基金组</Option>,<Option key={7}>基金组</Option>];

        return (
            <div className={style.wlop}>
                <span className={style.title}>创建账号</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     账号
                                 </span>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请填写你的邮箱!' }],
                                })(
                                    <Input size="large" placeholder="使用P95公司邮箱"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBBox}>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        初始密码
                                    </span>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '密码不得为空!' }],
                                    })(
                                        <Input size="large" placeholder="至少6位，数字+字母"/>)}
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
                                        rules: [{ required: true, message: '请填写你的姓名!' }],
                                    })(
                                        <Input size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    联系电话
                                </span>
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请填写你的电话!' }],
                                })(
                                    <Input size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                角色
                            </span>
                                {getFieldDecorator('selectRole', {
                                    rules: [
                                        { required: true, message: '请选择你的角色!' },
                                    ],
                                })(<Select
                                    mode="tags"
                                    size={'large'}
                                    placeholder="请选择"
                                    // defaultValue={['a10', 'c12']}
                                    onChange={this.handleChange()}
                                    style={{ width: '100%' }}
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
                        <Button size={'large'}>取消</Button>
                    </div>

                </Form>
            </div>


        )
    }
}

const WrappedHome = Form.create()(Home);
export default WrappedHome