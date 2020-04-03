import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from './extra/InputText'

import './styles/login.scss'

export class Login extends Component<{}, {}> {
  render () {
    return (
      <div className='login-component'>
        <div className='labels'>
          <span>Logowanie</span>
          <span>logujesz się za pomocą konta</span>
        </div>

        <InputText icon='mail' placeholder='adres e-mail' email required />
        <InputText icon='lock' placeholder='hasło' password required />

        <span className='recover'><Link to='/recover'>{'Odzyskaj Hasło >'}</Link></span>
        <input type='button' value='Zaloguj' />
        <span className='signup'>Nie masz konta? <Link to='/signup'>Zarejestruj się</Link></span>
      </div>
    )
  }
}
