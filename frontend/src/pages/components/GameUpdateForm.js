import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Col } from 'react-bootstrap'
import Option from './Option';
import EditIcon from '@material-ui/icons/Edit';
import axiosInstance from '../../axios'

/**
 * Form component for updating a game
 *
 * @component
 */
function GameUpdateForm(props) {
  const { gameid } = props;

  const [show, setShow] = useState(false);
  const [state, setGameSettings] = useState({
    session_length: '',
    info_delay: '',
    holding_cost: '',
    backlog_cost: '',
    starting_inventory: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Getting game specific data
   */
  useEffect(() => {
    axiosInstance.get(`http://127.0.0.1:8000/api/game/${gameid}`)
    .then((res) => {
      setGameSettings(s => ({
        session_length: res.data.session_length,
        info_delay: res.data.info_delay,
        holding_cost: res.data.holding_cost,
        backlog_cost: res.data.backlog_cost,
        starting_inventory: res.data.starting_inventory,
      }));
      console.log(res.data);
    });
	}, [setGameSettings, gameid]);

  /**
   * Input change 
   *
   * @param {Object} e event handler
   */
  const inputChanged = (e) => {
    setGameSettings({
			...state,
			[e.target.name]: e.target.value,
		});
  }

  /**
   * Method to update game instance 
   *
   * @method
   * @param {Object} e event handler
   */
  const updateGame = (e) => {
		e.preventDefault();
		console.log(state);
    const updatedSettings = state;

    axiosInstance.patch(`http://127.0.0.1:8000/api/game/${gameid}/`, updatedSettings)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("Updated game successfully");
        window.location = "/create";
        window.location.reload();
      } 
      else {
        console.log(res.data);
      }
    })
    .catch(error => {
      if(error.response){ 
        alert("Couldn't update game. Please try again.");
        console.log(error.response.data);
      }
    });;
	}

  return (
    <>
      <Option name="Edit" icon={<EditIcon id="editIcon" onClick={handleShow}/>} />
        
      <Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Game {gameid}</Modal.Title>
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
                  // defaultValue={this.props.session_length}
                  value={state.session_length}
                  onChange={inputChanged}/>
              </Form.Group>
              {/* ------- Time Delay ------- */}
              <Form.Group as={Col}>
                <Form.Label>Time Delay</Form.Label>
                <Form.Control 
                  required
                  id="info_delay" 
                  type="number" 
                  name="info_delay" 
                  // defaultValue={this.props.info_delay}
                  value={state.info_delay}
                  onChange={inputChanged}/>
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
                  // defaultValue={this.props.info_delay} 
                  value={state.demand}
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
                  // defaultValue={this.props.holding_cost}
                  value={state.holding_cost}
                  onChange={inputChanged}/>
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
                  // defaultValue={this.props.backlog_cost}
                  value={state.backlog_cost}
                  onChange={inputChanged}/>
              </Form.Group>
              {/* ------- Starting Inventory ------- */}
              <Form.Group as={Col}>
                <Form.Label>Starting Inventory</Form.Label>
                <Form.Control 
                  required
                  id="starting_inventory" 
                  type="number" 
                  name="starting_inventory" 
                  // defaultValue={this.props.starting_inventory}
                  value={state.starting_inventory}
                  onChange={inputChanged}/>
              </Form.Group>
            </Form.Row>
            
            {/* <div style={{color:'red', paddingBottom:'10px'}}>{this.state.errors}</div> */}

          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" id="createGameBtn" onClick={updateGame}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}

export default GameUpdateForm;