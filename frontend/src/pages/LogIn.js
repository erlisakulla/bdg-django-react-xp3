import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Nav } from 'react-bootstrap';
import axiosInstance from '../axios'

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.onChangeInput = this.onChangeInput.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      credentials: {
        email: '',
        password: '',
      }
    }
  }

  onChangeInput = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
    // console.log(cred);
  }

  login = (e) => {
    e.preventDefault();
    const loginUser = this.state.credentials;

    axiosInstance.post('http://127.0.0.1:8000/api/token/', loginUser, {
      crossDomain: true, 
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('token_access', res.access);
        alert("Successfully Logged In");
        window.location = "/create";
      } 
      else {
        console.log(res.data);
      }
    })
    .catch(error => {if(error.response){ console.log(error.response.data)}})
  }

  render() {
    return (
      <div>
        <section className="content-wrapper">
          <div className="login">
            <h2 className="welcome-text">Welcome to the Beer Distribution Game!</h2>
            <div className="box">
              <Card id="forms">
                <Card.Header>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link href="/" className="active">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/signup">Register</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>

                <Form id="userCredentials">
                  <Form.Group>
                    <Form.Control 
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={this.state.credentials.email}
                      onChange={this.onChangeInput}
                      placeholder="Email"/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control 
                      required
                      type="password"
                      id="password"
                      name="password"
                      value={this.state.credentials.password}
                      onChange={this.onChangeInput}
                      placeholder="Password"/>
                  </Form.Group>

                  <Button variant="primary" type="submit" id="userSubmit" onClick={this.login}>
                    Log In
                  </Button>
                  <Form.Text className="text-muted">
                    Don't have an account? <Link to="/signup">Register here.</Link>
                  </Form.Text>
                </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LogIn;