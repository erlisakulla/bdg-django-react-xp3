import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/SignIn.css'


export default class SignIn extends Component {
    //the indentifier is either the email or the username
    //playerOrInstructor just stores the information whether the logged-in person
    //is a player or an instructor (default: player)
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            error: '', 
            isInstructor: false
        };
    }

    onChangeIdentifier = (e) => {
        this.setState({ identifier: e.target.value });
    };
    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    sendForm = (e) => {
        e.preventDefault();
        let route = '';
        if (this.state.identifier.includes('@')) {
            if(this.state.playerOrInstructor==="student"){
                route = '/api/player/login';
            }else{
                route = '/api/instrutor/login';
            }
            axios.post(route, {
                email: this.state.identifier,
                password: this.state.password,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } else {
            if(this.state.playerOrInstructor==="student"){
                route = '/api/player/login';
            }else{
                route = '/api/instrutor/login';
            }
            axios.post(route, {
                username: this.state.identifier,
                password: this.state.password,
            })
            .then((res) => this.props.loadAuthApp(res))
            .catch((err) => console.log(this.errorHandler(err.response.data, err)));
        }
        window.location = 'http://localhost:3000/instructor'
    };

    errorHandler = (error, full) => {
        console.log(error);
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
                        <div className = "box">
                            <form id="userCredentials" className= "loginbox">
                                <h2>LOGIN</h2>
                                <label for="username">Username/Email</label>
                                <input type="text" id="identifier" name="identifier" value={this.state.identifier} onChange={this.onChangeIdentifier}/>
                                <label for="password" >Password</label>
                                <input type="password" id="password" name="password" value={this.state.password} onChange={this.onChangePassword}/>
                                {/* <label for="playerOrInstructor" >Are you an instructor or student? </label>
                                <select name="playerOrInstructor" id="playerOrInstructor" onChange={this.onChangePlayerOrInstructor}> 
                                    <option value="instructor">Instructor</option> 
                                    <option value="student" selected>Student</option> 
                                </select>  */}
                                
                                <div className="buttonContainer">
                                    <button id='userSubmit' onClick={this.sendForm}>Log in</button>
                                </div>
                                <small className="form-text">
                                Not <Link to="signup">Signed Up</Link> yet?
                                </small>
                            </form>
                        </div>
                    </div>
                </section>
                
            </div>
    );
  }
}
