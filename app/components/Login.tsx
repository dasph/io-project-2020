import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles/login.scss'

export class Login extends Component<{}, {}> {
  render () {
    return (
      <div className='login-component'>
        <div className='labels'>
          <span>Login</span>
          <span>you can use your USOS credentials</span>
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
        <span className='recover'><Link to='/recover'>{'Forgot password >'}</Link></span>
        <input type='button' value='Login' />
        <span className='signup'>{'Don\'t have an account? '}<Link to='/register'>Sign up here</Link></span>
      </div>
    )
  }
}
