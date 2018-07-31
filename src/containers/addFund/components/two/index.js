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
    Tooltip,
    Upload
} from 'antd';
import {setFundEditData} from "../../../../actions/fund";
import upLoad from "../../../../components/upLoad";
import config from "../../../../config";
import {http} from '../../../../common/util'
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
            tags: ['标签1', '标签2'],
            inputVisible: false,
            inputValue: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.props.setFundEditData(
                //     {
                //         period: this.state.period,
                //         limitLowAmount: this.state.limitLowAmount,
                //         price: this.state.price,
                //         limitHighAmount: this.state.limitHighAmount,
                //         limitSoppingTimes: this.state.limitSoppingTimes
                //     }
                // )
                this.props.handle(1)
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
        upLoad('file', (value) => {
            this.props.setFundEditData({fileUrl: value})
        })
    }

    render() {
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
                                     封闭期/天
                                 </span>
                                {getFieldDecorator('close', {
                                    initialValue: this.props.fund.editFundData.period,
                                    rules: [{required: true, message: '请填写封闭期!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.props.setFundEditData({period: e.target.value})
                                    }} size="large" placeholder="请填写封闭期"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     起购金额（如：0.00001）
                                 </span>
                                {getFieldDecorator('minBuy', {
                                    initialValue: this.props.fund.editFundData.limitLowAmount,
                                    rules: [{required: true, message: '请填写起购金额!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.props.setFundEditData({limitLowAmount: e.target.value})
                                    }} size="large" placeholder="请填写起购金额"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     最小递增单位（如：0.00001）
                                 </span>
                                {getFieldDecorator('minAdd', {
                                    initialValue: this.props.fund.editFundData.price,
                                    rules: [{required: true, message: '请填写最小递增单位!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.props.setFundEditData({price: e.target.value})
                                    }} size="large" placeholder="请填写最小递增单位"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     最大限购金额（设置0则不限制购买金额）
                                 </span>
                                {getFieldDecorator('maxBuy', {
                                    initialValue: this.props.fund.editFundData.limitHighAmount,
                                    rules: [{required: true, message: '请填写最大限购金额!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.props.setFundEditData({limitHighAmount: e.target.value})
                                    }} size="large" placeholder="请填写最大限购金额"/>)}
                            </FormItem>
                        </div>
                        {/*<div className={style.inputBox}>*/}
                        {/*<FormItem>*/}
                        {/*<span className={style.inputBoxT}>*/}
                        {/*基金有效期/天（设置0则不限制购基金有效期）*/}
                        {/*</span>*/}
                        {/*{getFieldDecorator('indate', {*/}
                        {/*initialValue: this.props.fund.editFundData.period,*/}
                        {/*rules: [{ required: true, message: '请填写基金有效期!' }],*/}
                        {/*})(*/}
                        {/*<Input onChange={(e)=>{*/}
                        {/*this.props.setFundEditData({period:e.target.value})*/}
                        {/*}} size="large" placeholder="请填写基金有效期"/>)}*/}
                        {/*</FormItem>*/}
                        {/*</div>*/}
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     限购次数（设置0则不限制限购次数）
                                 </span>
                                {getFieldDecorator('limit', {
                                    initialValue: this.props.fund.editFundData.limitSoppingTimes,
                                    rules: [{required: true, message: '请填写限购次数!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.props.setFundEditData({limitSoppingTimes: e.target.value})
                                    }} size="large" placeholder="请填写限购次数"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     年化图表（最少七天）
                                 </span>
                                <div id="ossfile"></div>
                                <div id="container">
                                    <a id="selectfiles" href="javascript:void(0);" className={style.btn}>选择文件</a>
                                    <a id="postfiles" href="javascript:void(0);" className={style.btn}>开始上传</a>
                                </div>

                                <pre id="console"></pre>
                                <span className={style.inputBoxTT}>
                                     *年化图表模板：<a href="javascript:void(0);" target={'_blank'} onClick={() => {
                                    http({
                                        type:'get',
                                        url:'fund/ratetemplet',
                                        success:(response)=>{

                                        }

                                    })
                                }} >点击下载</a>
                                 </span>
                            </FormItem>
                        </div>


                    </div>

                    <div className={style.button}>
                        <Button onClick={() => {
                            this.props.handle(0)
                        }} type="primary" size={'large'}>上一步</Button>
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