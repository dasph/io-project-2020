import React, { Component } from 'react'
import { Table, Form } from 'react-bootstrap'
import request from '../request'

type TResident = {
  UserInfo: {
    dob: string;
    firstname: string;
    id: string;
    lastname: string;
    phone: number;
    profileIcon: string;
    rank: number;
    createdAt: string;
  }
  id: string;
  rid: number;
  expire: number;
  uid: string;
}

type State = {
  residents: TResident[];
  room: string;
  firstname: string;
  lastname: string;
}

export class Residents extends Component<{}, State> {
  constructor (props: {}) {
    super(props)

    this.state = {
      residents: [],
      room: '',
      firstname: '',
      lastname: ''
    }

    this.onRoomChange = this.onRoomChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
  }

  search () {
    const { room, firstname, lastname } = this.state

    request('residents', { body: JSON.stringify({ room, firstname, lastname }) })
      .then(({ residents }) => this.setState({ residents }))
      .catch((error: string) => error === 'Unauthorized' && location.replace('/'))
  }

  onRoomChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } } = event

    if (value && !/^\d{1,3}$/.test(value)) return

    this.setState({ room: value }, this.search)
  }

  onNameChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event

    if (value && !/^[a-zA-Z ]+$/.test(value)) return

    if (name === 'firstname') return this.setState({ firstname: value }, this.search)
    if (name === 'lastname') return this.setState({ lastname: value }, this.search)
  }

  componentDidMount () {
    this.search()
  }

  render () {
    const { residents, room, firstname, lastname } = this.state

    return (
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr className='text-center'>
            <th className='align-middle'>Room</th>
            <th className='align-middle'>Picture</th>
            <th className='align-middle'>First Name</th>
            <th className='align-middle'>Last Name</th>
            <th className='align-middle'>Date of Birth</th>
            <th className='align-middle'>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-center'>
            <td>
              <Form.Control size='lg' type='text' placeholder='number' value={room} onChange={this.onRoomChange} />
            </td>
            <td />
            <td>
              <Form.Control
                size='lg' type='text' name='firstname' placeholder='firstname' value={firstname} onChange={this.onNameChange}
                autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false' maxLength={32}
              />
            </td>
            <td>
              <Form.Control
                size='lg' type='text' name='lastname' placeholder='lastname' value={lastname} onChange={this.onNameChange}
                autoCapitalize='off' autoComplete='off' autoCorrect='off' spellCheck='false' maxLength={32}
              />
            </td>
          </tr>

          {residents.map(({ UserInfo: { profileIcon, firstname, lastname, dob, phone }, rid, id }) => (
            <tr key={id} className='text-center'>
              <td>{rid}</td>
              <td>{profileIcon ? <img /> : <img />}</td>
              <td>{firstname}</td>
              <td>{lastname}</td>
              <td>{new Date(dob).toLocaleDateString()}</td>
              <td>{phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}
