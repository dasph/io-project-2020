import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Navigation } from './components/Navigation'
import { Home } from './components/Home'
import { Pricing } from './components/Pricing'
import { About } from './components/About'

export class App extends Component<{}, {}> {
  render () {
    return (
      <BrowserRouter>
        <Navigation />
        <Route path='/' exact component={Home} />
        <Route path='/pricing' component={Pricing} />
        <Route path='/about' exact component={About} />
      </BrowserRouter>
    )
  }
}
