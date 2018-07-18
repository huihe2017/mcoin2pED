import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'

import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input,Select,Form,Tag, Tooltip,Upload} from 'antd';

const Option = Select.Option;
const { TextArea } = Input;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: ['标签1', '标签2'],
            inputVisible: false,
            inputValue: '',
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

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        const children = [<Option key={1}>基金组</Option>,<Option key={2}>基金组</Option>,<Option key={3}>基金组</Option>,<Option key={4}>基金组</Option>,<Option key={5}>基金组</Option>,<Option key={6}>基金组</Option>,<Option key={7}>基金组</Option>];
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div className={style.wlop}>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     封闭期/天
                                 </span>
                                {getFieldDecorator('close', {
                                    rules: [{ required: true, message: '请填写封闭期!' }],
                                })(
                                    <Input size="large" placeholder="请填写封闭期"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     起购金额（如：0.00001）
                                 </span>
                                {getFieldDecorator('minBuy', {
                                    rules: [{ required: true, message: '请填写起购金额!' }],
                                })(
                                    <Input size="large" placeholder="请填写起购金额"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     最小递增单位（如：0.00001）
                                 </span>
                                {getFieldDecorator('minAdd', {
                                    rules: [{ required: true, message: '请填写最小递增单位!' }],
                                })(
                                    <Input size="large" placeholder="请填写最小递增单位"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     最大起购金额（设置0则不限制购买金额）
                                 </span>
                                {getFieldDecorator('maxBuy', {
                                    rules: [{ required: true, message: '请填写最大起购金额!' }],
                                })(
                                    <Input size="large" placeholder="请填写最大起购金额"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     基金有效期/天（设置0则不限制购基金有效期）
                                 </span>
                                {getFieldDecorator('indate', {
                                    rules: [{ required: true, message: '请填写基金有效期!' }],
                                })(
                                    <Input size="large" placeholder="请填写基金有效期"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     限购次数（设置0则不限制限购次数）
                                 </span>
                                {getFieldDecorator('limit', {
                                    rules: [{ required: true, message: '请填写限购次数!' }],
                                })(
                                    <Input size="large" placeholder="请填写限购次数"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     年化图表（最少七天）
                                 </span>
                                {getFieldDecorator('dragger', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    rules: [{ required: true, message: '请上传年化图表!' }],
                                })(
                                    <Upload.Dragger name="files" action="/upload.do">
                                        <p className="ant-upload-text">点击上传</p>
                                    </Upload.Dragger>
                                )}
                                <span className={style.inputBoxTT}>
                                     *年化图表模板：<a href="javascript:void (0)">点击下载</a>
                                 </span>
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