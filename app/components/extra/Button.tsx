import React, { Component } from 'react'

import './styles/button.scss'

interface Props {
  value: string;
  onClick? (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  type?: string;
  className?: string;
}

export class Button extends Component<Readonly<Props>, {}> {
  render () {
    const { value, onClick, type, className } = this.props

    return (
      <button className={`custom-btn type-${type || '0'}${className ? ` ${className}` : ''}`} onClick={onClick}>{value}</button>
    )
  }
}
