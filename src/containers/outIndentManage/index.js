import React from 'react'
import style from './index.css'
import {hashHistory, Link} from 'react-router'
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
    DatePicker,
    Modal
} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getOutOrderList} from "../../actions/wallet";

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const data = [
    {
        time: '2018-6-1',
        type: '用户转出',
        bills: '123549846514316465',
        coinType: 'BTC',
        outMoney: '0.123456',
        state: '转出失败',
        action: '回退金额',
    }, {
        time: '2018-4-1',
        type: '资产转出',
        bills: '123549846514316465',
        coinType: 'BTC',
        outMoney: '0.123456',
        state: '转出失败',
        action: '确认转出',
    }, {
        time: '2018-7-1',
        type: '资产转出',
        bills: '123549846514316465',
        coinType: 'BTC',
        outMoney: '0.123456',
        state: '审核通过',
        action: '确认转出',
    }, {
        time: '2018-6-4',
        type: '用户转出',
        bills: '123549846514316465',
        coinType: 'BTC',
        outMoney: '0.123456',
        state: '转出失败',
        action: '回退金额',
    }, {
        time: '2018-7-1',
        type: '资产转出',
        bills: '123549846514316465',
        coinType: 'BTC',
        outMoney: '0.123456',
        state: '审核通过',
        action: '确认转出',
    }, {
        time: '2018-6-4',
        type: '用户转出',
        bills: '123549846514316465',
        coinType: 'BTC',
        outMoney: '0.123456',
        state: '转出失败',
        action: '回退金额',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
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

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        this.props.getOutOrderList({
            page: 1
        }, () => {

        })
    }

    render() {
        if (!this.props.wallet.outOrderList) {
            return null
        }
        const {getFieldDecorator} = this.props.form;
        const columns = [
            {title: '日期', dataIndex: 'postTime', key: 'postTime'},
            {title: '类型', dataIndex: 'type', key: 'type'},
            {
                title: '单据',
                dataIndex: 'id',
                key: 'id',
                render: (text, record) => (<Link to={'/logDetails/' + record.id}>{record.id}</Link>),
            },
            {title: '币种', dataIndex: 'currency', key: 'currency'},
            {title: '转出金额', dataIndex: 'amount', key: 'amount'},
            {title: '状态', dataIndex: 'auditStatus', key: 'auditStatus'},
            // {
            //     title: '操作', key: 'action', render: (record) => (<a href='javascript:void (0)' onClick={() => {
            //         if (record.action === '确认转出') {
            //             this.showModal()
            //         }
            //     }}>{record.action}</a>),
            // },
            {
                title: '操作', key: 'action', render: (record) => {return (<a href='javascript:void (0)' onClick={() => {
                    if (record.action === '确认转出') {
                        this.showModal()
                    }
                }}>{record.action}</a>)},
            },
        ];
        const rangeConfig = {
            rules: [{type: 'array', required: true, message: 'Please select time!'}],
        };

        return (
            <div className={style.wlop}>
                <span className={style.title}>转出订单管理</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.contentT}>
                        筛选转出订单列表
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
                                        this.setState({beginTime: new Date(e[0]._d).valueOf()})
                                        this.setState({endTime: new Date(e[1]._d).valueOf()})
                                    }}/>
                                )}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    货币类型
                                </span>
                                {getFieldDecorator('coin', {
                                    rules: [{required: true, message: '请填写你的角色名!'}],
                                })(
                                    <Select placeholder="请选择" defaultValue="all">
                                        <Option value="all">全部</Option>
                                        <Option value="btc">BTC</Option>
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
                        dataSource={this.props.wallet.outOrderList.list}
                    />
                </div>
                <Modal
                    title="转出确认"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText={'放弃'}
                    okText={'确认转出'}
                >
                    <p className={style.contentP}>
                        <span className={style.contentS}>
                            转出
                        </span>
                        ：0.1234156 BTC
                    </p>
                    <p className={style.contentP}>
                        <span className={style.contentS}>
                            钱包余额
                        </span>
                        ：100.1234897BTC
                    </p>
                    <p className={style.contentP}>
                        <span className={style.contentR}>
                            已超出钱包余额的10% <br/>
                            余额过低
                        </span>
                        <span className={style.contentR}>
                            余额过低
                        </span>
                        <span className={style.contentR}>
                            余额不足
                        </span>
                    </p>
                </Modal>
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
        getOutOrderList: bindActionCreators(getOutOrderList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome