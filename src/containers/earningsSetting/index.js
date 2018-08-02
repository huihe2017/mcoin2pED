import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import Header1 from '../../components/header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getIncomeCfgData, getProfitList, setProfit, exportProfit} from '../../actions/fund'
import {toChartData} from "../../common/util";
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Button,
    Table,
    Dropdown,
    notification,
    Modal,
    Input,
    DatePicker,
    Select
} from 'antd';
import {Form} from "antd/lib/index";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import config from "../../config";
import axios from "../../common/axiosConf";

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

const data1 = [
    {
        name: '基金名称aaa',
        close: '3',
        coin: 'BTC',
        year: '4.76%',
        recommend: true,
        priority: '99',
        state: '启用',
    }, {
        title: '基金名称aba',
        close: '7',
        coin: 'BTC',
        year: '4.76%',
        recommend: true,
        priority: '11',
        state: '停用',
    }, {
        title: '基金名称bba',
        close: '130',
        coin: 'BTC',
        year: '4.76%',
        recommend: true,
        priority: '9',
        state: '停用',
    }, {
        title: '基金名称abb',
        close: '31',
        coin: 'BTC',
        year: '4.76%',
        recommend: true,
        priority: '29',
        state: '启用',
    }, {
        title: '基金名称abb',
        close: '31',
        coin: 'BTC',
        year: '4.76%',
        recommend: true,
        priority: '29',
        state: '启用',
    }, {
        title: '基金名称abb',
        close: '31',
        coin: 'BTC',
        year: '4.76%',
        recommend: true,
        priority: '29',
        state: '启用',
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
        this.props.getIncomeCfgData({
            id: this.props.params.id
        }, () => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            myChart.setOption({
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
                    data: toChartData(this.props.fund.income.yearProfitList).profitDate
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
                        name: '模拟数据',
                        type: 'line',
                        smooth: true,
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
                        data: toChartData(this.props.fund.income.yearProfitList).profit
                    }
                ]
            })
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
                this.props.setProfit({
                    id: this.props.params.id,
                    profit: this.state.profit
                }, () => {
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
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
    renderRateMsg = (profit) => {
        if (profit) {

            if (profit - this.props.fund.income.rate > 1) {
                return <span style={{color: 'red', marginLeft: 10}}>涨幅：{profit - this.props.fund.income.rate}%</span>
            }
            return <span style={{marginLeft: 10}}>涨幅：{profit - this.props.fund.income.rate}%</span>
        } else {
            return null
        }

    }

    render() {
        if (!this.props.fund.income) {
            return null
        }
        const columns = [
            {title: '账目', dataIndex: 'confirmDate', key: 'name',},
            {title: '本金', dataIndex: 'amount', key: 'age',},
            {title: '当前收益率', dataIndex: 'profitRate', key: '1',},
            {title: '合计', dataIndex: 'totalProfit', key: '2',}
        ];

        this.props.fund.income.statList[0] && this.props.fund.income.statList[0].profitDateList.map((a, b) => {
            let c = b
            ++c
            columns.push({title: c, dataIndex: 'profitDateList[' + b + '].profit'})
        })


        const {getFieldDecorator} = this.props.form;


        return (
            <div className={style.wlop}>
                <Form onSubmit={this.handleOk.bind(this)} className="login-form">
                    <span className={style.title}>收益配置</span>
                    <div className={style.contentT}>
                        基金名称{this.props.fund.income.productName}
                    </div>
                    <div id="main" style={{width: '1200px', height: 400, paddingRight: '40px'}}></div>
                    <div className={style.content}>
                        <div className={style.inputBox}>
                            <FormItem>
                                    <span className={style.inputBoxT}>
                                        当前利率
                                    </span>
                                <div className={style.inputBoxC}>
                                    {getFieldDecorator('range-picker', {
                                        initialValue: this.props.fund.income.rate,
                                        rules: [{
                                            required: [{required: true}],
                                        }],
                                    })(
                                        <Input disabled size="large"/>
                                    )}
                                    <span className={style.inputBoxCT}>
                                            年化：{this.props.fund.income.rateYear}%
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
                                        // initialValue: this.props.fund.income.yesterdayProfit,
                                        rules: [{required: true}],
                                    })(
                                        <Input onChange={(e) => {
                                            this.setState({profit: e.target.value})
                                        }} size="large"/>)}
                                    <span className={style.inputBoxCT}>
                                            年化：{this.state.profit || 0 * 365}%

                                        {
                                            this.renderRateMsg(this.state.profit || 0)
                                        }
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
                                    {getFieldDecorator('accountg', {
                                        rules: [],
                                    })(
                                        <Select onChange={(e) => {
                                            this.props.getProfitList({
                                                id: this.props.params.id,
                                                month: e
                                            }, () => {
                                                this.setState({month: e})
                                            })
                                        }} placeholder="选择月份">
                                            <Option value="2018.01">2018年1月</Option>
                                            <Option value="2018.02">2018年2月</Option>
                                            <Option value="2018.03">2018年3月</Option>
                                            <Option value="2018.04">2018年4月</Option>
                                            <Option value="2018.05">2018年5月</Option>
                                            <Option value="2018.06">2018年6月</Option>
                                            <Option value="2018.07">2018年7月</Option>
                                            <Option value="2018.08">2018年8月</Option>
                                            <Option value="2018.09">2018年9月</Option>
                                            <Option value="2018.10">2018年10月</Option>
                                            <Option value="2018.11">2018年11月</Option>
                                            <Option value="2018.12">2018年12月</Option>
                                        </Select>)}
                                </div>
                            </FormItem>
                            <a className={style.contentTBA} onClick={() => {
                                axios.defaults.headers.common['adminToken'] = sessionStorage.adminToken;
                                axios.post(config.api_url + 'fund/exportprofit',
                                    {
                                        id: this.props.params.id,
                                        month: this.state.month
                                    },
                                    {
                                        headers: {
                                            responseType: 'arraybuffer'
                                        }
                                    }).then(function (response) {

                                    //这里res.data是返回的blob对象
                                    var blob = new Blob([response.data], {type: 'application/x-xls'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                                    var downloadElement = document.createElement('a');
                                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                                    downloadElement.href = href;
                                    downloadElement.download = 'bills.xlsx'; //下载后文件名
                                    document.body.appendChild(downloadElement);
                                    downloadElement.click(); //点击下载
                                    document.body.removeChild(downloadElement); //下载完成移除元素
                                    window.URL.revokeObjectURL(href); //释放掉blob对象

                                }).catch(function (error) {

                                });
                                // this.props.exportProfit({
                                //     id: this.props.params.id,
                                //     month:this.state.month
                                // }, () => {
                                // })
                            }} href="javascript:void (0)">导出表格</a>
                        </div>
                        <Table columns={columns} dataSource={this.props.fund.income.statList} scroll={{x: 500}}/>
                    </div>
                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size='large'
                                onClick={() => hashHistory.push('/addAccount')}>更新收益</Button>
                        <Button size='large'>放弃</Button>
                    </div>
                </Form>
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
        getIncomeCfgData: bindActionCreators(getIncomeCfgData, dispatch),
        setProfit: bindActionCreators(setProfit, dispatch),
        exportProfit: bindActionCreators(exportProfit, dispatch),
        getProfitList: bindActionCreators(getProfitList, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)
const WrappedHome = Form.create()(Home);
export default WrappedHome