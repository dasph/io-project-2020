import React, { Component } from 'react'

import './styles/button.scss'

interface Props {
  value: string,
  onClick? (event: React.MouseEvent<HTMLInputElement, MouseEvent>): void,
  type?: string
}

export class Button extends Component<Readonly<Props>, {}> {
  render () {
    const { value, onClick, type } = this.props

    return (
      <button className={`btn type-${type || '0'}`} onClick={onClick}>{value}</button>
    )
  }
}
