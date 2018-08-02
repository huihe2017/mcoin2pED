import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {InCoin} from '../../actions/wallet'
import {getCurrencyPrice} from '../../actions/wallet'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input, Select, Form} from 'antd';

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

    handleChange = (value) => {
        this.setState({roles: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {


                let params = {
                    mobile: this.state.mobile,
                    currency: this.state.currency,
                    realMoney: this.state.realMoney,
                    price: this.state.price,
                    amount: this.state.amount,
                    remark: this.state.remark
                }

                this.props.InCoin(params, () => {
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
            }
        });
    }

    componentDidMount() {

    }

    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wlop}>
                <span className={style.title}>充值管理</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     用户手机号码账号
                                 </span>
                                {getFieldDecorator('account', {
                                    rules: [{required: true, message: '请填写用户的手机号码!'}],
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({mobile: e.target.value})
                                        }} size="large" placeholder="请填写用户的手机号码"/>)}
                            </FormItem>
                        </div>

                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                货币类型
                            </span>
                                {getFieldDecorator('selectRole', {
                                    rules: [
                                        {required: true, message: '请选择货币类型!'},
                                    ],
                                })(<Select
                                    size={'large'}
                                    placeholder="请选择"


                                    onChange={(e)=>{
                                        this.setState({currency:e})
                                    }}
                                    style={{width: '100%'}}
                                >
                                    <Option value={'BTC'}>BTC</Option>
                                    <Option value={'ETC'}>ETC</Option>
                                </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    付款金额（元）
                                </span>
                                {getFieldDecorator('payMoney', {
                                    rules: [{required: true, message: '请填写付款金额!'}],
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({realMoney: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBBox}>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        买入单价（元）
                                    </span>
                                    {getFieldDecorator('buyMoney', {
                                        initialValue: this.state.buyMoney,
                                        rules: [{required: true, message: '请填入买入单价!'}],
                                    })(
                                        <Input

                                            onChange={(e)=>{
                                                this.setState({price:e.target.value})
                                            }}

                                            // onChange={(e) => {
                                            //     this.setState({buyMoney: e.target.value},()=>{
                                            //         this.setState({
                                            //             inMoney:this.state.payMoney/this.state.buyMoney
                                            //         })
                                            //     })
                                            // }}
                                        size="large" placeholder=""/>)}
                                </FormItem>
                            </div>
                            <a onClick={()=>{
                                if(!this.state.currency){
                                    notification.open({
                                        message: '提示',
                                        description: '请选择币种',
                                    });
                                }else {
                                    this.props.getCurrencyPrice({
                                        currency:this.state.currency
                                    },()=>{
                                        console.log(this.props.wallet)
                                        this.setState({buyMoney:this.props.wallet[this.state.currency+'Price']})
                                    })
                                }
                            }} className={style.inputBBoxA} href="javascript:void (0)">
                                查询最新单价
                            </a>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    转入金额
                                </span>
                                {getFieldDecorator('inMoney', {
                                    rules: [{required: true, message: '请填写转入金额!'}],
                                })(
                                    <Input onChange={(e)=>{
                                        this.setState({amount:e.target.value})
                                    }}  size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    备注
                                </span>
                                {getFieldDecorator('remark', {
                                })(
                                    <Input
                                        value={this.state.mobile || ''}
                                        onChange={(e) => {
                                            this.setState({remark: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>

                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>充值</Button>
                        </FormItem>
                        <Button onClick={() => {
                            this.props.history.go(-1)
                        }} size={'large'}>取消</Button>
                    </div>

                </Form>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet,
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrencyPrice: bindActionCreators(getCurrencyPrice, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);


export default WrappedHome