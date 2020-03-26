import React, { Component } from 'react'
import { Login } from './Login'

import './styles/home.scss'

export class Home extends Component<{}, { login: boolean }> {
  constructor (props) {
    super(props)

    this.state = {
      login: false
    }
  }

  onLogin () {
    this.setState({ login: true })
  }

  render () {
    const { login } = this.state

    return (
      <main className='home'>
        <div className={`home-welcome${login ? ' closed' : ''}`}>
          <span>A K A D E M I K</span>
          <span>w twojej komórce</span>
          <input type='button' value='zaloguj się' onClick={() => this.onLogin()}/>
        </div>
        {login && <Login />}
      </main>
    )
  }
}
