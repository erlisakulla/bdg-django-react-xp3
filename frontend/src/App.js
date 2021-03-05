import './css/App.css';
import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import history from './components/utilities/History';



class App extends Component{
  render(){
    return (
      <Router history={history}>
        <Switch>
            <Route exact path="/signin" component={SignIn} />
        </Switch>
      </Router>
    );
  }
}

export default App;
