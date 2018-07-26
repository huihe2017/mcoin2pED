import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
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
    Tag,
    Tooltip
} from 'antd';
import {setFundEditData} from "../../../../actions/fund";

const Option = Select.Option;
const {TextArea} = Input;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: (this.props.fund.editFundData && this.props.fund.editFundData.tag.split(',')) || [],
            inputVisible: false,
            inputValue: '',
        };
    }

    handleChange(value) {
        console.log(`Selected: ${value}`);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.props.setFundEditData(
                //     {
                //         title: this.state.title,
                //         tag: this.state.tags,
                //         currency: this.state.currency,
                //         riskType: this.state.riskType,
                //         productDesc: this.state.productDesc,
                //         redeemDesc: this.state.redeemDesc,
                //     }
                // )
                this.props.handle(1)

            }
        });
    }


    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({tags});
    }

    showInput = () => {
        this.setState({inputVisible: true}, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        console.log(tags.length);

        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        if (tags.length > 3) {
            notification['warning']({
                message: '提示',
                description: '最多有三个标签',
            });
            this.setState({
                inputVisible: false,
            });
            return

        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input

    render() {

        if(!this.props.fund.editFundData){
            this.props.fund.editFundData = []
        }
        const {getFieldDecorator} = this.props.form;

        const children = [<Option key={1}>基金组</Option>, <Option key={2}>基金组</Option>, <Option key={3}>基金组</Option>,
            <Option key={4}>基金组</Option>, <Option key={5}>基金组</Option>, <Option key={6}>基金组</Option>,
            <Option key={7}>基金组</Option>];
        const {tags, inputVisible, inputValue} = this.state;
        return (
            <div className={style.wlop}>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     基金名称
                                 </span>
                                {getFieldDecorator('fundName', {
                                    initialValue: this.props.fund.editFundData.title,
                                    rules: [{required: true, message: '请填写基金名称!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.props.setFundEditData({title: e.target.value})
                                    }} size="large" placeholder="请填写基金名称"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox1}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     标签
                                 </span>
                                <div>
                                    {tags.map((tag, index) => {
                                        const isLongTag = tag.length > 3;
                                        const tagElem = (
                                            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                                                {isLongTag ? `${tag.slice(0, 3)}...` : tag}
                                            </Tag>
                                        );
                                        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                    })}
                                    {inputVisible && (
                                        <Input
                                            ref={this.saveInputRef}
                                            type="text"
                                            size="small"
                                            style={{width: 78}}
                                            value={inputValue}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleInputConfirm}
                                            onPressEnter={this.handleInputConfirm}
                                        />
                                    )}
                                    {!inputVisible &&
                                    <Button size="small" type="dashed" onClick={this.showInput}>+ 添加标签</Button>}
                                </div>
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                货币类型
                            </span>
                                {getFieldDecorator('selectCoin', {
                                    initialValue: this.props.fund.editFundData.currency,
                                    rules: [
                                        {required: true, message: '请选择货币类型!'},
                                    ],
                                })(<Select onChange={(e) => {
                                    this.props.setFundEditData({currency: e})
                                }} placeholder="请选择">
                                    <Option value="BTC">BTC</Option>
                                    <Option value="ETH">ETH</Option>
                                </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                            <span className={style.inputBoxT}>
                                风险类型
                            </span>
                                {getFieldDecorator('selectRisk', {
                                    initialValue: this.props.fund.editFundData.riskType,
                                    rules: [
                                        {required: true, message: '请选择风险类型!'},
                                    ],
                                })(<Select onChange={(e) => {
                                    this.props.setFundEditData({riskType: e})
                                }} placeholder="请选择">
                                    <Option value="0">进取型</Option>
                                    <Option value="1">成长型</Option>
                                    <Option value="2">保守型</Option>
                                </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox2}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     申购说明
                                 </span>
                                {getFieldDecorator('buyMean', {
                                    initialValue: this.props.fund.editFundData.productDesc,
                                    rules: [{required: true, message: '请填写申购说明!'}],
                                })(
                                    <TextArea onChange={(e) => {
                                        this.props.setFundEditData({productDesc: e.target.value})
                                    }} rows={4} placeholder="请编辑申购说明"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox2}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     赎回说明
                                 </span>
                                {getFieldDecorator('redeemMean', {
                                    initialValue: this.props.fund.editFundData.redeemDesc,
                                    rules: [{required: true, message: '请填写赎回说明!'}],
                                })(
                                    <TextArea onChange={(e) => {
                                        this.props.setFundEditData({redeemDesc: e.target.value})
                                    }} rows={4} placeholder="请编辑赎回说明"/>)}
                            </FormItem>
                        </div>
                    </div>

                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>下一步</Button>
                        </FormItem>
                    </div>

                </Form>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        fund: state.fund
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFundEditData: bindActionCreators(setFundEditData, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);
export default WrappedHome