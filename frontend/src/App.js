import './css/App.css';
import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import InstructorMainPage from './pages/InstructorMain';
import UserMainPage from './pages/UserMain';
import history from './components/utilities/History';



class App extends Component{
  render(){
    return (
      <Router history={history}>
        <Switch>
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/instructor" component={InstructorMainPage} />
            <Route path="/student" component={UserMainPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
