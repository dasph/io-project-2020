import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './styles/sidebar.scss'

const links = [
  { rank: 3, label: 'Mój Panel' },
  { rank: 1, label: 'Rezydenci' },
  { rank: 0, label: 'Oczekujące' },
  { rank: 3, label: 'Ogłoszenia' },
  { rank: 3, label: 'Pralnia' },
  { rank: 3, label: 'Narzędzia' }
]

type Props = {
  rank: number;
  disabled: boolean;
}

export class Sidebar extends Component<Props, {}> {
  render () {
    const { rank, disabled } = this.props

    return (
      <div className='sidebar'>
        <div>
          <img src='images/logo-white.svg' />
          <span>indorm</span>
        </div>
        <Navbar className='align-items-start'>
          {links.filter(({ rank: r }) => r >= rank).map(({ label }, i) => (
            <Nav.Link disabled={disabled} key={i} as={NavLink} exact to={i > 0 ? label : '/'}>
              <img src={`images/icon-${label}.svg`} />
              <span>{label}</span>
            </Nav.Link>
          ))}
        </Navbar>
      </div>
    )
  }
}
