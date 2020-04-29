import React, { Component } from 'react'

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
    const { firstname, lastname } = this.userInfo

    return (
      <div>Hello, {firstname} {lastname}</div>
    )
  }
}
