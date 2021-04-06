import React, { Component } from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form, Nav } from 'react-bootstrap';

/**
 * Account Settings page
 *
 * @component
 */
class AccountSettings extends Component {
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
                <Nav.Item>
                  <Nav.Link href="/create">Setup Games</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/monitor">Monitor Games</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/join">Join Games</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              <div className="main-container-settings">
                <Form id="account_settings_form">
                  {/* ------- Current Password ------- */}
                  <Form.Group>
                    <Form.Control 
                      required
                      type="password"
                      id="current_password"
                      name="current_password"
                      placeholder="Current Password"/>
                  </Form.Group>
                  {/* ------- New Password ------- */}
                  <Form.Group>
                    <Form.Control 
                      required
                      type="password"
                      id="new_password"
                      name="new_password"
                      placeholder="New Password"/>
                  </Form.Group>
                  {/* ------- Repeat New Password ------- */}
                  <Form.Group>
                    <Form.Control 
                      required
                      type="password"
                      id="repeat_password"
                      name="repeat_password"
                      placeholder="Repeat New Password"/>
                  </Form.Group>
                  
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