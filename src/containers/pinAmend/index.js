import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Button, Input} from 'antd';
import {modifyPinCode} from "../../actions/user";
import {notification} from "antd/lib/index";

const FormItem = Form.Item;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitLoading:false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    submitLoading:true
                })
                this.props.modifyPinCode({
                    pinCode:this.state.pinCode,
                    oldPinCode:this.state.oldPinCode,
                    confirmCode:this.state.confirmCode,
                },()=>{
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                    this.setState({
                        submitLoading:false
                    })
                    this.props.history.go(-1)
                })
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
                                        <Input type="password" onChange={(e)=>{this.setState({oldPinCode:e.target.value})}} size="large" placeholder="请输入旧PIN码"/>
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
                                    <Input type="password" onChange={(e)=>{this.setState({pinCode:e.target.value})}} size="large" placeholder="长度必须6-8位"/>
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
                                    <Input type="password" onChange={(e)=>{this.setState({confirmCode:e.target.value})}} size="large" placeholder="请再次确认新PIN码"/>
                                )}
                            </FormItem>
                        </div>

                    </div>
                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size={'large'} loading={this.state.submitLoading}>提交</Button>
                        <Button size={'large'}>取消</Button>
                    </div>
                </Form>

            </div>


        )
    }
}


function mapStateToProps(state, props) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modifyPinCode: bindActionCreators(modifyPinCode, dispatch)
    }
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home)

const WrappedHome = Form.create()(Home);
export default WrappedHome