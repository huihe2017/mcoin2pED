import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setFundEditData, createFund} from "../../../../actions/fund";
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

const Option = Select.Option;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.createFund(this.props.fund.editFundData,()=>{
                    console.log(this.props)
                    // this.props.history.go(-1)
                    hashHistory.push('/fund')
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={style.wlop}>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     活动选择
                                 </span>
                                {getFieldDecorator('activity', {
                                    initialValue: this.props.fund.editFundData.activityId,
                                    rules: [{required: true, message: '请选择活动!'}],
                                })(
                                    <Select onChange={(e) => {
                                        this.props.setFundEditData({activityId: e})
                                    }} placeholder="请选择活动">
                                        <Option value="china">China</Option>
                                        <Option value="use">U.S.A</Option>
                                    </Select>)}
                            </FormItem>
                        </div>


                    </div>

                    <div className={style.button}>
                        <Button onClick={() => {
                            this.props.handle(0)
                        }} type="primary" size={'large'}>上一步</Button>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>提交</Button>
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
        setFundEditData: bindActionCreators(setFundEditData, dispatch),
        createFund: bindActionCreators(createFund, dispatch)

    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome