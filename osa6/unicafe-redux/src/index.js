import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const update = (review) => () => {
    switch(review) {
      case 'good': {
        store.dispatch({type: 'GOOD'})
        break
      }
      case 'ok': {
        store.dispatch({type: 'OK'})
        break
      }
      case 'bad': {
        store.dispatch({type: 'BAD'})
        break
      }
      case 'zero': {
        store.dispatch({type: 'ZERO'})
        break
      }
      default: return
    }
  }

  return (
    <div>
      <button onClick={update('good')}>good</button>
      <button onClick={update('ok')}>ok</button>
      <button onClick={update('bad')}>bad</button>
      <button onClick={update('zero')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
