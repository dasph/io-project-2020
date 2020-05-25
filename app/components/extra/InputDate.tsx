import React, { Component } from 'react'
import { Button } from './Button'

import './styles/inputDate.scss'
import './styles/inputText.scss'

const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
const days = ['N', 'P', 'W', 'Ś', 'C', 'P', 'S']

const WeekDays = () => <>{days.map((v, i) => <span key={i}>{v}</span>)}</>
const range = (n: number, offset = 0) => [...Array(n).keys()].map((v) => v + offset)

interface Props {
  className?: string;
  icon?: string;
  placeholder?: string;
  required?: boolean;
  nofuture?: boolean;
  nopast?: boolean;
  onSubmit?: () => void;
  style?: object;
}

interface State {
  value: string;
  error: string;
  mode: number;
  modal: boolean;
  date: Date;
  pick: Date | null;
}

export class InputDate extends Component<Readonly<Props>, State> {
  input: React.RefObject<HTMLInputElement>

  constructor (props: Props) {
    super(props)

    this.state = {
      value: '',
      error: '',
      mode: 2,
      modal: false,
      date: new Date(new Date().setFullYear(new Date().getFullYear() - 21)),
      pick: null
    }

    this.input = React.createRef()

    this.toggleMode = this.toggleMode.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onPick = this.onPick.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  get value () {
    return +this.state.pick
  }

  focus () {
    this.input.current.focus()
  }

  toggleMode () {
    const { mode } = this.state
    if (mode < 2) this.setState({ mode: mode + 1 })
  }

  onMove (dir: boolean) {
    const { mode, date } = this.state

    const [y, m] = [date.getFullYear(), date.getMonth()]

    mode === 0 ? date.setMonth(m + (dir ? 1 : -1)) : date.setFullYear(y + (mode < 2 ? 1 : 12) * (dir ? 1 : -1))

    this.setState({ date })
  }

  onPick ({ year, month, day }: { year?: number; month?: number; day?: number }) {
    const { date } = this.state

    if (year) date.setFullYear(year)
    else if (month) date.setMonth(month)
    else if (day) {
      const pick = new Date(date.getFullYear(), date.getMonth(), day)
      return this.setState({ pick: +pick === +this.state.pick ? null : pick })
    }

    this.setState({ date, mode: year ? 1 : 0 })
  }

  onFocus () {
    this.input.current.blur()
    this.setState({ modal: true })
  }

  onSubmit () {
    const { nofuture, nopast, onSubmit } = this.props
    const { pick } = this.state

    if (!pick) return

    const error = nofuture && new Date() < pick ? 'Data nie może być w przyszłości' : ''
      || nopast && new Date() > pick ? 'Data nie może być w przeszłości' : ''
    const value = [pick.getDate(), pick.getMonth(), pick.getFullYear()].map((v, i) => `${i === 1 ? v + 1 : v}`.padStart(2, '0')).join(' / ')

    this.setState({ modal: false, value, error })
    onSubmit && onSubmit()
  }

  render () {
    const { className, icon, placeholder, style } = this.props
    const { value, error, mode, modal, date, pick } = this.state

    const month = date.getMonth()
    const year = date.getFullYear()

    const day = new Date(year, month, 1).getDay()
    const first = new Date(year, month, 0).getDate() - day + 1
    const last = new Date(year, month + 1, 0).getDate()

    return (
      <div className={`input-text input-date${modal ? ' active' : ''}${className ? ` ${className}` : ''}`} style={style}>
        <div>
          {icon && <img src={`images/icon-${icon}.svg`} />}
          <div data-error={error}>
            <input
              autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false' type='text'
              readOnly placeholder={placeholder} value={value} ref={this.input} onFocus={this.onFocus}
            />
          </div>
        </div>
        {modal &&
          <div className='modal-calendar'>
            <div />
            <div>
              <div>
                <img src='images/icon-arrow.svg' onClick={() => this.onMove(false)} />
                <span onClick={this.toggleMode} className={mode === 2 ? 'cursor-default' : ''}>
                  <div className={mode > 0 ? 'hide' : ''}>{months[month]}</div>
                  <div className={mode > 1 ? 'hide' : ''}>{year}</div>
                  <div className={mode !== 2 ? 'hide' : ''}>{`${year} - ${year + 11}`}</div>
                </span>
                <img src='images/icon-arrow.svg' onClick={() => this.onMove(true)} style={{ transform: 'scaleX(-1)' }} />
              </div>

              <div className={mode === 0 ? 'days' : mode === 1 ? 'months' : 'years'}>
                {mode === 0 && <>
                  <WeekDays />

                  {range(day, first).map((v) => <div key={v} className='day disabled'>{v}</div>)}
                  {range(last, 1).map((day) => <div key={`${year}${month}${day}`} className={`day${pick && +pick === +new Date(year, month, day) ? ' picked' : ''}`} onClick={() => this.onPick({ day })}>{day}</div>)}
                  {range(42 - last - day, 1).map((v) => <div key={v} className='day disabled'>{v}</div>)}
                </>}

                {mode === 1 && <>
                  {months.map((v, month) => <div key={`${year}${month}`} className='month' onClick={() => this.onPick({ month })}>{v}</div>)}
                </>}

                {mode === 2 && <>
                  {range(12, year).map((year) => <div key={year} className='year' onClick={() => this.onPick({ year })}>{year}</div>)}
                </>}
              </div>

              <div>
                <Button value='anuluj' onClick={() => this.setState({ modal: false })} />
                <Button type={pick ? '0' : 'disabled'} value='wybierz' onClick={this.onSubmit} />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
