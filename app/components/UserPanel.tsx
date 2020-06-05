import React, { Component } from 'react'
import { Table, Form } from 'react-bootstrap'

type Props = {
  dob: string;
  expire: string;
  firstname: string;
  lastname: string;
  phone: number;
  rank: number;
  rid: number;
  uid: string;
}

export class UserPanel extends Component<Props, {}> {
  render () {
    const { firstname, expire, rid } = this.props

    return (
      <div style={{ padding: '5px' }}>
        <h1 style={{ fontSize: '3em', paddingBottom: '10px' }}>Witamy, {firstname}</h1>
        <h2>Twój pokój: {rid}</h2>
        <h2>Wymeldowanie: {expire}</h2>
      </div>
    )
  }
}
