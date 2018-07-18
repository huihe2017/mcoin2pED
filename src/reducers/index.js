import {combineReducers} from 'redux'

import merge from 'lodash/merge'

import foreignExchange from './foreignExchange'
import user from './user'
import auth from './auth'
import menu from './menu'
import account from './account'
import role from './role'
import log from './log'
import fund from './fund'
import notice from './notice'
import information from './information'
import homePageCfg from './homePageCfg'
let states = {
    foreignExchange,
    user,
    menu,
    account,
    role,
    log,
    fund,
    notice,
    information,
    homePageCfg


}

let _states = {}

for (let i in states) {
    _states[i] = states[i]()
}


export default combineReducers(states)

export const getInitialState = () => {
    return merge({}, _states, {})
}
