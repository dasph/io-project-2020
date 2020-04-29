import React, { Component, Suspense, lazy } from 'react'

const Landing = lazy(() => import('./components/Landing'))
const Dashboard = lazy(() => import('./components/Dashboard'))

const bearer = localStorage.getItem('bearer')
const loader = <div className='loader'><div></div><div></div><div></div><div></div></div>

export class App extends Component<{}, {}> {
  render () {
    return (
      <Suspense fallback={loader}>
        {bearer ? <Dashboard bearer={bearer} /> : <Landing />}
      </Suspense>
    )
  }
}
