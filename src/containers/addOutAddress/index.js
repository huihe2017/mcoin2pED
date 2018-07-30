import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Button, Form,Input,
    Select,} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createOutAddress} from "../../actions/wallet";
import {notification} from "antd/lib/index";
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

    componentDidMount(){
        if (this.props.params.id !== 'null') {

            let data = filter(this.props.wallet.outCoinAddressList.list,this.props.params.id)
            this.setState({
                currecy: data.currecy,
                id: data.id,
                address: data.address,
                remark: data.remark
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                let param = {
                    currecy: this.state.currecy,
                    address: this.state.address,
                    remark: this.state.remark
                }
                if(this.props.params.id!=='null'){
                    param.id = this.props.params.id
                }


                this.props.createOutAddress(param, () => {
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
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
                                        initialValue: this.state.address,
                                        rules: [{required: true, message: '请填写转出地址!'}],
                                    })(
                                        <TextArea onChange={(e) => {
                                            this.setState({address: e.target.value})
                                        }} rows={4} placeholder="请填写转出地址"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                 <span className={style.inputBoxT}>
                                     备注
                                 </span>
                                    {getFieldDecorator('fundName', {
                                        initialValue: this.state.remark,
                                        rules: [{required: true, message: '请填写备注!'}],
                                    })(
                                        <Input  onChange={(e) => {
                                            this.setState({remark: e.target.value})
                                        }} size="large" placeholder="请填写备注"/>)}
                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                            <span className={style.inputBoxT}>
                                转出货币类型
                            </span>
                                    {getFieldDecorator('selectCoin', {
                                        initialValue: this.state.currecy,
                                        rules: [
                                            {required: true, message: '请选择货币类型!'},
                                        ],
                                    })(<Select  onChange={(e) => {
                                        this.setState({currecy: e})
                                    }} placeholder="请选择">
                                        <Option value="btc">BTC</Option>
                                        <Option value="eth">ETC</Option>
                                    </Select>)}
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
        createOutAddress: bindActionCreators(createOutAddress, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);
export default WrappedHome