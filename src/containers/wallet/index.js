import React from 'react'
import style from './index.css'
import {hashHistory} from 'react-router'

import {Layout, Menu, Breadcrumb, Icon} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={style.wlop}>
                Content
            </div>


        )
    }
}


export default Home