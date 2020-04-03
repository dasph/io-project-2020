import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from './extra/InputText'

import './styles/recover.scss'

export class Recover extends Component<{}, {}> {
  render () {
    return (
      <div className='recover-component'>
        <div className='labels'>
          <span>Odzyskiwanie hasła</span>
          <span>jeśli podany e-mail istnieje, otrzymasz wiadomość z instrukcją</span>
        </div>

        <InputText icon='mail' placeholder='adres e-mail' email required />

        <span><Link to='/login'>wróć do logowania</Link></span>
        <input type='button' value='Potwierdź' />
      </div>
    )
  }
}
