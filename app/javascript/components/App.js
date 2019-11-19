import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Boggle from './Boggle'
import reducer from '../reducers'


const store = createStore(reducer, applyMiddleware(thunkMiddleware));

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/boggle' render={() => <Boggle />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
