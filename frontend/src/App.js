import React from 'react';
import './css/App.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/Register';
import CreateGames from './pages/CreateGame';
import MonitorGames from './pages/MonitorGame';
import JoinGames from './pages/JoinGame';
import GameView from './pages/GameView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
    };
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={LogIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route path="/create" component={CreateGames}/>
            <Route path="/monitor" component={MonitorGames}/>
            <Route path="/join" component={JoinGames}/>
            <Route exact path="/gameview" component={GameView}/>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;