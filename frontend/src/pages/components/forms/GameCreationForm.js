import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Col } from 'react-bootstrap'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axiosInstance from '../../../axios'

/**
 * Form component for creating a game
 *
 * @component
 */
class CreateGameForm extends React.Component {
  constructor(props){
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.createGame = this.createGame.bind(this);
    this.handleModalShowHide = this.handleModalShowHide.bind(this);
    
    this.state = {
      showHide : false, // modal default state is hide
      errors: '',

      /**
       * Game data (/api/game)
       */
      gameSettings: {
        session_length: '24',
        distributorPresent: true, 
        wholesalerPresent: true,
        active: false,
        info_sharing: true,
        info_delay: '2',
        holding_cost: '1',
        backlog_cost: '1',
        rounds_completed: '0',
        isDefaultGame: true,
        starting_inventory: '15',
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
    // Checking for distributor
    if (e.target.name === "distributorPresent") {
      if (e.target.checked) {
        game_settings.distributorPresent = e.target.checked;
      }
      else {
        game_settings.distributorPresent = false;
      }
    }
    // Checking for wholesaler 
    else if (e.target.name === "wholesalerPresent") {
      if (e.target.checked) {
        game_settings.wholesalerPresent = e.target.checked;
      }
      else {
        game_settings.wholesalerPresent = false;
      }
    }
    // Other game settings
    else {
      game_settings[e.target.name] = e.target.value;
    }

    this.setState({gameSettings: game_settings});
    // console.log(game_settings);
  }

  /**
   * Function to post the data of the form to backend
   *
   * @method
   * @param {Object} e event handler
   */
  createGame(e) {
    e.preventDefault();
    // error message
    let errorMessage = this.state.errors;
    /**
     * gameSettings states instance
     */
    const createdGame = this.state.gameSettings;
    /**
     * Axios post request
     */
    axiosInstance.post('http://127.0.0.1:8000/api/game/', createdGame, {crossDomain: true})
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        alert("Game Created Successfully");
        // redirecting upon successful game creation
        window.location = "/create";
      }
      else {
        console.log(res.data);
      }
    })
    .catch(error => {
      if(error.response){ 
        errorMessage = "Couldn't create game.";
        this.setState({errors: errorMessage});
        console.log(error.response.data);
        alert(error.response.data.detail);
      }
    });
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
        <div id="createGame">
          <Button variant="success" onClick={() => this.handleModalShowHide()}>
            <AddCircleOutlineIcon/> Create Game
          </Button>
        </div>
        
        <Form id="createGameForm">
          <Modal show={this.state.showHide} onHide={() => this.handleModalShowHide()}>
            <Modal.Header closeButton>
              <Modal.Title>Create Game</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Row>
                {/* ------- Number of Weeks ------- */}
                <Form.Group as={Col}>
                  <Form.Label>Number of Weeks</Form.Label>
                  <Form.Control 
                    required
                    data-testid="weeks-input"
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
                    defaultValue="5"
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
                    step="0.5"
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
                    step="0.5"
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

              <Form.Row>
                {/* ------- Distributor Checkbox ------- */}
                <Form.Group as={Col}>
                  <Form.Check 
                    type="checkbox" 
                    id="is_wholesaler_present" 
                    label="Has Wholesaler" 
                    defaultChecked 
                    custom
                    name="wholesalerPresent"
                    onChange={this.inputChanged}/>
                </Form.Group>
                {/* ------- Wholesaler Checkbox ------- */}
                <Form.Group as={Col}>
                  <Form.Check 
                    type="checkbox" 
                    id="is_distributor_present" 
                    label="Has Distributor" 
                    defaultChecked 
                    custom
                    name="distributorPresent"
                    onChange={this.inputChanged}/>
                </Form.Group>
              </Form.Row>

              <div style={{color:'red', paddingBottom:'10px'}}>{this.state.errors}</div>
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

export default CreateGameForm;