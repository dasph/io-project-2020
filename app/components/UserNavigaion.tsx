import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


import './styles/userNavigaion.scss'

type Props = {
  rank: number
}

const logout = () => {
  localStorage.clear()
  location.replace('/')
}

export class UserNavigaion extends Component<Props, {}> {
  constructor (props: Props) {
    super(props)
  }

  render () {
    return (
      <Navbar className='user-navigaion' bg='dark' variant='dark'>
        <Navbar.Brand>
          <a>dashboard</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
        </Navbar.Collapse>
        <Nav>
          <Nav.Link onClick={logout} >Log out</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}
