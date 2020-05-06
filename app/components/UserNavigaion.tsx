import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import './styles/userNavigaion.scss'

type Props = {
  rank: number;
  path: string;
  disabled: boolean;
}

const logout = () => {
  localStorage.clear()
  location.replace('/')
  location.reload()
}

export class UserNavigaion extends Component<Props, {}> {
  constructor (props: Props) {
    super(props)
  }

  render () {
    const { path, disabled } = this.props

    return (
      <Navbar className='user-navigaion justify-content-between' bg='dark' variant='dark'>
        <Navbar.Brand>
          {path.slice(1) ? path.slice(1) : 'dashboard'}
        </Navbar.Brand>

        <Nav>
          <NavDropdown title={<img src='images/icon-settings.svg' />} id={null} disabled={disabled}>
            <NavDropdown.Item as={NavLink} to='/settings'>Settings</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={logout}>Log out</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}
