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
import Login from './containers/login/'

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Wrap}>
                <IndexRoute component={Account}/>

                <Route path="/audit" component={Audit}/>
                <Route path="/wallet" component={Wallet}/>
                <Route path="/operation" component={Operation}/>
                <Route path="/wrap" component={Wrap}/>
                <Route path="/home" component={Home}/>
                <Route path="/fund" component={Fund}/>
                <Route path="/notice" component={Notice}/>
                <Route path="/addAccount" component={AddAccount}/>
            </Route>

        </Router>
    )
}