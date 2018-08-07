import React from 'react'
import style from './index.css'
import {hashHistory, Link} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    getFundList,
    setRecommend,
    cancelRecommend,
    applyStop,
    applyUse,
    removeFund,
    getFundDetails,
    clearEditFundData
} from '../../actions/fund'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Modal, Input, DatePicker} from 'antd';
import {Form} from "antd/lib/index";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }


    componentDidMount() {
        this.props.getFundList({
            page: 1
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.setRecommend({
                    id: this.state.currentEdit,
                    showOrder: this.state.showOrder,
                    endTime: this.state.endTime,
                }, () => {
                    this.setState({
                        visible: false,
                    });
                })

            } else {
                console.log(1);

            }
        });


    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }


    render() {
        if (!this.props.fund.fundList) {
            return null
        }
        const columns = [
            {
                title: '基金名称',
                dataIndex: 'title'
            }, {
                title: '封闭期',
                dataIndex: 'period',
                render: (record) => {
                    return (record + '天')
                }
            }, {
                title: '货币类型',
                dataIndex: 'currency'
            }, {
                title: '昨日年化',
                dataIndex: 'yearProfitRate'
            }, {
                title: '状态',
                dataIndex: 'status',
                render: (text, record) => {
                    if (text == 0) {
                        return '待审核'
                    }
                    if (text == 1) {
                        return '上线'
                    }
                    if (text == 2) {
                        return '暂停待审核'
                    }
                    if (text == 3) {
                        return '已关闭购买入口'
                    }
                    if (text == 4) {
                        return '下线'
                    }
                    if (text == 5) {
                        return '移除'
                    }
                }
            }, {
                title: '是否推荐',
                dataIndex: 'recommend',
                render: (record) => {
                    return (record ? '是' : '否')
                }
            }, {
                title: '优先级',
                dataIndex: 'showOrder'
            }, {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Dropdown trigger={['click']} overlay={<Menu>
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)" onClick={() => {
                                    this.props.getFundDetails({
                                        id: record.id
                                    }, () => {

                                        hashHistory.push('/addFund/' + record.id)
                                    })
                                }}>编辑</a>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={'/earningsSetting/' + record.id}>收益配置</Link>
                            </Menu.Item>
                            <Menu.Item>
                                {
                                    record.recommend ?
                                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)"
                                           onClick={() => {
                                               this.props.cancelRecommend({
                                                   id: record.id
                                               }, () => {
                                                   notification.open({
                                                       message: '提示',
                                                       description: '操作成功',
                                                   });
                                               })
                                           }}>取消推荐
                                        </a>

                                        :
                                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)"
                                           onClick={() => {
                                               this.setState({currentEdit: record.id})
                                               this.showModal()
                                           }}>设置推荐
                                        </a>
                                }


                            </Menu.Item>
                            <Menu.Item>
                                {
                                    record.status == 1 ?
                                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)"
                                           onClick={() => {
                                               this.props.applyStop({
                                                   id: record.id
                                               }, () => {
                                                   notification.open({
                                                       message: '提示',
                                                       description: '操作成功',
                                                   });
                                               })
                                           }
                                           }>暂停</a> : ''
                                }
                                {
                                    record.status == 4 ?
                                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)"
                                           onClick={() => {
                                               this.props.applyUse({
                                                   id: record.id
                                               }, () => {
                                                   notification.open({
                                                       message: '提示',
                                                       description: '操作成功',
                                                   });
                                               })
                                           }
                                           }>启用</a> : ''
                                }
                                {
                                    (record.status == 0 || record.status == 2 || record.status == 3) ?
                                        <a target="_blank" rel="noopener noreferrer" href="javascript:void (0)"
                                           onClick={() => {
                                               this.props.removeFund({
                                                   id: record.id
                                               }, () => {
                                                   notification.open({
                                                       message: '提示',
                                                       description: '操作成功',
                                                   });
                                               })
                                           }
                                           }>移除</a> : ''
                                }
                                {
                                    (record.status == 5) ?
                                        '' : ''
                                }

                            </Menu.Item>
                        </Menu>}>
                            <a className="ant-dropdown-link" href="#">
                                管理 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    )
                },
            }];
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={style.wlop}>
                <span className={style.title}>基金管理</span>
                <Button type="primary" size='large' onClick={() => {

                    this.props.clearEditFundData()
                    hashHistory.push('/addFund/null')
                }}>创建基金</Button>
                <div className={style.table}>
                    <Table pagination={{total: this.props.fund.fundList.pager.total,pageSize: this.props.fund.fundList.pager.pageSize}} onChange={(pagination) => {
                        this.props.getFundList({
                            page: pagination.current
                        })
                    }} columns={columns} dataSource={this.props.fund.fundList.list}/>
                </div>
                <Modal
                    title="设置推荐参数"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Form onSubmit={this.handleOk.bind(this)} className="login-form">
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    结束日期
                                </span>
                                {getFieldDecorator('data', {
                                    rules: [{type: 'object', required: true, message: '请选择结束日期!'}],
                                })(<DatePicker onChange={(e) => {
                                    this.setState({endTime: (new Date(e)).valueOf()})
                                }}/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    优先级
                                </span>
                                {getFieldDecorator('priority', {
                                    rules: [{required: true, message: '请填写优先级!'}],
                                })(<Input onChange={(e) => {
                                    this.setState({showOrder: e.target.value})
                                }} size="large" placeholder="请填写优先级"/>)}
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
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
        getFundList: bindActionCreators(getFundList, dispatch),
        clearEditFundData: bindActionCreators(clearEditFundData, dispatch),
        setRecommend: bindActionCreators(setRecommend, dispatch),
        cancelRecommend: bindActionCreators(cancelRecommend, dispatch),
        removeFund: bindActionCreators(removeFund, dispatch),
        applyStop: bindActionCreators(applyStop, dispatch),
        getFundDetails: bindActionCreators(getFundDetails, dispatch),
        applyUse: bindActionCreators(applyUse, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome