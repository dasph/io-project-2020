import React, { Component } from 'react'

import './styles/banner.scss'

interface Props {
  title: string;
}

export class Banner extends Component<Readonly<Props>, {}> {
  render () {
    const { title } = this.props

    return (
      <div className='banner'>
        <img src='images/logo.svg' />
        <span>{title}</span>
      </div>
    )
  }
}
