import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Nav } from 'react-bootstrap';

class LogIn extends Component {
  state = {
    credentials: {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    if (this.state.logged_in) {
      axios.post('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(data => data.json())
    }
  }

  login = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then(data => data.json())
    .then(json => {
      localStorage.setItem('token', json.token);
      this.setState({logged_in: true});
    })
    .catch(error => console.error(error))
  }

  onChangeInput = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
    // console.log(cred);
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