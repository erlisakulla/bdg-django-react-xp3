import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Nav } from 'react-bootstrap';
import axiosInstance from '../../axios'

/**
 * Login Form
 *
 * @component
 */
class LogIn extends Component {
  constructor(props) {
    super(props)

    this.onChangeInput = this.onChangeInput.bind(this);
    this.login = this.login.bind(this);

     this.state = {
      errors: '',
      is_instructor: '',
      
      /**
       * User data (/api/token)
       */
      credentials: {
        email: '',
        password: '',
      }
    }
  }

  /**
   * Function for detecting input changes in the form
   *
   * @method
   * @param {Object} e event handler
   */
  onChangeInput(e) {
    const cred = this.state.credentials;
    cred[e.target.name] = e.target.value;
    this.setState({credentials: cred});
    // console.log(cred);
  }

  /**
   * Login function that handles posting the data
   *
   * @method
   * @param {Object} e event handler
   */
  login(e) {
    e.preventDefault();
    const loginUser = this.state.credentials;

    axiosInstance.post('http://127.0.0.1:8000/api/token/', loginUser, {crossDomain: true})
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
        
        alert("Successfully Logged In"); 
        window.location = "/monitor";
      }
    })
    .catch(error => {
      if(error.response) { 
        const errm = "Invalid password or username";
        this.setState({errors: errm});
        console.log(error.response.data)
      }
    });
  }

  render() {
    return (
      <>
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
                  {/* Browser default validation using 'required' tag */}
                  <Form id="userCredentials" onSubmit={this.login}>
                    {/* ------- Email ------- */}
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
                    {/* ------- Password ------- */}
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

                    <div style={{color:'red', paddingBottom:'10px'}}>{this.state.errors}</div>

                    <Button variant="primary" type="submit" id="userSubmit">
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
      </>
    );
  }
}

export default LogIn;