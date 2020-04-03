import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from './extra/InputText'

import './styles/signup.scss'

export class Signup extends Component<{}, {}> {
  inputs: {
    email: React.RefObject<InputText>,
    pass: React.RefObject<InputText>,
    pass2: React.RefObject<InputText>
  }

  constructor (props) {
    super(props)

    this.inputs = {
      email: React.createRef(),
      pass: React.createRef(),
      pass2: React.createRef()
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
    const { email, pass, pass2 } = this.inputs

    return (
      <div className='signup-component'>
        <div className='labels'>
          <span>Rejestracja</span>
          <span>wypełnij poniższe pola</span>
        </div>

        <InputText icon='mail' placeholder='adres e-mail' email required ref={email} />
        <InputText icon='lock' placeholder='hasło' password required ref={pass} />
        <InputText icon='lock' placeholder='powtórz hasło' password required ref={pass2} confirm={pass} />

        <span><Link to='/login'>Masz konto?</Link></span>
        <input type='button' value='Zarejestruj' onClick={this.onSubmit} />
      </div>
    )
  }
}
