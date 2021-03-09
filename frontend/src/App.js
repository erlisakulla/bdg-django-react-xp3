import './css/App.css';
import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import InstructorMainPage from './pages/InstructorMain';
import UserMainPage from './pages/UserMain';
import history from './components/utilities/History';

import Role from './pages/Role';



class App extends Component{
  render(){
    return (
      <div>
        <Router history={history}>
        <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/instructor" component={InstructorMainPage} />
            <Route exact path="/student"  component={UserMainPage} />
            <Route exact path="/student/role" component={Role} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
