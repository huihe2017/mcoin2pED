import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {createActivity} from '../../actions/activity'
import {getRoleList} from '../../actions/role'
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
    Upload,
    Tabs,
    Checkbox,
    Col
} from 'antd';
import {filter} from "../../common/util";

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeBuy: 0,
            typeRedeem: 0,
            typeReg: 0,
            typeProfit: 0


        };
    }

    handleChange = (value) => {
        this.setState({selectPlatform: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let typeBuy = this.state.typeBuy
                let typeRedeem = this.state.typeRedeem
                let typeReg = this.state.typeReg
                let typeProfit = this.state.typeProfit
                if (typeBuy === 0 && typeRedeem === 0 && typeReg === 0 && typeProfit === 0) {
                    notification.open({
                        message: '提示',
                        description: '必须选择一个活动类型',
                    });
                    return false
                }

                this.props.createActivity(this.state, () => {
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                    this.props.history.go(-1)
                })
                console.log(1);
            } else {
                console.log(2);
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
        if (this.props.params.id !== 'null') {

            let data = filter(this.props.activity.activityList.list,this.props.params.id)
            this.setState(data)
        }
    }

    reSet = (e) => {
        // if(a==='buyMoney'){
        // console.log(this.props.form);
        // this.props.form.setFieldsValue({
        //     buyMoney1:1
        // })
        // this.props.form.setFieldsValue({
        //     buyMoney1:1
        // })
        //     this.setState({
        //         buyMoney:!this.state.buyMoney
        //     },()=>{
        //         console.log('buyMoney',this.state.buyMoney);
        //     })
        // }else if(a==='redeemMoney'){
        //     this.setState({
        //         redeemMoney:e.target.redeemMoney
        //     },()=>{
        //         console.log(this.state.redeemMoney);
        //     })
        // }else if(a==='pullRebate'){
        //     this.setState({
        //         pullRebate:e.target.pullRebate
        //     },()=>{
        //         console.log(this.state.pullRebate);
        //     })
        // }else if(a==='earnings'){
        //     this.setState({
        //         earnings:e.target.earnings
        //     },()=>{
        //         console.log(this.state.earnings);
        //     })
        // }

    }

    render() {
        // if (!this.props.role.roleList) {
        //     return null
        // }
        const {getFieldDecorator} = this.props.form;

        // let children = this.props.role.roleList.list.map((obj) => {
        //     return <Option key={obj.id}>{obj.name}</Option>
        // })

        return (
            <div className={style.wlop}>
                <span className={style.title}>{this.props.params.id ? '修改活动' : '创建活动'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.contentT}>
                        活动基本信息
                    </div>
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                 <span className={style.inputBoxT}>
                                     活动名称
                                 </span>
                                {getFieldDecorator('name', {
                                    initialValue: this.state.name,
                                    rules: [{required: true, message: '请填写banner名称!'}],
                                })(
                                    <Input
                                        disabled={this.state.account ? true : false}
                                        onChange={(e) => {
                                            this.setState({name: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    有效期/天
                                </span>
                                {getFieldDecorator('day', {
                                    initialValue: this.state.days,
                                    rules: [{required: true, message: '请填写跳转链接!'}],
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({days: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="申购" key="1">
                            <div className={style.content1}>
                                <FormItem style={{marginBottom: 8}}>
                                    {getFieldDecorator('buyMoney', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.typeBuy,

                                    })(
                                        <Checkbox onChange={() => {
                                            this.setState({typeBuy: this.state.typeBuy ? 0 : 1}, () => {
                                                this.props.form.validateFields(['level2BuyUp'], {force: true});
                                                this.props.form.validateFields(['level2BuyDown'], {force: true});
                                                this.props.form.validateFields(['level1BuyRebate'], {force: true});
                                                this.props.form.validateFields(['level2BuyRebate'], {force: true});
                                                this.props.form.validateFields(['level3BuyRebate'], {force: true});
                                            })
                                        }}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级申购返利本金
                                         </span>
                                        {getFieldDecorator('level2BuyUp', {
                                            initialValue: this.state.buy1UpLimit,
                                            rules: [{required: this.state.typeBuy, message: '请填写banner名称!'}],
                                        })(
                                            <Input

                                                onChange={(e) => {
                                                    this.setState({buy1UpLimit: e.target.value})
                                                }} size="large" placeholder="即2级申购返利本金上限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT1}>
                                            2级申购返利本金
                                        </span>

                                        <Col span={11}>
                                            {getFieldDecorator('level2BuyDown', {
                                                initialValue: this.state.buy2LowLimit,
                                                rules: [{required: this.state.typeBuy, message: '请填写跳转链接!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({buy2LowLimit: e.target.value})
                                                    }} size="large" placeholder="下限"/>)}
                                        </Col>
                                        <Col span={2}>
        <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
          -
        </span>
                                        </Col>
                                        <Col span={11}>
                                            {getFieldDecorator('level2BuyUp', {
                                                initialValue: this.state.buy2UpLimit,
                                                rules: [{required: this.state.typeBuy, message: '请填写跳转链接!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({buy2UpLimit: e.target.value})
                                                    }} size="large" placeholder="上限"/>)}
                                        </Col>

                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            3级申购返利本金
                                        </span>
                                        {getFieldDecorator('level2BuyDown', {
                                            initialValue: this.state.buy2LowLimit,
                                            rules: [{required: this.state.typeBuy, message: '请填写优先级!'}],
                                        })(
                                            <Input
                                                value={this.state.priority || ''}
                                                onChange={(e) => {
                                                    this.setState({buy2LowLimit: e.target.value})
                                                }} size="large" placeholder="即2级申购返利本金下限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级申购返利系数
                                         </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('level1BuyRebate', {
                                                initialValue: this.state.buy1Rate,
                                                rules: [{required: this.state.typeBuy, message: '请填写banner名称!'}],
                                            })(
                                                <Input
                                                    disabled={this.state.account ? true : false}
                                                    onChange={(e) => {
                                                        this.setState({buy1Rate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            2级申购返利系数
                                        </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('level2BuyRebate', {
                                                initialValue: this.state.buy2Rate,
                                                rules: [{required: this.state.typeBuy, message: '请填写跳转链接!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({buy2Rate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            3级申购返利系数
                                        </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('level3BuyRebate', {
                                                initialValue: this.state.buy3Rate,
                                                rules: [{required: this.state.typeBuy, message: '请填写优先级!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({buy3Rate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>
                                    </FormItem>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="赎回" key="2">
                            <div className={style.content1}>
                                <FormItem style={{marginBottom: 8}}>
                                    {getFieldDecorator('redeemMoney', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.typeRedeem,
                                    })(
                                        <Checkbox onChange={() => {
                                            this.setState({typeRedeem: this.state.typeRedeem ? 0 : 1}, () => {
                                                this.props.form.validateFields(['level2RedeemUp'], {force: true});
                                                this.props.form.validateFields(['level2RedeemDown'], {force: true});
                                                this.props.form.validateFields(['level1RedeemRebate'], {force: true});
                                                this.props.form.validateFields(['level2RedeemRebate'], {force: true});
                                                this.props.form.validateFields(['level3RedeemRebate'], {force: true});
                                            })
                                        }}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级赎回返利本金
                                         </span>
                                        {getFieldDecorator('level2RedeemUp', {
                                            initialValue: this.state.redeem1UpLimit,
                                            rules: [{required: this.state.typeRedeem, message: '即1级赎回返利本金上限!'}],
                                        })(
                                            <Input
                                                disabled={this.state.account ? true : false}
                                                onChange={(e) => {
                                                    this.setState({redeem1UpLimit: e.target.value})
                                                }} size="large" placeholder="即1级赎回返利本金上限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT1}>
                                            2级赎回返利本金
                                        </span>
                                        <Col span={11}>
                                            {getFieldDecorator('level2RedeemUp', {
                                                initialValue: this.state.redeem2LowLimit,
                                                rules: [{required: this.state.typeRedeem, message: '请填写跳转链接!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({redeem2LowLimit: e.target.value})
                                                    }} size="large" placeholder="上限"/>)}
                                        </Col>
                                        <Col span={2}>
        <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
          -
        </span>
                                        </Col>
                                        <Col span={11}>
                                            {getFieldDecorator('level2RedeemDown', {
                                                initialValue: this.state.redeem2UpLimit,
                                                rules: [{required: this.state.typeRedeem, message: '请填写跳转链接!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({redeem2UpLimit: e.target.value})
                                                    }} size="large" placeholder="下限"/>)}
                                        </Col>

                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            3级赎回返利本金
                                        </span>
                                        {getFieldDecorator('level2RedeemDown', {
                                            initialValue: this.state.redeem3LowLimit,
                                            rules: [{required: this.state.typeRedeem, message: '请填写优先级!'}],
                                        })(
                                            <Input
                                                value={this.state.priority || ''}
                                                onChange={(e) => {
                                                    this.setState({redeem3LowLimit: e.target.value})
                                                }} size="large" placeholder="即2级赎回返利本金下限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级赎回返利系数
                                         </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('level1RedeemRebate', {
                                                initialValue: this.state.redeem1Rate,
                                                rules: [{required: this.state.typeRedeem, message: '请填写banner名称!'}],
                                            })(
                                                <Input
                                                    disabled={this.state.account ? true : false}
                                                    onChange={(e) => {
                                                        this.setState({redeem1Rate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            2级赎回返利系数
                                        </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('level2RedeemRebate', {
                                                initialValue: this.state.redeem2Rate,
                                                rules: [{required: this.state.typeRedeem, message: '请填写跳转链接!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({redeem2Rate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            3级赎回返利系数
                                        </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('level3RedeemRebate', {
                                                initialValue: this.state.redeem3Rate,
                                                rules: [{required: this.state.typeRedeem, message: '请填写优先级!'}],
                                            })(
                                                <Input
                                                    value={this.state.priority || ''}
                                                    onChange={(e) => {
                                                        this.setState({redeem3Rate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>
                                    </FormItem>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="拉新返利" key="3">
                            <div className={style.content1}>
                                <FormItem style={{marginBottom: 8}}>
                                    {getFieldDecorator('pullRebate', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.typeReg,
                                    })(
                                        <Checkbox onChange={() => {
                                            this.setState({typeReg: this.state.typeReg ? 0 : 1}, () => {
                                                this.props.form.validateFields(['basicBonus'], {force: true});
                                                this.props.form.validateFields(['backCoefficient'], {force: true});

                                            })
                                        }}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             基本奖金
                                         </span>
                                        {getFieldDecorator('basicBonus', {
                                            initialValue: this.state.regAward,
                                            rules: [{required: this.state.typeReg, message: '请填写banner名称!'}],
                                        })(
                                            <Input
                                                onChange={(e) => {
                                                    this.setState({regAward: e.target.value})
                                                }} size="large" placeholder=""/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            返利系数
                                        </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('backCoefficient', {
                                                initialValue: this.state.regAwardRate,
                                                rules: [{required: this.state.typeReg, message: '请填写跳转链接!'}],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({regAwardRate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>
                                    </FormItem>
                                </div>

                            </div>
                        </TabPane>
                        <TabPane tab="收益率" key="4">
                            <div className={style.content1}>
                                <FormItem style={{marginBottom: 8}}>
                                    {getFieldDecorator('earnings', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.typeProfit,
                                    })(
                                        <Checkbox onChange={(e) => {
                                            this.setState({typeProfit: this.state.typeProfit ? 0 : 1}, () => {
                                                this.props.form.validateFields(['addIncome'], {force: true})

                                            })
                                        }}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             收益提高
                                         </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('addIncome', {
                                                initialValue: this.state.profitIncreaseRate,
                                                rules: [{
                                                    required: this.state.typeProfit,
                                                    message: '请填写banner名称!'
                                                }],
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({profitIncreaseRate: e.target.value})
                                                    }} size="large" placeholder=""/>)}
                                            <span className={style.inputBoxbb}>
                                                   %
                                            </span>
                                        </div>

                                    </FormItem>
                                </div>

                            </div>
                        </TabPane>
                    </Tabs>


                    <div className={style.button}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size={'large'}>创建</Button>
                        </FormItem>
                        <Button onClick={() => {
                            this.props.history.go(-1)
                        }} size={'large'}>取消</Button>
                    </div>

                </Form>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        activity: state.activity
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createActivity: bindActionCreators(createActivity, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);


export default WrappedHome