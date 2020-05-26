import React, { Component } from 'react'
import { Jumbotron, Button, Dropdown, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { InputDate } from './extra/InputDate'
import request from '../request'

import './styles/roomless.scss'

type TRoom = {
  id: number;
  current: number;
  max: number;
  available: boolean;
}

type Props = {
  step: number;
  firstname: string;
}

type State = {
  step: number;
  floor: number;
  rooms: TRoom[];
  pick: number;
  expire: number;
}

const sortRooms = (rooms: TRoom[]) => {
  const sorted = [...rooms].sort(({ id: a }, { id: b }) => b - a)
  return [...sorted.slice(9, 23).reverse(), ...sorted.slice(23), ...sorted.slice(0, 9)]
}

export class Roomless extends Component<Props, State> {
  inputDate: React.RefObject<InputDate>;

  constructor (props: Props) {
    super(props)

    this.inputDate = React.createRef()

    this.state = {
      step: this.props.step,
      floor: null,
      rooms: null,
      pick: null,
      expire: null
    }

    this.onFloorSelect = this.onFloorSelect.bind(this)
    this.onPick = this.onPick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onFloorSelect (floor: number) {
    this.setState({ floor, pick: null })

    request(`rooms/${floor}`).then(({ rooms }) => this.setState({ rooms }))
  }

  onPick (room: number) {
    this.setState({ pick: this.state.pick === room ? null : room })
  }

  onSubmit () {
    const { pick, expire } = this.state

    this.setState({ pick: null })

    request('roomReq', { body: JSON.stringify({ rid: pick, expire }) })
      .then(() => this.setState({ step: 2 }))
      .catch(() => this.setState({ step: 3 }))
  }

  render () {
    const { firstname } = this.props
    const { step, floor, rooms, pick, expire } = this.state

    return (
      <Jumbotron className='roomless'>
        <div className={step === 0 ? '' : 'hide'}>
          <span>Hello, {firstname}</span>
          <span>In order to start using this app you will need to create a request for a room 🏘</span>
          <Button variant='dark' size='lg' onClick={() => this.setState({ step: 1 })}>Pick a room</Button>
        </div>

        <div className={step === 1 ? '' : 'hide'}>
          <div>
            <span>select floor: </span>
            <Dropdown as={ButtonGroup}>
              <Button variant='secondary' size='lg'>{floor || '?'}</Button>
              <Dropdown.Toggle split variant='outline-secondary' id=''/>
              <Dropdown.Menu>
                {[1, 2, 3, 4].map((f, i) => <Dropdown.Item key={i} onClick={() => this.onFloorSelect(f)}>{f}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            {rooms && sortRooms(rooms).map(({ id, current, max, available }, i) => (
              <OverlayTrigger key={i} placement='top' overlay={<Tooltip id=''>{available ? <>Currently: {current}<br />Maximum: {max}</> : 'Unavailable'}</Tooltip>}>
                <div
                  className={`${!available || current >= max ? 'unavailable' : current > 0 ? 'occupied' : ''}`}
                  onClick={() => available && current < max && this.onPick(id)}
                  style={ id === pick ? { color: 'white', background: 'black' } : {}}
                >{id}</div>
              </OverlayTrigger>
            ))}
          </div>
          {pick && <InputDate icon='bookmark' placeholder='pick a date' nopast ref={this.inputDate} style={{ fontSize: '0.6em' }} onSubmit={() => this.setState({ expire: this.inputDate.current.value })} /> }
          <Button variant='dark' size='lg' disabled={!pick || !expire || Date.now() > expire} onClick={this.onSubmit}>Submit</Button>
        </div>

        <div className={step === 2 ? '' : 'hide'}>
          <span>Dear, {firstname}</span>
          <span>We received your request, plase be patient and await its validation</span>
        </div>

        <div className={step === 3 ? '' : 'hide'}>
          <span>Hmm, it appears that an error has occured... Man gerrara here</span>
        </div>
      </Jumbotron>
    )
  }
}
