import React, { Component } from 'react'
import { Banner } from './extra/Banner'
import { Footer } from './extra/Footer'

import './styles/pricing.scss'

export class Pricing extends Component<{}, {}> {
  render () {
    return (
      <div className='pricing-page'>
        <Banner title='CENNIK' />
        <div>
        </div>
        <Footer />
      </div>
    )
  }
}
