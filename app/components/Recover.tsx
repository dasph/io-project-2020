import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles/recover.scss'

export class Recover extends Component<{}, {}> {
  render () {
    return (
      <div className='recover-component'>
        <div className='labels'>
          <span>Odzyskiwanie hasła</span>
          <span>jeśli podany e-mail istnieje, otrzymasz wiadomość z instrukcją</span>
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
        <span><Link to='/login'>{'wróć do logowania'}</Link></span>
        <input type='button' value='Confirm' />
      </div>
    )
  }
}
