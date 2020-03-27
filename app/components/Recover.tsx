import React, { Component } from 'react'

import './styles/recover.scss'

export class Recover extends Component<{}, {}> {
  render () {
    return (
      <div className='recover-component'>
        <div className='labels'>
          <span>Recover password</span>
          <span>if your email exists in our database, you will receive a message with further instructions</span>
        </div>
        <div className='input-field email'>
          <div>
            <img src='images/icon-mail.svg' />
            <input
              type='text' autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false'
              placeholder='email address' maxLength={32}
            />
          </div>
        </div>
        <input type='button' value='Confirm' />
      </div>
    )
  }
}
