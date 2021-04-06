import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import axios from 'axios';

/**
 * Form component for registering to a game
 *
 * @component
 */
class GameRegisterForm extends React.Component {
  constructor(){
    super();
    /**
     * Role data (/api/role)
     */
    this.state = {
      showHide : false, // modal default state is hide
      
      roleSettings: {
        // states of roles according to django model
      }
    }
  }

  /**
   * Handle to change modal state when clicked on a component
   */
  handleModalShowHide() {
      this.setState({showHide: !this.state.showHide})
  }

  render(){
    return(
      <>
        <div id="createGame">
          <Button variant="primary" onClick={() => this.handleModalShowHide()}>
            <ExitToAppIcon/> Register to Game
          </Button>
        </div>

        <Form id="createGameForm">
          <Modal show={this.state.showHide} onHide={() => this.handleModalShowHide()}>
            <Modal.Header closeButton>
              <Modal.Title>Register to Game</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                {/* ------- Game Selector ------- */}
                <Form.Group>
                  <Form.Label>Game</Form.Label>
                  <Form.Control as="select" id="retailer" custom defaultValue="def">
                    <option value="def" disabled>Choose game..</option>
                    <option value="1">game1</option>
                    <option value="2">game2</option>
                  </Form.Control>
                </Form.Group>
                {/* ------- Role Selector ------- */}
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control as="select" id="wholesaler" custom defaultValue="def">
                    <option value="def" disabled>Choose role..</option>
                    <option value="1">role1</option>
                    <option value="2">role2</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={() => this.handleModalShowHide()}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" id="createGameBtn" onClick={this.createGame}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </>
    );
  }
}

export default GameRegisterForm;