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
            <th className='align-middle'>Zdjęcie</th>
            <th className='align-middle'>Imię</th>
            <th className='align-middle'>Nazwisko</th>
            <th className='align-middle'>Data urodzenia</th>
            <th className='align-middle'>Telefon</th>
            <th className='align-middle'>Pokój</th>
            <th className='align-middle'>Wymeldowanie</th>
            <th className='align-middle'>Akcje</th>
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
                <Button variant='success' size='lg' style={{ margin: '0px 5px' }} onClick={() => this.onAction(id, true)}>Akceptuj</Button>
                <Button variant='warning' size='lg' style={{ margin: '0px 5px' }} onClick={() => this.onAction(id, false)}>Odrzuć</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}
