import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Button, Form,Input,
    Select,notification} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPlaBalance,adminOutCoin} from "../../actions/wallet";
import {filter} from "../../common/util";

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
                this.props.adminOutCoin(
                    {
                        addressId: this.props.params.id,
                        amount: this.state.amount,
                        remark: this.state.remark
                    },()=>{
                        notification.open({
                            message: '提示',
                            description: '操作成功',
                        });

                        this.props.history.go(-1)
                    }
                )

            }
        });
    }

    componentDidMount(){

        if (this.props.params.id !== 'null') {

            let data = filter(this.props.wallet.outCoinAddressList.list,this.props.params.id)
            this.setState({
                currency: data.currency,
                id: data.id,
                address: data.address,
                remark: data.remark
            })
            this.props.getPlaBalance({
                currency:data.currency
            })


        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wlop}>
                <span className={style.title}>转出</span>
                <div>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <div className={style.content}>
                            <div className={style.inputBox2}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     转出地址
                                 </span>
                                    {getFieldDecorator('outAddress', {
                                        initialValue: this.state.address,
                                        rules: [{required: true, message: '请填写转出地址!'}],
                                    })(
                                        <TextArea
                                            disabled
                                            onChange={(e) => {
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
                                        initialValue: this.state.remark,
                                        rules: [{required: true, message: '请填写备注!'}],
                                    })(
                                        <Input disabled onChange={(e) => {
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
                                        initialValue: this.state.currency,
                                        rules: [
                                            {required: true, message: '请选择货币类型!'},
                                        ],
                                    })(<Select disabled  placeholder="请选择">
                                        <Option value="btc">BTC</Option>
                                        <Option value="eth">ETH</Option>
                                    </Select>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     钱包余额
                                 </span>
                                    {getFieldDecorator('walletBalance', {
                                        initialValue: this.props.wallet.plaBalance,
                                        rules: [{required: true, message: '请填写钱包余额!'}],
                                    })(
                                        <Input
                                            disabled
                                            onChange={(e) => {
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
                                            this.setState({amount: e.target.value})
                                        }} size="large" placeholder="请填写转出余额"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     转出备注
                                 </span>
                                    {getFieldDecorator('outBalance1', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请填写转出备注!'}],
                                    })(
                                        <Input onChange={(e) => {
                                            this.setState({remark: e.target.value})
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

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlaBalance: bindActionCreators(getPlaBalance, dispatch),
        adminOutCoin: bindActionCreators(adminOutCoin, dispatch)

}
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);
export default WrappedHome