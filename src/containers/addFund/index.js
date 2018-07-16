import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'

import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input,Select,Form,Tag, Tooltip } from 'antd';

const Option = Select.Option;
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



    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        console.log(tags.length);

        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        if(tags.length>3){
            notification['warning']({
                message: '提示',
                description: '最多有三个标签',
            });
            this.setState({
                inputVisible: false,
            });
            return

        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input

    render() {
        const { getFieldDecorator } = this.props.form;

        const children = [<Option key={1}>基金组</Option>,<Option key={2}>基金组</Option>,<Option key={3}>基金组</Option>,<Option key={4}>基金组</Option>,<Option key={5}>基金组</Option>,<Option key={6}>基金组</Option>,<Option key={7}>基金组</Option>];
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div className={style.wlop}>
                <span className={style.title}>创建基金</span>
                <Steps current={0}>
                    <Step title="基础信息" />
                    <Step title="基金参数"/>
                    <Step title="手续费"/>
                    <Step title="运营活动"/>
                </Steps>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     基金名称
                                 </span>
                                {getFieldDecorator('fundName', {
                                    rules: [{ required: true, message: '请填写你的邮箱!' }],
                                })(
                                    <Input size="large" placeholder="使用P95公司邮箱"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox1}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     账号
                                 </span>
                                <div>
                                    {tags.map((tag, index) => {
                                        const isLongTag = tag.length > 3;
                                        const tagElem = (
                                            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                                                {isLongTag ? `${tag.slice(0, 3)}...` : tag}
                                            </Tag>
                                        );
                                        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                    })}
                                    {inputVisible && (
                                        <Input
                                            ref={this.saveInputRef}
                                            type="text"
                                            size="small"
                                            style={{ width: 78 }}
                                            value={inputValue}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleInputConfirm}
                                            onPressEnter={this.handleInputConfirm}
                                        />
                                    )}
                                    {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加标签</Button>}
                                </div>
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