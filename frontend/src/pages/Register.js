import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Nav, Col } from 'react-bootstrap';

class SignUp extends React.Component {
    state = {
      credentials: {
        email: '',
        name: '', 
        password: '',
        is_instructor: false,
      }
    }

    register = (e) => {
      e.preventDefault();
      axios.post('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.credentials)
      })
      .then(data => data.json())
      .then(
        data => {
          console.log(data.token);
        }
      )
      .catch(error => console.error(error))
    }

    inputChanged = event => {
      const cred = this.state.credentials;

      if (event.target.name === "name") {
        cred.name = event.target.value;
      }
      else if (event.target.name === "email") {
        cred.email = event.target.value;
      }
      else if (event.target.name === "password") {
        cred.password = event.target.value;
      }
      else if (event.target.name === "is_instructor") {
        this.setState({selectedOption: event.target.value});
        if (event.target.value === "true") {
          cred.is_instructor = event.target.checked;
        }
        else if (event.target.value === "false") {
          cred.is_instructor = false;
        }
      }
      this.setState({credentials: cred});
      // console.log(cred);
    }

  render() {
    // This is in case we want to implement instructor selection upon registration as well

    // const content = 
    //   (this.state.selectedOption === "Student") ? 
    //     <div style={{paddingBottom: '30px'}}>
    //       <Form.Control 
    //         as="select" 
    //         name="instructorSelect" 
    //         id="instructorSelect" 
    //         onChange={this.onChangePlayerOrInstructor}
    //         defaultValue="0">
    //           <option value="0" disabled>Select Instructor</option>
    //           <option value="1">instructor1</option>
    //           <option value="2">instructor2</option>
    //       </Form.Control>
    //     </div> : null;

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
                      <Nav.Link href="/">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="active" href="/signup">Register</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>

                <Card.Body>
                <Form id="userCredentials">
                  <Form.Group>
                    <Form.Control 
                      type="text"
                      id="name"
                      name="name"
                      required
                      onChange={this.inputChanged}
                      value={this.state.credentials.name}
                      placeholder="Full Name"/>
                      <Form.Control.Feedback type="invalid">
                        Invalid name.
                      </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control 
                      type="email"
                      id="email"
                      name="email"
                      required
                      onChange={this.inputChanged}
                      value={this.state.credentials.email}
                      placeholder="Email"/>
                      <Form.Control.Feedback type="invalid">
                        Invalid email.
                      </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control 
                      type="password"
                      id="password"
                      name="password"
                      required
                      onChange={this.inputChanged}
                      value={this.state.credentials.password}
                      placeholder="Password"/>
                      <Form.Control.Feedback type="invalid">
                        Invalid password.
                      </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <div className="radio">
                          <Form.Check 
                            required
                            type="radio" 
                            id="is_instructor" 
                            label="Instructor" 
                            custom
                            value="true"
                            name="is_instructor"
                            checked={this.state.selectedOption === "true"}
                            onChange={this.inputChanged}/>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <div className="radio">
                          <Form.Check 
                            type="radio" 
                            id="is_student" 
                            label="Student" 
                            custom
                            value="false"
                            name="is_instructor"
                            checked={this.state.selectedOption === "false"}
                            onChange={this.inputChanged}/>
                        </div>
                      </Form.Group>
                    </Form.Row>
                  </Form.Group>

                  {/* { content } */}
                    
                  <Button variant="primary" type="submit" id="userSubmit"  onClick={this.register}>
                    Sign Up
                  </Button>
                  <Form.Text className="text-muted">
                    Already have an account? <Link to="/">Login here.</Link>
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

export default withRouter(SignUp);