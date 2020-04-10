import React, { Component } from 'react'

import './styles/banner.scss'

interface Props {
  title: string,
  desciption: string
}

export class Banner extends Component<Readonly<Props>, {}> {
  render () {
    const { title, desciption } = this.props

    return (
      <div className='banner'>
        <span>{title}</span>
        <span>{desciption}</span>
      </div>
    )
  }
}
