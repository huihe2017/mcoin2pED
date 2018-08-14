import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Editor} from 'react-draft-wysiwyg';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {EditorState, convertToRaw, ContentState,convertFromRaw} from 'draft-js';
import {createNotic, getNoticeList, setNoticeStatus} from '../../actions/notice';
import draftToHtml from 'draftjs-to-html';
import {filter} from '../../common/util';
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input, Select, Form} from 'antd';

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
            submitLoading:false
        };
    }

    handleChange(value) {
        console.log(`Selected: ${value}`);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(this.state.content)
                this.setState({
                    submitLoading:true
                })
                let param = {
                    content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                    type: this.state.type,
                    showOrder: this.state.showOrder,
                    title: this.state.title,
                }
                if(this.props.params.id!=='null'){
                    param.id = this.props.params.id
                }


                this.props.createNotic(param, () => {
                    this.setState({
                        submitLoading:false
                    })
                    this.props.history.go(-1)

                    // notification.config({
                    //     placement: 'bottomRight',
                    //     bottom: 50,
                    //     duration: 3,
                    // });
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

	
	getContent = (data)=>{
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
        if (this.props.params.id !== 'null') {

            let data = filter(this.props.notice.noticeList.list,this.props.params.id)
            this.setState({
                content: this.getContent(data.content),
                id: data.id,
                type: data.type,
                showOrder: data.showOrder,
                title: data.title,
            })
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <div className={style.wlop}>
                <span className={style.title}>{this.props.params.id === 'null' ? '创建公告' : '编辑公告'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     标题
                                 </span>
                                {getFieldDecorator('email', {
                                    initialValue: this.state.title,
                                    rules: [{required: true, message: '请填写公告标题!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({
                                            title: e.target.value
                                        })
                                    }} size="large" placeholder="请填写公告标题"/>)}
                            </FormItem>
                        </div>

                        <div className={style.editorBox}>
                           
							
							<Editor
                                        editorState={this.state.editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={this.onEditorStateChange}
                                    />
							
                        </div>

                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                适用平台
                            </span>
                                {getFieldDecorator('select', {
                                    initialValue: this.state.type,
                                    rules: [
                                        {required: true, message: '请选择适用平台!'},
                                    ],
                                })(
                                    <Select onChange={(e) => {
                                        this.setState({
                                            type: e
                                        })
                                    }} placeholder="请选择">
                                        <Option value={0}>PC端</Option>
                                        <Option value={1}>安卓</Option>
                                        <Option value={2}>ios</Option>
                                        <Option value={3}>H5</Option>
                                        <Option value={4}>通用</Option>
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
                                    initialValue: this.state.showOrder,
                                    rules: [{required: true, message: '优先级不得为空!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({
                                            showOrder: e.target.value
                                        })
                                    }} size="large" placeholder=""/>)}</FormItem>
                        </div>
                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'} loading={this.state.submitLoading}>
                                {this.props.params.id === 'null' ? '创建' : '保存'}
                            </Button>
                        </FormItem>
                        <Button size={'large'} onClick={()=>hashHistory.push('/notice')}>取消</Button>
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