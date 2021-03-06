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
import {getOutOrderList, outCoin, getConfirmOutMsg, returnFund} from "../../actions/wallet";

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


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


    getTime(e) {

        let beginDateM = (new Date(e).getMonth() + 1) > 0 ? (new Date(e).getMonth() + 1) : ('0' + new Date(e).getMonth() + 1)
        let beginDateD = (new Date(e).getDate()) > 0 ? (new Date(e).getDate()) : ('0' + new Date(e).getDate())
        console.log(beginDateM);
        console.log(beginDateD);
        let beginDate = new Date(e).getFullYear() + '-' + beginDateM + '-' + beginDateD
        return beginDate
    }


    handleSubmit = (e) => {
        this.setState({
            selectedRowKeys: [],
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.props.getOutOrderList({
                    page: 1,
                    beginDate: this.getTime(this.state.beginDate),
                    endDate: this.getTime(this.state.endDate),
                    currency: this.state.currency
                }, () => {
                    console.log(this.state.beginDate);


                    console.log(this.state.endDate);
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
        this.props.outCoin({
            id: this.state.currentId
        }, () => {
            this.setState({
                visible: false,
            });
            notification.open({
                message: '提示',
                description: '操作成功',
            });
        })

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
                render: (text, record) => {
                    if (record.auditStatus === 3) {
                        return null
                    } else {
                        return <Link to={'/outIndentDetails/' + record.id}>{record.id}</Link>
                    }
                },
            },
            {title: '币种', dataIndex: 'currency', key: 'currency'},
            {title: '转出金额', dataIndex: 'amount', key: 'amount'},
            {
                title: '状态', key: 'auditStatus',
                render: (record) => {
                    // console.log(11,record.auditStatus);
                    if (record.auditStatus === 0) {
                        return '未完成'
                    } else if (record.auditStatus == 1) {
                        return '验证确认完成'
                    } else if (record.auditStatus == 2) {
                        return '管理员审核通过'
                    } else if (record.auditStatus == 3) {
                        return '转出发送成功'
                    } else if (record.auditStatus == 4) {
                        return '审核不通过'
                    } else if (record.auditStatus == 5) {
                        return '转出失败'
                    } else if (record.auditStatus == 6) {
                        return '币额已经退回'
                    } else if (record.auditStatus == 7) {
                        return '已取消'
                    }
                }
            },
            // {
            //     title: '操作', key: 'action', render: (record) => (<a href='javascript:void (0)' onClick={() => {
            //         if (record.action === '确认转出') {
            //             this.showModal()
            //         }
            //     }}>{record.action}</a>),
            // },
            {
                title: '操作', key: 'action', render: (record, value) => {

                    if (record.auditStatus == 2) {
                        return <a onClick={() => {
                            this.props.getConfirmOutMsg({
                                id: record.id
                            }, () => {
                                this.setState({currentId: record.id}, () => {
                                    this.showModal()
                                })

                            })

                        }
                        } href='javascript:void (0)'>确认转出</a>
                    } else if (record == 4) {
                        return <a onClick={() => {
                            this.props.returnFund({
                                id: record.id
                            }, () => {
                                notification.open({
                                    message: '提示',
                                    description: '操作成功',
                                });
                            })
                        }
                        } href='javascript:void (0)'>回退金额</a>
                    } else {
                        return ''
                    }
                }
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
                                {getFieldDecorator('coin', {})(
                                    <Select onChange={(e) => {
                                        this.setState({currency: e})
                                    }} placeholder="请选择" defaultValue="All">
                                        <Option value="BTC">BTC</Option>
                                        <Option value="ETH">ETH</Option>
                                        <Option value="All">All</Option>
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
                        pagination={{
                            total: this.props.wallet.outOrderList.pager.total,
                            pageSize: this.props.wallet.outOrderList.pager.pageSize
                        }}
                        columns={columns}
                        dataSource={this.props.wallet.outOrderList.list}
                        onChange={(pagination) => {
                            this.props.getOutOrderList({
                                page: pagination.current,
                                beginDate: this.state.beginDate,
                                endDate: this.state.endDate,
                                currency: this.state.currency
                            }, () => {

                            })
                        }}
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
                        ：{this.props.wallet.outCoinConfirmMsg && this.props.wallet.outCoinConfirmMsg.withdrawAmount}
                    </p>
                    <p className={style.contentP}>
                        <span className={style.contentS}>
                            钱包余额
                        </span>
                        ：{this.props.wallet.outCoinConfirmMsg && this.props.wallet.outCoinConfirmMsg.walletBalance}
                    </p>
                    <p className={style.contentP}>
                        <span className={style.contentR}>
                        {this.props.wallet.outCoinConfirmMsg && this.props.wallet.outCoinConfirmMsg.warning}
                        </span>
                        {/*<span className={style.contentR}>*/}
                        {/*余额过低*/}
                        {/*</span>*/}
                        {/*<span className={style.contentR}>*/}
                        {/*余额不足*/}
                        {/*</span>*/}
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
        getOutOrderList: bindActionCreators(getOutOrderList, dispatch),
        outCoin: bindActionCreators(outCoin, dispatch),
        returnFund: bindActionCreators(returnFund, dispatch),
        getConfirmOutMsg: bindActionCreators(getConfirmOutMsg, dispatch)

    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome