import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
        <div>
          <ul>
            {links.map((l, i) => <li key={i}><Link to={i > 0 ? l : '/'}><img src={`images/icon-${l}.svg`} /><span>{l}</span></Link></li>)}
          </ul>
        </div>
      </div>
    )
  }
}
