import React from 'react'
import {Route, Router,IndexRoute, hashHistory} from 'react-router'
import Account from './containers/account/'
import AddAccount from './containers/addAccount/'
import Notice from './containers/notice/'
import Fund from './containers/fund/'
import Home from './containers/home/'
import Operation from './containers/operation/'
import Wallet from './containers/wallet/'
import Audit from './containers/audit/'
import Wrap from './containers/wrap/'

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Account}/>
            <Route path="/wrap" component={Wrap}/>
            <Route path="/notice" component={Notice}/>
            <Route path="/fund" component={Fund}/>
            <Route path="/home" component={Home}/>
            <Route path="/operation" component={Operation}/>
            <Route path="/wallet" component={Wallet}/>
            <Route path="/audit" component={Audit}/>

            <Route path="/addAccount" component={AddAccount}/>
        </Router>
    )
}