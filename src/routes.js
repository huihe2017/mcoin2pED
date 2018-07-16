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
import RoleManage from './containers/roleManage/'
import SafeSetting from './containers/safeSetting/'
import PinSetting from './containers/pinSetting/'
import PinAmend from './containers/pinAmend/'
import AddRole from './containers/addRole/'
import PasswordAmend from './containers/passwordAmend/'
import OperationLog from './containers/operationLog/'
import LogDetails from './containers/logDetails/'
import Information from './containers/information/'
import InformationType from './containers/informationType/'
import AddType from './containers/addType/'
import PIN from './containers/PIN/'
import AddNotice from './containers/addNotice/'
import AddInformation from './containers/addInformation/'
import AddFund from './containers/addFund/'

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/login" component={Login}/>
            <Route path="/pin" component={PIN}/>
            <Route path="/" component={Wrap}>
                <Route path="/Account" component={Account}/>
                <Route path="/audit" component={Audit}/>
                <Route path="/wallet" component={Wallet}/>
                <Route path="/operation" component={Operation}/>
                <Route path="/wrap" component={Wrap}/>
                <Route path="/home" component={Home}/>
                <Route path="/fund" component={Fund}/>
                <Route path="/notice" component={Notice}/>
                <Route path="/addAccount" component={AddAccount}/>
                <Route path="/roleManage" component={RoleManage}/>
                <Route path="/safeSetting" component={SafeSetting}/>
                <Route path="/pinSetting" component={PinSetting}/>
                <Route path="/pinAmend" component={PinAmend}/>
                <Route path="/addRole" component={AddRole}/>
                <Route path="/passwordAmend" component={PasswordAmend}/>
                <Route path="/operationLog" component={OperationLog}/>
                <Route path="/logDetails" component={LogDetails}/>
                <Route path="/information" component={Information}/>
                <Route path="/informationType" component={InformationType}/>
                <Route path="/addType" component={AddType}/>
                <Route path="/addNotice" component={AddNotice}/>
                <Route path="/addInformation" component={AddInformation}/>
                <Route path="/addFund" component={AddFund}/>

            </Route>

        </Router>
    )
}