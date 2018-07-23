import React from 'react'
import style from './index.css'
import {hashHistory,Link} from 'react-router'
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
    Badge,
    DatePicker
} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getLogList} from "../../actions/log";

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const data = [
    {
        key: 1,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    },  {
        key: 2,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    },  {
        key: 3,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    },  {
        key: 4,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    },  {
        key: 5,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    },  {
        key: 6,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(value) {
        console.log(`Selected: ${value}`);
    }


    handleSubmit = (e) => {
        this.setState({
            selectedRowKeys: [],
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getLogList({
                    page: 1,
                    beginTime: this.state.beginTime,
                    endTime: this.state.endTime,
                    account: this.state.account,
                    adminName: this.state.adminName
                }, () => {

                })
            }
        });
    }


    componentDidMount() {
        // this.props.getLogList({
        //     page: 1
        // }, () => {
        //
        // })
    }

    render() {
        // if (!this.props.log.logList) {
        //     return null
        // }
        const {getFieldDecorator} = this.props.form;

        const columns = [
            {title: '日期', dataIndex: 'time', key: 'time'},
            {title: '类型', dataIndex: 'type', key: 'type'},
            {title: '金额', dataIndex: 'money', key: 'money'},
            {title: '货币类型', dataIndex: 'coinType', key: 'coinType'},
            {title: '矿工费', dataIndex: 'minersFee', key: 'minersFee'},
            {title: '操作人', dataIndex: 'operator', key: 'operator'},
            {
                title: '系统单据', key: 'receipts', render: (text, record) => (
                    <Link to={'/logDetails/'+record.id}>{record.receipts}</Link>
                ),
            },
        ];
        const rangeConfig = {
            rules: [{type: 'array', required: true, message: 'Please select time!'}],
        };

        return (
            <div className={style.wlop}>
                <span className={style.title}>账单记录</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.contentT}>
                        筛选账单列表
                    </div>
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    日期
                                </span>
                                {getFieldDecorator('range-picker', {
                                    rules: [{
                                        type: 'array',
                                        required: true,
                                        message: '请选择时间范围!'
                                    }],
                                })(
                                    <RangePicker onChange={(e) => {
                                        this.setState({beginTime:new Date(e[0]._d).valueOf()})
                                        this.setState({endTime:new Date(e[1]._d).valueOf()})
                                    }}/>
                                )}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    货币类型
                                </span>
                                {getFieldDecorator('account', {
                                    rules: [{required: true, message: '请选择货币类型!'}],
                                })(
                                    <Select placeholder="请选择货币类型">
                                        <Option value="china">China</Option>
                                        <Option value="use">U.S.A</Option>
                                    </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    账单类型
                                </span>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请选择账单类型!'}],
                                })(
                                    <Select placeholder="请选择账单类型">
                                        <Option value="china">China</Option>
                                        <Option value="use">U.S.A</Option>
                                    </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.button}>
                            <Button type="primary" htmlType="submit" size={'large'}>筛选</Button>
                        </div>
                    </div>
                </Form>
                <div className={style.tableBox}>
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        log: state.log
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLogList: bindActionCreators(getLogList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome