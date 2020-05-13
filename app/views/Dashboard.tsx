import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { UserNavigaion } from '../components/UserNavigaion'
import { Roomless } from '../components/Roomless'
import { Residents } from '../components/Residents'
import { RequestManager } from '../components/RequestManager'
import request from '../request'

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

type State = {
  roomless: number;
}

export default class Dashboard extends Component<Props, State> {
  userInfo: TUserInfo;

  constructor (props: Props) {
    super(props)

    this.state = {
      roomless: 0
    }

    try {
      this.userInfo = JSON.parse(atob(this.props.bearer))
    } catch {
      localStorage.clear()
      location.reload()
    }
  }

  componentDidMount () {
    request('userRes').then(({ error, ...payload }) => {
      if (error) {
        return this.setState({ roomless: error })
      }
    })
  }

  render () {
    const { roomless } = this.state
    const { firstname, lastname, rank } = this.userInfo

    return (
      <BrowserRouter>
        <Sidebar rank={rank} disabled={rank > 1 && !!roomless} />
        <main className='dashboard'>
          <Route path='/'>
            {({ location: { pathname } }) => <UserNavigaion rank={rank} path={pathname} disabled={rank > 1 && !!roomless} />}
          </Route>

          {rank > 1 && roomless && <Roomless firstname={firstname} step={roomless === 1 ? 0 : 2} />}

          { (rank < 2 || !roomless) &&
            <Switch>
              <Route path='/' exact />
              <Route path='/residents' component={Residents} />
              <Route path='/requests' component={RequestManager} />
              <Route path='/announcements' />
              <Route path='/laundry' />
              <Route path='/tools' />
              <Route path='/settings' />
              <Redirect to='/' />
            </Switch>
          }
        </main>
      </BrowserRouter>
    )
  }
}
