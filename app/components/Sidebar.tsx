import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './styles/sidebar.scss'

const links = [
  { rank: 3, label: 'dashboard' },
  { rank: 0, label: 'requests' },
  { rank: 3, label: 'announcements' },
  { rank: 3, label: 'laundry' },
  { rank: 3, label: 'tools' }
]

type Props = {
  rank: number;
  disabled: boolean;
}

export class Sidebar extends Component<Props, {}> {
  constructor (props: Props) {
    super(props)
  }

  render () {
    const { rank, disabled }  = this.props

    return (
      <div className='sidebar'>
        <div>
          <img src='images/logo-white.svg' />
          <span>indorm</span>
        </div>
        <Navbar className='align-items-start'>
          {links.filter(({ rank: r }) => r >= rank ).map(({ label }, i) => (
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
