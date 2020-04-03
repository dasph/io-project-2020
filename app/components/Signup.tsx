import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from './extra/InputText'

import './styles/signup.scss'

export class Signup extends Component<{}, {}> {
  inputs: {
    login: React.RefObject<InputText>
    pass: React.RefObject<InputText>
    pass2: React.RefObject<InputText>
  }

  constructor (props) {
    super(props)

    this.inputs = {
      login: React.createRef(),
      pass: React.createRef(),
      pass2: React.createRef()
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    Object.values(this.inputs).forEach((input) => {
      if (input.current.state.error) return input.current.focus()
    })
  }

  render () {
    const { login, pass, pass2 } = this.inputs

    return (
      <div className='signup-component'>
        <div className='labels'>
          <span>Rejestracja</span>
          <span>wypełnij poniższe pola</span>
        </div>

        <InputText icon='mail' placeholder='adres e-mail' email required ref={login} />
        <InputText icon='lock' placeholder='hasło' password required ref={pass} />
        <InputText icon='lock' placeholder='powtórz hasło' password required ref={pass2} confirm={pass} />

        <span><Link to='/login'>Masz konto?</Link></span>
        <input type='button' value='Zarejestruj' onClick={this.onSubmit} />
      </div>
    )
  }
}
