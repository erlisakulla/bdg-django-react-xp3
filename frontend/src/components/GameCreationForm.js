import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Col } from 'react-bootstrap'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';

// Create games and assign roles

// Modal with Game creation form
class CreateGameForm extends React.Component {
  constructor(){
    super();
    // Setting modal default state to hide
    this.state = {
      showHide : false,

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
        instructor: 'test', // current logged in instructor
      },
    // gameRoles: {
    //   // creating roles uing the roleregister api
    // }
    }
  }

  createGame = () => {
    axios.post('http://127.0.0.1:8000/api/game/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.gameSettings)
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
    const game_settings = this.state.gameSettings;

    // Checking for distributor
    if (event.target.name === "distributorPresent") {
      if (event.target.checked) {
        game_settings.distributorPresent = event.target.checked;
      }
      else {
        game_settings.distributorPresent = false;
      }
    }
    // Checking for wholesaler
    else if (event.target.name === "wholesalerPresent") {
      if (event.target.checked) {
        game_settings.wholesalerPresent = event.target.checked;
      }
      else {
        game_settings.wholesalerPresent = false;
      }
    }
    // Other game settings
    else {
      game_settings[event.target.name] = event.target.value;
    }

    this.setState({gameSettings: game_settings});
    console.log(game_settings);
  }

  // Handle to switch modal state when clicked on a component
  handleModalShowHide() {
      this.setState({ showHide: !this.state.showHide })
  }

  render(){
    // Function to disable distributor player select if checkbox is not selected
    const checkDistributor = () => {
      var check1 = document.getElementById('is_distributor_present');
      var sel1 = document.getElementById('distributor');
      if (check1.checked) {
          sel1.disabled = false;
      }
      else {
          for(let i = 0; i < sel1.options.length; i++){
              if(sel1.options[i].text === "Choose player.."){
                  sel1.selectedIndex = i;
              }
          }
          sel1.disabled = true;
      }
    };
  
    // Function to disable wholesaler player select if checkbox is not selected
    const checkWholesaler = () => {
      var check1 = document.getElementById('is_wholesaler_present');
      var sel1 = document.getElementById('wholesaler');
      if (check1.checked) {
          sel1.disabled = false;
      }
      else {
          for(let i = 0; i < sel1.options.length; i++){
              if(sel1.options[i].text === "Choose player.."){
                  sel1.selectedIndex = i;
              }
          }
          sel1.disabled = true;
      }
    };

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
              <Form.Row id="firstFormRow">
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
              </Form.Row>

              <Form.Row>
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
                <Form.Group as={Col}>
                  <Form.Check 
                    type="checkbox" 
                    id="is_wholesaler_present" 
                    label="Has Wholesaler" 
                    defaultChecked 
                    onClick={checkWholesaler} 
                    custom
                    name="wholesalerPresent"
                    onChange={this.inputChanged}/>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Check 
                    type="checkbox" 
                    id="is_distributor_present" 
                    label="Has Distributor" 
                    defaultChecked 
                    onClick={checkDistributor} 
                    custom
                    name="distributorPresent"
                    onChange={this.inputChanged}/>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Retailer</Form.Label>
                  <Form.Control as="select" id="retailer" custom defaultValue="def">
                    <option value="def" disabled>Choose player..</option>
                    <option value="1">user1</option>
                    <option value="2">user2</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Wholesaler</Form.Label>
                  <Form.Control as="select" id="wholesaler" custom defaultValue="def">
                    <option value="def" disabled>Choose player..</option>
                    <option value="1">user1</option>
                    <option value="2">user2</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Distributor</Form.Label>
                  <Form.Control as="select" id="distributor" custom defaultValue="def">
                    <option value="def" disabled>Choose player..</option>
                    <option value="1">user1</option>
                    <option value="2">user2</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Factory</Form.Label>
                  <Form.Control as="select" id="factory" custom defaultValue="def">
                    <option value="def" disabled>Choose player..</option>
                    <option value="1">user1</option>
                    <option value="2">user2</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <DemandType/>
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

// Component that defines the demand type and demand selection
class DemandType extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  } 

  render() {
    const content = 
      (this.state.selectedOption === "Custom") ? 
        <div id="cust_dem_cont">
          <small>Enter the demand for each week separated by a comma. Please make sure you don't add more or less demands than the number of weeks specified.</small>
          <Form.Control type="text" placeholder="1, 2, 3, ..." id="demand"/>
        </div> :
      (this.state.selectedOption === "Constant") ? 
        <div id="const_dem_cont">
          Demand for each week:  
          <Form.Control type="number" id="const_demand"/>
        </div> : 
      null;

    return (
      <>
        <Form.Group as={Col}>
          <Form.Label>Demand Pattern</Form.Label>
          <Form.Row id="demand_option">
            <Form.Group as={Col}>
              <div className="radio">
                <Form.Check 
                  type="radio" 
                  id="const_demand" 
                  label="Constant Demand" 
                  custom
                  value="Constant"
                  checked={this.state.selectedOption === "Constant"}
                  onChange={this.onValueChange}/>
              </div>
            </Form.Group>
            <Form.Group as={Col}>
              <div className="radio">
                <Form.Check 
                  type="radio" 
                  id="cust_demand" 
                  label="Custom Demand" 
                  custom
                  value="Custom"
                  checked={this.state.selectedOption === "Custom"}
                  onChange={this.onValueChange}/>
              </div>
            </Form.Group>
          </Form.Row>
        </Form.Group>
        <div>
          { content }
        </div>
      </>
    );
  }
}