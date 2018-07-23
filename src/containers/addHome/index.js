import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {createBanner} from '../../actions/homePageCfg'
import {getRoleList} from '../../actions/role'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input, Select, Form,Upload} from 'antd';
import {filter} from "../../common/util";

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
                console.log(this.state.content)

                let param = {
                    type: this.state.type,
                    url: this.state.url,
                    title: this.state.title,
                    showOrder: this.state.showOrder,
                    photoUrl: this.state.photoUrl,
                }
                if(this.props.params.id!=='null'){
                    param.id = this.state.id
                }


                this.props.createBanner(param, () => {
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
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
        if (this.props.params.id !== 'null') {

            let data = filter(this.props.homePageCfg.bannerList.list,this.props.params.id)
            this.setState({
                type: data.type,
                url: data.url,
                title: data.title,
                showOrder: data.showOrder,
                photoUrl: data.photoUrl
            })
        }
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
                <span className={style.title}>{this.props.params.id!=='null' ? '编辑banner' : '添加banner'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     banner名称
                                 </span>
                                {getFieldDecorator('bannerName', {
                                    rules: [{required: true, message: '请填写banner名称!'}],
                                    initialValue: this.state.title
                                })(
                                    <Input
                                        disabled={this.state.account?true:false}
                                        onChange={(e) => {
                                            this.setState({title: e.target.value})
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
                                    initialValue: this.state.url
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({url: e.target.value})
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
                                    initialValue: this.state.type,
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
                                    <Option value={0}>PC端</Option>
                                    <Option value={1}>安卓</Option>
                                    <Option value={2}>ios</Option>
                                    <Option value={3}>H5</Option>
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
                                    initialValue: this.state.showOrder
                                })(
                                    <Input
                                        value={this.state.priority || ''}
                                        onChange={(e) => {
                                            this.setState({showOrder: e.target.value})
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
        homePageCfg: state.homePageCfg
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createBanner: bindActionCreators(createBanner, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);


export default WrappedHome