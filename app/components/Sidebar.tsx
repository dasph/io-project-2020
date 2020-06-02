import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './styles/sidebar.scss'

const links = [
  { rank: 3, label: 'Mój Panel', img: 'dashboard' },
  { rank: 1, label: 'Rezydenci', img: 'residents' },
  { rank: 0, label: 'Oczekujące', img: 'requests' },
  { rank: 3, label: 'Ogłoszenia', img: 'announcements' },
  { rank: 3, label: 'Pralnia', img: 'laundry' },
  { rank: 3, label: 'Narzędzia', img: 'tools' }
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
          {links.filter(({ rank: r }) => r >= rank).map(({ label, img }, i) => (
            <Nav.Link disabled={disabled} key={i} as={NavLink} exact to={i > 0 ? img : '/'}>
              <img src={`images/icon-${img}.svg`} />
              <span>{label}</span>
            </Nav.Link>
          ))}
        </Navbar>
      </div>
    )
  }
}
