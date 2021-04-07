import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Col } from 'react-bootstrap'
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axiosInstance from '../../axios'
import Option from './Option';
import EditIcon from '@material-ui/icons/Edit';

/**
 * Form component for updating a game
 *
 * @component
 */
class GameUpdateForm extends React.Component {
  constructor(props){
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.getGameSettings = this.getGameSettings.bind(this);
    this.handleModalShowHide = this.handleModalShowHide.bind(this);
    
    this.state = {
      showHide : false, // modal default state is hide
      errors: '',
      game: '',
      
      /**
       * Game data (/api/game)
       */
      gameSettings: {
        session_length: '',
        distributorPresent: true, 
        wholesalerPresent: true,
        active: false,
        info_sharing: true,
        info_delay: '',
        holding_cost: '',
        backlog_cost: '',
        rounds_completed: '0',
        isDefaultGame: true,
        starting_inventory: '',
        instructor: '1', // this needs to be current logged in user
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
    const game_settings = this.state.gameSettings;
    game_settings[e.target.name] = e.target.value;
    this.setState({gameSettings: game_settings});
    // console.log(game_settings);
  }

  /**
   * Function to get the data of the game from backend
   *
   * @method
   */
  getGameSettings() {
    // Get game/id settings and fill the form with them
  }

  /**
   * Function to update the data of the game
   *
   * @method
   * @param {Object} e event handler
   */
  updateGame(e) {
    e.preventDefault();
    // error message
    let errorMessage = this.state.errors;
    /**
     * createdGame instances
     */
    const createdGame = this.state.gameSettings;
    /**
     * Axios post request
     */
    axiosInstance.post('http://127.0.0.1:8000/api/game/{id}', createdGame, {crossDomain: true})
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        alert("Game Updated Successfully");
        // redirecting upon successful registration
        window.location = "/create";
      } 
      else {
        console.log(res.data);
      }
    })
    // checking for specific response errors
    .catch(error => {if(error.response){ 
      errorMessage = "Couldn't update game settings. Please make sure all fields are valid.";
      this.setState({errors: errorMessage});
      console.log(error.response.data);
    }});
  }

  /**
   * Handle to change modal state when clicked on a component
   */
  handleModalShowHide() {
      this.setState({showHide: !this.state.showHide})
      this.setState({errors: null});
  }

  render(){
    return(
      <>
        <Option name="Edit" icon={<EditIcon id="editIcon" onClick={() => this.handleModalShowHide()}/>} />
        
        <Form>
          <Modal show={this.state.showHide} onHide={() => this.handleModalShowHide()}>
            <Modal.Header closeButton>
              <Modal.Title>Update Game</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* If game is already active or has finished if displays
              something else, e.g. Can't edit game settings. Game has already started/finished. */}
              <Form.Row>
                {/* ------- Number of Weeks ------- */}
                <Form.Group as={Col}>
                  <Form.Label>Number of Weeks</Form.Label>
                  <Form.Control 
                    required
                    id="session_length" 
                    type="number" 
                    name="session_length" 
                    value={this.state.gameSettings.session_length}
                    onChange={this.inputChanged}/>
                </Form.Group>
                {/* ------- Time Delay ------- */}
                <Form.Group as={Col}>
                  <Form.Label>Time Delay</Form.Label>
                  <Form.Control 
                    required
                    id="info_delay" 
                    type="number" 
                    name="info_delay" 
                    value={this.state.gameSettings.info_delay}
                    onChange={this.inputChanged}/>
                </Form.Group>
                {/* ------- Demand ------- */}
                <Form.Group as={Col}>
                  <Form.Label>Demand</Form.Label>
                  <Form.Control 
                    required
                    id="demand" 
                    type="number" 
                    name="demand" 
                    // value={this.state.gameSettings.demand}
                    // onChange={this.inputChanged}
                    />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                {/* ------- Holding Cost ------- */}
                <Form.Group as={Col}>
                  <Form.Label>Holding Cost</Form.Label>
                  <Form.Control 
                    required
                    id="holding_cost" 
                    type="number" 
                    name="holding_cost" 
                    value={this.state.gameSettings.holding_cost}
                    onChange={this.inputChanged}/>
                </Form.Group>
                {/* ------- Backlog Cost ------- */}
                <Form.Group as={Col}>
                  <Form.Label>Backlog Cost</Form.Label>
                  <Form.Control 
                    required
                    id="backlog_cost" 
                    type="number" 
                    name="backlog_cost" 
                    value={this.state.gameSettings.backlog_cost}
                    onChange={this.inputChanged}/>
                </Form.Group>
                {/* ------- Starting Inventory ------- */}
                <Form.Group as={Col}>
                  <Form.Label>Starting Inventory</Form.Label>
                  <Form.Control 
                    required
                    id="starting_inventory" 
                    type="number" 
                    name="starting_inventory" 
                    value={this.state.gameSettings.starting_inventory}
                    onChange={this.inputChanged}/>
                </Form.Group>
              </Form.Row>
              <div style={{color:'red'}}>{this.state.errors}</div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={() => this.handleModalShowHide()}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" id="createGameBtn" onClick={this.updateGame}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </>
    );
  }
}

export default GameUpdateForm;