import React, { Component } from 'react'

import './styles/home.scss'

export class Home extends Component<{}, {}> {
  onLogin () {
    alert('lol?')
  }

  render () {
    return (
      <main className='home'>
        <div className='home-welcome'>
          <span>A K A D E M I K</span>
          <span>w twojej komórce</span>
          <input type='button' value='zaloguj się' onClick={this.onLogin}/>
        </div>
      </main>
    )
  }
}
