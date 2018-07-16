import {combineReducers} from 'redux'

import merge from 'lodash/merge'

import foreignExchange from './foreignExchange'
import user from './user'
import auth from './auth'
import menu from './menu'
import account from './account'
import role from './role'
let states = {
    foreignExchange,
    user,
    menu,
    account,
    role


}

let _states = {}

for (let i in states) {
    _states[i] = states[i]()
}


export default combineReducers(states)

export const getInitialState = () => {
    return merge({}, _states, {})
}
