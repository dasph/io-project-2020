import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles/footer.scss'

export class Footer extends Component<{}, {}> {
  render () {
    return (
      <div className='footer'>
        <div>
          <img src='images/logo-white.svg' />
          <span>indorm.life</span>
        </div>
        <div>
          <span>STRONY</span>
          <Link to='/login'>Zaloguj</Link>
          <Link to='/pricing'>Cennik</Link>
          <Link to='/about'>O Nas</Link>
        </div>
        <div>
          <span>KONTAKT</span>
          <div>
            <img src='images/icon-mail-white.svg' />
            <a href='mailto:kontakt@indorm.life'>kontakt@indorm.life</a>
          </div>
          <div>
            <img src='images/icon-phone-white.svg' />
            <a href="tel:815-346-060">+48 815 346 060</a>
          </div>
        </div>
        <div>
          <a href='https://www.facebook.com/groups/562882154585475' target='_blank' rel='noopener noreferrer'>
            <img src='images/icon-facebook.svg' title='Facebook' />
          </a>
          <a href='https://www.instagram.com/jakubpobuta' target='_blank' rel='noopener noreferrer'>
            <img src='images/icon-instagram.svg' title='Instagram' />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <img src='images/icon-twitter.svg' title='Twitter' />
          </a>
          <a href='https://youtu.be/ooOELrGMn14?t=11' target='_blank' rel='noopener noreferrer'>
            <img src='images/icon-youtube.svg' title='Youtube' />
          </a>
        </div>
      </div>
    )
  }
}
