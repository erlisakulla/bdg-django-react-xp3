import React, { Component } from 'react';
import '../css/Main.css';
import Navbar from '../components/Navbar.js';
import CreateGameForm from '../components/GameCreationForm.js';
import Option from '../components/Option.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Card, Nav, Popover, OverlayTrigger } from 'react-bootstrap';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

// Add method to GET game and roles data 

// Main Render
class CreateGames extends Component {
  constructor(){
    super();
    // Setting modal default state to hide
    this.state = {
      loggedUser: '',
    }
  }

  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Players of Game 1</Popover.Title>
        <Popover.Content>
          <Table>
            <tr>
              <th>Role</th>
              <td>Player</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>Player</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>Player</td>
            </tr>
          </Table>
        </Popover.Content>
      </Popover>
    );

    const Players = () => (
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <Button variant="primary">Players</Button>
      </OverlayTrigger>
    );

    return (
      <div> 
          <Navbar/>
          
          <div className="main-container">
            <h2>Created Games</h2>
            <p>Here you can view, edit and delete all the games you have created.</p>
            <hr/>

            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link href="/create" className="active">Setup Games</Nav.Link>
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
                <CreateGameForm/>
                <Table responsive className="gamesList">
                  <thead>
                    <tr>
                      <th>Game ID</th>
                      <th>Time Delay</th>
                      <th>Has Wholesaler</th>
                      <th>Has Retailer</th>
                      <th>Holding Cost</th>
                      <th>Backorder Cost</th>
                      <th>Weeks Completed</th>
                      <th>Week to stop</th>
                      <th>Players</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>2 weeks</td>
                      <td>Yes</td>
                      <td>Yes</td>
                      <td>1</td>
                      <td>1</td>
                      <td>0</td>
                      <td>24</td>
                      <td><Players/></td>
                      <td>
                        <Option name="Pause" icon={<PauseCircleOutlineIcon/>}/>
                        <Option name="Edit" icon={<EditIcon/>}/>
                        <Option name="Delete" icon={<DeleteOutlineIcon/>}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
      </div>
    );
  }
}

export default CreateGames;