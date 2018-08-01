import React from 'react'
import style from './index.css'
import {hashHistory, Link} from 'react-router'
import {filter} from "../../common/util";
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
import {getBillList,getWalletBillList} from "../../actions/wallet";

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
    }, {
        key: 2,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    }, {
        key: 3,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    }, {
        key: 4,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    }, {
        key: 5,
        time: '2018-6-1 00:30:12',
        type: '用户充值',
        money: '+100.0000000',
        coinType: 'BYC',
        minersFee: 0,
        operator: '张三',
        receipts: '20181346841646',
    }, {
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
                this.props.getWalletBillList({
                    page: 1,
                    currency: this.state.currency,
                    type: this.state.type,
                    beginDate: this.state.beginDate,
                    endDate: this.state.endDate
                }, () => {

                })
            }
        });
    }


    componentDidMount() {
        this.props.getWalletBillList({
            page: 1
        }, () => {

        })
    }

    render() {
        if (!this.props.wallet.walletBillList) {
            return null
        }
        const {getFieldDecorator} = this.props.form;

        const columns = [
            {title: '日期', dataIndex: 'postTime', key: 'postTime'},
            {title: '类型', dataIndex: 'type', key: 'type'},
            {title: '金额', dataIndex: 'amount', key: 'amount'},
            {title: '货币类型', dataIndex: 'currency', key: 'currency'},
            {title: '矿工费', dataIndex: 'fee', key: 'fee'},
            {title: '操作人', dataIndex: 'withdrawAdmin', key: 'withdrawAdmin'},
            {
                title: '系统单据', key: 'receipts', render: (text, record) => (
                    <Link to={'/billRecordDetails/' + record.id}>{record.id}</Link>
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
                                        // required: true,
                                        // message: '请选择时间范围!'
                                    }],
                                })(
                                    <RangePicker onChange={(e) => {
                                        this.setState({beginDate: new Date(e[0]._d).valueOf()})
                                        this.setState({endDate: new Date(e[1]._d).valueOf()})
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
                                    // rules: [{required: true, message: '请选择货币类型!'}],
                                })(
                                    <Select onChange={(e)=>{
                                        this.setState({currency:e})
                                    }} placeholder="请选择货币类型">
                                        <Option value="btc">BTC</Option>
                                        <Option value="eth">ETH</Option>
                                    </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    账单类型
                                </span>
                                {getFieldDecorator('name', {
                                    // rules: [{required: true, message: '请选择账单类型!'}],
                                })(
                                    <Select onChange={(e)=>{
                                        this.setState({type:e})
                                    }} placeholder="请选择账单类型">
                                        <Option value={0}>用户转入</Option>
                                        <Option value={1}>用户充值</Option>
                                        <Option value={2}>用户提币</Option>
                                        <Option value={3}>管理员充值</Option>
                                        <Option value={4}>管理员提币</Option>
                                    </Select>)}
                            </FormItem>
                        </div>
                        <div className={style.button}>
                            <Button type="primary" htmlType="submit" size={'large'}>筛选</Button>
                        </div>
                    </div>
                </Form>
                <div className={style.tableBox}>
                    <Table pagination={{total:this.props.wallet.walletBillList.pager.total}}
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={this.props.wallet.walletBillList.list}
                        onChange={(pagination) => {
                            this.props.getWalletBillList({
                                page: pagination.current,
                                currency: this.state.currency,
                                type: this.state.type,
                                beginDate: this.state.beginDate,
                                endDate: this.state.endDate
                            }, () => {

                            })
                        }}
                    />
                </div>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getWalletBillList: bindActionCreators(getWalletBillList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome