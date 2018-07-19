import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Button,
    Table,
    Dropdown,
    notification,
    Steps,
    Input,
    Select,
    Form,
    Upload
} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createInfo, getInfoTypeList} from "../../actions/information";

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

    componentDidMount() {
        this.props.getInfoTypeList()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.createInfo({
                    content: this.state.content,
                    //id: this.state.id,
                    typeId: this.state.typeId,
                    // coverUrl: this.state.coverUrl,
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
            content: content.blocks[0].text,
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
        if (!this.props.info.infoTypeList) {
            return null
        }
        const {getFieldDecorator} = this.props.form;
        const {editorState} = this.state;

        return (
            <div className={style.wlop}>
                <span className={style.title}>创建资讯</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     资讯标题
                                 </span>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: '请填写你的邮箱!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({
                                            title: e.target.value
                                        })
                                    }} size="large" placeholder="使用P95公司邮箱"/>)}
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
                                                <Icon type="upload"/> Click to upload
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
                                        {required: true, message: '请选择适用平台!'},
                                    ],
                                })(
                                    <Select onChange={(e) => {
                                        this.setState({
                                            typeId: e
                                        })
                                    }} placeholder="请选择">
                                        {
                                            this.props.info.infoTypeList.list.map((obj) => {
                                                return <Option value={obj.id}>{obj.name}</Option>
                                            })
                                        }
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
        info: state.information
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createInfo: bindActionCreators(createInfo, dispatch),
        getInfoTypeList: bindActionCreators(getInfoTypeList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);
export default WrappedHome