import React from 'react'
import {Route, Router,IndexRoute, hashHistory} from 'react-router'
import Home from './containers/home/'


export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Home}/>

        </Router>
    )
}