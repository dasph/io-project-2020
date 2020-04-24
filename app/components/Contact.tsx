import React, { Component } from 'react'
import { Banner } from './extra/Banner'
import { Footer } from './extra/Footer'

import './styles/contact.scss'

export class Contact extends Component<{}, {}> {
  render () {
    return (
      <div className='contact-page'>
        <Banner title='kontakt' />
        <div>
        </div>
        <Footer />
      </div>
    )
  }
}
