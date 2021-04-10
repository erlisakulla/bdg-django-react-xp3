import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Nav, Col } from 'react-bootstrap';
import axiosInstance from '../../axios'

/**
 * Registration Form
 *
 * @component
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.inputChanged = this.inputChanged.bind(this);
    this.register = this.register.bind(this);

    /**
     * User data (/api/user)
     */
    this.state = {
      errors: '',

      credentials: {
        email: '',
        name: '', 
        password: '',
        is_instructor: false,
      }
    }
  }

  /**
   * Function for detecting input changes in the form
   *
   * @method
   * @param {Object} e event handler
   */
  inputChanged(e) {
    this.setState({errors: null});

    const cred = this.state.credentials;

    if (e.target.name === "name") {
      cred.name = e.target.value;
    }
    else if (e.target.name === "email") {
      cred.email = e.target.value;
    }
    else if (e.target.name === "password") {
      cred.password = e.target.value;
    }
    else if (e.target.name === "is_instructor") {
      this.setState({selectedOption: e.target.value});
      if (e.target.value === "true") {
        cred.is_instructor = e.target.checked;
      }
      else if (e.target.value === "false") {
        cred.is_instructor = false;
      }
    }
    this.setState({credentials: cred});
    // console.log(cred);
  }

  /**
   * Register function that handles posting the data
   *
   * @method
   * @param {Object} e event handler
   */
  register(e) {
    e.preventDefault();
    const registerUser = this.state.credentials;
  
    axiosInstance.post('http://127.0.0.1:8000/api/register/', registerUser, {crossDomain: true})
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        alert("Successfully Registered");
        window.location = "/";
      } 
      else {
        console.log(res.data);
      }
    })
    .catch(error => {
      if(error.response) { 
        const errm = "User with that email already exists";
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
                      <Nav.Link href="/">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="active" href="/signup">Register</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>

                <Card.Body>
                  {/* Browser default validation using 'required' tag */}
                  <Form id="userCredentials" onSubmit={this.register}>
                    {/* ------- Full Name ------- */}
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
                    {/* ------- Email ------- */}
                    <Form.Group>
                      <Form.Control 
                        type="email"
                        data-testid="email-input"
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
                    {/* ------- Password ------- */}
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
                    {/* ------- Instructor ------- */}
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
                        {/* ------- Student ------- */}
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

                    <div style={{color:'red', paddingBottom:'10px'}}>{this.state.errors}</div>
                      
                    <Button variant="primary" type="submit" id="userSubmit">
                      Sign Up
                    </Button>
                    <Form.Text className="text-muted">
                      Already have an account? <a href="/">Login here.</a>
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

export default SignUp;