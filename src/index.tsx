/* eslint-disable import/default */
import * as React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Root from './app/Root'
import * as styles from './style'
styles;


const renderFunc = (Component:React.ComponentType<any>) =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )

renderFunc(Root)

if (module.hot) {
  module.hot.accept('./app/Root', () => {
    const NewRoot = require('./app/Root').default
    renderFunc(NewRoot)
  })
}
