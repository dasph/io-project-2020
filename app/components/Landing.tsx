import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Navigation } from './Navigation'
import { Welcome } from './Welcome'
import { Pricing } from './Pricing'
import { About } from './About'
import { Login } from './Login'
import { Signup } from './Signup'
import { Recover } from './Recover'

import './styles/landing.scss'

export class Landing extends Component<{}, {}> {
  render () {
    return (
      <BrowserRouter>
        <Navigation />
        <main className='landing-page'>
          <Route path='/' exact component={Welcome} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/recover' exact component={Recover} />
          <Route path='/pricing' exact component={Pricing} />
          <Route path='/about' exact component={About} />
        </main>
      </BrowserRouter>
    )
  }
}
