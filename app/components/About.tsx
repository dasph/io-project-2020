import React, { Component } from 'react'
import { Banner } from './extra/Banner'

import './styles/about.scss'

export class About extends Component<{}, {}> {
  render () {
    return (
      <div className='about-page'>
        <Banner title='o nas' desciption='to jest o nas' />
        <div>
        </div>
      </div>
    )
  }
}
