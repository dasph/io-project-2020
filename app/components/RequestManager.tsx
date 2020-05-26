import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import request from '../request'

type TRequest = {
  UserInfo: {
    dob: string;
    firstname: string;
    id: string;
    lastname: string;
    phone: number;
    profileIcon: string;
    rank: number;
    createdAt: string;
  };
  id: string;
  rid: number;
  expire: number;
  uid: string;
}

type State = {
  requests: TRequest[];
}

export class RequestManager extends Component<{}, State> {
  constructor (props: {}) {
    super(props)

    this.state = {
      requests: []
    }

    this.onAction = this.onAction.bind(this)
  }

  onAction (id: string, accept: boolean) {
    const { requests } = this.state

    request('roomReq', { method: 'PUT', body: JSON.stringify({ id, accept }) })
      .then(() => this.setState({ requests: requests.filter(({ id: i }) => i !== id) }))
  }

  componentDidMount () {
    request('roomReq')
      .then(({ requests }) => this.setState({ requests }))
      .catch((error: string) => error === 'Unauthorized' && location.replace('/'))
  }

  render () {
    const { requests } = this.state

    return (
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr className='text-center'>
            <th className='align-middle'>Picture</th>
            <th className='align-middle'>First Name</th>
            <th className='align-middle'>Last Name</th>
            <th className='align-middle'>Date of Birth</th>
            <th className='align-middle'>Phone</th>
            <th className='align-middle'>Room</th>
            <th className='align-middle'>Until</th>
            <th className='align-middle'>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(({ UserInfo: { profileIcon, firstname, lastname, dob, phone }, rid, expire, id }) => (
            <tr key={id} className='text-center'>
              <td>{profileIcon ? <img /> : <img />}</td>
              <td>{firstname}</td>
              <td>{lastname}</td>
              <td>{new Date(dob).toLocaleDateString()}</td>
              <td>{phone}</td>
              <td>{rid}</td>
              <td>{new Date(expire).toLocaleDateString()}</td>
              <td className=''>
                <Button variant='success' size='lg' style={{ margin: '0px 5px' }} onClick={() => this.onAction(id, true)}>Accept</Button>
                <Button variant='warning' size='lg' style={{ margin: '0px 5px' }} onClick={() => this.onAction(id, false)}>Decline</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}
