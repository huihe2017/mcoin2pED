import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification, Steps, Input,Select,Form,Badge} from 'antd';

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

const data=[
    {
        key: 1,
        describe: '基金管理模块',
        visit: '无权访问',
        authority: '基金管理',
    },{
        key: 2,
        describe: '钱包管理模块',
        visit: '个别访问权',
        authority: '钱包管理',
    },{
        key: 3,
        describe: '公告与资讯模块',
        visit: '完全访问权',
        authority: '公告与资讯',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowSelection: {},
        };
    }

    handleChange(value) {
        console.log(`Selected: ${value}`);
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const state = this.state;
        const menu = (
            <Menu>
                <Menu.Item>
                    Action 1
                </Menu.Item>
                <Menu.Item>
                    Action 2
                </Menu.Item>
            </Menu>
        );

        const expandedRowRender = () => {
                const columns = [
                    { title: '模块', dataIndex: 'module', key: 'module' },
                    { title: '资源', dataIndex: 'resource', key: 'resource' },
                    { title: '控制权', dataIndex: 'control', key: 'control' },

                ];

                const data = [{
                    key: 1,
                    module: '钱包信息',
                    resource: '导航入口',
                    control: '允许访问（验证级别）',
                },{
                    key: 2,
                    module: '钱包信息',
                    resource: '数据列表-BTC余额',
                    control: '显示/隐藏',
                },{
                    key: 3,
                    module: '钱包信息',
                    resource: '数据列表-ETC余额',
                    control: '显示/隐藏',
                },{
                    key: 4,
                    module: '账号记录',
                    resource: '导航入口',
                    control: '允许访问（验证级别）',
                },{
                    key: 5,
                    module: '账号记录',
                    resource: '账号列表',
                    control: '读取数据-个人',
                },{
                    key: 6,
                    module: '账号记录',
                    resource: '账号列表',
                    control: '读取数据-个人',
                },{
                    key: 7,
                    module: '转出地址管理',
                    resource: '导航入口',
                    control: '允许访问（验证级别）',
                },{
                    key: 8,
                    module: '转出地址管理',
                    resource: '创建地址',
                    control: '显示/隐藏',
                },]

                return (
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                );
            };

        const columns = [
            { title: '权限名称', dataIndex: 'authority', key: 'authority' },
            { title: '访问权限', dataIndex: 'visit', key: 'visit' },
            { title: '描述', dataIndex: 'describe', key: 'describe' },


        ];
        return (
            <div className={style.wlop}>
                <span className={style.title}>创建账号</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    角色名称
                                </span>
                                {getFieldDecorator('email', {
                                        rules: [{ required: true, message: '请填写你的角色名!' }],
                                    })(
                                        <Input size="large" placeholder="请输入你的角色名"/>)}
                            </FormItem>
                        </div>

                    </div>
                    <div className={style.tableBox}>
                        <Table
                            className="components-table-demo-nested"
                            columns={columns}
                            expandedRowRender={expandedRowRender}
                            dataSource={data}
                            rowSelection={{}}
                        />
                    </div>
                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size={'large'}>完成</Button>
                    </div>
                </Form>

            </div>


        )
    }
}

const WrappedHome = Form.create()(Home);
export default WrappedHome