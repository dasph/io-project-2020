import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './styles/sidebar.scss'

const links = ['dashboard', 'announcements', 'laundry', 'tools']

type Props = {
  rank: number
}

export class Sidebar extends Component<Props, {}> {
  constructor (props: Props) {
    super(props)
  }

  render () {
    return (
      <div className='sidebar'>
        <div>
          <img src='images/logo-white.svg' />
          <span>indorm</span>
        </div>
        <Navbar className='align-items-start'>
          {links.map((l, i) => <Nav.Link key={i} as={NavLink} exact to={i > 0 ? l : '/'}><img src={`images/icon-${l}.svg`} /><span>{l}</span></Nav.Link>)}
        </Navbar>
      </div>
    )
  }
}
