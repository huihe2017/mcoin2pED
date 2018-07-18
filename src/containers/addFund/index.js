import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Steps} from 'antd';
import One from './one'
import Two from './two'
import Three from './three'
import Four from './four'


const Step = Steps.Step;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {


        return (
            <div className={style.wlop}>
                <span className={style.title}>创建基金</span>
                <Steps current={0}>
                    <Step title="基础信息" />
                    <Step title="基金参数"/>
                    <Step title="手续费"/>
                    <Step title="运营活动"/>
                </Steps>
                <div>
                    {/*<One/>*/}
                    {/*<Two/>*/}
                    {/*<Three/>*/}
                    <Four/>
                </div>
            </div>


        )
    }
}

export default Home