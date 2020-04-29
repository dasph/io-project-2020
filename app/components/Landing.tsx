import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Navigation } from './Navigation'
import { Welcome } from './Welcome'
import { Pricing } from './Pricing'
import { About } from './About'
import { Login } from './Login'
import { Signup } from './Signup'
import { Recover } from './Recover'

import './styles/landing.scss'

export default class Landing extends Component<{}, {}> {
  render () {
    return (
      <BrowserRouter>
        <Navigation />
        <main className='landing-page'>
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/recover' component={Recover} />
            <Route path='/pricing' component={Pricing} />
            <Route path='/about' component={About} />
            <Redirect to='/' />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
