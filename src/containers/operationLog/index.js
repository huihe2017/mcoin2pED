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
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    }, {
        key: 2,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    }, {
        key: 3,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    },
    {
        key: 4,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    }, {
        key: 5,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    }, {
        key: 6,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    },
    {
        key: 7,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    }, {
        key: 8,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    }, {
        key: 9,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
    }, {
        key: 10,
        time: '2018-6-1 00:30:12',
        log: '创建基金-基金0001号',
        account: 'zhangsan@p95.com',
        name: '张三',
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
        this.props.getLogList({
            page: 1
        }, () => {

        })
    }

    render() {
        if (!this.props.log.logList) {
            return null
        }
        const {getFieldDecorator} = this.props.form;

        const columns = [
            {title: '时间', dataIndex: 'time', key: 'time'},
            {title: '操作日志', dataIndex: 'content', key: 'log'},
            {title: '操作账号', dataIndex: 'account', key: 'account'},
            {title: '姓名', dataIndex: 'name', key: 'name'},
            {
                title: '操作', key: 'action', render: (text, record) => (
                    <Link to={'/logDetails/'+record.id}>查看</Link>
                ),
            },
        ];
        const rangeConfig = {
            rules: [{type: 'array', required: true, message: 'Please select time!'}],
        };

        return (
            <div className={style.wlop}>
                <span className={style.title}>操作日志</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.contentT}>
                        筛选日志列表
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
                                        this.setState({beginTime:new Date(e[0]._d).valueOf()})
                                        this.setState({endTime:new Date(e[1]._d).valueOf()})
                                    }}/>
                                )}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    操作账号
                                </span>
                                {getFieldDecorator('account', {
                                    // rules: [{required: true, message: '请填写你的角色名!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({account: e.target.value})
                                    }} size="large" placeholder="请输入你的角色名"/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    姓名
                                </span>
                                {getFieldDecorator('name', {
                                    // rules: [{required: true, message: '请填写你的角色名!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({adminName: e.target.value})
                                    }} size="large" placeholder="请输入你的角色名"/>)}
                            </FormItem>
                        </div>
                        <div className={style.button}>
                            <Button type="primary" htmlType="submit" size={'large'}>筛选</Button>
                        </div>
                    </div>
                </Form>
                <div className={style.tableBox}>
                    <Table pagination={{total:this.props.log.logList.pager.total,pageSize:this.props.log.logList.pager.pageSize}}
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={this.props.log.logList.list}
                        onChange={(pagination) => {
                            this.props.getLogList({
                                page: pagination.current,
                                beginTime: this.state.beginTime,
                                endTime: this.state.endTime,
                                account: this.state.account,
                                adminName: this.state.adminName
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