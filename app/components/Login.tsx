import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from './extra/InputText'
import { Button } from './extra/Button'

import './styles/login.scss'

export class Login extends Component<{}, {}> {
  inputs: {
    email: React.RefObject<InputText>,
    pass: React.RefObject<InputText>
  }

  constructor (props) {
    super(props)

    this.inputs = {
      email: React.createRef(),
      pass: React.createRef()
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    const error = Object.values(this.inputs).every(({ current }) => {
      const { value, error } = current.state
      return value && !error ? true : current.focus()
    })

    if (!error) return
    console.log('git')
  }

  render () {
    const { email, pass } = this.inputs

    return (
      <div className='login-component'>
        <div className='labels'>
          <span>Logowanie</span>
          <span>logujesz się za pomocą konta</span>
        </div>

        <InputText icon='mail' placeholder='adres e-mail' email required ref={email} />
        <InputText icon='lock' placeholder='hasło' password required ref={pass} />

        <span className='recover'><Link to='/recover'>{'Odzyskaj Hasło >'}</Link></span>
        <Button value='Zaloguj' onClick={this.onSubmit} />
        <span className='signup'>Nie masz konta? <Link to='/signup'>Zarejestruj się</Link></span>
      </div>
    )
  }
}
