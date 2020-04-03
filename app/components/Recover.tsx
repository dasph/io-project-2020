import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from './extra/InputText'

import './styles/recover.scss'

export class Recover extends Component<{}, {}> {
  email: React.RefObject<InputText>

  constructor (props) {
    super(props)

    this.email = React.createRef()

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    const { value, error } = this.email.current.state
    if(!value || error) return this.email.current.focus()

    console.log('git')
  }

  render () {
    return (
      <div className='recover-component'>
        <div className='labels'>
          <span>Odzyskiwanie hasła</span>
          <span>jeśli podany e-mail istnieje, otrzymasz wiadomość z instrukcją</span>
        </div>

        <InputText icon='mail' placeholder='adres e-mail' email required ref={this.email} />

        <span><Link to='/login'>wróć do logowania</Link></span>
        <input type='button' value='Potwierdź' onClick={this.onSubmit} />
      </div>
    )
  }
}
