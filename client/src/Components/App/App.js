import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { GraphQL, GraphQLProvider } from 'graphql-react'
import Homepage from '../Homepage/Homepage'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'

const graphql = new GraphQL()

const App = () => {
  return(
    <GraphQLProvider graphql={graphql}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
          <Route path='/signup' exact>
            <Signup />
          </Route>
          <Route>
            <Login path='login'/>
          </Route>
        </Switch>
      </Router>
    </GraphQLProvider>
  )
}

export default App