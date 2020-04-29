import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { UserNavigaion } from '../components/UserNavigaion'

import 'bootstrap/scss/bootstrap.scss'
import './styles/dashboard.scss'

type Props = { bearer: string }

type TUserInfo = {
  dob: string;
  firstname: string;
  hash: string;
  id: string;
  lastname: string;
  phone: number;
  profileIcon: string | null;
  rank: number;
  signed: number;
}

export default class Dashboard extends Component<Props, {}> {
  userInfo: TUserInfo;

  constructor (props: Props) {
    super(props)

    try {
      this.userInfo = JSON.parse(atob(this.props.bearer))
    } catch {
      localStorage.clear()
      location.reload()
    }
  }

  render () {
    const { firstname, lastname, rank } = this.userInfo

    return (
      <BrowserRouter>
        <Sidebar rank={rank} />
        <main className='dashboard'>
          <UserNavigaion rank={rank} />
          <span>Hello, {firstname} {lastname}</span>
          <Switch>
            <Route path='/' exact />
            <Route path='/announcements' />
            <Route path='/laundry' />
            <Route path='/tools' />
            <Redirect to='/' />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
