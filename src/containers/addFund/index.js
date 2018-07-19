import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import {Steps, Button, Form} from 'antd';
import One from './one'
import Two from './two'
import Three from './three'
import Four from './four'

const FormItem = Form.Item;

const Step = Steps.Step;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    handle = (flag) => {
        if (flag === 0) {
            this.setState({current: --this.state.current})
        } else {
            this.setState({current: ++this.state.current})
        }
    }
    renderTab = () => {
        if (this.state.current === 0) {
            return <One handle={(flag)=>{
                this.handle(flag)}
            }/>
        }
        if (this.state.current === 1) {
            return <Two  handle={(flag)=>{
                this.handle(flag)}
            } />
        }
        if (this.state.current === 2) {
            return <Three  handle={(flag)=>{
                this.handle(flag)}
            } />
        }
        if (this.state.current === 3) {
            return <Four  handle={(flag)=>{
                this.handle(flag)}
            } />
        }
    }
    renderFoot = () => {

        if (this.state.current === 0) {
            return <div className={style.button}>
                <Button type="primary" size={'large'}>下一步</Button>
            </div>
        }
        else if (this.state.current === 3) {
            <div className={style.button}>
                <Button type="primary" size={'large'}>上一步</Button>
                <Button type="primary" size={'large'}>下一步</Button>
            </div>
        } else {
            <div className={style.button}>
                <Button type="primary" size={'large'}>上一步</Button>
                <Button type="primary" size={'large'}>提交</Button>
            </div>
        }
    }

    render() {


        return (
            <div className={style.wlop}>
                <span className={style.title}>创建基金</span>
                <Steps current={this.state.current}>
                    <Step title="基础信息"/>
                    <Step title="基金参数"/>
                    <Step title="手续费"/>
                    <Step title="运营活动"/>
                </Steps>
                <div>
                    {this.renderTab()}
                    {/*{this.renderFoot()}*/}
                </div>
            </div>


        )
    }
}

export default Home