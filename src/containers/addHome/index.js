import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {addAccount, editAccountMsg} from '../../actions/account'
import {getRoleList} from '../../actions/role'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input, Select, Form,Upload} from 'antd';

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleChange = (value) => {
        this.setState({selectPlatform: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // let params = {
                //     password: this.state.password,
                //     account: this.state.account,
                //     name: this.state.name,
                //     mobile: this.state.mobile,
                //     roles: this.state.roles,
                // }
                //
                // this.props.addAccount(params, () => {
                //     this.props.history.go(-1)
                // })
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

    componentDidMount() {

    }

    render() {
        // if (!this.props.role.roleList) {
        //     return null
        // }
        const {getFieldDecorator} = this.props.form;

        // let children = this.props.role.roleList.list.map((obj) => {
        //     return <Option key={obj.id}>{obj.name}</Option>
        // })

        return (
            <div className={style.wlop}>
                <span className={style.title}>{this.props.params.id ? '修改账号' : '创建账号'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     banner名称
                                 </span>
                                {getFieldDecorator('bannerName', {
                                    rules: [{required: true, message: '请填写banner名称!'}],
                                    initialValue: this.state.account
                                })(
                                    <Input
                                        disabled={this.state.account?true:false}
                                        onChange={(e) => {
                                            this.setState({bannerName: e.target.value})
                                        }} size="large" placeholder="使用P95公司邮箱"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox1}>
                            <FormItem>
                                <span className={style.inputBoxT1}>
                                    banner上传
                                </span>
                                    {getFieldDecorator('bannerImg', {
                                        rules: [{required: true, message: 'banner图片不可为空!'}],
                                        // initialValue: this.state.password,
                                        getValueFromEvent: this.normFile,
                                    })(
                                        <Upload name="logo" action="/upload.do" listType="picture">
                                            <Button>
                                                <Icon type="upload" /> Click to upload
                                            </Button>
                                        </Upload>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    跳转链接
                                </span>
                                {getFieldDecorator('link', {
                                    rules: [{required: true, message: '请填写跳转链接!'}],
                                    initialValue: this.state.name
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({link: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>

                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                适用平台
                            </span>
                                {getFieldDecorator('selectPlatform', {
                                    // initialValue: (() => {
                                    //     let arr = [];
                                    //     this.state.roles && this.state.roles.map((obj) => {
                                    //         arr.push(obj.id)
                                    //     })
                                    //     return arr
                                    // })(),
                                    rules: [
                                        {required: true, message: '请选择适用平台!'},
                                    ],
                                })(<Select
                                    size={'large'}
                                    placeholder="请选择"
                                    onChange={this.handleChange}
                                    style={{width: '100%'}}
                                >
                                    {/*{children}*/}
                                    <Option value="china">China</Option>
                                    <Option value="use">U.S.A</Option>
                                </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    优先级
                                </span>
                                {getFieldDecorator('priority', {
                                    rules: [{required: true, message: '请填写优先级!'}],
                                    initialValue: this.state.mobile
                                })(
                                    <Input
                                        value={this.state.priority || ''}
                                        onChange={(e) => {
                                            this.setState({priority: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>提交</Button>
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
        role: state.role,
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAccount: bindActionCreators(addAccount, dispatch),
        editAccountMsg: bindActionCreators(editAccountMsg, dispatch),
        getRoleList: bindActionCreators(getRoleList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);


export default WrappedHome