import React from 'react'
import {Route, Router,IndexRoute, hashHistory} from 'react-router'
import Account from './containers/account/'
import AddAccount from './containers/addAccount/'
import Notice from './containers/notice/'
import Fund from './containers/fund/'
import Home from './containers/home/'
import Operation from './containers/operation/'
import Wallet from './containers/wallet/'
import AuditFund from './containers/auditFund/'
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
import EarningsSetting from './containers/earningsSetting/'
import AddHome from './containers/addHome/'
import AddOperation from './containers/addOperation/'
import AuditWallet from './containers/auditWallet/'
import AuditWalletOut from './containers/auditWalletOut/'

import AuditFundDetails from './containers/auditFundDetails/'
import AuditRecharge from './containers/auditRecharge/'
import AuditRechargeDetail from './containers/auditRechargeDetail/'
import WalletInformation from './containers/walletInformation/'
import OutAddressManage from './containers/outAddressManage/'
import AddOutAddress from './containers/addOutAddress/'
import Out from './containers/out/'
import BillRecord from './containers/billRecord/'
import BillRecordDetails from './containers/billRecordDetails/'
import ManageSetting from './containers/manageSetting/'
import OutIndentManage from './containers/outIndentManage/'
import OutIndentDetails from './containers/outIndentDetails/'
import RechargeManage from './containers/rechargeManage/'
import UserRecharge from './containers/userRecharge/'
import RechargeRecordDetails from './containers/rechargeRecordDetails/'
import CheckDetails from './containers/checkDetails/'

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Wrap}>
                <IndexRoute  component={Account}/>
                <Route path="/Account" component={Account}/>
                <Route path="/auditFund" component={AuditFund}/>
                <Route path="/wallet" component={Wallet}/>
                <Route path="/operation" component={Operation}/>
                <Route path="/wrap" component={Wrap}/>
                <Route path="/home" component={Home}/>
                <Route path="/fund" component={Fund}/>
                <Route path="/notice" component={Notice}/>
                <Route path="/addAccount/:id" component={AddAccount}/>
                <Route path="/roleManage" component={RoleManage}/>
                <Route path="/safeSetting" component={SafeSetting}/>
                <Route path="/pinSetting" component={PinSetting}/>
                <Route path="/pinAmend" component={PinAmend}/>
                <Route path="/addRole/:id" component={AddRole}/>
                <Route path="/passwordAmend" component={PasswordAmend}/>
                <Route path="/operationLog" component={OperationLog}/>
                <Route path="/logDetails/:id" component={LogDetails}/>
                <Route path="/information" component={Information}/>
                <Route path="/informationType" component={InformationType}/>
                <Route path="/addType/:id" component={AddType}/>
                <Route path="/addNotice/:id" component={AddNotice}/>
                <Route path="/addInformation/:id" component={AddInformation}/>
                <Route path="/addFund/:id" component={AddFund}/>
                <Route path="/earningsSetting/:id" component={EarningsSetting}/>
                <Route path="/addHome/:id" component={AddHome}/>
                <Route path="/addOperation/:id" component={AddOperation}/>
                <Route path="/auditWallet" component={AuditWallet}/>
                <Route path="/auditWalletOut/:id" component={AuditWalletOut}/>
                <Route path="/auditFundDetails/:id" component={AuditFundDetails}/>
                <Route path="/auditRecharge" component={AuditRecharge}/>
                <Route path="/auditRechargeDetail/:id" component={AuditRechargeDetail}/>
                <Route path="/walletInformation" component={WalletInformation}/>
                <Route path="/outAddressManage" component={OutAddressManage}/>
                <Route path="/addOutAddress/:id" component={AddOutAddress}/>
                <Route path="/out/:id" component={Out}/>
                <Route path="/billRecord" component={BillRecord}/>
                <Route path="/billRecordDetails/:id" component={BillRecordDetails}/>
                <Route path="/manageSetting" component={ManageSetting}/>
                <Route path="/outIndentManage" component={OutIndentManage}/>
                <Route path="/outIndentDetails/:id" component={OutIndentDetails}/>
                <Route path="/rechargeManage" component={RechargeManage}/>
                <Route path="/userRecharge" component={UserRecharge}/>
                <Route path="/rechargeRecordDetails/:id" component={RechargeRecordDetails}/>
                <Route path="/checkDetails/:id" component={CheckDetails}/>
				<Route path="/pin" component={PIN}/>
			
            </Route>

        </Router>
    )
}