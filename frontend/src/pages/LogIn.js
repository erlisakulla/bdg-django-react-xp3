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
        };
        this.sendForm=this.sendForm.bind(this);
    }

    onChangeIdentifier = (e) => {
        this.setState({ identifier: e.target.value });
    };
    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    sendForm = (e) => {
        e.preventDefault();
        if (this.state.identifier.includes('@')) {
            console.log("Email");
            axios.post('http://localhost:3001/login', {
                email: this.state.identifier,
                password: this.state.password,
            })
            .then((res) => {
                alert(res.data.msg);
                if(res.data.user.isInstructor){
                    window.location='/instructor';
                }else{
                    window.location='/student';
                }
            })
            .catch((err) => console.log(err));
        } else {
            console.log("Username");
            axios.post('http://localhost:3001/login', {
                username: this.state.identifier,
                password: this.state.password,
            })
            .then((res) => {
                alert(res.data.msg);
                if(res.data.user.isInstructor){
                    window.location='/instructor';
                }else{
                    window.location='/student';
                }
            })
            .catch((err) => console.log(err));
        }
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
