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
      isInstructor: false,
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

  onChangePlayerOrInstructor = (e) => {
    if(e.target.value === "instructor"){
      this.setState({isInstructor: true});
    }
    else{
      this.setState({isInstructor: false});
    }
  };

  sendForm = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/signup', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        isInstructor: this.state.isInstructor
      }, {
        crossDomain: true
      })
      .then((res) => {
          alert(res.data.msg);
          if(res.data.status===201) window.location='/';
        // if(!res.data){
        //   alert("Successfully registered. Now sign in!");
        //   window.location = '/login';
        // }else{
        //   alert(res.data.msg);
        // }
      })
      .catch((err) => {console.log(err)});
  };

  render() {
    return (
        <div>
        <section className="content-wrapper">
            <div className="login">
                <div className = "box">
                    <h1>Welcome to the Beer Game!</h1>
                    
                    <form id="userCredentials" className= "loginbox">
                        <h2>SIGN UP</h2>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="identifier" value={this.state.identifier} onChange={this.onChangeUsername}/>
                        <label for="username">E-Mail</label>
                        <input type="text" id="email" name="identifier" value={this.state.identifier} onChange={this.onChangeEmail}/>
                        <label for="password" >Password</label>
                        <input type="password" id="password" name="password" value={this.state.password} onChange={this.onChangePassword}/>
                        <label for="playerOrInstructor" >Are you an instructor or student? </label>
                        <select name="playerOrInstructor" defaultValue="student" id="playerOrInstructor" onChange={this.onChangePlayerOrInstructor}> 
                            <option value="instructor">Instructor</option> 
                            <option value="student" >Student</option> 
                        </select> 
                        
                        <div className="buttonContainer">
                            <button id='userSubmit' onClick={this.sendForm}>Sign Up</button>
                        </div>
                        <small className="form-text">
                            Already Sign Up? Go to <Link to="/">Log In</Link>.
                        </small>
                    </form>
                </div>
            </div>
        </section>
        
    </div>
    );
  }
}

export default withRouter(SignUp);
