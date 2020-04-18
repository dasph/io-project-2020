import React, { Component } from 'react'
import Validator from 'validator'

import './styles/inputText.scss'

interface Props {
  className?: string;
  icon?: string;
  placeholder?: string;
  required?: boolean;
  password?: boolean;
  nocheck?: boolean;
  email?: boolean;
  phone?: boolean;
  confirm?: React.RefObject<InputText>;
  onFocus?: () => void;
}

interface State {
  value: string;
  error: string;
}

const { isEmail, isMobilePhone } = Validator
const isValidPassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()\-=_+;:'"/?,<.>])(?=.{6,})/.test(password)

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
    this.onFocus = this.onFocus.bind(this)
  }

  get value () {
    const { phone } = this.props

    return this.state.value.slice(phone ? 4 : 0)
  }

  focus () {
    this.input.current.focus()
  }

  onChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { required, phone } = this.props
    const { value } = event.target

    const error = required && !value ? 'this field is required' : ''

    if (phone) {
      if (value.length < 4) return this.setState({ value: '+48 ' })
      if (!/^[+]48\s\d{0,9}$/.test(value) || value.length > 13) return
    }

    this.setState({ value, error })
  }

  onBlur (event: React.FocusEvent<HTMLInputElement>) {
    const { email, password, nocheck, confirm, phone } = this.props
    const { value } = event.target

    if (!value) return

    if (email && !isEmail(value)) {
      return this.setState({ error: 'please enter a proper email address' })
    }

    if (confirm && confirm.current.state.value && confirm.current.state.value !== value) {
      return this.setState({ error: 'passwords do not match' })
    }

    if (password && !nocheck && !isValidPassword(value)) {
      return this.setState({ error: 'password is too weak' })
    }

    if (phone && value === '+48 ') {
      return this.setState({ value: '' })
    }

    if (phone && !isMobilePhone(value.trim(), 'pl-PL', { strictMode: true })) {
      return this.setState({ error: 'please enter a valid phone number' })
    }
  }

  onFocus () {
    const { phone, onFocus } = this.props
    const { value } = this.state

    if (phone && !value) {
      this.setState({ value: '+48 ' })
    }

    onFocus && onFocus()
  }

  render () {
    const { className, icon, placeholder, password, phone } = this.props
    const { value, error } = this.state

    return (
      <div className={`input-text${className ? ` ${className}` : ''}`}>
        <div>
          {icon && <img src={`images/icon-${icon}.svg`} />}
          <div data-error={error}>
            <input
              autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false' maxLength={32}
              type={password ? 'password' : phone ? 'tel' : 'text'} placeholder={placeholder} value={value}
              ref={this.input} onFocus={this.onFocus} onChange={this.onChange} onBlur={this.onBlur}
            />
          </div>
        </div>
      </div>
    )
  }
}
