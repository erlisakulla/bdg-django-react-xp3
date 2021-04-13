import React, { Component } from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form, Nav } from 'react-bootstrap';
import axiosInstance from '../../axios'

/**
 * Account Settings page
 *
 * @component
 */
class AccountSettings extends Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.changePass = this.changePass.bind(this);
    
    /**
     * Games display states
     */
    this.state = {
      is_instructor: '',

      change_pass: {
        old_password: '',
        password: '',
        password2: '',
      }
    }
  }

  /**
   * Method to get all games and user data
   *
   * @method
   */
  componentDidMount() { 
    axiosInstance.get('http://127.0.0.1:8000/api/user/')
    .then((res) => {
      const isInst = res.data.is_instructor;
      this.setState({is_instructor: isInst});
      console.log(res.data);
    })
    .catch(error => {if(error.response){console.log(error.response.data);}});
  }

  /**
   * Function for detecting input changes in the form
   *
   * @method
   * @param {Object} e event handler
   */
  onChangeInput(e) {
    const pass = this.state.change_pass;
    pass[e.target.name] = e.target.value;
    this.setState({change_pass: pass});
  }

 
  /**
   * Chage Password function
   *
   * @method
   * @param {Object} e event handler
   */
   changePass(e) {
    e.preventDefault();
    const newPass = this.state.change_pass;

    axiosInstance.put('http://127.0.0.1:8000/api/user/changepassword/', newPass)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("Successfully Changed Password!"); 
        window.location = "/settings";
      }
    })
    .catch(error => {
      if(error.response) {
        alert("Couldn't Change Password!"); 
        console.log(error.response.data)
      }
    });
  }

  render() {
    return (
      <> 
        <Navbar/>

        <div className="main-container">
          <h2>Account Settings</h2>
          <p>Here you can change your password or delete your account.</p>
          <hr/>
          
          <Card>
            <Card.Header>
              <Nav variant="tabs">
              { this.state.is_instructor === true ?
                  <Nav.Item>
                    <Nav.Link href="/create">Setup Games</Nav.Link>
                  </Nav.Item> : null
                }
                { this.state.is_instructor === false ?
                  <Nav.Item>
                    <Nav.Link href="/join">Join Games</Nav.Link>
                  </Nav.Item> : null
                }
                <Nav.Item>
                  <Nav.Link href="/monitor">Monitor Games</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              <div className="main-container-settings">
                <Form id="account_settings_form" onSubmit={this.changePass}>
                  {/* ------- Current Password ------- */}
                  <Form.Group>
                    <Form.Control 
                      required
                      type="password"
                      id="old_password"
                      name="old_password"
                      value={this.state.change_pass.old_password}
                      onChange={this.onChangeInput}
                      placeholder="Current Password"/>
                  </Form.Group>
                  {/* ------- New Password ------- */}
                  <Form.Group>
                    <Form.Control 
                      required
                      type="password"
                      id="password"
                      name="password"
                      value={this.state.change_pass.password}
                      onChange={this.onChangeInput}
                      placeholder="New Password"/>
                  </Form.Group>
                  {/* ------- Repeat New Password ------- */}
                  <Form.Group>
                    <Form.Control 
                      required
                      type="password"
                      id="password2"
                      name="password2"
                      value={this.state.change_pass.password2}
                      onChange={this.onChangeInput}
                      placeholder="Repeat New Password"/>
                  </Form.Group>

                  <Form.Text className="text-muted" style={{textAlign:'center', paddingBottom:'15px'}}>
                    Password must contain at least 8 characters.
                  </Form.Text>
                  
                  <Form.Group>
                    <Button variant="primary" type="submit" id="setting_button1">
                      Change Password
                    </Button>
                  </Form.Group>
                </Form>
                <Button variant="danger" type="submit"  id="setting_button2">
                  Delete Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default AccountSettings;