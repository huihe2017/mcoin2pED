import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'
import { Button,} from 'antd';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className={style.wlop}>
                <span className={style.title}>日志详情</span>
                <div className={style.contentT}>
                    日志编号：20180601003123182983983
                </div>
                <div className={style.content}>
                    <span className={style.contentC}>
                        操作：创建基金-基金0001号
                    </span>
                    <span className={style.contentC}>
                        操作账号：zhangsan@p95.com
                    </span>
                    <span className={style.contentC}>
                        姓名：张三
                    </span>
                    <span className={style.contentC}>
                        设备IP：192.168.0.1
                    </span>
                    <span className={style.contentC}>
                        IP地区：广州
                    </span>
                    <span className={style.contentC}>
                        操作时间：2016-06-01 00:30:12
                    </span>
                    <span className={style.contentC}>
                        操作类型：新增
                    </span>
                </div>
                <div className={style.button}>

                    <Button type="primary" size={'large'}>下一条</Button>

                    <Button size={'large'}>返回</Button>
                </div>
            </div>
        )
    }
}

export default Home