import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles/login.scss'

export class Login extends Component<{}, {}> {
  render () {
    return (
      <div className='login-component'>
        <div className='labels'>
          <span>Logowanie</span>
          <span>logujesz się za pomocą konta</span>
        </div>
        <div className='input-field email'>
          <div>
            <img src='images/icon-mail.svg' />
            <input
              type='text' autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false'
              placeholder='adres e-mail' maxLength={32}
            />
          </div>
        </div>
        <div className='input-field password'>
          <div>
            <img src='images/icon-lock.svg' />
            <input
              type='password' autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false'
              placeholder='hasło' maxLength={32}
            />
          </div>
        </div>
        <span className='recover'><Link to='/recover'>{'Odzyskaj Hasło >'}</Link></span>
        <input type='button' value='Zaloguj' />
        <span className='signup'>{'Nie masz konta? '}<Link to='/signup'>Zarejestruj się</Link></span>
      </div>
    )
  }
}
