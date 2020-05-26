import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from '../request'
import { InputText } from './extra/InputText'
import { Button } from './extra/Button'


import './styles/recover.scss'

interface State {
  step: number;
  error: string;
}

export class Recover extends Component<{}, State> {
  email: React.RefObject<InputText>;
  passws: {
    pass: React.RefObject<InputText>;
    pass2: React.RefObject<InputText>;
  };
  recovery: string | null;

  constructor (props) {
    super(props)

    this.email = React.createRef()
    this.passws = {
      pass: React.createRef(),
      pass2: React.createRef()
    }

    this.recovery = new URLSearchParams(window.location.search).get('recovery')

    this.state = {
      step: this.recovery ? 3 : 5,
      error: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onSubmitNew = this.onSubmitNew.bind(this)
  }

  onSubmit () {
    const { value, error } = this.email.current.state
    if (!value || error) return this.email.current.focus()

    const payload = { email: value }

    request('recover', { body: JSON.stringify(payload) })
      .then(() => this.setState({ step: 1 }))
      .catch((error) => this.setState({ step: 2, error }))
  }

  onSubmitNew () {
    const error = Object.values(this.passws).every(({ current }) => {
      const { value, error } = current.state
      return value && !error ? true : current.focus()
    })

    if (!error) return

    const payload = Object.entries(this.passws).map(([k, { current }]) => ({ [k]: current.value })).reduce((a, c) => ({ ...a, ...c }))

    request('recover', {  method: 'PUT', body: JSON.stringify({ ...payload, token: decodeURIComponent(this.recovery) }) })
      .then(() => this.setState({ step: 5 }))
      .catch((error) => this.setState({ step: 2, error }))
  }

  componentDidMount () {
    const { step } = this.state
    const { recovery } = this

    if (step === 3) {
      request(`recover/${decodeURIComponent(recovery)}`)
        .then(() => this.setState({ step: 4 }))
        .catch(() => this.setState({ step: 2, error: 'Nieznany kod odzyskania hasła' }))
    }
  }

  render () {
    const { step, error } = this.state
    const { email, passws } = this

    return (
      <div className='recover-component'>
        <div className='labels'>
          <span>Odzyskiwanie hasła</span>
          <span>jeśli podany e-mail istnieje, otrzymasz wiadomość z instrukcją</span>
        </div>

        <div>
          <div className={step === 0 ? '' : 'hide'}>
            <InputText icon='mail' placeholder='adres e-mail' email required ref={email} />

            <span><Link to='/login'>wróć do logowania</Link></span>
            <Button value='Potwierdź' onClick={this.onSubmit} />
          </div>

          <div className={`success${step === 1 ? '' : ' hide'}`}>
            <span>sukces!</span>
            <img src='images/icon-mail.svg' />
            <span>Wysłaliśmy link odzyskujący hasło na twoją skrzynkę</span>
          </div>

          <div className={`error${step === 2 ? '' : ' hide'}`}>
            <span>błąd!</span>
            <img src='images/icon-arrow.svg' style={{ transform: 'rotate(270deg)' }} />
            <span>{error}</span>
          </div>

          <div className={step === 4 ? '' : 'hide'}>
            <InputText icon='lock' placeholder='hasło' password required ref={passws.pass} />
            <InputText icon='lock' placeholder='powtórz hasło' password required ref={passws.pass2} confirm={passws.pass} />
            <Button value='Potwierdź' onClick={this.onSubmitNew} />
          </div>

          <div className={`success success-2nd${step === 5 ? '' : ' hide'}`}>
            <span>sukces!</span>
            <img src='images/icon-heart.svg' />
            <span>Hasło zostało zmienione</span>
            <span><Link to='/login'>wróć do logowania</Link></span>
          </div>
        </div>
      </div>
    )
  }
}
