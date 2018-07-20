import React from 'react'
import style from './index.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getPermisseList, addRole, getRoleMsg} from '../../actions/role'
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
    Badge
} from 'antd';

const Option = Select.Option;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;

function checkLevel(id, c) {

    if (id === 0) {
        return 1
    } else if (c) {
        return 2
    } else {
        return 3
    }
}



const columns = [{
    title: '权限名称',
    dataIndex: 'name',
    render: (text, record) => {
        if (checkLevel(record.parent, record.childPermission) === 3) {
            return ''
        } else {
            return text
        }
    }
}, {
    title: '访问级别',
    dataIndex: 'type',
    render: (text, record) => {
        if (checkLevel(record.parent, record.childPermission) === 2) {
            return record.childPermission.length + '个资源'
        } else if (checkLevel(record.parent, record.childPermission) === 3) {
            return record.name
        } else {
            return text
        }
    }
}, {
    title: '描述',
    dataIndex: 'desc',
    render: (text, record) => {
        if (checkLevel(record.parent, record.childPermission) === 2) {
            return ''
        } else {
            return text
        }
    }
}];
const data = [{
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [{
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
    }, {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [{
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
        }],
    }, {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [{
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [{
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
            }, {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
            }],
        }],
    }],
}, {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [112], // Check here to configure the default column
        };
    }

    handleChange(value) {
        console.log(`Selected: ${value}`);
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    permissions: this.state.selectedRowKeys,
                    name: this.state.name,
                }
                if (this.props.params.id !== 'null') {
                    param.roleId = this.props.params.id
                    if (!this.state.name) {
                        let filterData = this.props.role.roleList.list.filter((item) => {
                            if (item.id === this.props.params.id - 0) {
                                return item
                            }
                        })
                        param.name = filterData[0].name
                    }

                }
                this.props.addRole(param, () => {
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
            }
        });
    }

    componentDidMount() {

        // this.props.editRoleMsg({
        //
        // })
        this.props.getPermisseList({
            parentId: 0
        })

        if (this.props.params.id !== 'null') {
            this.props.getRoleMsg({
                roleId:this.props.params.id
            })
        }

    }

    changeTreeData = (data) => {
        debugger
        let attributes = {
            //id: 'id',
            parentId: 'parent',
            //name: 'name',
            //type: 'type',
            url: 'url',
            rootId: '1'
        };
        let resData = data;
        let tree = [];

        for (let i = 0; i < resData.length; i++) {
            if (resData[i].parent === (attributes.rootId - 0)) {
                let obj = {
                    id: resData[i][attributes.id],
                    title: resData[i][attributes.name],
                    children: []
                };
                tree.push(obj);
                resData.splice(i, 1);
                i--;
            }
        }
        run(tree);

        function run(chiArr) {
            if (resData.length !== 0) {
                for (let i = 0; i < chiArr.length; i++) {
                    for (let j = 0; j < resData.length; j++) {
                        if (chiArr[i].id === resData[j][attributes.parentId]) {
                            let obj = {
                                id: resData[j][attributes.id],
                                title: resData[j][attributes.name],
                                children: []
                            };
                            chiArr[i].children.push(obj);
                            resData.splice(j, 1);
                            j--;
                        }
                    }
                    run(chiArr[i].children);
                }
            }
        }

        debugger
        return tree;
    }

    render() {
        if (!this.props.role.permisseList) {
            return null
        }
        if (this.props.params.id !== 'null') {
            if(!this.props.role.editRoleMsg){
                return null
            }
        }
        const {getFieldDecorator} = this.props.form;
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }],
            onSelection: this.onSelection,
        };
        return (
            <div className={style.wlop}>
                <span className={style.title}>{this.props.params.id !== 'null' ? '编辑角色' : '创建角色'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    角色名称
                                </span>
                                {getFieldDecorator('email', {
                                    initialValue: (() => {
                                        if (this.props.params.id === 'null') {
                                            return ''
                                        }
                                        let filterData = this.props.role.roleList.list.filter((item) => {
                                            if (item.id === this.props.params.id - 0) {
                                                return item
                                            }
                                        })
                                        return filterData[0].name
                                    })(),
                                    rules: [{required: true, message: '请填写你的角色名!'}],
                                })(
                                    <Input size="large" onChange={(e) => {
                                        this.setState({name: e.target.value})
                                    }} placeholder="请输入你的角色名"/>)}
                            </FormItem>
                        </div>

                    </div>

                    <Table rowSelection={rowSelection} columns={columns} childrenColumnName={'childPermission'}
                           dataSource={this.props.role.permisseList.list}/>
                    {/*<Table rowSelection={rowSelection}  columns={columns} dataSource={data}/>*/}

                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size={'large'}>完成</Button>
                    </div>
                </Form>
            </div>)


    }
}

function mapStateToProps(state, props) {
    return {
        role: state.role
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPermisseList: bindActionCreators(getPermisseList, dispatch),
        getRoleMsg: bindActionCreators(getRoleMsg, dispatch),
        addRole: bindActionCreators(addRole, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

const WrappedHome = Form.create()(Home);
export default WrappedHome