import React from 'react';
import './css/App.css';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/Register';
import Dashboard from './pages/main/Dashboard';
import MonitorGames from './pages/main/MonitorGame';
import JoinGames from './pages/main/JoinGame';
import GameView from './pages/main/GameView';
import AccountSettings from './pages/auth/AccountSettings';
import GameInsights from './pages/main/GameInsights';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import axiosInstance from './axios'

/**
 * Sets up paths to pages
 *
 * @component
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * Defines if user is logged in or not
       */
      logged_in: localStorage.getItem('access_token') ? true : false,
      
      /**
       * User data (/api/token)
       */
      credentials: {
        email: '',
        password: '',
      }
    };
  }

  componentDidCatch(error, errorinfo) {}

  render() {
    return (
      <>
        <Router>
          <Switch>
            <LoggedInRoute exact logged_in={this.state.logged_in} path="/" component={LogIn}/>
            <LoggedInRoute exact logged_in={this.state.logged_in} path="/signup" component={SignUp}/>
            <PrivateRoute logged_in={this.state.logged_in} path="/create" component={Dashboard}/>
            <PrivateRoute logged_in={this.state.logged_in} path="/monitor" component={MonitorGames}/>
            <PrivateRoute logged_in={this.state.logged_in} path="/join" component={JoinGames}/>
            <PrivateRoute logged_in={this.state.logged_in} path="/gameview/:gameid" component={GameView}/>
            <PrivateRoute logged_in={this.state.logged_in} path="/insights/:gameid" component={GameInsights}/>
            <PrivateRoute logged_in={this.state.logged_in} path='/settings' component={AccountSettings} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;

/**
 * If user isn't logged in, gets redirected to login page
 *
 * @component
 * @param {Component} component Route component to be made private
 * @param {boolean} logged_in Boolean value whether user is logged in or not
 */
function PrivateRoute ({component: Component, logged_in, ...rest}) {
  return (
    <Route
      {...rest}
      render = {(props) => (logged_in === true)
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
      }
    />
  )
}

/**
 * If user is logged in, gets redirected to /monitor
 *
 * @component
 * @param {Component} component Route component to be redirected
 * @param {boolean} logged_in Boolean value whether user is logged in or not
 */
function LoggedInRoute ({component: Component, logged_in, ...rest}) {
  return (
    <Route
      {...rest}
      render = {(props) => (logged_in === true)
        ? <Redirect to={{pathname: '/monitor', state: {from: props.location}}}/>
        : <Component {...props}/>
      }
    />
  )
}