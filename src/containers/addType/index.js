import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Input, Form, Button} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createInfoType} from "../../actions/information";
import {filter} from '../../common/util'
import {notification} from "antd/lib/index";

const FormItem = Form.Item;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.params.id!=='null'){
            let data = filter(this.props.info.infoTypeList.list,this.props.params.id)
            this.setState({
                id:data.id,
                name: data.name
            })
        }
    }

    handleSubmit = (e) => {
        this.setState({
            selectedRowKeys: [],
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                let param = {
                    name: this.state.name

                }
                if(this.props.params.id!=='null'){
                    param.id = this.state.id
                }

                this.props.createInfoType(param,()=>{
                    this.props.history.go(-1)
                    notification.open({
                        message: '提示',
                        description: '操作成功',
                    });
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wlop}>
                <span className={style.title}>{this.props.params.id!=='null'?'编辑类型':'创建类型'}</span>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className={style.content}>

                        <div className={style.inputBox}>
                            <FormItem>
                                <span className={style.inputBoxT}>
                                    类型名称
                                </span>
                                {getFieldDecorator('name', {
                                    initialValue: this.state.name,
                                    rules: [{required: true, message: '请填写你的类型名称!'}],
                                })(
                                    <Input onChange={(e) => {
                                        this.setState({name:e.target.value})
                                    }} size="large" placeholder="请输入类型名称"/>)}
                            </FormItem>
                        </div>

                    </div>
                    <div className={style.button}>
                        <Button type="primary" htmlType="submit" size={'large'}>创建</Button>
                        <Button size={'large'}>取消</Button>
                    </div>
                </Form>
            </div>


        )
    }
}

function mapStateToProps(state, props) {
    return {
        info: state.information
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createInfoType: bindActionCreators(createInfoType, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

const WrappedHome = Form.create()(Home);
export default WrappedHome