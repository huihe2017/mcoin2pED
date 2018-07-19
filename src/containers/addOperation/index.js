import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {addAccount, editAccountMsg} from '../../actions/account'
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
            buyMoney:false,
            redeemMoney:false,
            pullRebate:false,
            earnings:false,

        };
    }

    handleChange = (value) => {
        this.setState({selectPlatform: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // let params = {
                //     password: this.state.password,
                //     account: this.state.account,
                //     name: this.state.name,
                //     mobile: this.state.mobile,
                //     roles: this.state.roles,
                // }
                //
                // this.props.addAccount(params, () => {
                //     this.props.history.go(-1)
                // })
                console.log(1);
            }else {
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

    }
    reSet=(e)=>{
        // if(a==='buyMoney'){
        console.log(this.props.form);
        this.props.form.setFieldsValue({
            buyMoney1:1
        })
        this.props.form.setFieldsValue({
            buyMoney1:1
        })
            this.setState({
                buyMoney:!this.state.buyMoney
            },()=>{
                console.log('buyMoney',this.state.buyMoney);
            })
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
                                {getFieldDecorator('bannerName', {
                                    rules: [{required: true, message: '请填写banner名称!'}],
                                    initialValue: this.state.account
                                })(
                                    <Input
                                        disabled={this.state.account ? true : false}
                                        onChange={(e) => {
                                            this.setState({bannerName: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    有效期/天
                                </span>
                                {getFieldDecorator('link', {
                                    rules: [{required: true, message: '请填写跳转链接!'}],
                                    initialValue: this.state.name
                                })(
                                    <Input
                                        onChange={(e) => {
                                            this.setState({link: e.target.value})
                                        }} size="large" placeholder=""/>)}
                            </FormItem>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="申购" key="1">
                            <div className={style.content1}>
                                <FormItem  style={{ marginBottom: 8 }}>
                                    {getFieldDecorator('buyMoney', {

                                    })(
                                        <Checkbox onChange={this.reSet.bind(this,'buyMoney')}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级申购返利本金
                                         </span>
                                        {getFieldDecorator('buyMoney1', {
                                            rules: [{required: this.state.buyMoney, message: '请填写banner名称!'}],
                                            initialValue: this.state.account
                                        })(
                                            <Input
                                                disabled={this.state.account ? true : false}
                                                onChange={(e) => {
                                                    this.setState({bannerName: e.target.value})
                                                }} size="large" placeholder="即2级申购返利本金上限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT1}>
                                            2级申购返利本金
                                        </span>
                                        <Col span={11}>
                                            {getFieldDecorator('buyMoney1', {
                                                rules: [{required: this.state.buyMoney, message: '请填写跳转链接!'}],
                                                initialValue: this.state.name
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({link: e.target.value})
                                                    }} size="large" placeholder="上限"/>)}
                                        </Col>
                                        <Col span={2}>
        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
          -
        </span>
                                        </Col>
                                        <Col span={11}>
                                            {getFieldDecorator('buyMoney3', {
                                                rules: [{required: true, message: '请填写跳转链接!'}],
                                                initialValue: this.state.name
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({link: e.target.value})
                                                    }} size="large" placeholder="下限"/>)}
                                        </Col>

                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            3级申购返利本金
                                        </span>
                                        {getFieldDecorator('buyMoney3', {
                                            rules: [{required: this.state.buyMoney, message: '请填写优先级!'}],
                                            initialValue: this.state.mobile
                                        })(
                                            <Input
                                                value={this.state.priority || ''}
                                                onChange={(e) => {
                                                    this.setState({priority: e.target.value})
                                                }} size="large" placeholder="即2级申购返利本金下限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级申购返利系数
                                         </span>
                                        <div className={style.inputBoxb}>
                                        {getFieldDecorator('buyRatio1', {
                                            rules: [{required: this.state.buyMoney, message: '请填写banner名称!'}],
                                            initialValue: this.state.account
                                        })(
                                            <Input
                                                disabled={this.state.account ? true : false}
                                                onChange={(e) => {
                                                    this.setState({bannerName: e.target.value})
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
                                        {getFieldDecorator('buyRatio2', {
                                            rules: [{required: this.state.buyMoney, message: '请填写跳转链接!'}],
                                            initialValue: this.state.name
                                        })(
                                            <Input
                                                onChange={(e) => {
                                                    this.setState({link: e.target.value})
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
                                        {getFieldDecorator('buyRatio3', {
                                            rules: [{required: this.state.buyMoney, message: '请填写优先级!'}],
                                            initialValue: this.state.mobile
                                        })(
                                            <Input
                                                value={this.state.priority || ''}
                                                onChange={(e) => {
                                                    this.setState({priority: e.target.value})
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
                                <FormItem  style={{ marginBottom: 8 }}>
                                    {getFieldDecorator('redeemMoney', {

                                    })(
                                        <Checkbox onChange={this.reSet.bind(this,'redeemMoney')}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级赎回返利本金
                                         </span>
                                        {getFieldDecorator('redeemMoney1', {
                                            rules: [{required: this.state.redeemMoney, message: '即1级赎回返利本金上限!'}],
                                            initialValue: this.state.account
                                        })(
                                            <Input
                                                disabled={this.state.account ? true : false}
                                                onChange={(e) => {
                                                    this.setState({bannerName: e.target.value})
                                                }} size="large" placeholder="即1级赎回返利本金上限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT1}>
                                            2级赎回返利本金
                                        </span>
                                        <Col span={11}>
                                            {getFieldDecorator('redeemMoney1', {
                                                rules: [{required: this.state.redeemMoney, message: '请填写跳转链接!'}],
                                                initialValue: this.state.name
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({link: e.target.value})
                                                    }} size="large" placeholder="上限"/>)}
                                        </Col>
                                        <Col span={2}>
        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
          -
        </span>
                                        </Col>
                                        <Col span={11}>
                                            {getFieldDecorator('redeemMoney3', {
                                                rules: [{required: true, message: '请填写跳转链接!'}],
                                                initialValue: this.state.name
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({link: e.target.value})
                                                    }} size="large" placeholder="下限"/>)}
                                        </Col>

                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            3级赎回返利本金
                                        </span>
                                        {getFieldDecorator('redeemMoney3', {
                                            rules: [{required: this.state.redeemMoney, message: '请填写优先级!'}],
                                            initialValue: this.state.mobile
                                        })(
                                            <Input
                                                value={this.state.priority || ''}
                                                onChange={(e) => {
                                                    this.setState({priority: e.target.value})
                                                }} size="large" placeholder="即2级赎回返利本金下限"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             1级赎回返利系数
                                         </span>
                                        <div className={style.inputBoxb}>
                                        {getFieldDecorator('redeemRatio1', {
                                            rules: [{required: this.state.redeemMoney, message: '请填写banner名称!'}],
                                            initialValue: this.state.account
                                        })(
                                            <Input
                                                disabled={this.state.account ? true : false}
                                                onChange={(e) => {
                                                    this.setState({bannerName: e.target.value})
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
                                        {getFieldDecorator('redeemRatio2', {
                                            rules: [{required: this.state.redeemMoney, message: '请填写跳转链接!'}],
                                            initialValue: this.state.name
                                        })(
                                            <Input
                                                onChange={(e) => {
                                                    this.setState({link: e.target.value})
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
                                        {getFieldDecorator('redeemRatio3', {
                                            rules: [{required: this.state.redeemMoney, message: '请填写优先级!'}],
                                            initialValue: this.state.mobile
                                        })(
                                            <Input
                                                value={this.state.priority || ''}
                                                onChange={(e) => {
                                                    this.setState({priority: e.target.value})
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
                                <FormItem  style={{ marginBottom: 8 }}>
                                    {getFieldDecorator('pullRebate', {

                                    })(
                                        <Checkbox onChange={this.reSet.bind(this,'pullRebate')}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             基本奖金
                                         </span>
                                        {getFieldDecorator('basicBonus', {
                                            rules: [{required: this.state.pullRebate, message: '请填写banner名称!'}],
                                            initialValue: this.state.account
                                        })(
                                            <Input
                                                disabled={this.state.account ? true : false}
                                                onChange={(e) => {
                                                    this.setState({bannerName: e.target.value})
                                                }} size="large" placeholder=""/>)}
                                    </FormItem>
                                </div>
                                <div className={style.inputBox}>
                                    <FormItem>
                                        <span className={style.inputBoxT}>
                                            返利系数
                                        </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('rebateRatio', {
                                                rules: [{required: this.state.pullRebate, message: '请填写跳转链接!'}],
                                                initialValue: this.state.name
                                            })(
                                                <Input
                                                    onChange={(e) => {
                                                        this.setState({link: e.target.value})
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
                                <FormItem  style={{ marginBottom: 8 }}>
                                    {getFieldDecorator('earnings', {

                                    })(
                                        <Checkbox onChange={this.reSet.bind(this,'earnings')}>启用此奖励类型</Checkbox>
                                    )}
                                </FormItem>
                                <div className={style.inputBox}>
                                    <FormItem>
                                         <span className={style.inputBoxT}>
                                             收益提高
                                         </span>
                                        <div className={style.inputBoxb}>
                                            {getFieldDecorator('earningsBoost', {
                                                rules: [{required: this.state.earnings, message: '请填写banner名称!'}],
                                                initialValue: this.state.account
                                            })(
                                                <Input
                                                    disabled={this.state.account ? true : false}
                                                    onChange={(e) => {
                                                        this.setState({bannerName: e.target.value})
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
        role: state.role,
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAccount: bindActionCreators(addAccount, dispatch),
        editAccountMsg: bindActionCreators(editAccountMsg, dispatch),
        getRoleList: bindActionCreators(getRoleList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)


const WrappedHome = Form.create()(Home);


export default WrappedHome