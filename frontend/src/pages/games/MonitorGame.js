import React, { Component } from 'react';
import '../../css/Main.css';
import Navbar from '../components/Navbar';
import Option from '../components/Option';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Card, Nav } from 'react-bootstrap';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

/**
 * Monitor Games page 
 *
 * @component
 */
class MonitorGames extends Component {
  render() {
    return (
      <> 
        <Navbar/>

        <div className="main-container">
        <h2>Monitor Games</h2>
          <p>Here you can monitor all the games you have created.</p>
          <hr/>

          <Card>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link href="/create">Setup Games</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/monitor" className="active">Monitor Games</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/join">Join Games</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              {/* ------- Table with created/joined games to monitor ------- */}
              <Table responsive className="gamesList">
                <thead>
                  <tr>
                    <th>Game ID</th>
                    <th>Time Delay</th>
                    <th>Holding Cost</th>
                    <th>Backorder Cost</th>
                    <th>Current Week</th>
                    <th>Factory Cost</th>
                    <th>Distributor Cost</th>
                    <th>Wholesaler Cost</th>
                    <th>Retailer Cost</th>
                    <th>Total Cost</th>
                    <th>Plots</th>
                    <th>Options</th>
                  </tr>
                </thead>
                {/* Dummy data */}
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>2 weeks</td>
                    <td>1</td>
                    <td>1</td>
                    <td>3/24</td>
                    <td>50</td>
                    <td>50</td>
                    <td>50</td>
                    <td>50</td>
                    <td>200</td>
                    <td><Button variant="secondary">Plots</Button></td>
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
      </>
    );
  }
}

export default MonitorGames;