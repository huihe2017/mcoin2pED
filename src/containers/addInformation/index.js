import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input,Select,Form,Upload} from 'antd';


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
                console.log('Received values of form: ', values);
            }
        });
    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { editorState } = this.state;

        return (
            <div className={style.wlop}>
                <span className={style.title}>创建资讯</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     资讯内容
                                 </span>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请填写你的邮箱!' }],
                                })(
                                    <Input size="large" placeholder="使用P95公司邮箱"/>)}
                            </FormItem>
                        </div>

                        <div className={style.uploadBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                     资讯封面（可选）
                                 </span>
                                <div>
                                    {getFieldDecorator('upload', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile,
                                    })(
                                        <Upload name="logo" action="/upload.do" listType="picture">
                                            <Button>
                                                <Icon type="upload" /> Click to upload
                                            </Button>
                                        </Upload>
                                    )}
                                </div>

                            </FormItem>
                        </div>

                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                资讯类型
                            </span>
                                {getFieldDecorator('select', {
                                    rules: [
                                        { required: true, message: '请选择适用平台!' },
                                    ],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="china">移动端</Option>
                                        <Option value="use">PC端</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </div>

                        <div className={style.editorBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    内容
                                </span>
                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: '内容不得为空!' }],
                                    })(
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={this.onEditorStateChange}
                                    />)
                                }
                            </FormItem>
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

const WrappedHome = Form.create()(Home);
export default WrappedHome