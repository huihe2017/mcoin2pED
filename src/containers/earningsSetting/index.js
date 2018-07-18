import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUserList,resetPwd,resetPin,setAccountStatus} from '../../actions/account'
import {Layout, Menu, Breadcrumb, Icon, Button, Table, Dropdown, notification,Modal,Input,DatePicker,Select} from 'antd';
import {Form} from "antd/lib/index";
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

const data1=[
        {
            title:'基金名称aaa',
            close:'3',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'99',
            state:'启用',
        },{
            title:'基金名称aba',
            close:'7',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'11',
            state:'停用',
        },{
            title:'基金名称bba',
            close:'130',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'9',
            state:'停用',
        },{
            title:'基金名称abb',
            close:'31',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'29',
            state:'启用',
        },{
            title:'基金名称abb',
            close:'31',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'29',
            state:'启用',
        },{
            title:'基金名称abb',
            close:'31',
            coin:'BTC',
            year:'4.76%',
            recommend:true,
            priority:'29',
            state:'启用',
        },
    ]
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption( {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '大数据量面积图',
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:'模拟数据',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: data
                }
            ]
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
                console.log('Received values of form: ', values);
                this.setState({
                    visible: false,
                });
            }else {
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

        const columns = [
            { title: '账目',  dataIndex: 'name', key: 'name',  },
            { title: '本金',  dataIndex: 'age', key: 'age', },
            { title: '当前收益率',  dataIndex: 'address', key: '1',},
            { title: '合计',dataIndex: 'address', key: '2',},
            { title: 'Column 1', dataIndex: 'address', key: '4',},
            { title: 'Column 2', dataIndex: 'address', key: '5',  },
            { title: 'Column 3', dataIndex: 'address', key: '6',  },
            { title: 'Column 4', dataIndex: 'address', key: '7',  },
            { title: 'Column 5', dataIndex: 'address', key: '8',  },
            { title: 'Column 6', dataIndex: 'address', key: '9',  },
        ];
        const { getFieldDecorator } = this.props.form;


        return (
            <div className={style.wlop}>
                <Form onSubmit={this.handleOk.bind(this)} className="login-form">
                    <span className={style.title}>收益配置</span>
                    <div className={style.contentT}>
                        基金名称12983812984
                    </div>
                    <div id="main" style={{ width: '1200px', height: 400 ,paddingRight:'40px'}}></div>
                        <div className={style.content}>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        当前利率
                                    </span>
                                    <div className={style.inputBoxC}>
                                        {getFieldDecorator('range-picker', {rules: [{ type: 'array', required: true, message: '请选择时间范围!' }],})(
                                            <Input size="large" placeholder="请输入你的角色名"/>
                                        )}
                                        <span className={style.inputBoxCT}>
                                            年化：4.06%
                                        </span>
                                    </div>

                                </FormItem>
                            </div>
                            <div className={style.inputBox}>
                                <FormItem>
                                    <span className={style.inputBoxT}>
                                        昨日利率
                                    </span>
                                    <div className={style.inputBoxC}>
                                        {getFieldDecorator('account', {
                                            rules: [{ required: true, message: '请填写你的角色名!' }],
                                        })(
                                            <Input size="large" placeholder="请输入你的角色名"/>)}
                                        <span className={style.inputBoxCT}>
                                            年化：4.06%  <span style={{color: 'red',marginLeft:10}}>涨幅：+4.6%</span>
                                        </span>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    <div className={style.table}>
                        <div className={style.contentTB}>
                            <span>
                                基金账目列表
                            </span>
                            <FormItem>
                                <div className={style.inputBox1}>
                                    {getFieldDecorator('account', {
                                        rules: [],
                                    })(
                                        <Select placeholder="选择月份">
                                            <Option value="china">China</Option>
                                            <Option value="use">U.S.A</Option>
                                        </Select>)}
                                </div>
                            </FormItem>
                            <a className={style.contentTBA} href="javascript:void (0)">导出表格</a>
                        </div>
                        <Table columns={columns} dataSource={data1} scroll={{ x: 500 }} />
                    </div>
                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size='large' onClick={() => hashHistory.push('/addAccount')}>更新收益</Button>
                        <Button size='large'>放弃</Button>
                    </div>
                </Form>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserList: bindActionCreators(getUserList, dispatch),
        resetPin: bindActionCreators(resetPin, dispatch),
        setAccountStatus: bindActionCreators(setAccountStatus, dispatch),
        resetPwd: bindActionCreators(resetPwd, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome