import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Editor} from 'react-draft-wysiwyg';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {createNotic, getNoticeList, setNoticeStatus} from '../../actions/notice';
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input, Select, Form} from 'antd';


const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    handleChange(value) {
        console.log(`Selected: ${value}`);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(this.state.content)
                this.props.createNotic({
                    content: this.state.content,
                    //id: this.state.id,
                    type: this.state.type,
                    showOrder: this.state.showOrder,
                    title: this.state.title,
                }, () => {
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
            }
        });
    }

    onEditorStateChange: Function = (content) => {
        this.setState({
            content:content.blocks[0].text,
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <div className={style.wlop}>
                <span className={style.title}>创建公告</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     标题
                                 </span>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: '请填写你的邮箱!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({
                                            title:e.target.value
                                        })
                                    }} size="large" placeholder="使用P95公司邮箱"/>)}
                            </FormItem>
                        </div>

                        <div className={style.editorBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    内容
                                </span>
                                {getFieldDecorator('content', {
                                    rules: [{required: true, message: '内容不得为空!'}],
                                })(
                                    <Editor
                                        // editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onChange={this.onEditorStateChange}
                                    />)
                                }
                            </FormItem>
                        </div>

                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                适用平台
                            </span>
                                {getFieldDecorator('select', {
                                    rules: [
                                        {required: true, message: '请选择适用平台!'},
                                    ],
                                })(
                                    <Select onChange={(e) => {
                                        this.setState({
                                            type:e
                                        })
                                    }} placeholder="请选择">
                                        <Option value={0}>PC端</Option>
                                        <Option value={1}>安卓</Option>
                                        <Option value={2}>ios</Option>
                                        <Option value={3}>H5</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    优先级
                                </span>
                                {getFieldDecorator('priority', {
                                    rules: [{required: true, message: '优先级不得为空!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({
                                            showOrder:e.target.value
                                        })
                                    }} size="large" placeholder=""/>)}</FormItem>
                        </div>

                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>创建</Button>
                        </FormItem>
                        <Button size={'large'}>取消</Button>
                    </div>

                </Form>
            </div>


        )
    }
}


function mapStateToProps(state, props) {
    return {
        notice: state.notice
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createNotic: bindActionCreators(createNotic, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);
export default WrappedHome