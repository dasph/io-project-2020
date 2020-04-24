import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from '../request'
import { Button } from './extra/Button'
import { InputDate } from './extra/InputDate'
import { InputText } from './extra/InputText'

import './styles/signup.scss'

interface State {
  step: number;
  error: string;
}

export class Signup extends Component<{}, State> {
  inputs: [{
    email: React.RefObject<InputText>;
    pass: React.RefObject<InputText>;
    pass2: React.RefObject<InputText>;
  }, {
    firstname: React.RefObject<InputText>;
    lastname: React.RefObject<InputText>;
    dob: React.RefObject<InputDate>;
    phone: React.RefObject<InputText>;
  }]

  confirmation: string | null

  constructor (props) {
    super(props)

    this.inputs = [{
      email: React.createRef(),
      pass: React.createRef(),
      pass2: React.createRef()
    }, {
      firstname: React.createRef(),
      lastname: React.createRef(),
      dob: React.createRef(),
      phone: React.createRef()
    }]

    this.confirmation = new URLSearchParams(window.location.search).get('confirm')

    this.state = {
      step: this.confirmation ? 5 : 0,
      error: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    const { step } = this.state

    const error = Object.values(this.inputs[step]).every(({ current }) => {
      const { value, error } = current.state
      return value && !error ? true : current.focus()
    })

    if (!error) return
    if (step === 0) return this.setState({ step: 1 })
    if (step === 1) {
      const merge = (a: any, b: any) => ({ ...a, ...b })
      const { pass, pass2, ...inputs } = Object.entries(this.inputs.reduce(merge)).map(([k, v]) => ({ [k]: v.current.value })).reduce(merge)
      const payload = { password: [pass, pass2], ...inputs }

      this.setState({ step: 2 })

      request('signup', { body: JSON.stringify(payload) })
        .then(() => this.setState({ step: 3 }))
        .catch((error) => this.setState({ step: 4, error }))
    }
  }

  componentDidMount () {
    const { step } = this.state
    const { confirmation } = this

    if (step === 5) {
      request('confirm', { body: JSON.stringify({ confirmation }) })
        .then(() => this.setState({ step: 6 }))
        .catch(() => this.setState({ step: 4, error: 'Nieznany kod aktywacyjny' }))
    }
  }

  render () {
    const [{ email, pass, pass2 }, { firstname, lastname, dob, phone }] = this.inputs
    const { step, error } = this.state

    return (
      <div className='signup-component'>
        <div className='labels'>
          <span>Rejestracja</span>
          {step < 3 && <span>wypełnij poniższe pola</span>}
        </div>

        <div>
          <div className={step === 0 ? '' : 'hide'}>
            <InputText icon='mail' placeholder='adres e-mail' email required ref={email} />
            <InputText icon='lock' placeholder='hasło' password required ref={pass} />
            <InputText icon='lock' placeholder='powtórz hasło' password required ref={pass2} confirm={pass} />
          </div>

          <div className={step === 1 || step === 2 ? '' : 'hide'}>
            <InputText icon='bookmark' placeholder='imię' required ref={firstname} />
            <InputText icon='bookmark' placeholder='nazwisko' required ref={lastname} />
            <InputDate icon='bookmark' placeholder='data urodzenia' nofuture required ref={dob} />
            <InputText icon='phone' placeholder='numer telefonu' phone required ref={phone} />
          </div>

          <div className={`success${step === 3 ? '' : ' hide'}`}>
            <span>sukces!</span>
            <img src='images/icon-mail.svg' />
            <span>Wysłaliśmy link aktywacyjny na twoją skrzynkę</span>
          </div>

          <div className={`error${step === 4 ? '' : ' hide'}`}>
            <span>błąd!</span>
            <img src='images/icon-arrow.svg' style={{ transform: 'rotate(270deg)' }} />
            <span>{error}</span>
          </div>

          <div className={`loading${step === 5 ? '' : ' hide'}`}>
            <div className='loader'><div></div><div></div><div></div><div></div></div>
          </div>

          <div className={`success${step === 6 ? '' : ' hide'}`}>
            <span>sukces!</span>
            <img src='images/icon-heart.svg' />
            <span>Twoje konto zostało utworzone!.<Link to='/login'>Logowanie</Link></span>
          </div>
        </div>

        {step < 5 && <span><Link to='/login'>Masz konto?</Link></span>}
        {step < 3 && <Button value={step === 0 ? 'Dalej' : 'Zarejestruj'} onClick={this.onSubmit} />}
        {step === 4 && <Button value='Go back' onClick={() => this.setState({ step: 0 })} />}
      </div>
    )
  }
}
