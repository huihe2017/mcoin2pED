import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Steps, Button, Form} from 'antd';
import {Input, Layout, Menu, notification, Select,Tag,Tooltip,Checkbox} from "antd/lib/index";

const Option = Select.Option;
const {TextArea} = Input;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:  [],
            tags1:  [],
            inputVisible: false,
            inputVisible1: false,
            inputValue: '',
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.props.setFundEditData(
                //     {
                //         title: this.state.title,
                //         tag: this.state.tags,
                //         currency: this.state.currency,
                //         riskType: this.state.riskType,
                //         productDesc: this.state.productDesc,
                //         redeemDesc: this.state.redeemDesc,
                //     }
                // )
                this.props.handle(1)

            }
        });
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({tags});
    }

    showInput = () => {
        // this.setState({inputVisible: true}, () => this.input.focus());
        this.setState({inputVisible: true}, () => console.log(this));
    }

    handleInputConfirm = () => {
        const state = this.state;
        const massage = state.massage;
        let tags = state.tags;
        console.log(tags.length);

        if (massage && tags.indexOf(massage) === -1) {
            tags = [...tags, massage];
        }
        if (tags.length > 20) {
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
            massage: '',
        });
    }

    handleClose1 = (removedTag) => {
        const tags1 = this.state.tags1.filter(tag => tag !== removedTag);
        console.log(tags1);
        this.setState({tags1});
    }

    showInput1 = () => {
        // this.setState({inputVisible: true}, () => this.input.focus());
        this.setState({inputVisible1: true}, () => console.log(this));
    }

    handleInputConfirm1 = () => {
        const state = this.state;
        const email = state.email;
        let tags1 = state.tags1;
        console.log(tags1.length);

        if (email && tags1.indexOf(email) === -1) {
            tags1 = [...tags1, email];
        }
        if (tags1.length > 20) {
            notification['warning']({
                message: '提示',
                description: '最多有三个标签',
            });
            this.setState({
                inputVisible1: false,
            });
            return

        }
        console.log(tags1);
        this.setState({
            tags1,
            inputVisible1: false,
            email: '',
        });
    }

    saveInputRef = input => this.input = input

    render() {
        const {getFieldDecorator} = this.props.form;
        const {tags,tags1, inputVisible, inputValue,inputVisible1} = this.state;
        return (
            <div className={style.wlop}>
                <span className={style.title}>管理设置</span>

                <div className={style.wlopContent}>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <div className={style.content}>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        转出阈值警报（单位：百分比）
                                        <span className={style.inputBoxTT}>
                                            *保证平台钱包又足够余额出金
                                        </span>

                                    </span>
                                    {getFieldDecorator('fundName', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请填写转出阈值!'}],
                                    })(
                                        <Input onChange={(e) => {
                                            this.props.setFundEditData({title: e.target.value})
                                        }} suffix={'%'} size="large" placeholder="请填写转出阈值"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox4}>
                                <span className={style.inputBoxT}>
                                    平台钱包余额过低警报
                                    <span className={style.inputBoxTT}>
                                            *保证平台钱包邮足够余额出金，当前余额低于设定阈值时，会通知管理员进行转入
                                        </span>
                                </span>
                                <FormItem>
                                    <div className={style.inputBoxB}>
                                        <span className={style.inputBoxBT}>
                                            BTC
                                        </span>
                                        {getFieldDecorator('BTC', {
                                            initialValue: '',
                                            rules: [{required: true, message: '请填写警报额度!'}],
                                        })(
                                            <Input onChange={(e) => {
                                                this.props.setFundEditData({title: e.target.value})
                                            }}  size="large" placeholder="请填写警报额度"/>)}
                                    </div>
                                </FormItem>
                                <FormItem>
                                    <div className={style.inputBoxB}>
                                        <span className={style.inputBoxBT}>
                                            ETC
                                        </span>
                                        {getFieldDecorator('ETC', {
                                            initialValue: '',
                                            rules: [{required: true, message: '请填写警报额度!'}],
                                        })(
                                            <Input onChange={(e) => {
                                                this.props.setFundEditData({title: e.target.value})
                                            }}  size="large" placeholder="请填写警报额度"/>)}
                                    </div>
                                </FormItem>
                                <FormItem>
                                    <div className={style.inputBoxB}>
                                        <span className={style.inputBoxBT}>
                                            AAA
                                        </span>
                                        {getFieldDecorator('AAA', {
                                            initialValue: '',
                                            rules: [{required: true, message: '请填写警报额度!'}],
                                        })(
                                            <Input onChange={(e) => {
                                                this.props.setFundEditData({title: e.target.value})
                                            }}  size="large" placeholder="请填写警报额度"/>)}
                                    </div>
                                </FormItem>
                            </div>
                            <div className={style.inputBox2}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                     消息通知设置
                                    </span>
                                    <div style={{margin:'10px,0'}}>
                                        {getFieldDecorator('outMessage', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox>转出超出阈值短信通知</Checkbox>)}
                                    </div>
                                    <div style={{margin:'10px,0'}}>
                                        {getFieldDecorator('walletMassage', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox>平台钱包余额过低短信通知</Checkbox>)}
                                    </div>
                                    <div style={{margin:'10px,0'}}>
                                        {getFieldDecorator('dailyMessage', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox>每日平台账单邮件通知</Checkbox>)}
                                    </div>

                                </FormItem>
                            </div>
                            <div className={style.inputBox1}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     短信通知人员名单
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
                                            <Select
                                                ref={this.saveInputRef}
                                                size="small"
                                                style={{width: 78}}
                                                onChange={(e) => {

                                                this.setState({massage: e},()=>this.handleInputConfirm())
                                            }} placeholder="请选择">
                                                <Option value="china">China</Option>
                                                <Option value="usa4">U.S.A</Option>
                                                <Option value="usa1">U.S.B</Option>
                                                <Option value="usa2">U.S.C</Option>
                                                <Option value="usa3">U.S.D</Option>
                                            </Select>
                                        )}
                                        {!inputVisible &&
                                        <Button size="small" type="dashed" onClick={this.showInput}>+ 添加标签</Button>}
                                    </div>
                                </FormItem>
                            </div>
                            <div className={style.inputBox1}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     邮件通知人员名单
                                 </span>
                                    <div>
                                        {tags1.map((tag, index) => {
                                            const isLongTag = tag.length > 3;
                                            const tagElem = (
                                                <Tag key={tag} closable={true} afterClose={() => this.handleClose1(tag)}>
                                                    {isLongTag ? `${tag.slice(0, 3)}...` : tag}
                                                </Tag>
                                            );
                                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                        })}
                                        {inputVisible1 && (
                                            <Select
                                                ref={this.saveInputRef}
                                                size="small"
                                                style={{width: 78}}
                                                onChange={(e) => {

                                                this.setState({email: e},()=>this.handleInputConfirm1())
                                            }} placeholder="请选择">
                                                <Option value="china">China</Option>
                                                <Option value="usa4">U.S.A</Option>
                                                <Option value="usa1">U.S.B</Option>
                                                <Option value="usa2">U.S.C</Option>
                                                <Option value="usa3">U.S.D</Option>
                                            </Select>
                                        )}
                                        {!inputVisible1 &&
                                        <Button size="small" type="dashed" onClick={this.showInput1}>+ 添加标签</Button>}
                                    </div>
                                </FormItem>
                            </div>
                        </div>

                        <div className={style.button}>
                            <FormItem>
                                <Button type="primary" htmlType="submit" size={'large'}>保存</Button>
                            </FormItem>
                        </div>

                    </Form>
                </div>
            </div>


        )
    }
}
const WrappedHome = Form.create()(Home);
export default WrappedHome