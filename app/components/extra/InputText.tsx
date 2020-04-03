import React, { Component } from 'react'

import './styles/inputText.scss'

interface Props {
  className?: string,
  icon?: string,
  placeholder?: string,
  required?: boolean
  password?: boolean
  email?: boolean
  confirm?: React.RefObject<InputText>
}

interface State {
  value: string,
  error: string,
}

const isValidEmail = (email: string) => /[^@]+@[^.]+\..+/.test(email)
const isValidPassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(password)

export class InputText extends Component<Readonly<Props>, State> {
  input: React.RefObject<HTMLInputElement>

  constructor (props: Props) {
    super(props)

    this.state = {
      value: '',
      error: ''
    }

    this.input = React.createRef()

    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  focus () {
    this.input.current.focus()
  }

  onChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { required } = this.props
    const { value } = event.target

    const error = required && !value ? 'this field is required' : ''

    this.setState({ value, error })
  }

  onBlur (event: React.FocusEvent<HTMLInputElement>) {
    const { email, password, confirm } = this.props
    const { value } = event.target

    if (!value) return

    if (email && !isValidEmail(value)) {
      return this.setState({ error: 'please enter a proper email address' })
    }

    if (confirm && confirm.current.state.value && confirm.current.state.value !== value) {
      return this.setState({ error: 'passwords do not match' })
    }

    if (password && !isValidPassword(value)) {
      return this.setState({ error: 'password is too weak' })
    }
  }

  render () {
    const { className, icon, placeholder, password } = this.props
    const { value, error } = this.state

    return (
      <div className={`input-text${className ? ` ${className}` : ''}`}>
        <div>
          {icon && <img src={`images/icon-${icon}.svg`} />}
          <div data-error={error}>
            <input
              autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false'
              type={password ? 'password' : 'text'} placeholder={placeholder} maxLength={32}
              value={value} ref={this.input} onChange={this.onChange} onBlur={this.onBlur}
            />
          </div>
        </div>
      </div>
    )
  }
}
