import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Navigation } from '../components/Navigation'
import { Welcome } from '../components/Welcome'
import { Pricing } from '../components/Pricing'
import { About } from '../components/About'
import { Login } from '../components/Login'
import { Signup } from '../components/Signup'
import { Recover } from '../components/Recover'

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
