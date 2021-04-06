import React from 'react';
import './css/App.css';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/Register';
import CreateGames from './pages/games/CreateGame';
import MonitorGames from './pages/games/MonitorGame';
import JoinGames from './pages/games/JoinGame';
import GameView from './pages/games/GameView';
import AccountSettings from './pages/auth/AccountSettings';
import GameInsights from './pages/games/GameInsights';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Sets up paths to pages
 *
 * @component
 */
class App extends React.Component {
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
            <Route exact path="/settings" component={AccountSettings}/>
            <Route exact path="/insights" component={GameInsights}/>
      
            {/* <Route exact path="/gameview/game/:id" component={GameView}/> */}
            {/* <Route exact path="/insights/game/:id" component={GameInsights}/> */}
            {/* <Route exact path="/eidt/game/:id" component={}/> */}
            {/* <Route exact path="/delete/game/:id" component={}/> */} 
            {/* <Route exact path="/delete/user/:id" component={}/> */}  
            {/* <Route exact path="/edit/user/:id" component={}/> */}      
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;