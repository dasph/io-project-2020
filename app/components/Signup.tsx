import React, { Component } from 'react'

import './styles/signup.scss'

export class Signup extends Component<{}, {}> {
  render () {
    return (
      <div className='signup-component'>
        <div className='labels'>
          <span>Sign Up</span>
          <span>please enter your credentials</span>
        </div>
        <div className='input-field email'>
          <div>
            <img src='images/icon-mail.svg' />
            <input
              type='text' autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false'
              placeholder='email address' maxLength={32}
            />
          </div>
        </div>
        <div className='input-field password'>
          <div>
            <img src='images/icon-lock.svg' />
            <input
              type='password' autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false'
              placeholder='password' maxLength={32}
            />
          </div>
        </div>
        <div className='input-field password'>
          <div>
            <img src='images/icon-lock.svg' />
            <input
              type='password' autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false'
              placeholder='confirm password' maxLength={32}
            />
          </div>
        </div>
        <input type='button' value='Sign Up' />
      </div>
    )
  }
}
