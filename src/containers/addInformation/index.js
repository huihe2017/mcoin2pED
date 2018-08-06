import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Editor} from 'react-draft-wysiwyg';
import {filter} from '../../common/util';
import upLoad from '../../components/upLoad';
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
import draftToHtml from 'draftjs-to-html';
import {createInfo, getInfoTypeList} from "../../actions/information";
import htmlToDraft from 'html-to-draftjs';

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

    getContent = (data) => {
        //data = '<p>-- -- 11111</p>';
        const contentBlock = htmlToDraft(data);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
            return editorState
        }
    }

    componentDidMount() {
        this.props.getInfoTypeList({}, () => {
            upLoad('img', (value) => {
                this.setState({coverUrl: value})
            })
            if (this.props.params.id !== 'null') {
                let data = filter(this.props.info.infoList.list, this.props.params.id)
                this.setState({
                    content: this.getContent(data.content),
                    id: data.id,
                    typeId: data.typeId,
                    coverUrl: data.coverUrl,
                    title: data.title,
                })
            }
        })

        // document.getElementById('file').addEventListener('change', function (e) {
        //     let file = e.target.files[0];
        //     let storeAs = 'upload-file';
        //     console.log(file.name + ' => ' + storeAs);
        //     OSS.urllib.request("http://your_sts_server/",
        //         {method: 'GET'},
        //         function (err, response) {
        //             if (err) {
        //                 return alert(err);
        //             }
        //             try {
        //                 result = JSON.parse(response);
        //             } catch (e) {
        //                 return alert('parse sts response info error: ' + e.message);
        //             }
        //             let client = new OSS({
        //                 accessKeyId: result.AccessKeyId,
        //                 accessKeySecret: result.AccessKeySecret,
        //                 stsToken: result.SecurityToken,
        //                 endpoint: '<oss endpoint>',
        //                 bucket: '<Your bucket name>'
        //             });
        //             //storeAs表示上传的object name , file表示上传的文件
        //             client.multipartUpload(storeAs, file).then(function (result) {
        //                 console.log(result);
        //             }).catch(function (err) {
        //                 console.log(err);
        //             });
        //         });
        // });


    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log(333311,this.state.editorState.getCurrentContent())
            // console.log(333311222,draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
            if (!err) {
                let param = {
                    content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                    typeId: this.state.typeId,
                    coverUrl: this.state.coverUrl,
                    title: this.state.title,
                }

                if (this.props.params.id !== 'null') {
                    param.id = this.props.params.id
                }
                this.props.createInfo(param, () => {
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
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
        if (!this.props.info.infoTypeList) {
            return null
        }
        const {getFieldDecorator} = this.props.form;


        return (
            <div className={style.wlop}>
                <span className={style.title}>{this.props.params.id !== 'null' ? '编辑资讯' : '创建资讯'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     资讯标题
                                 </span>
                                {getFieldDecorator('email', {
                                    initialValue: this.state.title,
                                    rules: [{required: true, message: '请填写资讯标题!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({
                                            title: e.target.value
                                        })
                                    }} size="large" placeholder="请填写资讯标题"/>)}
                            </FormItem>
                        </div>

                        <div className={style.uploadBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                     资讯封面（可选）
                                 </span>
                                <div>
                                    {/*{getFieldDecorator('upload', {*/}
                                    {/*valuePropName: 'fileList',*/}
                                    {/*getValueFromEvent: this.normFile,*/}
                                    {/*})(*/}
                                    {/*<Upload name="logo" action="/upload.do" listType="picture">*/}
                                    {/*<Button>*/}
                                    {/*<Icon type="upload"/> Click to upload*/}
                                    {/*</Button>*/}
                                    {/*</Upload>*/}
                                    {/*)}*/}
                                    {/*<input type="file" id="file" />*/}
                                    <div id="ossfile"></div>
                                    <div id="container">
                                        <a id="selectfiles" href="javascript:void(0);" className={style.btn}>选择文件</a>
                                        <a id="postfiles" href="javascript:void(0);" className={style.btn}>开始上传</a>
                                    </div>

                                    <pre id="console"></pre>
                                </div>

                            </FormItem>
                        </div>

                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                资讯类型
                            </span>
                                {getFieldDecorator('select', {
                                    initialValue: this.state.typeId,
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

                                <Editor
                                    editorState={this.state.editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                />

                            </FormItem>
                        </div>


                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>

                                {this.props.params.id !== 'null' ? '保存' : '创建'}
                            </Button>
                        </FormItem>
                        <Button size={'large'} onClick={() => hashHistory.push('/information')}>取消</Button>
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