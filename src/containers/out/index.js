import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Button, Form,Input,
    Select,} from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

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

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wlop}>
                <span className={style.title}>创建地址地址</span>
                <div>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <div className={style.content}>
                            <div className={style.inputBox2}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     转出地址
                                 </span>
                                    {getFieldDecorator('outAddress', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请填写转出地址!'}],
                                    })(
                                        <TextArea onChange={(e) => {
                                            this.props.setFundEditData({redeemDesc: e.target.value})
                                        }} rows={4} placeholder="请填写转出地址"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     钱包备注
                                 </span>
                                    {getFieldDecorator('balance', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请填写备注!'}],
                                    })(
                                        <Input onChange={(e) => {
                                            this.props.setFundEditData({title: e.target.value})
                                        }} size="large" placeholder="请填写备注"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                            <span className={style.inputBoxT}>
                                转出货币类型
                            </span>
                                    {getFieldDecorator('selectCoin', {
                                        initialValue: '',
                                        rules: [
                                            {required: true, message: '请选择货币类型!'},
                                        ],
                                    })(<Select onChange={(e) => {
                                        this.props.setFundEditData({currency: e})
                                    }} placeholder="请选择">
                                        <Option value="china">China</Option>
                                        <Option value="use">U.S.A</Option>
                                    </Select>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     钱包余额
                                 </span>
                                    {getFieldDecorator('walletBalance', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请填写钱包余额!'}],
                                    })(
                                        <Input onChange={(e) => {
                                            this.props.setFundEditData({title: e.target.value})
                                        }} size="large" placeholder="请填写钱包余额"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     转出余额
                                 </span>
                                    {getFieldDecorator('outBalance', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请填写转出余额!'}],
                                    })(
                                        <Input onChange={(e) => {
                                            this.props.setFundEditData({title: e.target.value})
                                        }} size="large" placeholder="请填写转出余额"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     转出备注
                                 </span>
                                    {getFieldDecorator('outBalance', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请填写转出备注!'}],
                                    })(
                                        <Input onChange={(e) => {
                                            this.props.setFundEditData({title: e.target.value})
                                        }} size="large" placeholder="请填写转出备注"/>)}
                                </FormItem>
                            </div>
                        </div>

                        <div className={style.button}>
                            <FormItem>
                                <Button type="primary" htmlType="submit" size={'large'}>提交</Button>
                            </FormItem>
                            <Button size={'large'}>放弃</Button>
                        </div>

                    </Form>
                </div>
            </div>


        )
    }
}
const WrappedHome = Form.create()(Home);
export default WrappedHome