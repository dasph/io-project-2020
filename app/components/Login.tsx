import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from './extra/InputText'
import { Button } from './extra/Button'
import request from '../request'

import './styles/login.scss'

interface State {
  block: boolean;
  error: boolean;
}

export class Login extends Component<{}, State> {
  inputs: {
    email: React.RefObject<InputText>;
    password: React.RefObject<InputText>;
  }

  constructor (props) {
    super(props)

    this.inputs = {
      email: React.createRef(),
      password: React.createRef()
    }

    this.state = {
      block: false,
      error: false
    }

    this.onFocus = this.onFocus.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onFocus () {
    this.setState({ error: false })
  }

  onSubmit () {
    const error = Object.values(this.inputs).every(({ current }) => {
      const { value, error } = current.state
      return value && !error ? true : current.focus()
    })

    if (!error) return

    this.setState({ block: true })

    const payload = Object.entries(this.inputs).map(([k, v]) => ({ [k]: v.current.value })).reduce((a, c) => ({ ...a, ...c }))

    request('login', { body: JSON.stringify(payload) })
      .then(({ bearer }: { bearer: string }) => {
        localStorage.setItem('bearer', bearer)
        history.pushState({}, null, '/')
        location.reload()
      })
      .catch(() => this.setState({ error: true }))
      .then(() => this.setState({ block: false }))
  }

  render () {
    const { email, password } = this.inputs
    const { block, error } = this.state

    return (
      <div className='login-component'>
        <div className='labels'>
          <span>Logowanie</span>
          <span>logujesz się za pomocą konta</span>
        </div>

        <InputText icon='mail' placeholder='adres e-mail' email required ref={email} onFocus={this.onFocus} />
        <InputText icon='lock' placeholder='hasło' password nocheck required ref={password} onFocus={this.onFocus} />

        <span className='recover'><Link to='/recover'>{'Odzyskaj Hasło >'}</Link></span>

        {error && <span className='error'>Your login information was incorrect. Please check and try again</span>}

        <Button className={block ? 'block' : ''} value='Zaloguj' onClick={this.onSubmit} />
        <span className='signup'>Nie masz konta? <Link to='/signup'>Zarejestruj się</Link></span>
      </div>
    )
  }
}
