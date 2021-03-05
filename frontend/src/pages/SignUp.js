import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import '../css/SignIn.css'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
    };
  }
  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  sendForm = (e) => {
    e.preventDefault();
    axios
      .post('/api/user/register', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) =>
        this.props.history.push('/message/registration', {
          heading: 'Registeration was succesfull',
          title: 'Please verify your E-Mail and then log in',
          message: 'Please check your spam!',
          link: '/signin',
          button: 'SignIn',
        })
      )
      .catch((err) => this.errorHandler(err.response.data, err));
      window.location = '/signin'
  };

  errorHandler = (error, full) => {
    console.log(full);
    this.setState({ error: error.msg });
    setTimeout(() => {
      this.setState({ error: '' });
    }, 3000);
  };

  render() {
    return (
        <div>
        <section className="content-wrapper">
            <div className="login">
                <h1>Welcome to the Beer Game!</h1>
                
                <form id="userCredentials" className= "loginbox">
                    <h2>SIGN UP</h2>
                    <label for="username">Username</label>
                    <input type="text" id="identifier" name="identifier" value={this.state.identifier} onChange={this.onChangeUsername}/>
                    <label for="username">E-Mail</label>
                    <input type="text" id="identifier" name="identifier" value={this.state.identifier} onChange={this.onChangePassword}/>
                    <label for="password" >Password</label>
                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.onChangePassword}/>
                    <label for="playerOrInstructor" >Are you an instructor or student? </label>
                    <select name="playerOrInstructor" id="playerOrInstructor" onChange={this.onChangePlayerOrInstructor}> 
                        <option value="instructor">Instructor</option> 
                        <option value="student" selected>Student</option> 
                    </select> 
                    
                    <div className="buttonContainer">
                        <button id='userSubmit' onClick={this.sendForm}>Sign Up</button>
                    </div>
                    <small className="form-text">
                        Already Sign Up? Go to <Link to="signin">Log In</Link>.
                    </small>
                </form>
            </div>
        </section>
        
    </div>
    );
  }
}

export default withRouter(SignUp);
